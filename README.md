# Moto365 — Designing the system around the car

A responsive, single-page portfolio case study built with HTML, CSS, JavaScript and Three.js. The opening scene uses the red Khronos CarConcept glTF model with clearcoat paint, a photographic HDR studio environment, geometry-cast soft shadows, drag rotation and an exploded view made from its authored hood, roof, doors, cabin, engine, axles and four wheel assemblies. Hood and door hinges open during the sequence. If WebGL or the model is unavailable, the matching official red-car preview image appears with an animated entrance. GSAP and ScrollTrigger provide the reveal and scrollytelling motion; Lenis adds optional smooth scrolling. A visitor can switch between light and dark themes and opt into a quiet interface chime.

## Preview

Serve this folder with any static web server and open its local address. The GLB is loaded from `assets/car-concept.glb`; when opened directly as a `file://` page, the browser loads the same file from the public Khronos sample-asset repository because browsers restrict local binary requests. The matching viewer image at `assets/car-concept-fallback.jpg` is used while the model loads or when 3D is unavailable. A 1K HDR studio reflection map loads from Poly Haven (CC0), with the procedural studio map as a fallback. The motion libraries, Three.js loaders and DM Sans font load from public CDNs. The page remains readable if WebGL or the model cannot load.

## Files

- `index.html` — case-study narrative, product ecosystem and live links
- `styles.css` — responsive light/dark UI, motion states and interface styling
- `script.js` — Three.js vehicle, theme, audio, navigation and scroll interactions
- `assets/car-concept.glb` — 11.7 MB detailed car model used for the interactive hero and exploded view
- `assets/car-concept-fallback.jpg` — matching red-car preview from the Khronos model viewer
- `assets/` — model, Moto365 and Automoto brand visuals, PDI landing-page context, and live InspektAI/MotoDoc visuals

## Visual source notes

The included Moto365 wordmark, Automoto mark, PDI landing-page presentation image, and selected live product visuals were extracted from the supplied public case-study/live-site references. The compact product interface panels are authored visual summaries of the workflows described in the project; they are labeled as conceptual rather than presented as exact Figma exports. There are no links to Figma in the page.

The project outcomes are presented as team-reported directional metrics and are not attributed to design alone. The company split is described as April 2026: Moto365 continued with the product ecosystem, while Automoto became a separate company.

## 3D model credit

The hero uses **Car Concept**, optimized for glTF by Khronos, with model and textures credited to Eric Chadwick. It is distributed under **CC BY 4.0**. The matching fallback still is the model repository's Sample Viewer screenshot. The Khronos and 3D Commerce marks are excluded from the model licence, so the steering-wheel emblem is hidden and the license plate uses a neutral finish in this presentation. The model's authored root transform is preserved; the car stays upright while it rotates around the vertical Y axis. Its hood, door, body and wheel groups animate in the exploded view. This is a visual asset for the case-study intro, not an Automoto or Moto365 production vehicle. [Model source and attribution](https://github.com/KhronosGroup/glTF-Sample-Assets/tree/main/Models/CarConcept) · [License](https://github.com/KhronosGroup/glTF-Sample-Assets/blob/main/Models/CarConcept/LICENSE.md).

Studio reflections use the [Studio Small 01 HDRI by Greg Zaal](https://polyhaven.com/a/studio_small_01), provided by Poly Haven under CC0. The HDR image loads directly from Poly Haven; the generated studio map is the offline fallback.
