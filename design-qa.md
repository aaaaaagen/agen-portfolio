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

### Global English UI typography alignment — 2026-08-06

- Source visual truth: `https://www.wildyriftian.com/` and `output/playwright/font-reference-home.png` (1326 × 768 px, 1326 × 768 CSS viewport, DPR-normalized CSS pixels).
- Rendered implementation: `output/playwright/font-local-home.png` and `output/playwright/font-local-works.png` (each 1326 × 768 px at the same CSS viewport and density).
- State: desktop HOME idle and WORKS idle.
- Full-view evidence: reference and implementation now use the same JetBrains Mono family and regular optical weight for navigation, first-screen helper copy, UI labels, and numbers. Navigation density, uppercase treatment, black/white contrast, and vertical placement remain consistent with the source direction.
- Focused typography evidence: HOME navigation and side labels were compared at readable scale; WORKS metadata confirms the same family and weight across all six folders. Georgia archive/folder display titles and DM Sans Chinese copy remain intentionally distinct to preserve hierarchy.
- Required fidelity surfaces: typography passed; spacing/layout rhythm unchanged; color tokens unchanged; image assets/crops unchanged; copy unchanged.
- Comparison history: initial implementation used Barlow Condensed 600–800, visibly wider and heavier than the reference. Replaced it with JetBrains Mono 400/500, reduced tracking, matched the reference navigation to 14 px/24 px/400, and recaptured HOME and WORKS. Post-fix evidence shows no actionable P0/P1/P2 mismatch for the requested typography scope.
- Primary interactions checked: HOME idle and direct WORKS navigation. Browser console errors: 0. Production build and Sites packaging tests: passed.
- Residual test gap: mobile typography was not separately screenshot-compared in this pass; existing responsive sizing remains in place.

final result: passed

## About folder alignment refinement — 2026-08-14

- Verified at `http://localhost:4173/`: all five background folders and the blue front folder use the same top edge and 30px × 30px (45°) central folder fold; the former left-top diagonal has been removed.
- Footer alignment: the WeChat QR and click-to-copy contact details occupy the left side; the unframed social-link icons are aligned at the right.
- Copy behavior includes a Clipboard API fallback for browsers where the primary API is unavailable.

final result: passed

## About folder alignment and ID-card motion refinement — 2026-08-14

- The five rear folders and cyan front folder now share one left edge and a uniform 20 px vertical offset: y=75, 95, 115, 135, 155 and 175 px for the front panel at the 1280 × 720 viewport.
- Rear folder shoulders are wider than the cyan personal folder shoulder; all retain rounded file-folder corners.
- The supplied ID card begins at y=75, aligned with the top black folder, and is shifted 30 px left from its prior placement. The role line begins 34 px below the card, restoring whitespace between image and copy.
- Removed the profile name as requested.
- Hover interaction: the card animates with `about-id-card-sway`, pivoting from its top edge with only ±0.8° motion so the black strap reads as anchored while the badge subtly swings.
- Profile image remains non-clickable. Browser console errors: none.

final result: passed

## About typography and card placement refinement — 2026-08-14

- Folder layers and the cyan profile panel now use a subtle 8 px radius; the white career panel uses a tighter 9 px radius.
- The supplied ID card is shifted to the upper-left of the cyan folder rather than centered; its rendered figure begins at x=20 while the folder begins at x=26 in the 1280 px viewport.
- The profile name now resolves to the system Chinese serif stack `Songti SC`, `STSong`, `Noto Serif SC`, serif.
- Removed the standalone `工作经历` heading and rebalanced the timeline so the three career entries remain readable and fit in the panel without scrolling.
- Browser verification: white-panel radius `9px`, profile name serif stack detected, career client and scroll heights both `626px`, no horizontal overflow, and no console errors.
- No actionable P0/P1/P2 visual or interaction issues remain.

final result: passed

## About folder palette and flat-style refinement — 2026-08-14

- Left stack now contains the same six folder colors used by Works: `#66deff`, `#ffed7a`, `#afff62`, `#feb8e0`, `#dcdcdc`, and `#323232`.
- Five rear layers plus the cyan profile folder form the six-card set. Every layer uses the same left-corner diagonal and folder shoulder silhouette.
- Removed all About-page shadows from the folder layers, cyan profile folder, supplied ID-card image, white career card, and numbered timeline markers.
- Browser computed-style verification: five rear layer shadows `none`; profile and career shadows `none`; profile image filter `none`.
- The supplied card asset, profile copy, social links, contact controls, career content, single-screen fit, and responsive behavior remain unchanged.
- No actionable P0/P1/P2 issues remain.

