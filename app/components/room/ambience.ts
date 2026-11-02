export type Ambience = { setMuted: (muted: boolean) => void; dispose: () => void };

// Browsers block audio until a user gesture, so call this from a click handler.
export function startAmbience(): Ambience {
  const ctx = new AudioContext();
  const master = ctx.createGain();
  master.gain.value = 0;
  master.connect(ctx.destination);

  const seconds = 4;
  const buffer = ctx.createBuffer(1, ctx.sampleRate * seconds, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  let last = 0;
  for (let i = 0; i < data.length; i++) {
    const white = Math.random() * 2 - 1;
    last = (last + 0.02 * white) / 1.02;
    data[i] = last * 3.5;
    if (Math.random() < 0.0004) data[i] += (Math.random() - 0.5) * 0.6;
  }

  const hum = ctx.createBufferSource();
  hum.buffer = buffer;
  hum.loop = true;
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 900;
  hum.connect(filter).connect(master);
  hum.start();

  const tone = ctx.createOscillator();
  tone.frequency.value = 60;
  const toneGain = ctx.createGain();
  toneGain.gain.value = 0.015;
  tone.connect(toneGain).connect(master);
  tone.start();

  const setMuted = (muted: boolean) => {
    void ctx.resume();
    master.gain.setTargetAtTime(muted ? 0 : 0.35, ctx.currentTime, 0.4);
  };

  return {
    setMuted,
    dispose: () => {
      hum.stop();
      tone.stop();
      void ctx.close();
    },
  };
}
