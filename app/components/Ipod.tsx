import { useEffect, useRef, useState } from "react";

type Track = {
  title: string;
  artist: string;
  src: string;
  art: string;
};

const files = [
  "Nirvana - Smells Like Teen Spirit (Official Music Video).mp3",
  "Soundgarden - Black Hole Sun.mp3",
  "Alice In Chains - Would_ (Official HD Video).mp3",
  "The Smashing Pumpkins - 1979 (Official Music Video).mp3",
  "Deftones - Be Quiet And Drive (Far Away) (Official Video) [HD Remaster].mp3",
  "Incubus - Drive.mp3",
  "Chevelle - Send the Pain Below (Official HD Video).mp3",
  "Puddle Of Mudd - Blurry (Official Music Video).mp3",
  "Three Days Grace - Never Too Late.mp3",
];

const covers = [
  "/music/covers/nirvana.jpg",
  "/music/covers/soundgarden.jpg",
  "/music/covers/alice-in-chains.jpg",
  "/music/covers/pumpkins.jpg",
  "/music/covers/deftones.jpg",
  "/music/covers/incubus.jpg",
  "/music/covers/chevelle.jpg",
  "/music/covers/puddle-of-mudd.jpg",
  "/music/covers/three-days-grace.jpg",
];

function cleanTitle(name: string) {
  return name
    .replace(/\s*\([^)]*(?:official|video|hd)[^)]*\)/gi, "")
    .replace(/\s*\[[^\]]*\]/g, "")
    .replace(/_$/g, "?")
    .trim();
}

const tracks: Track[] = files.map((file, index) => {
  const base = file.replace(/\.mp3$/i, "");
  const split = base.indexOf(" - ");
  const artist = split === -1 ? "Unknown" : base.slice(0, split);
  const title = cleanTitle(split === -1 ? base : base.slice(split + 3));
  return { title, artist, src: `/music/${encodeURIComponent(file)}`, art: covers[index] };
});