final result: passed

## About folder-resume replica QA — 2026-08-14

- Source visual truth: `/Users/bytedance/Downloads/图片-H2uavSOjxieyxa (1).png` at 2048 × 1024 px; supplied ID-card asset: `/Users/bytedance/Downloads/工卡素材.png` at 2048 × 1528 px with alpha.
- Rendered implementation: `output/about-qa/about-folder-resume-final.png` at a 1280 × 720 CSS viewport.
- Layout fidelity: warm beige full-screen ground, 47/53 two-column composition, layered folder stack with cyan profile panel on the left, and a rounded white career panel on the right match the supplied reference hierarchy.
- Asset fidelity: the supplied transparent ID-card asset is used directly, remains uncropped, overlaps the folder layers, and is not interactive or connected to the image lightbox.
- Content: name, professional positioning and biography remain on the left; complete Douyin, Meituan and Kuaishou experience content is organized as a numbered 01/02/03 timeline on the right.
- Requested footer: four personal-site icon controls are anchored at bottom-left; TEL, MAIL and WECHAT copy controls are anchored at bottom-right.
- Single-screen evidence: both cards end at y=700 in a 720 px viewport; the career panel client and scroll heights are both 626 px, so all content fits without internal scrolling. Horizontal overflow is false.
- Interaction and runtime: 4 social controls, 3 contact controls, profile image button ancestry false, browser console errors 0.
- Responsive behavior: below 820 px the two cards stack and the timeline returns to normal document flow.
- No actionable P0/P1/P2 visual or interaction issues remain.

final result: passed

## About page two-column profile QA — 2026-08-13

- Source visual truth: `/Users/bytedance/Downloads/去背景-so0d-z4KQ0Li_d 1.png`, the user-supplied left/right copy, and the existing black, restrained portfolio interface language.
- Rendered implementation: `output/about-qa/about-redesign-desktop.png` at a 1280 × 720 CSS viewport.
- Layout: one-screen desktop profile with a fixed left identity column and independently scrollable right career column. The full supplied resume remains available without extending the desktop section into a long page.
- Left column: profile card reduced to 288 px rendered width, followed by the supplied name, role and biography copy, then four square social icon controls. The card is an image inside a figure rather than a button and has no lightbox action.
- Right column: continuous Douyin, Meituan and Kuaishou experience articles replace the former accordion. All user-provided copy is retained, with no metric chips or decorative tags.
- Typography: headings and body copy both resolve to `DM Sans`; no serif type is used in the redesigned About content.
- Interaction evidence: profile-card button count is 0; career panel client height is 608 px and scroll height is 831 px; social placeholder feedback remains functional.
- Responsive behavior: below 820 px the columns stack, the career region returns to normal document flow, and internal scrolling is removed.
- No actionable P0/P1/P2 visual or interaction issues remain.

final result: passed

### CONTACT sticky-note hover smoothing — 2026-08-11

- Kept the note 5px higher (`top:calc(51% - 5px)`) and split motion into a continuous outer pendulum plus a smoothly transitioned inner hover nudge.
- Hover enter/leave no longer swaps animation names or jumps transforms; the outer `contact-sticky-note-float` continues while the inner layer transitions over `0.62s`.
- Evidence: `output/contact-sticky-no-stutter.png`; browser check captures progressive enter/leave transforms and confirms the outer animation remains active.
- Production build, Sites packaging tests, and `git diff --check`: passed.

final result: passed

### CONTACT sticky-note pendulum interaction — 2026-08-11

- Re-centered the note transform origin near the supplied paperclip (`78% 12%`) so the whole note swings from the pin.
- Restored active hover motion with a dedicated `contact-sticky-note-hover` animation; idle uses a slower breathing loop, while hover increases the pendulum amplitude slightly and never pauses.
- Evidence: `output/contact-sticky-pendulum-hover.png`; browser check confirms idle/hover animation names and changing transform matrices.
- Production build, Sites packaging tests, and `git diff --check`: passed.

final result: passed

