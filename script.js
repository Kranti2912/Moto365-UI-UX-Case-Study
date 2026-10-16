(() => {
  const root = document.documentElement;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const themeButton = document.querySelector("#theme-toggle");
  const themeLabel = document.querySelector("#theme-label");
  const soundButton = document.querySelector("#sound-toggle");
  const menuButton = document.querySelector("#menu-toggle");
  const nav = document.querySelector(".main-nav");
  const navScrim = document.querySelector("#nav-scrim");
  const explodeButton = document.querySelector("#explode-toggle");
  const explodeLabel = document.querySelector("#explode-label");
  const explodeCaption = document.querySelector("#explode-caption");
  const soundLabel = document.querySelector(".sound-label");
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  let audioContext = null;
  let soundsOn = false;

  // Theme follows the visitor's last choice and stays fully functional without storage.
  let storedTheme = null;
  try { storedTheme = localStorage.getItem("moto365-case-theme"); } catch (_) {}
  const initialTheme = storedTheme || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  root.dataset.theme = initialTheme;
  updateThemeLabel();
  themeButton?.addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    try { localStorage.setItem("moto365-case-theme", root.dataset.theme); } catch (_) {}
    updateThemeLabel();
    updateThreeTheme();
    playTick(560);
  });
  function updateThemeLabel() {
    if (!themeButton) return;
    const dark = root.dataset.theme === "dark";
    themeLabel.textContent = dark ? "Light" : "Dark";
    themeButton.setAttribute("aria-label", `Switch to ${dark ? "light" : "dark"} mode`);
    themeButton.setAttribute("aria-pressed", String(dark));
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", dark ? "#111311" : "#f4f3ef");
  }

  // The small interface chime is opt-in. It is intentionally quiet and generated locally.
  soundButton?.addEventListener("click", () => {
    soundsOn = !soundsOn;
    soundButton.setAttribute("aria-pressed", String(soundsOn));
    soundButton.setAttribute("aria-label", soundsOn ? "Turn interface sounds off" : "Turn interface sounds on");
    soundLabel.textContent = soundsOn ? "SOUND ON" : "SOUND OFF";
    if (soundsOn) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (AC) {
        audioContext ||= new AC();
        audioContext.resume?.();
        playTick(440);
        window.setTimeout(() => playTick(660), 90);
      }
    }
  });
  function playTick(frequency = 520) {
    if (!soundsOn || !audioContext) return;
    const now = audioContext.currentTime;
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(frequency, now);
    gain.gain.setValueAtTime(.0001, now);
    gain.gain.exponentialRampToValueAtTime(.018, now + .012);
    gain.gain.exponentialRampToValueAtTime(.0001, now + .11);
    oscillator.connect(gain).connect(audioContext.destination);
    oscillator.start(now);
    oscillator.stop(now + .12);
  }

  // Responsive navigation is kept small enough to remain out of the story's way.
  function closeMenu() {
    document.body.classList.remove("nav-open");
    menuButton?.setAttribute("aria-expanded", "false");
    menuButton?.setAttribute("aria-label", "Open navigation");
  }
  menuButton?.addEventListener("click", () => {
    const open = document.body.classList.toggle("nav-open");
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    playTick(500);
  });
  navScrim?.addEventListener("click", closeMenu);
  nav?.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));

  // Native scroll progress works even when the optional smooth-scroll library is unavailable.
  const progress = document.querySelector("#scroll-meter-fill");
  const updateProgress = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
  };
  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);
  updateProgress();

  // Three.js vehicle: a locally bundled, detailed GLB with real authored component groups.
  const THREE = window.THREE;
  const canvas = document.querySelector("#car-canvas");
  const heroStage = document.querySelector("#hero-stage");
  let renderer, scene, camera, carRig, vehicleModel, shadowPad, groundShadow, studioRenderTarget, studioFallbackEnvironment, carParts = [], carJoints = [], exploded = false;
  let webglReady = false, explodedRotation = null;
  const targetRotation = { y: -.62 };
  const pointer = { down: false, x: 0 };

  if (THREE && THREE.GLTFLoader && canvas) {
    try {
      initVehicle();
      webglReady = true;
      updateThreeTheme();
    } catch (error) {
      console.warn("3D vehicle unavailable; keeping the page content available.", error);
      showVehicleFallback();
    }
  } else showVehicleFallback();

  function showVehicleFallback() {
    heroStage?.classList.remove("model-loading");
    heroStage?.classList.add("no-webgl");
    if (explodeButton) {
      explodeButton.disabled = true;
      explodeButton.title = "The exploded view requires WebGL";
      explodeLabel.textContent = "3D view unavailable";
    }
  }

  function initVehicle() {
    heroStage?.classList.add("model-loading");
    if (explodeButton) {
      explodeButton.disabled = true;
      explodeLabel.textContent = "Loading model";
    }

    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.7));
    renderer.setSize(canvas.clientWidth || window.innerWidth * .6, canvas.clientHeight || 600, false);
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    scene = new THREE.Scene();
    studioFallbackEnvironment = createStudioEnvironment();
    scene.environment = studioFallbackEnvironment;
    loadStudioEnvironment();
    camera = new THREE.PerspectiveCamera(34, 1, .1, 100);
    camera.position.set(4.2, 2.7, 7.7);
    camera.lookAt(0, .62, 0);

    const hemisphere = new THREE.HemisphereLight(0xf5f8ff, 0x414449, 1.35);
    scene.add(hemisphere);
    const key = new THREE.DirectionalLight(0xfff7ef, 2.3);
    key.position.set(-4, 7, 5);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.camera.left = -5.5;
    key.shadow.camera.right = 5.5;
    key.shadow.camera.top = 4.5;
    key.shadow.camera.bottom = -4.5;
    key.shadow.camera.near = .1;
    key.shadow.camera.far = 18;
    key.shadow.bias = -.0002;
    key.shadow.normalBias = .018;
    key.shadow.radius = 3;
    scene.add(key);
    const frontFill = new THREE.DirectionalLight(0xe3ecff, 1.65);
    frontFill.position.set(5, 3, 7); scene.add(frontFill);
    const rim = new THREE.DirectionalLight(0xff9a70, 1.4);
    rim.position.set(3, 3, -5); scene.add(rim);
    const floorFill = new THREE.DirectionalLight(0xffffff, .45);
    floorFill.position.set(-3, -2, 3); scene.add(floorFill);

    groundShadow = new THREE.Mesh(
      new THREE.PlaneGeometry(40, 40),
      new THREE.ShadowMaterial({ color: 0x20242a, opacity: root.dataset.theme === "dark" ? .34 : .22 })
    );
    groundShadow.rotation.x = -Math.PI / 2;
    groundShadow.position.y = 0;
    groundShadow.receiveShadow = true;
    scene.add(groundShadow);

    carRig = new THREE.Group();
    carRig.position.y = .7;
    carRig.rotation.x = 0;
    carRig.rotation.y = targetRotation.y;
    scene.add(carRig);

    shadowPad = new THREE.Mesh(
      new THREE.CircleGeometry(1, 64),
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
        map: createContactShadowTexture(),
        transparent: true,
        opacity: root.dataset.theme === "dark" ? .42 : .5,
        depthWrite: false
      })
    );
    shadowPad.rotation.x = -Math.PI / 2;
    shadowPad.position.y = .02;
    shadowPad.scale.set(1.55, 2.75, 1);
    scene.add(shadowPad);

    const resize = () => {
      if (!renderer || !camera) return;
      const width = canvas.clientWidth || window.innerWidth;
      const height = canvas.clientHeight || window.innerHeight * .7;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, window.innerWidth < 580 ? 1.3 : 1.65));
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.position.set(
        window.innerWidth < 580 ? 3.3 : window.innerWidth < 850 ? 3.8 : 4.2,
        window.innerWidth < 580 ? 2.7 : 2.85,
        window.innerWidth < 580 ? 9.2 : window.innerWidth < 850 ? 8.5 : 7.7
      );
      camera.lookAt(0, .62, 0);
      camera.updateProjectionMatrix();
      carRig.scale.setScalar(window.innerWidth < 580 ? .82 : window.innerWidth < 850 ? .9 : 1);
    };
    window.addEventListener("resize", resize);
    resize();

    const render = () => {
      requestAnimationFrame(render);
      if (!renderer || !scene || !camera) return;
      if (!pointer.down && !prefersReducedMotion) targetRotation.y += .00032;
      carRig.rotation.y += (targetRotation.y - carRig.rotation.y) * .045;
      carRig.rotation.x = 0;
      renderer.render(scene, camera);
    };
    render();

    canvas.addEventListener("pointerdown", event => {
      pointer.down = true; pointer.x = event.clientX;
      canvas.setPointerCapture?.(event.pointerId);
    });
    canvas.addEventListener("pointermove", event => {
      if (!pointer.down) return;
      const dx = event.clientX - pointer.x;
      targetRotation.y += dx * .007;
      pointer.x = event.clientX;
    });
    const releasePointer = () => { pointer.down = false; };
    canvas.addEventListener("pointerup", releasePointer);
    canvas.addEventListener("pointercancel", releasePointer);

    const loader = new THREE.GLTFLoader();
    const modelUrl = window.location.protocol === "file:"
      ? "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/CarConcept/glTF-Binary/CarConcept.glb"
      : "./assets/car-concept.glb";
    loader.load(
      modelUrl,
      gltf => {
        try { mountVehicle(gltf); }
        catch (error) {
          console.warn("The 3D vehicle could not be prepared.", error);
          showVehicleFallback();
        }
      },
      undefined,
      error => {
        console.warn("CarConcept could not be loaded; showing its matching red-car image fallback.", error);
        showVehicleFallback();
      }
    );
  }

  function createContactShadowTexture() {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 256;
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createRadialGradient(128, 128, 8, 128, 128, 126);
    gradient.addColorStop(0, "rgba(15,18,22,.42)");
    gradient.addColorStop(.32, "rgba(15,18,22,.22)");
    gradient.addColorStop(.72, "rgba(15,18,22,.06)");
    gradient.addColorStop(1, "rgba(15,18,22,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 256);
    return new THREE.CanvasTexture(canvas);
  }

  function loadStudioEnvironment() {
    if (!THREE.RGBELoader || !renderer) return;
    let pmrem;
    try {
      pmrem = new THREE.PMREMGenerator(renderer);
      pmrem.compileEquirectangularShader();
      new THREE.RGBELoader().setDataType(THREE.UnsignedByteType).load(
        "https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/studio_small_01_1k.hdr",
        texture => {
          try {
            texture.mapping = THREE.EquirectangularReflectionMapping;
            studioRenderTarget = pmrem.fromEquirectangular(texture);
            scene.environment = studioRenderTarget.texture;
            studioFallbackEnvironment?.dispose();
          } catch (error) {
            console.warn("Using the generated studio reflections instead of the HDR map.", error);
          } finally {
            texture.dispose();
            pmrem.dispose();
          }
        },
        undefined,
        () => pmrem.dispose()
      );
    } catch (error) {
      pmrem?.dispose();
      console.warn("Using the generated studio reflections instead of the HDR map.", error);
    }
  }

  function createStudioEnvironment() {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");
    const sky = ctx.createLinearGradient(0, 0, 0, canvas.height);
    sky.addColorStop(0, "#d8e1e9");
    sky.addColorStop(.36, "#f7f5f0");
    sky.addColorStop(.53, "#89909a");
    sky.addColorStop(.68, "#d9d7d1");
    sky.addColorStop(1, "#59616b");
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const softbox = (x, width, alpha = .82) => {
      const panel = ctx.createLinearGradient(x, 0, x + width, 0);
      panel.addColorStop(0, "rgba(255,255,255,0)");
      panel.addColorStop(.2, `rgba(255,255,255,${alpha * .28})`);
      panel.addColorStop(.5, `rgba(255,255,255,${alpha})`);
      panel.addColorStop(.8, `rgba(255,255,255,${alpha * .28})`);
      panel.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = panel;
      ctx.fillRect(x, 32, width, 365);
    };
    softbox(105, 136, .7);
    softbox(425, 82, .58);
    softbox(760, 150, .92);
    ctx.fillStyle = "rgba(22,28,36,.45)";
    ctx.fillRect(0, 396, canvas.width, 116);
    const floorGlow = ctx.createRadialGradient(520, 420, 8, 520, 420, 350);
    floorGlow.addColorStop(0, "rgba(255,255,255,.7)");
    floorGlow.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = floorGlow;
    ctx.fillRect(150, 320, 740, 192);
    const environment = new THREE.CanvasTexture(canvas);
    environment.mapping = THREE.EquirectangularReflectionMapping;
    environment.encoding = THREE.sRGBEncoding;
    environment.needsUpdate = true;
    return environment;
  }

  function mountVehicle(gltf) {
    const source = gltf.scene;
    // CarConcept's root node already carries its authored up-axis conversion. Keep it intact.
    source.updateMatrixWorld(true);
    const bounds = new THREE.Box3().setFromObject(source);
    const center = bounds.getCenter(new THREE.Vector3());
    const size = bounds.getSize(new THREE.Vector3());
    const longestAxis = Math.max(size.x, size.z);
    const modelScale = longestAxis > 0 ? Math.min(1.25, 5.1 / longestAxis) : 1;
    carRig.position.y = .08;

    vehicleModel = new THREE.Group();
    vehicleModel.name = "Car Concept · display scale";
    vehicleModel.scale.setScalar(modelScale);
    vehicleModel.position.set(-center.x * modelScale, -bounds.min.y * modelScale, -center.z * modelScale);
    vehicleModel.add(source);
    carRig.add(vehicleModel);
    if (gsap && !prefersReducedMotion) {
      vehicleModel.scale.setScalar(modelScale * .93);
      gsap.to(vehicleModel.scale, { x: modelScale, y: modelScale, z: modelScale, duration: .95, ease: "back.out(1.25)" });
    }

    source.traverse(object => {
      if (object.isMesh) {
        object.castShadow = true;
        object.receiveShadow = true;
      }
    });

    const carRoot = source.getObjectByName("BodyUnderside") || source;
    const createLayer = (label, names, offset) => {
      const roots = names.map(name => carRoot.children.find(child => child.name === name)).filter(Boolean);
      if (!roots.length) return null;
      const layer = new THREE.Group();
      layer.name = label;
      layer.userData.partNodes = roots;
      carRoot.add(layer);
      roots.forEach(object => layer.attach(object));
      const home = layer.position.clone();
      const target = home.clone().add(new THREE.Vector3(offset[0], offset[1], offset[2]));
      carParts.push({ object: layer, home, exploded: target });
      return layer;
    };

    // Move the real authored part groups, keeping each part's original pivot and child meshes.
    const hoodLayer = createLayer("Hood assembly", ["BodyHood"], [0, -.22, .36]);
    createLayer("Roof panel", ["BodyRoofPanel"], [0, 0, .42]);
    createLayer("Rear body and hatch", ["BodyRearPanelsColor1"], [0, .26, .24]);
    createLayer("Front windshield", ["BodyWindshield", "BodyWindshieldGasket", "BodyWindshieldWipers", "BodyWindshieldWipersBase"], [0, 0, .19]);
    const driverDoorLayer = createLayer("Driver door assembly", ["BodyDoorLColor1"], [.42, 0, .03]);
    const passengerDoorLayer = createLayer("Passenger door assembly", ["BodyDoorRColor1"], [-.42, 0, .03]);
    createLayer("Cabin and controls", carRoot.children.filter(child => child.name.startsWith("Interior") && child.name !== "InteriorSteeringEmblem").map(child => child.name), [0, 0, .31]);
    createLayer("Engine", ["Engine"], [0, -.08, .24]);
    createLayer("Front left wheel", ["WheelFrontL"], [.32, -.08, -.08]);
    createLayer("Front right wheel", ["WheelFrontR"], [-.32, -.08, -.08]);
    createLayer("Rear left wheel", ["WheelRearL"], [.32, .08, -.08]);
    createLayer("Rear right wheel", ["WheelRearR"], [-.32, .08, -.08]);
    createLayer("Axles", ["Axles"], [0, 0, -.34]);

    const addJoint = (layer, name, axis, angle) => {
      const object = layer?.userData.partNodes.find(part => part.name === name);
      if (!object) return;
      const home = object.rotation.clone();
      const open = home.clone();
      open[axis] += angle;
      carJoints.push({ object, home, exploded: open });
    };
    addJoint(hoodLayer, "BodyHood", "x", .5);
    addJoint(driverDoorLayer, "BodyDoorLColor1", "z", -.52);
    addJoint(passengerDoorLayer, "BodyDoorRColor1", "z", .52);

    // The model includes Khronos and 3D Commerce marks, which are outside the asset licence.
    // Keep the plate geometry, but give it a plain neutral finish; remove only the steering emblem.
    const plate = carRoot.getObjectByName("License Plate");
    const plateMaterials = plate ? (Array.isArray(plate.material) ? plate.material : [plate.material]) : [];
    plateMaterials.forEach(material => {
      material.map = null;
      material.color?.set("#e5e8e9");
      material.needsUpdate = true;
    });
    const steeringEmblem = carRoot.getObjectByName("InteriorSteeringEmblem");
    if (steeringEmblem) steeringEmblem.visible = false;
    heroStage?.classList.remove("model-loading", "no-webgl");
    canvas.setAttribute("aria-label", "Interactive realistic 3D car. Drag horizontally to rotate around its vertical axis; use Explode view to separate the hood, doors, cabin, engine and wheel assemblies.");
    webglReady = true;
    if (explodeButton) {
      explodeButton.disabled = false;
      explodeButton.title = "Separate the car's body, cabin, wheels and mechanical layers";
      explodeLabel.textContent = "Explode view";
    }
    updateThreeTheme();
  }
  function updateThreeTheme() {
    if (!renderer) return;
    const dark = root.dataset.theme === "dark";
    renderer.toneMappingExposure = dark ? 1.06 : .96;
    if (scene) {
      const hemisphere = scene.children.find(child => child.isHemisphereLight);
      const frontFill = scene.children.find(child => child.isDirectionalLight && child.position.x > 0 && child.position.z > 0);
      if (hemisphere) hemisphere.intensity = dark ? 1.55 : 1.35;
      if (frontFill) frontFill.intensity = dark ? 1.9 : 1.65;
    }
    if (shadowPad?.material) {
      shadowPad.material.opacity = dark ? .42 : .5;
    }
    if (groundShadow?.material) groundShadow.material.opacity = dark ? .34 : .22;
  }

  explodeButton?.addEventListener("click", () => {
    if (!carParts.length) return;
    if (!exploded) {
      explodedRotation = targetRotation.y;
      targetRotation.y += .12;
    } else if (explodedRotation !== null) {
      targetRotation.y = explodedRotation;
      explodedRotation = null;
    }
    exploded = !exploded;
    explodeButton.setAttribute("aria-pressed", String(exploded));
    explodeLabel.textContent = exploded ? "Reassemble" : "Explode view";
    explodeCaption?.classList.toggle("is-visible", exploded);
    playTick(exploded ? 690 : 480);
    if (gsap && !prefersReducedMotion) {
      carParts.forEach(({ object, home, exploded: target }, index) => {
        gsap.to(object.position, { x: exploded ? target.x : home.x, y: exploded ? target.y : home.y, z: exploded ? target.z : home.z, duration: 1.05, delay: index * .035, ease: "power3.inOut", overwrite: "auto" });
      });
      carJoints.forEach(({ object, home, exploded: target }, index) => {
        gsap.to(object.rotation, { x: exploded ? target.x : home.x, y: exploded ? target.y : home.y, z: exploded ? target.z : home.z, duration: .92, delay: .14 + index * .08, ease: "power3.inOut", overwrite: "auto" });
      });
      if (shadowPad) gsap.to(shadowPad.scale, { x: exploded ? 1.85 : 1.55, y: exploded ? 3.2 : 2.75, duration: .8, ease: "power2.out" });
    } else {
      carParts.forEach(({ object, home, exploded: target }) => object.position.copy(exploded ? target : home));
      carJoints.forEach(({ object, home, exploded: target }) => object.rotation.copy(exploded ? target : home));
      if (shadowPad) shadowPad.scale.set(exploded ? 1.85 : 1.55, exploded ? 3.2 : 2.75, 1);
    }
  });

  // GSAP reveals and count-ups; IntersectionObserver below covers older or offline browsers.
  const revealItems = [...document.querySelectorAll("[data-reveal], .reveal-scale")];
  if (gsap && ScrollTrigger && !prefersReducedMotion) {
    root.classList.add("js-ready");
    gsap.registerPlugin(ScrollTrigger);
    const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
    intro.to(".hero-copy > *", { opacity: 1, y: 0, duration: .8, stagger: .1 }, .1)
      .to(".hero-meta", { opacity: 1, y: 0, duration: .6 }, .55)
      .to(".hero-stage", { opacity: 1, duration: 1 }, .12)
      .to(".stage-index, .inspection-chip, .stage-controls", { opacity: 1, y: 0, duration: .6, stagger: .11 }, .8);
    revealItems.forEach(element => gsap.to(element, { opacity: 1, y: 0, scale: 1, duration: .8, ease: "power3.out", scrollTrigger: { trigger: element, start: "top 87%", once: true } }));
    document.querySelectorAll(".count").forEach(el => {
      const end = Number(el.dataset.count || el.textContent);
      const value = { n: 0 };
      gsap.to(value, { n: end, duration: 1.4, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%", once: true }, onUpdate: () => el.textContent = String(Math.round(value.n)) });
    });
    document.querySelectorAll(".main-nav a").forEach(anchor => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) ScrollTrigger.create({ trigger: target, start: "top 35%", end: "bottom 35%", onToggle: self => anchor.classList.toggle("nav-active", self.isActive) });
    });
    ScrollTrigger.create({ trigger: ".journey-rail", start: "top 82%", once: true, onEnter: () => gsap.to(".journey-progress", { width: "76%", duration: 1.25, ease: "power2.out" }) });
    ScrollTrigger.create({ trigger: ".pdi-visual", start: "top 90%", end: "bottom 12%", scrub: .7, onUpdate: self => { if (carRig && !pointer.down) targetRotation.y = -.35 + self.progress * .44; } });
  } else {
    revealItems.forEach(item => { item.style.opacity = "1"; item.style.transform = "none"; });
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(entries => entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add("is-in"); io.unobserve(entry.target); }
      }), { threshold: .1 });
      document.querySelectorAll(".journey-rail, .impact-card, .process-line article").forEach(item => io.observe(item));
    }
  }

  // Lenis is optional. Native scroll remains available if the CDN cannot be reached.
  if (!prefersReducedMotion && gsap && ScrollTrigger) {
    import("https://cdn.jsdelivr.net/npm/lenis@1.1.20/+esm").then(({ default: Lenis }) => {
      const lenis = new Lenis({ duration: 1.08, smoothWheel: true, touchMultiplier: 1.1 });
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(time => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
      window.__moto365Lenis = lenis;
    }).catch(() => {});
  }

  // WebGL failures are handled during setup; loading the local model remains asynchronous.
  if (!webglReady) showVehicleFallback();
})();
