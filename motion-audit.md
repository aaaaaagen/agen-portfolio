# Keychain Motion Audit

## Sources

- Current implementation recording: `/Users/bytedance/Desktop/录屏2026-08-05 15.08.56.mov`
- Reference recording: `/Users/bytedance/Desktop/录屏2026-08-05 15.09.12.mov`
- Current contact sheet: `video-current-contact.png`
- Reference contact sheet: `video-reference-contact.png`
- Post-fix comparison: `motion-video-qa-comparison.png`

## Steps

1. **Idle composition — needs improvement in supplied recording**
   - The current recording shows a materially smaller keychain group than the reference.
   - The reference gives the object more visual authority in the hero.

2. **Hover selection — needs improvement in supplied recording**
   - The current recording uses roughly 10–12° of neighbor movement, so the chosen item remains hard to distinguish.
   - The reference spreads outer pieces to roughly 35–45° and almost doubles the resting horizontal span.

3. **Motion model — healthy after the previous correction**
   - The target piece remains at its original pivot and stacking layer.
   - Neighboring pieces swing around the silver ring to reveal it.
   - No dimming, blur, scale, translation, or selected-layer promotion is used.

## Implemented Changes

- Increased desktop group size by about 12%.
- Increased maximum neighbor fan angle from 12° to 42°.
- Added progressive fan angles so distant neighbors travel farther than adjacent neighbors.
- Preserved the stationary target-piece behavior and shared silver-ring pivot.

## Evidence Limits

- Visual motion, scale, and spatial spread were compared from twelve evenly spaced frames per video.
- Pointer trajectory and exact easing velocity cannot be measured perfectly from the sampled frames alone; the implemented transition was also tested live in the browser.