### CONTACT sticky-note motion refinement — 2026-08-11

- Moved the complete note component upward by 5px.
- Added a restrained 5.2s floating loop with ±2px horizontal / ±4px vertical drift and ±0.35° rotation; hover pauses the loop and applies a small lift.
- Evidence: `output/contact-sticky-motion.png`; browser check confirms `contact-sticky-note-float` and the updated top position.
- Production build, Sites packaging tests, and `git diff --check`: passed.

final result: passed

### CONTACT paper-only hover interaction — 2026-08-11

- Removed hover movement from the blue folder front and its shadow; both remain visually static when the pointer is over the folder.
- Kept the six paper cards' staggered expansion and individual hover offset, triggered only by `.contact-file-card:hover`.
- Evidence: `output/contact-paper-only-hover.png`; browser state check reports folder/front/shadow transforms as `none` over the folder, while the hovered paper moves to `translate(7px, -10px)`.
- Production build, Sites packaging tests, and `git diff --check`: passed.

final result: passed

### CONTACT sticky-note proportional scale — 2026-08-11

- Scaled the complete supplied note component to `90%` from its top-right anchor, so paper, clip, overlaid copy, and signature shrink together without changing their relative spacing.
- Evidence: `output/contact-sticky-scaled.png`; browser computed transform is `matrix(0.9, 0, 0, 0.9, 0, 0)`.
- Production build, Sites packaging tests, and `git diff --check`: passed.

final result: passed

### CONTACT sticky-note typography refinement — 2026-08-11

- Repositioned the overlaid two-line note copy to match the paper's inner edge spacing and tightened the line-height for a cleaner block.
- Changed both the note copy and `AGEN / 2026` signature to pure black (`#000`).
- Evidence: `output/contact-sticky-typography-black.png`; browser check confirms both computed text colors are `rgb(0, 0, 0)`.
- Production build, Sites packaging tests, and `git diff --check`: passed.

final result: passed

### CONTACT sticky-note text and signature overlay — 2026-08-11

- Added the two-line copy `期待一起用AI✨` / `做些有意思的事>_` over the supplied paperclip note asset, with a matching subtle tilt.
- Added the small bottom-right signature `AGEN / 2026`, also following the paper's tilt.
- Evidence: `output/contact-sticky-asset-text-signature.png`; browser DOM check confirms both text nodes and their rendered positions.
- Production build, Sites packaging tests, and `git diff --check`: passed.

final result: passed

### CONTACT sticky-note supplied asset replacement — 2026-08-11

- Replaced the code-generated sticky note with `/Users/bytedance/Downloads/Group 2147241894.png`, copied to `public/assets/contact-sticky-note.png`.
- The supplied transparent PNG includes the paper tilt and paperclip, so the previous CSS rotation/text layer was removed; the existing hover lift remains.
- Evidence: `output/contact-sticky-asset.png`; browser check confirms the asset source, transparent image sizing, and rendered 307.2px square at the desktop QA viewport.
- Production build, Sites packaging tests, and `git diff --check`: passed.

final result: passed

### CONTACT sticky-note color restoration — 2026-08-11

- Reverted the previous sticky-note color experiment and restored the original `#ffb8e0` background.
- Evidence: `output/contact-sticky-pink-restored.png`; browser computed color is `rgb(255, 184, 224)`.
- All other CONTACT layout, copy, paper alignment, and interactions are unchanged.
- Production build, Sites packaging tests, and `git diff --check`: passed.

final result: passed

### CONTACT paper label alignment — 2026-08-11

- Aligned each paper's numeric index and English title on a shared typographic baseline, then nudged the smaller index glyphs upward by 2px so their visual centers match.
- Verified all six cards at the desktop QA viewport: center deltas are `0.141px` consistently; card hover fan and click navigation remain unchanged.
- Evidence: `output/contact-file-label-alignment.png`.
- Production build, Sites packaging tests, and `git diff --check`: passed.

final result: passed

### CONTACT tab title removal — 2026-08-11

- Removed the standalone English `CONTACT` label from the raised folder tab per the latest reference; the top navigation CONTACT control remains unchanged.
- Preserved the 45° left-edge folder shoulder (height +10px), SVG-derived blue fills, paper stack, badge, and sticky-note copy `期待一起用AI做些有意思的事>_`.
- Evidence: `output/contact-title-removed.png`; DOM check confirms `.contact-folder-tab` count `0`.
- Production build, Sites packaging tests, and `git diff --check`: passed.

