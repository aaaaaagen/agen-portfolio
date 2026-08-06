# Design QA

## Evidence

- Source visual truth: `/var/folders/qs/t283gzxd4mxbp4nml79r658h0000gn/T/codex-clipboard-31b3bbf3-45d2-4f61-bb72-b7cb5f5dd505.png` and `/Users/bytedance/Desktop/录屏2026-08-05 15.09.12.mov`.
- Implementation screenshot: `/Users/bytedance/Documents/Codex/2026-08-04/codex-ai-1-2-mp4-https/personal-portfolio/keychain-gap-final.png`.
- Settled-state screenshot: `/Users/bytedance/Documents/Codex/2026-08-04/codex-ai-1-2-mp4-https/personal-portfolio/keychain-settled-final.png`.
- Pure-background screenshot: `/Users/bytedance/Documents/Codex/2026-08-04/codex-ai-1-2-mp4-https/personal-portfolio/pure-background-final.png`.
- Full-view normalized comparison: `/Users/bytedance/Documents/Codex/2026-08-04/codex-ai-1-2-mp4-https/personal-portfolio/keychain-gap-comparison-final.png`.
- Latest source truth: browser annotations Comment 1 (`ARGEN` → `AGEN`), Comment 2 (ABOUT must be the second screen), and Comment 3 (remove the résumé block), with their attached 1080 × 722 marker screenshots.
- Latest ABOUT screenshot: `/Users/bytedance/Documents/Codex/2026-08-04/codex-ai-1-2-mp4-https/personal-portfolio/about-second-screen-final.png` (1065 × 712 px).
- Latest full-page order screenshot: `/Users/bytedance/Documents/Codex/2026-08-04/codex-ai-1-2-mp4-https/personal-portfolio/page-order-final.png` (1065 × 4711 px).
- Browser viewport: 1265 × 712 CSS px at device scale factor 1.
- Source screenshot pixels: 3024 × 1516. Implementation pixels: 1265 × 712.
- Normalization: both hero regions were cropped around the keychain, aspect-preserved, and contained inside equal 760 × 540 comparison panels.
- State: desktop home hero with AI LAB pendant hovered; ABOUT as the first section after home; secondary AI LAB section at its desktop scroll target.

## Findings

- No actionable P0, P1, or P2 mismatch remains for the requested changes.
- Fonts and typography: navigation typography, word-length underlines, wrapping, and hierarchy remain unchanged by this iteration.
- Spacing and layout rhythm: the yellow Meituan and orange Kuaishou plates now maintain a visible gap in every expanded state; their minimum angular separation is 22°.
- Colors and visual tokens: black sections now use a single `#000000` token. CSS dot grids were removed.
- Image quality and asset fidelity: the AI LAB and ABOUT hero images were edited from the existing raster assets only to remove baked-in dot backdrops; the central objects, crop, and materials are preserved.
- Copy and content: all visible `ARGEN` text is now `AGEN`; PROFILE and the full résumé block are absent; the remaining section indexes run 01 ABOUT, 02 WORKS, 03 AI LAB, and 04 CONTACT.

## Focused Evidence

- `keychain-gap-comparison-final.png` is the focused before/after evidence. The source panel shows the Meituan and Kuaishou plate bodies touching; the implementation panel shows a clear black gap between them while both remain attached to the same ring pivot.
- `pure-background-final.png` confirms that the AI LAB section and its hero artwork no longer show a repeating dot pattern.
- `about-second-screen-final.png` confirms ABOUT appears directly after the home hero, uses `AGEN`, has no repeating background dots, and contains no résumé content.
- Static screenshots cannot express velocity, so the return motion was also tested interactively in the browser: after pointer exit, the pieces close over 0.9 seconds with a restrained overshooting cubic-bezier curve before settling at their supplied rest coordinates.

## Comparison History

- Earlier P1: pieces detached, translated, scaled, dimmed, or changed stacking order on hover.
  - Fix: all hanging layers now rotate only around the shared `45% 29%` silver-ring pivot; the selected piece remains stationary and keeps its original z-order.
  - Evidence: `keychain-large-about.png`, `keychain-large-middle.png`, and `keychain-large-ai.png`.
- Earlier P1: the fan range was too small compared with the reference recording.
  - Fix: enlarged the hero assembly and increased the progressive fan range.
  - Evidence: `motion-video-qa-comparison.png` and the large-fan screenshots.
