/* eslint-disable react/no-unknown-property -- react-three-fiber JSX props aren't DOM attributes */
import { Html, RoundedBox, useTexture } from "@react-three/drei";
import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { Bloom, EffectComposer, Noise, Vignette } from "@react-three/postprocessing";
import {
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  ACESFilmicToneMapping,
  Shape,
  ShapeGeometry,
  SRGBColorSpace,
  Vector3,
  type PointLight,
  type SpotLight,
  type Texture,
} from "three";

import { startAmbience, type Ambience } from "./ambience";
import { ScreenOS, type ScreenPost } from "./ScreenOS";

type Focus = "room" | "monitor" | "board" | "decks" | "shelf";

const SHOTS: Record<Focus, { eye: [number, number, number]; look: [number, number, number] }> = {
  room: { eye: [-0.85, 1.5, 3.25], look: [0.1, 1.3, 0.3] },
  monitor: { eye: [0.15, 1.02, 0.92], look: [0.15, 1.02, 0.2] },
  board: { eye: [0.15, 1.72, 1.45], look: [0.15, 1.72, 0] },
  decks: { eye: [-0.88, 1.55, 1.2], look: [-0.88, 1.55, 0] },
  shelf: { eye: [0.15, 1.7, 0.85], look: [1.2, 1.7, 0.55] },
};

const PANELS: Partial<Record<Focus, { title: string; lines: string[] }>> = {
  board: {
    title: "FILE // THE CORKBOARD",
    lines: [
      "Photo booth strips, polaroids, ticket stubs.",
      "Wife, daughter, and every good night out.",
      "The real reason I build things.",
    ],
  },
  decks: {
    title: "FILE // THE DECKS",
    lines: [
      "Two decks on the wall, zero kickflips landed this week.",
      "Skating taught me to fall, get up, and ship again.",
    ],
  },
  shelf: {
    title: "FILE // THE SHELF",
    lines: [
      "Fenway Park. World Series pennants. Mookie on the box.",
      "Figures, Funko, Kenny, and a very loyal Snoopy-bear.",
      "Red Sox till I die.",
    ],
  },
};

const LABELS: Record<Exclude<Focus, "room">, string> = {
  monitor: "USE COMPUTER",
  board: "INSPECT CORKBOARD",
  decks: "INSPECT DECKS",
  shelf: "INSPECT SHELF",
};

const WALL = "#c9b48e";

function srgb(...textures: Texture[]) {
  for (const t of textures) {
    t.colorSpace = SRGBColorSpace;
    t.anisotropy = 8;
  }
}

function deckGeometry(width: number, height: number) {
  const r = width / 2;
  const shape = new Shape();
  shape.moveTo(-r, -height / 2 + r);
  shape.lineTo(-r, height / 2 - r);
  shape.absarc(0, height / 2 - r, r, Math.PI, 0, true);
  shape.lineTo(r, -height / 2 + r);
  shape.absarc(0, -height / 2 + r, r, 0, Math.PI, true);
  const geo = new ShapeGeometry(shape, 24);
  const pos = geo.attributes.position;
  const uv = geo.attributes.uv;
  for (let i = 0; i < pos.count; i++) {
    uv.setXY(i, pos.getX(i) / width + 0.5, pos.getY(i) / height + 0.5);
  }
  return geo;
}

function Hotspot({
  id,
  hovered,
  setHovered,
  onSelect,
  labelAt,
  active,
  children,
}: {
  id: Exclude<Focus, "room">;
  hovered: Focus | null;
  setHovered: (f: Focus | null) => void;
  onSelect: (f: Focus) => void;
  labelAt: [number, number, number];
  active: boolean;
  children: ReactNode;
}) {
  const enabled = !active;
  return (
    <group
      onPointerOver={(e: ThreeEvent<PointerEvent>) => {
        if (!enabled) return;
        e.stopPropagation();
        setHovered(id);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        if (hovered === id) setHovered(null);
        document.body.style.cursor = "";
      }}
      onClick={(e: ThreeEvent<MouseEvent>) => {
        if (!enabled) return;
        e.stopPropagation();
        document.body.style.cursor = "";
        onSelect(id);
      }}
    >
      {children}
      {hovered === id && enabled && (
        <Html position={labelAt} center zIndexRange={[20, 0]}>
          <div className="pointer-events-none whitespace-nowrap border border-[#e8c66a]/60 bg-black/70 px-2 py-1 font-['JetBrains_Mono'] text-[10px] tracking-[0.25em] text-[#e8c66a]">
            [ {LABELS[id]} ]
          </div>
        </Html>
      )}
    </group>
  );
}

