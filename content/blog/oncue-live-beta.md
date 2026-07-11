---
title: "I built OnCue Live because streaming shouldn't cost you another $200"
description: "How I went from a frustrated OBS setup to a native Mac control surface beta in two weeks, and why I'm releasing it early for real streamers to break."
date: "2026-07-10"
modified: "2026-07-10"
published: true
category: "product"
tags: ["obs", "streaming", "swiftui", "macos", "build-in-public", "beta"]
readTime: "12 min read"
youtube: "https://www.youtube.com/watch?v=VIDEO_ID"
---

I got into streaming and pretty quickly hit the same wall a lot of new creators hit: it's not just "press Go Live."

You're managing scenes, your mic, recording, sources, other apps, all while trying to actually be on camera. And if you want that satisfying, fast control feeling? A physical stream deck is great. It's also another $150–250 on top of everything else you already bought to get started.

I didn't want to spend that yet. I already had a Mac and a keyboard. So I asked a simple question:

**Could I build a polished desktop control surface that gives me the good parts of a hardware deck, without buying one?**

That's how **OnCue Live** started. This post walks through the problem, what I built, how I built it, what broke, and why I'm putting a beta in real streamers' hands instead of overbuilding in private.

---

## See it in action

> **Video walkthrough:** updating this post with a full demo. The embed will sit at the top once the recording is live.

> **Screen recording:** connect OBS → switch scene → mute → go live. Adding a short capture here so you can see the workflow without reading every section.

*Screenshot: OnCue Live control grid with live / recording / mute states visible.*

*Screenshot: OBS WebSocket setup flow (enable → connect → connected).*

---

## The problem

Every time I sat down to stream, I'd bounce between OBS windows, try to remember which shortcut was mute vs. scene switch, and lose visual feedback on whether I was live, recording, or muted.

Keyboard shortcuts work until they don't. You forget them mid-stream. There's no glow, no obvious state, no "oh yeah I'm definitely live right now" feeling.

A lot of software alternatives put the remote on your phone or in a browser tab. That's another device to manage while you're already doing ten things.

I wanted something **desktop-native**, **visual**, and **focused** on the handful of moments that actually matter during a stream.

| Approach | Pros | Where it fell short for me |
|----------|------|---------------------------|
| OBS shortcuts | Fast once memorized | Easy to forget, no visual state |
| Phone/browser remote | No extra hardware | Another screen to manage |
| Hardware deck | Tactile, reliable | Cost for beginners |
| Complex production software | Powerful | Overkill when you need core controls |

I'm not saying hardware decks are bad. For someone just starting, the cost-to-value on a dedicated controller is hard to justify before you know if you'll stick with streaming.

---

## What I built

**OnCue Live** is a native macOS control surface for OBS. One job done well: give you fast, visual control over the moments that matter, without buying dedicated hardware.

The beta focuses on:

- Scene switching
- Start/stop streaming and recording
- Mute and source toggles
- Global keyboard shortcuts
- Custom labels, colors, and actions
- OBS inventory scan → generated starter layouts
- Stream-prep checklist before going live
- Profiles/layouts with import and export
- Tactile visual states and optional click sounds

Everything else is phase two.

---

## How I built it

### June 27: Electron prototype (prove the idea fast)

I kicked off the first version as a digital control deck: realistic controls, keyboard bindings, real OBS actions.

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

That prototype answered the important question: **yes, these controls can trigger real OBS actions, and the visual surface can feel satisfying.**

*Screenshot: Electron / Three.js prototype vs. SwiftUI native build.*

### Why I rebuilt in SwiftUI (not Electron)

The prototype was never the finish line. Streamers live in desktop apps. I wanted:

- **Native macOS feel:** menus, permissions, window behavior
- **Reliable global shortcuts:** Accessibility APIs done right
- **Less overhead:** no Electron shell running alongside OBS
- **A codebase I could ship:** not a prototype I'd be afraid to hand someone

So I rebuilt in Xcode with Swift and SwiftUI and tested against my actual OBS setup.

The loop was intentionally boring in a good way:

1. Build a control
2. Wire it to OBS
3. Run a real workflow
4. Fix whatever felt unclear
5. Repeat