- Latest P2: Meituan and Kuaishou used only 8–16° separation in several expanded states, so the plate bodies still touched.
  - Fix: increased their minimum expanded-state separation to 22° and redistributed neighboring angles outward without translation.
  - Post-fix evidence: `keychain-gap-final.png` and `keychain-gap-comparison-final.png`.
- Latest P2: backgrounds contained CSS dot grids and the AI LAB hero raster contained a baked-in dot texture.
  - Fix: replaced `.dot-grid` with a solid background, unified the black token to `#000000`, and replaced only the raster backdrop with solid black.
  - Post-fix evidence: `pure-background-final.png`.
- Latest P3: the closing movement stopped too cleanly.
  - Fix: applied a 0.9-second restrained overshoot easing on pointer exit while keeping the opening curve direct and responsive.
  - Post-fix evidence: interactive browser check and `keychain-settled-final.png`.
- Latest annotation P1: ABOUT was the fourth content section instead of the second screen, and a separate PROFILE screen preceded it.
  - Fix: removed the redundant PROFILE section, moved ABOUT directly after HOME, changed the home scroll control to target ABOUT, and renumbered the remaining sections.
  - Post-fix evidence: `about-second-screen-final.png`, `page-order-final.png`, and the verified DOM order `home → about → works → ai-lab → contact`.
- Latest annotation P2: the site still displayed `ARGEN` in the hero, ABOUT heading, and footer.
  - Fix: replaced every visible occurrence with `AGEN`.
  - Post-fix evidence: browser DOM snapshot and `about-second-screen-final.png`.
- Latest annotation P2: the ABOUT section included an unwanted EXPERIENCE / 履历 block.
  - Fix: removed the block and its responsive/desktop CSS.
  - Post-fix evidence: `.resume` count is 0 in the rendered page.

## Verification

### WORKS folder interaction — 2026-08-05

- Source visual truth: `/Users/bytedance/Desktop/录屏2026-08-05 16.06.21.mov`; sampled reference frame: `/Users/bytedance/Documents/Codex/2026-08-04/codex-ai-1-2-mp4-https/reference-captures/works-recording/frame-07.5.png` (2998 × 1496 px).
- Browser implementation: `works-folders-idle.png` and `works-folders-hover.png` at 1065 × 712 CSS px, device scale factor 1.
- Combined evidence: `works-folders-comparison.png`, normalized into equal 700 × 400 panels.
- Fonts/typography: serif folder names and small condensed date labels reproduce the reference hierarchy without truncation.
- Spacing/layout: five alternating overlapping folders fit in one desktop viewport; the hovered folder rises while its content card emerges behind it.
- Colors/tokens: the existing lime, white, blue, gray, and pink palette is preserved.
- Image quality: preview cards reuse cropped supplied keychain artwork; no placeholder imagery is present.
- Copy/content: DOUYIN 2025—♾️, MEITUAN 2023—2025, KUAISHOU 2022—2023, Exercises I did 2023, and AI LAB are present exactly.
- Interaction: non-hovered folders soften, the selected folder expands upward, and clicking a folder opens its project dialog. Console errors: 0.
- Remaining difference: the reference uses finished project photography in preview cards; this build uses the user's existing keychain artwork until project thumbnails are supplied. Classified as acceptable, not actionable with current assets.

### WORKS header annotations — 2026-08-05

- Removed `02 / SELECTED WORKS` and the Chinese helper sentence exactly as annotated.
- Tightened the heading block from 330 px to 270 px, reduced the title scale, and aligned the lighter `Archive` word on the same baseline for a cleaner transition into the folders.
- Rechecked at the in-app browser desktop viewport: removed strings count 0; console errors 0.

### WORKS folder depth and alignment — 2026-08-05

- Compared against the six-frame contact sheet from the supplied Works interaction recording.
- Increased desktop folder height from 155 px to 185 px and kept the upper folders lightly staggered.
- Aligned the two lowest folders to one bottom edge, with the right folder preserving the front layer at their overlap.
- Hover now moves only the selected folder face by 18 px; its lower edge remains partially obscured by the next physical layer while preview assets emerge independently above the stack.
- Added restrained 7 px rounding to the exposed folder and tab corners, tightened number/title/date baselines, and removed the non-reference `OPEN FOLDER` label.
- Verified idle, hover, and project-dialog states in the in-app browser; console errors 0.