final result: passed

### CONTACT label sizing, folder height, and sticky-note copy — 2026-08-11

- Reduced the CONTACT label to a compact responsive size and centered it in the left raised tab; its z-order remains with the rear folder so expanded papers cover it naturally.
- Increased the raised tab/45° shoulder height by approximately 10px while keeping the horizontal and vertical shoulder offsets equal.
- Updated the pink sticky-note copy to `期待一起用AI做些有意思的事>_`.
- Evidence: `output/contact-folder-height-note-final.png`; DOM check reports the updated copy and a 43.52px desktop shoulder at the 1265px QA viewport.
- Production build, Sites packaging tests, and `git diff --check`: passed.

final result: passed

### CONTACT title layer alignment — 2026-08-11

- Lowered the `CONTACT` title to the rear blue folder layer (`z-index: 0`) so the six expanded paper cards render above it instead of the title floating over their content.
- Preserved the left-edge Mac-style tab, 45° slanted shoulder, SVG-derived blue fills, soft shadow, pink note, badge, and card hover/click behavior.
- Evidence: `output/contact-title-behind-files.png`; DOM z-order check confirms back/tab `0`, files `1`, front `4`.
- Production build, Sites packaging tests, and `git diff --check`: passed.

final result: passed

### CONTACT folder left-edge tab alignment — 2026-08-11

- Source visual truth: `/Users/bytedance/Downloads/Group 2147241893.svg` and the user's follow-up reference showing the raised trapezoid flush with the folder's left edge.
- Updated the rear folder clip path so the raised tab begins at `x: 0` instead of being inset, while retaining the SVG-derived `#44AAD8` rear fill, `#67C4EC` front fill, compact slanted shoulder, and soft shadow.
- Evidence: `output/contact-folder-left-edge.png` (idle) and `output/contact-folder-left-edge-hover.png` (hover), captured from the running localhost page.
- Interaction verification: hovering the left tab opens the folder/front by `9px` and fans the six paper cards to their existing staggered offsets (`-10px` through `-140px`); card click navigation remains intact.
- Production build, Sites packaging tests, and `git diff --check`: passed.

final result: passed

### CONTACT macOS-style folder stack — 2026-08-10

- Replaced the former white and fluorescent-green inserts with six straight-corner cards using the exact WORKS folder colors for 01–06.
- Rebuilt the folder around the supplied macOS folder-icon reference: cyan gradient rear panel and raised tab, horizontal document stack, and a smooth cyan gradient front panel.
- All six cards remain flat with zero rotation. Idle state shows thin color edges; hovering the blue front panel lowers it by 9px while the cards rise sequentially in 26px steps. Hovering any exposed card keeps the folder open and gives that card a small 7px horizontal affordance.
- Each card is a semantic button. Browser interaction verification clicked `04 BRAND` from the open stack and landed in the BRAND collection view.
- Replaced the full-height gray front shadow silhouette with an 18px translucent shadow band using a 13px Gaussian blur, eliminating the hard gray strip.
- Rendered evidence: `output/contact-mac-folder-idle.png` and `output/contact-mac-folder-open.png` at the active 1080 × 725 CSS viewport.
- Production build, Sites packaging tests, and `git diff --check`: passed.

### CONTACT left-tab proportion refinement — 2026-08-11

- Matched the supplied macOS folder reference more closely by moving the raised trapezoid to the far-left edge of the rear panel and tightening its top width and shoulder slope.
- Moved the CONTACT label into the left tab; the tab itself remains part of the hover trigger, so the sequential six-card opening also works from the raised area.
- Rendered state rechecked in the in-app browser with the tab hovered and all six card transforms present.
- Production build, Sites packaging tests, and `git diff --check`: passed.

final result: passed

### CONTACT WORKS-style folder refinement — 2026-08-10