function formatTime(seconds: number) {
  const safe = Math.max(0, Math.floor(seconds));
  const m = Math.floor(safe / 60);
  const s = safe % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function Ipod() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [screen, setScreen] = useState<"menu" | "now">("now");
  const [menuIndex, setMenuIndex] = useState(0);
  const wheelRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const drag = useRef({ active: false, last: 0, accum: 0, moved: false });
  const [duration, setDuration] = useState(0);

  const track = tracks[index];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      void audio.play().catch(() => setPlaying(false));
    } else {
      audio.pause();
    }
  }, [playing, track.src]);

  const go = (delta: number) => {
    setIndex((i) => (i + delta + tracks.length) % tracks.length);
    setTime(0);
    setScreen("now");
    setPlaying(true);
  };

  const seek = (next: number) => {
    const audio = audioRef.current;
    const max = audio?.duration && Number.isFinite(audio.duration) ? audio.duration : duration;
    const value = Math.min(max || 0, Math.max(0, next));
    if (audio) audio.currentTime = value;
    setTime(value);
  };

  const angleFromEvent = (event: React.PointerEvent) => {
    const node = wheelRef.current;
    if (!node) return 0;
    const rect = node.getBoundingClientRect();
    const x = event.clientX - (rect.left + rect.width / 2);
    const y = event.clientY - (rect.top + rect.height / 2);
    return { x, y, angle: Math.atan2(y, x), radius: Math.hypot(x, y), limit: rect.width / 2 };
  };

  const onWheelDown = (event: React.PointerEvent) => {
    const point = angleFromEvent(event);
    drag.current = { active: true, last: point.angle, accum: 0, moved: false };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onWheelMove = (event: React.PointerEvent) => {
    if (!drag.current.active) return;
    const point = angleFromEvent(event);
    let delta = point.angle - drag.current.last;
    if (delta > Math.PI) delta -= Math.PI * 2;
    if (delta < -Math.PI) delta += Math.PI * 2;
    drag.current.last = point.angle;
    drag.current.accum += delta;
    if (Math.abs(delta) > 0.08) drag.current.moved = true;
    const step = 0.45;
    if (Math.abs(drag.current.accum) < step) return;
    const direction = drag.current.accum > 0 ? 1 : -1;
    drag.current.accum = 0;
    if (screen === "menu") {
      setMenuIndex((i) => (i + direction + tracks.length) % tracks.length);
      return;
    }
    const audio = audioRef.current;
    seek((audio?.currentTime ?? 0) + direction * 4);
  };

  const onWheelUp = (event: React.PointerEvent) => {
    if (!drag.current.active) return;
    const point = angleFromEvent(event);
    drag.current.active = false;
    if (drag.current.moved || point.radius > point.limit) return;

    if (point.radius < point.limit * 0.42) {
      if (screen === "menu") {
        setIndex(menuIndex);
        setTime(0);
        setScreen("now");
        setPlaying(true);
      } else {
        setPlaying((value) => !value);
      }
      return;
    }

    const deg = (point.angle * 180) / Math.PI;
    if (deg < -45 && deg > -135) {
      setScreen("menu");
      setMenuIndex(index);
      return;
    }
    if (deg > 45 && deg < 135) {
      setPlaying((value) => !value);
      setScreen("now");
      return;
    }
    if (Math.abs(deg) >= 135) go(-1);
    else go(1);
  };

  const progress = duration ? time / duration : 0;

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="relative h-full max-w-full" style={{ aspectRatio: "682 / 1024" }}>
        <img src="/about/ipod.png" alt="" className="pointer-events-none h-full w-full select-none" draggable={false} />
        <audio
          ref={audioRef}
          src={track.src}
          preload="metadata"
          onLoadedMetadata={(event) => setDuration(event.currentTarget.duration || 0)}
          onTimeUpdate={(event) => setTime(event.currentTarget.currentTime)}
          onEnded={() => go(1)}
        />

        <div
          className="absolute overflow-hidden bg-black text-white"
          style={{ left: "24.2%", top: "4.5%", width: "51.6%", height: "46.2%" }}
        >
          <div className="flex items-center justify-between bg-[#1a1a1a] px-[6%] py-[2%] text-[9px] leading-none">
            <span className="w-4" />
            <span className="font-semibold tracking-tight">{screen === "menu" ? "Music" : "Now Playing"}</span>
            <span className="flex items-center gap-1 text-[8px]">
              {playing && screen === "now" ? "▶" : ""}
              <span className="inline-block h-[7px] w-[14px] rounded-[2px] border border-white/80">
                <span className="block h-full w-[70%] bg-white/80" />
              </span>
            </span>
          </div>

          {screen === "menu" ? (
            <ul className="h-[calc(100%-18px)] overflow-y-auto bg-gradient-to-b from-[#e7eef6] to-[#b7cbe4] text-black">
              {tracks.map((item, itemIndex) => (
                <li key={item.title}>
                  <button
                    type="button"
                    className={`flex w-full items-center justify-between px-[6%] py-[4%] text-left text-[10px] leading-tight ${
                      itemIndex === menuIndex ? "bg-[#2f6fed] text-white" : "hover:bg-white/40"
                    }`}
                    onClick={() => {
                      setMenuIndex(itemIndex);
                      setIndex(itemIndex);
                      setTime(0);
                      setScreen("now");
                      setPlaying(true);
                    }}
                  >
                    <span className="truncate">{item.title}</span>
                    <span aria-hidden="true">›</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex h-[calc(100%-18px)] flex-col">
              <div className="relative min-h-0 flex-1 bg-black">
                <img src={track.art} alt="" className="h-full w-full object-cover" />
              </div>
              <div className="bg-black px-[5%] pb-[4%] pt-[3%]">
                <p className="truncate text-center text-[11px] font-semibold leading-tight">{track.title}</p>
                <p className="truncate text-center text-[9px] leading-tight text-white/80">{track.artist}</p>
                <div className="mt-[4%] flex items-center gap-1 text-[8px] leading-none text-white/80">
                  <span>{formatTime(time)}</span>
                  <span className="relative h-[3px] flex-1 bg-white/35">
                    <span className="absolute inset-y-0 left-0 bg-[#7eb6ff]" style={{ width: `${progress * 100}%` }} />
                  </span>
                  <span>-{formatTime(duration - time)}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div
          ref={wheelRef}
          className="absolute cursor-pointer rounded-full"
          style={{ left: "26.7%", top: "59.2%", width: "46.3%", height: "31.1%" }}
          onPointerDown={onWheelDown}
          onPointerMove={onWheelMove}
          onPointerUp={onWheelUp}
          onPointerCancel={onWheelUp}
          aria-label="Click wheel"
        />
      </div>
    </div>
  );
}
