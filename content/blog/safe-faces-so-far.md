---
title: "Building Safe Faces so parents can post online without the worry"
description: "Status on Safe Faces — an on-device iOS app that blurs faces before you post, how we're testing it, and what's next."
date: "2026-07-29"
modified: "2026-07-29"
published: true
category: "product"
tags: ["ios", "swiftui", "vision", "privacy", "testflight", "safe-faces"]
readTime: "7 min read"
---

I built Safe Faces for one reason: parents should be able to post online without that little pause before they hit share.

You know the one. Birthday party. First day of school. Team photo. The moment is good, then you start scanning faces that aren't yours, wondering if this should really go on Instagram, Facebook, the school page, wherever.

That's the problem. Not "never share again." Just: cover the faces you don't want public, keep the ones you do, and post.

## Why this matters

Public posts travel. Screenshots happen. Group photos include kids you didn't get permission for. And once a face is out there, it's hard to pull back.

Kids also don't get a real say yet. Someday they will. Until then, parents should have a simple way to decide what leaves looking identifiable.

Safe Faces is that tool. Blur first. Decide second. Post.

> Post the memory. Not their face.

## What it does so far

Safe Faces is an iPhone / iPad app (currently iOS 18.5+) that:

- Finds faces in photos and videos
- Blurs them by default
- Lets you tap to uncover specific faces
- Strips location / device metadata on export
- Runs entirely on-device. No account, no upload, no analytics SDK

Photos already have style options (mosaic, blur, black bar, emoji, shapes). Video tracking works, with mosaic as the current export style. There's also an in-app camera so you can shoot and cover in one flow.

**[safefaces.xyz](https://www.safefaces.xyz/)** is the landing page. It points at TestFlight. The product is the phone. The site is just how people find it.

## The tech (short version)

Apple stack only on purpose:

- **SwiftUI** for the UI
- **Vision** for face detection and tracking
- **AVFoundation** for capture, custom video composition, and export
- **Core Image** for masks and blur
- **No third-party SDKs**

Video path in plain English:

1. Track faces across the clip
2. Build a composition that blurs per frame
3. Preview / export
4. Block export if coverage looks unsafe

That last one matters. I'd rather fail an export than ship a "success" with a face still showing.

Landing page side is Next.js + Tailwind under `/web`, with brand colors matched to the app theme.

## How we're testing it

Three layers:

**Automated.** Swift tests around the privacy contracts — blur everyone by default, respect faces you uncover, keep manual blur regions in, interpolate tracking samples without inventing faces across big gaps.

**Export gate.** Before a video finishes exporting, coverage validation can stop the whole job if a face looks exposed.

**Real life.** Open TestFlight. I'm watching for:

- birthday / team / classroom group photos
- kids moving, turning, hands over faces
- "blur everyone except mine"
- missed faces, ghost blurs, weird orientation

Unit tests catch logic. TestFlight catches childhood chaos.

**Landing page:** [safefaces.xyz](https://www.safefaces.xyz/)

**TestFlight:** [Join the Safe Faces beta](https://testflight.apple.com/join/Uv7xJrkp)

## Goal of the project

Make posting feel normal again for parents, teachers, coaches, and youth orgs — without turning kids' faces into permanent public IDs.

Warm UI. Safe by default. Blue = covered, red = exposed. Two taps, then share.

Everything stays on the device. That's not a feature bullet. That's the product.

## Next steps

1. Video blur styles catching up to photos
2. Finish unfinished Settings / sticker stubs honestly (no fake "done")
3. Harden hard clips — crowds, tiny faces, occlusions
4. Keep TestFlight feedback coming
5. App Store once export reliability feels boring
6. Landing polish on [safefaces.xyz](https://www.safefaces.xyz/) — real contact email, share image, clean CTA

## What I learned so far

- Defaults matter more than feature lists. Blur everyone first.
- A hard fail on export is better than a soft miss.
- Don't shame parents for posting. Help them post with control.
- Keep marketing honest to what ships. Video mosaic-only for now is fine to say out loud.

## Closing

Still beta. It'll miss sometimes. That's why TestFlight exists. Break it on real family footage and tell me where.

If you post kids online and hate that pre-share pause, try it:

- **[Join the beta on TestFlight](https://testflight.apple.com/join/Uv7xJrkp)**
- **[safefaces.xyz](https://www.safefaces.xyz/)**

Cover what needs covering. Keep what you want. Then post.

-BLURRD