### WORKS hover color, image pocket, and mask — 2026-08-05

- Rechecked the live reference page at `https://www.wildyriftian.com/works` in its illustration hover state.
- Unselected folders now switch to the same opaque `#f3f3f1` surface with muted gray typography; opacity reduction is no longer used.
- Preview artwork is layered directly behind its selected folder face, leaving roughly half of each image inside the folder pocket.
- A fixed white lower mask hides the bottom edges of the two lowest folders.
- The full WORKS surface and its mask now use pure white `#ffffff`, matching the reference instead of the previous warm paper color.
- Verified the final hover state in the in-app browser; console errors 0.

### WORKS bottom row and Meituan depth — 2026-08-05

- Swapped the lower-row positions: 04 Exercises I did is now on the left and 05 AI LAB is now on the right; their original gray and pink colors are preserved.
- Extended the Meituan folder to 252 px so its lower edge is carried behind subsequent layers instead of being exposed.
- Verified the desktop idle layout in the in-app browser; console errors 0.

### WORKS time labels and Meituan legibility — 2026-08-05

- Moved every date range into the compact metadata row immediately after its sequence number.
- Raised Meituan’s metadata and title within its extended folder so the full word remains clear before the subsequent folder layer begins.
- Verified Meituan’s hover state in the in-app browser; console errors 0.

- Desktop idle, AI hover, Kuaishou hover, pointer-exit settling, HOME → ABOUT scrolling, ABOUT navigation, AI LAB navigation, full section order, and pure-black section backgrounds tested in the in-app browser.
- Production build: passed.
- Browser console errors: 0 (Vite debug/info messages only).
- Residual test gap: mobile pointer-exit inertia was not separately screen-recorded; reduced-motion users still receive no animation by design.

### Supplied keychain asset replacement — 2026-08-05

- Replaced the homepage pin and DOUYIN pendant PNGs with the newly supplied source assets; their existing layout and interactions are unchanged.
- Production build: passed.

### WORKS six-folder balance — 2026-08-05

- Added a sixth folder so both columns now contain three evenly spaced layers: 01 DOUYIN, 03 KUAISHOU, 05 Exercises on the left; 02 MEITUAN, 04 BRAND, 06 AI LAB on the right.
- All six folders share the same 210 px height, 152 px vertical rhythm, upper-left typography coordinates, rounded tab geometry, hover travel, and depth behavior.
- BRAND uses `#d9d9d9`; Exercises uses `#ababab`. Browser-computed colors matched both requested values exactly.
- Production build: passed. Browser console errors: 0.

### WORKS folder placement and Meituan visibility — 2026-08-05

- Anchored the folder stack to the bottom of the Works viewport, retaining the bottom mask.
- Kept Meituan behind Kuaishou and AI; moved its metadata and smaller title upward so they stay readable before the front layer begins.
- Narrowed the right-side Meituan and AI folders to bring their join closer to the viewport center.
- Production build and in-app-browser console check: passed.

### WORKS preview clipping and folder silhouette consistency — 2026-08-05

- Removed the folder-stack top clipping that covered DOUYIN's raised preview assets; the Works section still clips the extended folder bottoms at the page boundary.
- Increased selector specificity so MEITUAN and Exercises I did now use the same folder silhouette as DOUYIN, KUAISHOU, and AI LAB.
- Verified the desktop idle state and DOUYIN hover state in the in-app browser; preview assets are visible and console errors are 0.
- Production build: passed.

### WORKS folder rhythm and typography alignment — 2026-08-05

- Set the three left-side visible bands to an equal 152 px rhythm: DOUYIN, KUAISHOU, and Exercises I did.
- Aligned MEITUAN's top edge and shell height with DOUYIN; aligned AI LAB's top edge with KUAISHOU and extended AI LAB through the Works boundary so hover never reveals white below.
- Unified all five folder labels to the same layout: metadata at 28 px left / 20 px top, title at 28 px left / 41 px top, and a shared 46.44 px desktop title size at the verified viewport.
- Verified desktop idle, DOUYIN hover, and AI LAB hover states in the in-app browser; preview assets remain visible, bottom coverage is intact, and console errors are 0.
- Production build: passed.

final result: passed