- Shape reference: `/Users/bytedance/Downloads/Group 2147207949.svg`; implementation uses only its irregular two-layer folder geometry as requested, not the full SVG asset.
- Restored the existing independently positioned white paper, green card, CONTACT label, contact content, supplied badge, and pink sticky note after rejecting the earlier full-SVG replacement.
- Reduced desktop folder corner rounding from 16–18px to 7px (6px on mobile) and retained the asymmetric folded-tab silhouettes used by the WORKS folders.
- Added independent hover responses for the white paper, green card, and pink sticky note. Each uses a short, low-amplitude lift/rotation transition; the papers are not animated as one group.
- Rendered idle and hover states were checked in the in-app browser. The contact layout remains aligned and browser warnings/errors are 0.
- Production build, Sites packaging tests, and `git diff --check`: passed.
- Follow-up layer correction: rear blue panel is now below the white and fluorescent-green files; the front blue panel masks their lower edges. Both blue panels use separate silhouette-aware drop shadows, making the folder read as open rather than a single flat sheet.
- Follow-up depth refinement: narrowed the rear tab's diagonal shoulders from 3% to 1.5%, moved the white file 4% and green card 7% deeper into the folder, and tightened the front-panel shadow to a visible short edge. The file bottoms terminate behind the front blue panel rather than outside it.
- Latest reference alignment: matched `/var/folders/qs/t283gzxd4mxbp4nml79r658h0000gn/T/codex-clipboard-3d490f0b-74c7-4df9-8ac3-ba076b89cb5f.png` with a low rear rail, taller right-side CONTACT tab, and a nearly horizontal irregular front edge. Added a dedicated blurred contact-shadow silhouette 7px above the front panel so the shadow visibly interacts with both inserted files.
- Shadow polish: reduced the contact-shadow opacity from 30% to 14%, shortened its offset, and increased blur to 7px so the paper contact reads softly without a hard dark band.
- Rendered evidence: `output/contact-folder-reference-aligned.png` and `output/contact-folder-reference-comparison.png`; final contact-shadow state checked in browser with zero warnings/errors.

final result: passed

### CONTACT supplied work-badge replacement — 2026-08-10

- Source visual truth: `/Users/bytedance/Desktop/个人网站/工卡.png` (1000 × 1600 px with alpha).
- Replaced the generated HTML/CSS card, separate pin artwork, overlaid typography, and overlaid QR code with the single supplied asset at `/assets/contact-work-badge.png`.
- Preserved the existing pointer drag, gentle sway, tilt, and upward retraction behavior on the asset wrapper.
- Changed MAIL from a `mailto:` link to a copy button. Browser verification found one MAIL button, zero matching mail links, and the post-click status `邮箱已复制`.
- Rendered evidence: `output/contact-work-badge-final.png`; combined comparison: `output/contact-work-badge-comparison.png`. The supplied pin, transparent edges, card shape, type, QR code, and 2026 mark are rendered directly from the original asset with no duplicate overlay.
- Browser warnings/errors: 0. Production build, Sites packaging tests, and `git diff --check`: passed.

final result: passed

### CONTACT rounded folder and contrast pass — 2026-08-10

- Source visual truth: `/var/folders/qs/t283gzxd4mxbp4nml79r658h0000gn/T/codex-clipboard-1c8b1345-c553-4e2c-b2ed-d7589a1c373a.png`.
- The rear CONTACT tab now uses a broad flat top with rounded top corners; the work-permit card keeps a narrow portrait proportion and rounded corners.
- Removed box shadows from the permit card and pink note as requested.
- Replaced low-contrast white text on the cyan folder field with `#082c45`; secondary labels use translucent deep navy to retain hierarchy and legibility.
- Checked the CONTACT state in the in-app browser at the available 792 × 744 viewport. The rounded tab, card corners, new text contrast, supplied QR image, and contact actions render correctly. Browser warnings/errors: 0.
- Production build, Sites packaging tests, and `git diff --check`: passed.

final result: passed

### CONTACT color annotations — 2026-08-10

- Browser Comment 1: sticky-note background changed to `#ffb8e0`.
- Browser Comment 2: rear folder and CONTACT tab backgrounds changed to `#63dbfe`.
- The front folder remains `#65dfff` from the preceding annotation.
- Rendered evidence: `output/contact-color-comments.png` at 1280 × 720 CSS px, device scale factor 1.
- Layout, typography, QR assets, copy, and interaction behavior were unchanged. Browser warnings/errors: 0.

final result: passed

### CONTACT annotation update — 2026-08-10