function Room({
  focus,
  setFocus,
  lightsOn,
  posts,
}: {
  focus: Focus;
  setFocus: (f: Focus) => void;
  lightsOn: boolean;
  posts: ScreenPost[];
}) {
  const [hovered, setHovered] = useState<Focus | null>(null);
  const [reaper, graffiti, cork, lanyards, shelfWall] = useTexture([
    "/room/tex/deck-reaper.jpg",
    "/room/tex/deck-graffiti.jpg",
    "/room/tex/corkboard.jpg",
    "/room/tex/lanyards.jpg",
    "/room/tex/shelf-wall.jpg",
  ]);
  srgb(reaper, graffiti, cork, lanyards, shelfWall);

  const deckGeo = useMemo(() => deckGeometry(0.21, 0.8), []);
  const lamp = useRef<PointLight>(null);
  const moon = useRef<SpotLight>(null);
  const glow = useRef<PointLight>(null);
  const level = useRef(0);
  const scene = useThree((s) => s.scene);

  useEffect(() => {
    const target = moon.current?.target;
    if (!target) return;
    target.position.set(0.4, 0.7, 0.6);
    scene.add(target);
    return () => {
      scene.remove(target);
    };
  }, [scene]);

  useFrame((_, dt) => {
    const target = lightsOn ? 1 : 0;
    level.current += (target - level.current) * (1 - Math.exp(-dt * 1.6));
    const flicker = lightsOn && level.current < 0.6 ? (Math.random() > 0.85 ? 0.3 : 1) : 1;
    const l = level.current * flicker;
    if (lamp.current) lamp.current.intensity = 2.6 * l;
    if (moon.current) moon.current.intensity = 6 * Math.max(0.35, l);
    if (glow.current) glow.current.intensity = 1.4 * l;
  });

  const hotspot = (id: Exclude<Focus, "room">) => ({
    id,
    hovered,
    setHovered,
    onSelect: setFocus,
    active: focus !== "room",
  });

  return (
    <group>
      <ambientLight intensity={0.06} color="#8090b0" />
      <pointLight
        ref={lamp}
        position={[-0.3, 2.25, 1.4]}
        color="#ffb070"
        distance={6}
        decay={1.6}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.002}
      />
      <spotLight
        ref={moon}
        position={[2.6, 2.3, 1.9]}
        angle={0.55}
        penumbra={0.9}
        color="#7f9cff"
        distance={7}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight ref={glow} position={[0.15, 1.0, 0.45]} color="#8fb4ff" distance={1.6} decay={2} />

      {/* floor, walls, ceiling */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0, 1.25]} receiveShadow>
        <planeGeometry args={[3.4, 2.6]} />
        <meshStandardMaterial color="#8a7d6c" roughness={1} />
      </mesh>
      <mesh position={[-0.2, 1.25, 0]} receiveShadow>
        <planeGeometry args={[2.8, 2.5]} />
        <meshStandardMaterial color={WALL} roughness={0.95} />
      </mesh>
      <mesh position={[1.2, 1.25, 1.25]} rotation-y={-Math.PI / 2} receiveShadow>
        <planeGeometry args={[2.5, 2.5]} />
        <meshStandardMaterial color={WALL} roughness={0.95} />
      </mesh>
      <mesh position={[-0.2, 2.5, 1.25]} rotation-x={Math.PI / 2}>
        <planeGeometry args={[2.8, 2.5]} />
        <meshStandardMaterial color="#b8a888" roughness={1} />
      </mesh>
      <mesh position={[-0.2, 0.05, 0.006]}>
        <boxGeometry args={[2.8, 0.1, 0.012]} />
        <meshStandardMaterial color="#e8e0d0" />
      </mesh>

      {/* window on the right wall */}
      <group position={[1.195, 1.5, 1.85]} rotation-y={-Math.PI / 2}>
        <mesh>
          <planeGeometry args={[0.95, 1.25]} />
          <meshBasicMaterial color="#20325c" toneMapped={false} />
        </mesh>
        <mesh position={[0, 0, 0.01]}>
          <boxGeometry args={[1.02, 1.32, 0.02]} />
          <meshStandardMaterial color="#e6e2da" transparent opacity={0.0} />
        </mesh>
        {[-0.5, 0.5].map((x) => (
          <mesh key={x} position={[x * 1.0, 0, 0.015]}>
            <boxGeometry args={[0.04, 1.32, 0.03]} />
            <meshStandardMaterial color="#e6e2da" />
          </mesh>
        ))}
        {[-0.65, 0.65].map((y) => (
          <mesh key={y} position={[0, y, 0.015]}>
            <boxGeometry args={[1.04, 0.04, 0.03]} />
            <meshStandardMaterial color="#e6e2da" />
          </mesh>
        ))}
        <mesh position={[0.18, 0.05, 0.04]}>
          <planeGeometry args={[0.55, 1.4]} />
          <meshStandardMaterial color="#d8d4ce" transparent opacity={0.72} roughness={1} />
        </mesh>
      </group>

      {/* desk */}
      <group position={[0.35, 0, 0.38]}>
        <RoundedBox args={[1.4, 0.03, 0.7]} radius={0.01} position={[0, 0.74, 0]} castShadow receiveShadow>
          <meshStandardMaterial color="#15161a" roughness={0.55} />
        </RoundedBox>
        {[-0.58, 0.58].map((x) => (
          <group key={x} position={[x, 0, 0]}>
            <mesh position={[0, 0.36, -0.05]} castShadow>
              <boxGeometry args={[0.07, 0.72, 0.05]} />
              <meshStandardMaterial color="#8d9096" metalness={0.6} roughness={0.4} />
            </mesh>
            <mesh position={[0, 0.015, 0]} castShadow>
              <boxGeometry args={[0.07, 0.03, 0.62]} />
              <meshStandardMaterial color="#8d9096" metalness={0.6} roughness={0.4} />
            </mesh>
          </group>
        ))}
        <mesh position={[0, 0.7, -0.05]}>
          <boxGeometry args={[1.12, 0.05, 0.08]} />
          <meshStandardMaterial color="#8d9096" metalness={0.6} roughness={0.4} />
        </mesh>
        <mesh position={[0.55, 0.725, 0.36]}>
          <boxGeometry args={[0.1, 0.02, 0.01]} />
          <meshBasicMaterial color="#4aa8ff" toneMapped={false} />
        </mesh>
      </group>

      {/* monitor */}
      <Hotspot {...hotspot("monitor")} labelAt={[0.15, 1.28, 0.22]}>
        <group position={[0.15, 0, 0.18]}>
          <RoundedBox args={[0.64, 0.38, 0.03]} radius={0.008} position={[0, 1.02, 0]} castShadow>
            <meshStandardMaterial color="#0c0c0e" roughness={0.4} />
          </RoundedBox>
          <mesh position={[0, 0.86, -0.02]}>
            <boxGeometry args={[0.05, 0.22, 0.03]} />
            <meshStandardMaterial color="#1a1a1d" />
          </mesh>
          <mesh position={[0, 0.76, 0]} castShadow>
            <boxGeometry args={[0.26, 0.012, 0.18]} />
            <meshStandardMaterial color="#1a1a1d" />
          </mesh>
          <mesh position={[0, 1.02, 0.0155]}>
            <planeGeometry args={[0.6, 0.35]} />
            <meshBasicMaterial color="#05070a" />
          </mesh>
          <Html
            transform
            distanceFactor={0.25}
            position={[0, 1.02, 0.017]}
            zIndexRange={[10, 0]}
          >
            {/* The HTML layer sits above the canvas, so it has to catch the room-view click itself. */}
            <div
              role="presentation"
              className={focus === "monitor" ? "" : "cursor-pointer"}
              onClick={() => focus === "room" && setFocus("monitor")}
              onPointerEnter={() => focus === "room" && setHovered("monitor")}
              onPointerLeave={() => setHovered(null)}
            >
              <div className={focus === "monitor" ? "" : "pointer-events-none"}>
                <ScreenOS powered={lightsOn} posts={posts} />
              </div>
            </div>
          </Html>
        </group>
      </Hotspot>

      {/* laptop on stand */}
      <group position={[0.68, 0.755, 0.3]} rotation-y={-0.25}>
        <mesh position={[0, 0.04, 0]} rotation-x={-0.2} castShadow>
          <boxGeometry args={[0.31, 0.012, 0.22]} />
          <meshStandardMaterial color="#9a9ca2" metalness={0.8} roughness={0.35} />
        </mesh>
        <mesh position={[0, 0.17, -0.12]} rotation-x={-0.15} castShadow>
          <boxGeometry args={[0.31, 0.21, 0.008]} />
          <meshStandardMaterial color="#9a9ca2" metalness={0.8} roughness={0.35} />
        </mesh>
        <mesh position={[0, 0.17, -0.115]} rotation-x={-0.15}>
          <planeGeometry args={[0.29, 0.19]} />
          <meshBasicMaterial color="#0d1424" />
        </mesh>
      </group>

      {/* xbox + controller */}
      <group position={[-0.24, 0.755, 0.22]}>
        <RoundedBox args={[0.15, 0.3, 0.15]} radius={0.008} position={[0, 0.15, 0]} castShadow>
          <meshStandardMaterial color="#121214" roughness={0.6} />
        </RoundedBox>
        <mesh position={[0, 0.301, 0]} rotation-x={-Math.PI / 2}>
          <circleGeometry args={[0.055, 32]} />
          <meshStandardMaterial color="#1c7a2e" emissive="#1c7a2e" emissiveIntensity={0.15} />
        </mesh>
        <RoundedBox args={[0.14, 0.04, 0.09]} radius={0.015} position={[0, 0.325, 0]} castShadow>
          <meshStandardMaterial color="#202024" roughness={0.5} />
        </RoundedBox>
      </group>

      {/* keyboard, wrist rest, mouse pad, mouse */}
      <group position={[0.15, 0.755, 0.5]} rotation-y={0.04}>
        <RoundedBox args={[0.44, 0.025, 0.14]} radius={0.006} castShadow>
          <meshStandardMaterial color="#1b1b1f" roughness={0.5} />
        </RoundedBox>
        <mesh position={[0, 0.014, 0]}>
          <boxGeometry args={[0.42, 0.004, 0.12]} />
          <meshStandardMaterial color="#3a3f4a" emissive="#7f9cff" emissiveIntensity={0.08} roughness={0.8} />
        </mesh>
        <RoundedBox args={[0.42, 0.02, 0.07]} radius={0.008} position={[0, 0, 0.11]}>
          <meshStandardMaterial color="#2a2a2e" roughness={0.9} />
        </RoundedBox>
      </group>
      <group position={[0.58, 0.757, 0.52]}>
        <mesh rotation-x={-Math.PI / 2}>
          <circleGeometry args={[0.11, 40]} />
          <meshStandardMaterial color="#c89aa8" roughness={0.9} />
        </mesh>
        <mesh position={[0, 0.015, 0]} scale={[0.7, 0.45, 1]}>
          <sphereGeometry args={[0.05, 24, 16]} />
          <meshStandardMaterial color="#8fe3b4" roughness={0.4} />
        </mesh>
      </group>

      {/* speaker + mic */}
      <group position={[-1.05, 0, 0.3]}>
        <mesh position={[0, 0.38, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.4, 0.76, 0.32]} />
          <meshStandardMaterial color="#8a5a2c" roughness={0.6} />
        </mesh>
        {[0.6, 0.42, 0.2].map((y, i) => (
          <mesh key={y} position={[0, y, 0.161]}>
            <circleGeometry args={[[0.045, 0.06, 0.12][i], 32]} />
            <meshStandardMaterial color="#141414" roughness={0.7} />
          </mesh>
        ))}
      </group>
      <group position={[0.92, 0.755, 0.2]}>
        <mesh position={[0, 0.18, 0]} castShadow>
          <cylinderGeometry args={[0.01, 0.01, 0.36, 8]} />
          <meshStandardMaterial color="#222" metalness={0.5} />
        </mesh>
        <mesh position={[0, 0.4, 0.02]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.14, 20]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.5} />
        </mesh>
      </group>

      {/* skate decks */}
      <Hotspot {...hotspot("decks")} labelAt={[-0.88, 2.05, 0.05]}>
        <mesh geometry={deckGeo} position={[-1.05, 1.6, 0.02]} rotation-z={0.02} castShadow>
          <meshStandardMaterial map={reaper} roughness={0.45} />
        </mesh>
        <mesh geometry={deckGeo} position={[-0.72, 1.58, 0.02]} rotation-z={-0.03} castShadow>
          <meshStandardMaterial map={graffiti} roughness={0.45} />
        </mesh>
      </Hotspot>

      {/* corkboard */}
      <Hotspot {...hotspot("board")} labelAt={[0.15, 2.32, 0.05]}>
        <mesh position={[0.15, 1.75, 0.008]} receiveShadow>
          <planeGeometry args={[0.9, 1.1]} />
          <meshStandardMaterial map={cork} roughness={0.95} />
        </mesh>
      </Hotspot>
      <mesh position={[0.83, 1.72, 0.008]} receiveShadow>
        <planeGeometry args={[0.36, 0.73]} />
        <meshStandardMaterial map={lanyards} roughness={0.95} />
      </mesh>

      {/* shelves, flag, poster */}
      <Hotspot {...hotspot("shelf")} labelAt={[1.12, 2.2, 0.55]}>
        <mesh position={[1.192, 1.75, 0.55]} rotation-y={-Math.PI / 2} receiveShadow>
          <planeGeometry args={[1.0, 1.4]} />
          <meshStandardMaterial map={shelfWall} roughness={0.9} />
        </mesh>
        {[
          { y: 1.99, z0: 0.05, z1: 0.57 },
          { y: 1.83, z0: 0.57, z1: 1.05 },
          { y: 1.65, z0: 0.05, z1: 0.52 },
          { y: 1.47, z0: 0.6, z1: 1.0 },
        ].map((s) => (
          <mesh key={s.y} position={[1.12, s.y, (s.z0 + s.z1) / 2]} castShadow receiveShadow>
            <boxGeometry args={[0.15, 0.02, s.z1 - s.z0]} />
            <meshStandardMaterial color="#141416" roughness={0.6} />
          </mesh>
        ))}
      </Hotspot>
    </group>
  );
}

