---
title: "I built OnCue Live because streaming shouldn't cost you another $200"
description: "How I went from a frustrated OBS setup to a native Mac control surface beta in two weeks — and why I'm releasing it early for real streamers to break."
date: "2026-07-10"
modified: "2026-07-10"
published: true
category: "product"
tags: ["obs", "streaming", "swiftui", "macos", "build-in-public", "beta"]
readTime: "8 min read"
---

I got into streaming and pretty quickly hit the same wall a lot of new creators hit: it's not just "press Go Live."

You're managing scenes, your mic, recording, sources, other apps — all while trying to actually be on camera. And if you want that satisfying, fast control feeling? A physical stream deck is great. It's also another $150–250 on top of everything else you already bought to get started.

I didn't want to spend that yet. I already had a Mac and a keyboard. So I asked a simple question:

**Could I build a polished desktop control surface that gives me the good parts of a hardware deck — without buying one?**

That's how **OnCue Live** started. And this post is the honest story of building the smallest useful version, testing it on my own OBS setup, and putting out a beta to see if it solves the same problem for other streamers.

## The moment I knew something was off

Every time I sat down to stream, I'd bounce between OBS windows, try to remember which shortcut was mute vs. scene switch, and lose visual feedback on whether I was live, recording, or muted.

Keyboard shortcuts work — until they don't. You forget them mid-stream. There's no glow, no obvious state, no "oh yeah I'm definitely live right now" feeling.

And the software alternatives? A lot of them put the remote on your phone or in a browser tab. That's another device to manage while you're already doing ten things.

I wanted something **desktop-native**, **visual**, and **focused** on the handful of moments that actually matter during a stream.

## Why the existing options didn't fully click

Here's how I was thinking about it:

| Approach | Pros | Where it fell short for me |
|----------|------|---------------------------|
| OBS shortcuts | Fast once memorized | Easy to forget, no visual state |
| Phone/browser remote | No extra hardware | Another screen to manage |
| Hardware deck | Tactile, reliable | Cost for beginners |
| Complex production software | Powerful | Overkill when you need core controls |

The pattern I kept coming back to: shortcuts are fast but invisible, phone remotes add another device, hardware adds cost, and heavy production software is more than most new streamers need for core controls. I wanted a **desktop-native surface on the Mac I already own**.

I'm not saying hardware decks are bad. I frame it differently: **for someone just starting, the cost-to-value on a dedicated controller is hard to justify before you even know if you'll stick with streaming.**

## The smallest version worth testing

I could've tried to build the ultimate live production platform on day one. Twitch, Kick, YouTube, Discord, Spotify — all of it.

But that's not how you learn what actually matters.

I narrowed to one bet:

> A Mac-native, visual control surface for **OBS** — fast scene switching, mute, record, go live, and the other core actions — customizable without a fixed hardware grid.

Everything else is phase two until the core proves itself.

## Building it fast: prototype to native app

### June 27 — proving the idea

On **June 27, 2026**, I kicked off the first prototype: a digital control deck for OBS with realistic controls and keyboard bindings.

Stack:

- Electron + React + TypeScript
- Three.js for a 3D tactile surface (depth, glow, click sounds)
- OBS WebSocket for live actions
- Global keyboard shortcuts
- JSON config for controls and settings

```json
{
  "id": "scene-main",
  "label": "Main",
  "action": "obs.scene.set",
  "payload": { "sceneName": "Main Cam" },
  "shortcut": "Command+1",
  "color": "#6975f8"
}
```

That prototype wasn't the final product — but it answered the important question fast: **yes, these controls can trigger real OBS actions, and the visual surface can feel satisfying.**

### Rebuilding native in SwiftUI

The prototype got me confidence. The beta needed to live where streamers already work: **a real macOS app.**

So I rebuilt in Xcode with Swift and SwiftUI and tested against my actual OBS setup. The loop was intentionally boring in a good way:

1. Build a control
2. Wire it to OBS
3. Run a real workflow
4. Fix whatever felt unclear
5. Repeat

**Build progression:** June 27, 2026 — Electron + Three.js proof → July 2026 — SwiftUI macOS rebuild → July 10, 2026 — beta distribution workflow.

By **July 10**, this wasn't a slide deck idea anymore — it was an archive-and-ship beta workflow. Rapid build, not a claim that the long-term product is finished.

## What works in the beta

Here's what the current build supports. OBS is the core — other integrations exist in the repo as foundations but aren't the focus of this beta unless verified in your distributed build:

- Native macOS app (SwiftUI)
- OBS WebSocket connection + setup flow
- Scene switching
- Start/stop streaming and recording
- Mute controls and source toggles
- Global keyboard shortcuts
- Custom labels, colors, and actions
- OBS inventory scan → generated starter layouts
- Stream-prep checklist before going live
- Profiles/layouts with import and export
- Tactile visual states + optional click sounds

**How it connects:** OnCue Live talks to OBS over WebSocket, listens for state changes coming back, and can fire actions through global macOS shortcuts when you need hands-on-keyboard speed.

### Setup should feel obvious

Connecting to OBS is the first real test. If that's confusing, nothing else matters. The beta optimizes for: enable WebSocket → connect → see your inventory → get a starter layout.

### The controls I actually use

The moments that matter: switch scene, mute, record, go live. If those are one tap (or one shortcut) with obvious visual feedback, the product is doing its job.

## What's intentionally unfinished

Being straight about this:

- **Twitch, Kick, YouTube, Discord, Spotify** integrations are future work unless they're verified in the exact beta you're running. The repo has provider foundations — the beta story is **OBS-first.**
- This is **not** a "Stream Deck killer" pitch. Hardware is great for a lot of creators. This is for people who want to test a desktop workflow **before** spending hundreds on dedicated gear.
- It's **macOS-first**. Not cross-platform in this beta.
- It's **early**. You'll find rough edges. That's the point.

## Why I'm releasing a beta now

Personal testing proved the controls *can* work. It didn't prove they work for **your** OBS setup, your scenes, your mic routing, your habits mid-stream.

Only other streamers can answer:

- Was setup clear?
- Did the generated layout match your inventory?
- Did you stop living in the OBS window?
- Were live / recording / mute states obvious?
- What one missing action would make this a must-use every stream?

Working software plus honest feedback beats a huge untested roadmap right now.

## I need macOS OBS testers

If you stream on a Mac with OBS and you're down to try an early build — I want to hear from you.

Try it on a real workflow, not just a sandbox. Tell me:

- Where it helps
- Where it breaks
- What you'd need before trusting it during an actual stream

**Email me at [milton@blurrdstudio.com](mailto:milton@blurrdstudio.com)** and I'll get you set up with the beta.

Questions I'm especially curious about:

- Was connecting OnCue Live to OBS clear?
- Which controls did you add first?
- Did the starter layout match your setup?
- Did it reduce how often you went back to OBS?
- Would you use this instead of buying hardware? Why or why not?

## What I'd tell another dev building something similar

- **Start with the workflow you actually have**, not the platform you wish you had.
- **Prototype to answer one question**, then rebuild in the right runtime (for me: native macOS).
- **Ship the core** before you narrate a five-year roadmap.
- **Beta is a learning tool**, not a marketing finish line.

## Closing

I built OnCue Live because I wanted it for my own OBS setup — and I wanted to know if that problem is shared before I overbuilt it.

This beta isn't the finish line. It's how I find out whether a Mac-native control surface actually makes streaming easier for more than just me.

If that's you, test it and be brutally honest. That's more valuable to me than hype right now.

— Milton