- Browser annotation target: `section#contact > .contact-copy-block` and the CONTACT section color field.
- Changed the eyebrow copy from `03 / SAY HELLO` to `欢迎与我联系>_` and the front folder background to `#65dfff`.
- Rendered evidence: `output/contact-comment-update.png` at 1280 × 720 CSS px, device scale factor 1.
- DOM verification: new copy count 1; old copy count 0. Browser warnings/errors: 0.
- Typography, spacing, supplied QR imagery, contact details, badge motion, and waterfall placement were preserved.

final result: passed

### CONTACT waterfall replacement — 2026-08-10

- Source visual truth: the user's selected new CONTACT screenshot (link/image 1) plus `/Users/bytedance/Desktop/录屏2026-08-10 17.05.19.mov`; sampled reference frame `/tmp/contact-reference-frames/frame-08-04.0.jpg` (1400 × 778 px).
- Rendered implementation: `output/contact-waterfall-final.png` (1280 × 720 px at a 1280 × 720 CSS viewport, device scale factor 1); pulled-card state: `output/contact-waterfall-retracted.png`.
- Normalized full-view comparison: `output/contact-waterfall-comparison.png`; reference and implementation use the same 1400 × 778 aspect before side-by-side composition.
- State: CONTACT reached by the persistent top navigation as the next full-height page after WORKS; it is no longer a dialog or fixed overlay.
- Earlier P1: the old plain-blue CONTACT page and the new CONTACT overlay both existed, creating duplicate contact experiences and breaking the intended waterfall.
- Fix: removed the old page DOM and its dedicated desktop CSS, converted the new tactile CONTACT layout to a relative `min-height: 100vh` section, and placed it directly after WORKS.
- Post-fix evidence: old-contact count 0; new `section#contact.contact-page` count 1; initial contact-dialog count 0. From a project collection, CONTACT removed the collection state and landed on the same waterfall section.
- Interaction: the badge still retracts upward after a short pull while the CONTACT section remains mounted and visible. Browser warnings/errors: 0.
- Fidelity surfaces: typography, folder/paper colors, supplied QR image quality, contact copy, and layout hierarchy remain unchanged from the already-passed CONTACT visual comparison.

final result: passed

### CONTACT folder overlay — 2026-08-10

- Source visual truth: `/Users/bytedance/Desktop/录屏2026-08-10 17.05.19.mov`; settled reference frame: `/tmp/contact-reference-frames/frame-08-04.0.jpg` (1400 × 778 px).
- Rendered implementation: `output/contact-final.png` at a 1400 × 778 CSS-pixel viewport.
- Normalized full-view comparison: `output/contact-comparison.png`, with both source and implementation shown at the same 1400 × 778 aspect and crop.
- State: desktop CONTACT overlay opened from the persistent top navigation after its entrance motion settled.
- Layout and hierarchy: black upper field, layered blue folder, centered hanging work-permit card, left contact block, right pink note, and folder tab reproduce the supplied recording's structure.
- Content: the supplied WeChat QR is used in both the contact block and badge; WeChat `agenzZ`, phone `18500636059`, and email `agenzzk@163.com` are present and interactive.
- Intentional source difference: the reference recording's fluorescent green bottom-right close button is omitted per the latest request. CONTACT closes by clicking the top CONTACT control again or pressing Escape.
- Interaction: a short downward pull retracts the badge upward in 420 ms. The CONTACT overlay remains open after the badge leaves, while CONTACT toggle and Escape remain the explicit page-close actions.
- Inline continuity: the homepage retains a full `section#contact` immediately after WORKS. Evidence: `output/contact-inline-restored.png`; post-pull overlay evidence: `output/contact-badge-retracted.png` (1280 × 720 px at a 1280 × 720 CSS viewport, device scale factor 1).
- Post-fix browser state: contact dialog count remained 1 after badge retraction; inline CONTACT section count remained 1; console warnings/errors remained 0.
- Browser console warnings/errors: 0. Production build, Sites packaging tests, and `git diff --check`: passed.

final result: passed

### Homepage seven-pendant asset replacement — 2026-08-06