**Build progression:** June 27, 2026 (Electron + Three.js proof) → July 2026 (SwiftUI macOS rebuild) → July 10, 2026 (beta distribution workflow).

---

## How OBS WebSocket fits in

OnCue Live talks to OBS over **WebSocket**. Rough flow:

1. You enable the OBS WebSocket server (built into modern OBS)
2. OnCue connects with host/port/password
3. The app scans your OBS inventory: scenes, sources, audio inputs
4. It generates a starter layout from what you actually have
5. You tap a control (or hit a global shortcut) → action fires in OBS
6. OBS sends state back → the UI updates (live, recording, mute, etc.)

If step 1–2 is confusing, nothing else matters. The beta optimizes hard for: **enable WebSocket → connect → see your inventory → get a starter layout.**

The moments I actually care about mid-stream: switch scene, mute, record, go live. If those are one tap with obvious visual feedback, the product is doing its job.

---

## What broke along the way

A few things that weren't obvious until I used it during real prep:

- **State sync:** OBS and the UI had to agree on live/rec/mute. Stale state is worse than no app.
- **Starter layouts:** a generated grid that doesn't match your show is worse than a blank slate. Inventory scan quality mattered.
- **Global shortcuts:** macOS Accessibility permission is a real step. Can't hand-wave it.
- **Shortcut conflicts:** system and app shortcuts competing caused weird double-fires until I tightened the binding logic.

None of this showed up in a slide deck. It showed up when I tried to run a stream.

---

## What I'm intentionally not building (yet)

Being straight about v1:

- **Twitch, Kick, YouTube, Discord, Spotify:** foundations exist in the repo, but this beta is **OBS-first** unless verified in your exact build
- **Not a Stream Deck killer:** hardware is great for plenty of creators. This is for testing a desktop workflow before spending hundreds on gear
- **macOS-first:** not cross-platform in this beta
- **Not "every production feature":** no pretending one app replaces your entire stack on day one

Working software plus honest scope beats a huge untested roadmap.

---

## Building in public

> **Tweet / thread:** adding the post I shared about vibe-coding a product at work, pitching it to my VP, and getting exec feedback. That's a different story than OBS controls, but it's part of why I trust the "build small, prove it, ship it" loop.

The short version: I don't think you need permission to prove an idea. Build the smallest useful version, put it in front of real people, let the feedback decide what's next.

---

## What I'd do differently

If I started over knowing what I know now:

- **Go native sooner:** the Electron prototype was worth it for speed, but I'd cap it at 1–2 weeks max before committing to SwiftUI
- **Test with one messy real OBS setup earlier:** not a clean demo scene. Real mic routing, real browser sources, real chaos
- **Ship the beta invite flow on day one:** even a Google Form beats "I'll invite people later"
- **Record demos as I build:** writing this post reminded me how much harder it is to reconstruct the story after the fact

---

## Try the beta

If you stream on macOS with OBS and want to test an early build, I want to hear from you.

> **Apple beta link:** dropping the public TestFlight / App Store link here once it's live.

Until then, email **[milton@blurrdstudio.com](mailto:milton@blurrdstudio.com)** and I'll get you set up.

Try it on a **real workflow**, not just a sandbox. Tell me:

- Where it helps
- Where it breaks
- What you'd need before trusting it during an actual stream

### Questions I'm especially curious about

- Was connecting OnCue Live to OBS clear?
- Which controls did you add first?
- Did the starter layout match your setup?
- Did it reduce how often you went back to OBS?
- Were live / recording / mute states visually obvious?
- Would you use this instead of buying hardware? Why or why not?

---

## If you're building something similar

- **Start with the workflow you actually have**, not the platform you wish you had
- **Prototype to answer one question**, then rebuild in the right runtime
- **Ship the core** before you narrate a five-year vision
- **Beta is a learning tool**, not a marketing finish line
- **Write it down while it's fresh:** future you (and future employers) will thank you

---

## Closing

I built OnCue Live because I wanted it for my own OBS setup. I wanted to know if that problem is shared before I overbuilt it.

This beta isn't the finish line. It's how I find out whether a Mac-native control surface actually makes streaming easier for more than just me.

If that's you, test it and be brutally honest. That's more valuable to me than hype right now.

-BLURRD