function CameraRig({ focus }: { focus: Focus }) {
  const { camera, pointer } = useThree();
  const look = useRef(new Vector3(...SHOTS.room.look));
  const eye = useMemo(() => new Vector3(), []);
  const aim = useMemo(() => new Vector3(), []);

  useFrame((_, dt) => {
    const shot = SHOTS[focus];
    const sway = focus === "room" ? 1 : 0;
    eye.set(...shot.eye).add(new Vector3(pointer.x * 0.35 * sway, pointer.y * 0.18 * sway, 0));
    aim.set(...shot.look).add(new Vector3(pointer.x * 0.12 * sway, pointer.y * 0.08 * sway, 0));
    const k = 1 - Math.exp(-dt * 2.6);
    camera.position.lerp(eye, k);
    look.current.lerp(aim, k);
    camera.lookAt(look.current);
  });

  return null;
}

function Ready({ onReady }: { onReady: () => void }) {
  useEffect(() => {
    const t = setTimeout(onReady, 700);
    return () => clearTimeout(t);
  }, [onReady]);
  return null;
}

export function RoomScene({ posts }: { posts: ScreenPost[] }) {
  const [focus, setFocus] = useState<Focus>("room");
  const [loaded, setLoaded] = useState(false);
  const [lightsOn, setLightsOn] = useState(false);
  const [muted, setMuted] = useState(true);
  const ambience = useRef<Ambience | null>(null);
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () =>
      setTime(new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const t = setTimeout(() => setLightsOn(true), 900);
    return () => clearTimeout(t);
  }, [loaded]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFocus("room");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => () => ambience.current?.dispose(), []);

  const toggleSound = () => {
    if (!ambience.current) ambience.current = startAmbience();
    const next = !muted;
    ambience.current.setMuted(next);
    setMuted(next);
  };

  const panel = PANELS[focus];

  return (
    <div className="relative h-full w-full bg-black">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: SHOTS.room.eye, fov: 42, near: 0.02, far: 20 }}
        gl={{ antialias: true, toneMapping: ACESFilmicToneMapping, toneMappingExposure: 1.05 }}
        onPointerMissed={() =>
          setFocus((f) => (f === "monitor" || f === "room" ? f : "room"))
        }
      >
        <color attach="background" args={["#050608"]} />
        <fog attach="fog" args={["#050608", 3.6, 6.5]} />
        <Suspense fallback={null}>
          <Room focus={focus} setFocus={setFocus} lightsOn={lightsOn} posts={posts} />
          <Ready onReady={() => setLoaded(true)} />
        </Suspense>
        <CameraRig focus={focus} />
        <EffectComposer multisampling={4}>
          <Bloom mipmapBlur luminanceThreshold={0.55} intensity={0.7} radius={0.7} />
          <Noise opacity={0.07} />
          <Vignette offset={0.22} darkness={0.85} />
        </EffectComposer>
      </Canvas>

      <div
        className={`pointer-events-none absolute inset-0 flex items-center justify-center bg-black transition-opacity duration-[1500ms] ${
          lightsOn ? "opacity-0" : "opacity-100"
        }`}
      >
        <span className="font-['JetBrains_Mono'] text-[12px] tracking-[0.35em] text-[#e8c66a]/80">
          FINDING THE LIGHT SWITCH…
        </span>
      </div>

      <button
        type="button"
        onClick={toggleSound}
        aria-pressed={!muted}
        className="absolute left-4 top-4 border border-[#e8c66a]/50 px-2 py-1 font-['JetBrains_Mono'] text-[10px] tracking-[0.2em] text-[#e8c66a] hover:bg-[#e8c66a]/10"
      >
        {muted ? "SOUND OFF" : "SOUND ON"}
      </button>

      <div
        className={`pointer-events-none absolute bottom-6 left-6 font-['JetBrains_Mono'] text-[11px] leading-5 tracking-[0.25em] text-[#e8c66a]/80 transition-opacity duration-700 ${
          focus === "room" && lightsOn ? "opacity-100" : "opacity-0"
        }`}
      >
        <div>MILTON&apos;S CORNER</div>
        <div>LAS VEGAS, NV // {time.toUpperCase()}</div>
      </div>

      {focus !== "room" && (
        <button
          type="button"
          onClick={() => setFocus("room")}
          className="absolute right-4 top-4 border border-[#e8c66a]/50 bg-black/60 px-3 py-1 font-['JetBrains_Mono'] text-[10px] tracking-[0.2em] text-[#e8c66a] hover:bg-[#e8c66a]/10"
        >
          ESC TO STEP BACK
        </button>
      )}

      {panel && (
        <div className="absolute bottom-6 right-6 max-w-sm border border-[#e8c66a]/40 bg-black/75 p-5 font-['JetBrains_Mono'] text-[12px] leading-6 text-[#e8d9b0] backdrop-blur-sm">
          <div className="mb-3 tracking-[0.25em] text-[#e8c66a]">{panel.title}</div>
          {panel.lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      )}

      <a
        href="/"
        className="absolute bottom-6 right-6 font-['JetBrains_Mono'] text-[10px] tracking-[0.2em] text-[#e8c66a]/60 hover:text-[#e8c66a]"
        style={{ display: panel ? "none" : undefined }}
      >
        CLASSIC SITE →
      </a>
    </div>
  );
}