- Source visual truth: seven supplied 2512 × 3353 transparent PNG canvases at `/Users/bytedance/Desktop/个人网站/`, numbered 01–07 with baked-in initial placement.
- Rendered implementation: `output/playwright/keychain-seven-idle.png` and `output/playwright/keychain-seven-brand-hover.png` (1326 × 768 px, 1326 × 768 CSS viewport, CSS-pixel density).
- State: desktop HOME idle and BRAND hover.
- Full-view evidence: all seven new PNG layers align on their shared canvas and assemble into one key ring without per-item translation. BRAND appears between KUAISHOU and EXERCISES with the supplied silver pendant artwork.
- Focused interaction evidence: BRAND hover opens the seven-piece fan around the shared upper ring; surrounding pendants move aside by rotation, keep full opacity, and retain the existing depth ordering and spring-like return transition.
- Required fidelity surfaces: supplied image quality and transparency preserved; initial composition and pivot behavior passed; typography, colors, copy, and all non-homepage sections unchanged.
- Comparison history: prior implementation contained six pendants and no BRAND layer. Replaced the six corresponding assets, added BRAND as 05, shifted EXERCISES/AI LAB to 06/07, expanded hit targets and all active fan-angle states, then recaptured idle and BRAND-hover evidence. No actionable P0/P1/P2 mismatch remains in this scope.
- Browser console errors: 0. Production build and Sites packaging tests: passed.

final result: passed

### CONTACT sticky-note position refinement — 2026-08-11

- Kept the CONTACT page background black and the rear blue folder layer 20px lower; the front blue folder layer remains in place.
- Moved the sticky note up by 5px while preserving the 20px-lowered two-line message copy.
- Moved only the `AGEN / 2026` footer mark down by 10px inside the supplied note asset composition.
- Browser evidence: `output/contact-note-up5-agen-down10.jpg` at the local CONTACT state; note, pin, folder layers, and copy remain aligned.
- Production build, Sites packaging tests, and `git diff --check`: passed.

final result: passed
## About page single-screen QA — 2026-08-13

- source visual truth path: `/Users/bytedance/Downloads/去背景-so0d-z4KQ0Li_d 1.png`, plus the existing homepage, Works folder stack, and Contact interaction language at `http://localhost:4173/`
- implementation screenshot path: `/Users/bytedance/Documents/Codex/2026-08-04/codex-ai-1-2-mp4-https/personal-portfolio/output/about-qa/about-desktop.png`
- viewport: 1440 × 900 CSS px, device scale factor 1
- source pixels: profile card 3077 × 2167; implementation pixels: 1440 × 900; the card is preserved at its native aspect ratio and scaled with `object-fit`-free responsive width
- state: About section at top, Douyin experience expanded, other experiences collapsed
- full-view comparison evidence: the supplied physical ID card remains the dominant visual asset; black base, mono UI labels, colored work folders, thin rules, and restrained lift/tilt interactions match the existing portfolio language. The complete About section measures 901 px at a 900 px viewport with no horizontal overflow.
- focused region evidence: checked the ID-card crop and clarity, expanded experience copy and metrics, AI capability copy, five folders excluding 05, and four square brand-icon buttons. A separate crop was not needed because these regions are legible in the 1440 × 900 full view.

**Findings**
- No actionable P0/P1/P2 visual or interaction issues remain.
- Typography: existing JetBrains Mono, DM Sans, and Georgia hierarchy is retained; small labels remain readable at desktop size.
- Spacing/layout: all required desktop content is visible in one screen; mobile intentionally becomes a readable vertical layout with no horizontal overflow.
- Colors/tokens: uses the portfolio's black, lime, blue, yellow, green, pink, and dark-folder palette.
- Image quality: supplied profile card is used directly without cropping or recreation and opens in the existing lightbox.
- Copy/content: all three roles are present, Douyin opens by default, AI is expressed as capability evidence rather than five project links, and folder 05 is excluded.

**Comparison history**
- Earlier P1: the first implementation expanded into six long sections instead of one screen. Fixed by consolidating all content into a single dashboard.
- Earlier P2: five AI project cards consumed excessive space and the career copy was over-compressed. Fixed by replacing project links with one evidence-based AI capability block and expandable career entries.
- Post-fix evidence: `/Users/bytedance/Documents/Codex/2026-08-04/codex-ai-1-2-mp4-https/personal-portfolio/output/about-qa/about-desktop.png`.

**Primary interactions tested**
- Experience expansion/collapse
- Social placeholder click feedback
- Profile-card lightbox open
- Folder buttons are present and wired to existing folders
- Console warnings/errors: none

final result: passed
