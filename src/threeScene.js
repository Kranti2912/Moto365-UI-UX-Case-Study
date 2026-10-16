/**
 * Three.js 3D Interactive Automotive Inspection & Telemetry Engine
 * Procedural 3D vehicle chassis, laser depth scan beam, and interactive panel targeting.
 */
import * as THREE from 'three';

export class Automotive3DViewer {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.options = Object.assign({
      carColor: 0x18181B, // Oberon Black / Deep Carbon
      accentColor: 0xFF4D15, // InspektAI Fiery Orange
      neonGreen: 0x00E575, // Diagnostic Emerald
      autoRotate: true,
      showGrid: true,
      interactive: true,
    }, options);

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.carGroup = null;
    this.scanBeam = null;
    this.scanRing = null;
    this.probeMarker = null;
    this.animationFrameId = null;

    // Interaction state
    this.isDragging = false;
    this.previousMousePosition = { x: 0, y: 0 };
    this.targetRotation = { x: 0.25, y: -0.6 };
    this.currentRotation = { x: 0.25, y: -0.6 };
    this.scanProgress = 0;
    this.focusedPanel = 'hood';

    this.init();
  }

  init() {
    const width = this.container.clientWidth || 600;
    const height = this.container.clientHeight || 420;

    // 1. Scene Setup
    this.scene = new THREE.Scene();
    this.scene.background = null; // Transparent canvas to integrate seamlessly into web layout

    // 2. Camera Setup
    this.camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    this.camera.position.set(4.5, 2.8, 5.2);
    this.camera.lookAt(0, 0.4, 0);

    // 3. Renderer Setup
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;
    this.container.appendChild(this.renderer.domElement);

    // 4. Studio Lighting
    this.setupLighting();

    // 5. Procedural 3D Vehicle Assembly (Composite 3-12 Part THREE.Group)
    this.buildProceduralVehicle();

    // 6. Holographic Floor Grid & Contact Shadow
    this.buildGroundTelemetry();

    // 7. Laser Inspection Scan Mechanism
    this.buildLaserScanRig();

    // 8. Event Listeners (Pointer Drag, Touch, Resize)
    this.setupEventListeners();

    // 9. Start Render Loop
    this.animate();
  }

  setupLighting() {
    // Warm Key Directional Light
    const keyLight = new THREE.DirectionalLight(0xFFFAF0, 2.4);
    keyLight.position.set(5, 7, 6);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 20;
    keyLight.shadow.camera.left = -4;
    keyLight.shadow.camera.right = 4;
    keyLight.shadow.camera.top = 4;
    keyLight.shadow.camera.bottom = -4;
    keyLight.shadow.bias = -0.0005;
    this.scene.add(keyLight);

    // Cool Fill Light (Rear / Left)
    const fillLight = new THREE.DirectionalLight(0xDCEBFF, 1.2);
    fillLight.position.set(-5, 4, -4);
    this.scene.add(fillLight);

    // Subtle Rim Light for Edge Highlights
    const rimLight = new THREE.DirectionalLight(0xFF4D15, 0.8);
    rimLight.position.set(0, 6, -6);
    this.scene.add(rimLight);

    // Ambient / Hemisphere Light
    const hemiLight = new THREE.HemisphereLight(0xFFFFFF, 0xE4E4E7, 0.75);
    this.scene.add(hemiLight);
  }

  buildProceduralVehicle() {
    this.carGroup = new THREE.Group();
    this.carGroup.position.set(0, 0, 0);

    // Materials
    const bodyMaterial = new THREE.MeshPhysicalMaterial({
      color: this.options.carColor,
      metalness: 0.85,
      roughness: 0.22,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });
    this.bodyMaterial = bodyMaterial;

    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x09090B,
      metalness: 0.9,
      roughness: 0.05,
      transmission: 0.85,
      transparent: true,
      opacity: 0.85,
    });

    const rimMaterial = new THREE.MeshStandardMaterial({
      color: 0xE4E4E7,
      metalness: 0.95,
      roughness: 0.15,
    });

    const tyreMaterial = new THREE.MeshStandardMaterial({
      color: 0x18181B,
      roughness: 0.85,
      metalness: 0.1,
    });

    const caliperMaterial = new THREE.MeshStandardMaterial({
      color: this.options.accentColor,
      metalness: 0.6,
      roughness: 0.3,
    });

    const ledWhite = new THREE.MeshBasicMaterial({ color: 0xF8FAFC });
    const ledRed = new THREE.MeshBasicMaterial({ color: 0xEF4444 });

    // 1. Lower Body / Chassis
    const lowerBodyGeo = new THREE.BoxGeometry(3.8, 0.55, 1.8);
    lowerBodyGeo.translate(0, 0.45, 0);
    const lowerBody = new THREE.Mesh(lowerBodyGeo, bodyMaterial);
    lowerBody.castShadow = true;
    lowerBody.receiveShadow = true;
    this.carGroup.add(lowerBody);

    // 2. Cabin / Greenhouse (Sloped Roof)
    const cabinGeo = new THREE.BoxGeometry(2.1, 0.65, 1.5);
    cabinGeo.translate(-0.15, 0.95, 0);
    const cabin = new THREE.Mesh(cabinGeo, glassMaterial);
    cabin.castShadow = true;
    this.carGroup.add(cabin);

    // 3. Roof Panel
    const roofGeo = new THREE.BoxGeometry(1.9, 0.06, 1.45);
    roofGeo.translate(-0.15, 1.3, 0);
    const roof = new THREE.Mesh(roofGeo, bodyMaterial);
    this.carGroup.add(roof);

    // 4. Bonnet / Hood (Tapered front)
    const hoodGeo = new THREE.BoxGeometry(1.0, 0.15, 1.65);
    hoodGeo.translate(1.25, 0.72, 0);
    const hood = new THREE.Mesh(hoodGeo, bodyMaterial);
    hood.rotation.z = -0.05;
    this.carGroup.add(hood);

    // 5. Front LED Headlight Strips
    const lightLGeo = new THREE.BoxGeometry(0.08, 0.08, 0.4);
    const lightLeft = new THREE.Mesh(lightLGeo, ledWhite);
    lightLeft.position.set(1.9, 0.62, 0.6);
    this.carGroup.add(lightLeft);

    const lightRight = new THREE.Mesh(lightLGeo, ledWhite);
    lightRight.position.set(1.9, 0.62, -0.6);
    this.carGroup.add(lightRight);

    // 6. Rear Tail light Strip
    const tailGeo = new THREE.BoxGeometry(0.05, 0.06, 1.6);
    const tailLight = new THREE.Mesh(tailGeo, ledRed);
    tailLight.position.set(-1.9, 0.65, 0);
    this.carGroup.add(tailLight);

    // 7. Wheels & Brake Calipers (4 Stations)
    const wheelPositions = [
      { x: 1.15, z: 0.95 },
      { x: 1.15, z: -0.95 },
      { x: -1.2, z: 0.95 },
      { x: -1.2, z: -0.95 },
    ];

    const wheelGeo = new THREE.CylinderGeometry(0.36, 0.36, 0.28, 28);
    wheelGeo.rotateX(Math.PI / 2);

    const rimGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.3, 16);
    rimGeo.rotateX(Math.PI / 2);

    const caliperGeo = new THREE.BoxGeometry(0.12, 0.18, 0.08);

    wheelPositions.forEach(pos => {
      const wheel = new THREE.Mesh(wheelGeo, tyreMaterial);
      wheel.position.set(pos.x, 0.36, pos.z);
      wheel.castShadow = true;

      const rim = new THREE.Mesh(rimGeo, rimMaterial);
      wheel.add(rim);

      const caliper = new THREE.Mesh(caliperGeo, caliperMaterial);
      caliper.position.set(0.1, 0.08, pos.z > 0 ? 0.08 : -0.08);
      wheel.add(caliper);

      this.carGroup.add(wheel);
    });

    // 8. Dynamic Target Hotspot Pins on Panels
    this.panelNodes = {
      hood: new THREE.Vector3(1.2, 0.85, 0),
      roof: new THREE.Vector3(-0.15, 1.38, 0),
      door: new THREE.Vector3(0.1, 0.65, 0.95),
      quarter: new THREE.Vector3(-1.3, 0.75, 0.95),
      tailgate: new THREE.Vector3(-1.85, 0.8, 0),
    };

    this.scene.add(this.carGroup);
  }

  buildGroundTelemetry() {
    // Holographic Circular Grid Floor
    const gridHelper = new THREE.PolarGridHelper(3.8, 16, 8, 32, 0xFF4D15, 0xE4E4E7);
    gridHelper.position.y = 0.01;
    this.scene.add(gridHelper);

    // Radial Contact Shadow Plane
    const shadowGeo = new THREE.PlaneGeometry(4.4, 2.5);
    shadowGeo.rotateX(-Math.PI / 2);

    // Procedural radial shadow canvas texture
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(128, 128, 10, 128, 128, 120);
    grad.addColorStop(0, 'rgba(0, 0, 0, 0.45)');
    grad.addColorStop(0.6, 'rgba(0, 0, 0, 0.15)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 256);

    const shadowTex = new THREE.CanvasTexture(canvas);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
    });

    const contactShadow = new THREE.Mesh(shadowGeo, shadowMat);
    contactShadow.position.y = 0.02;
    this.scene.add(contactShadow);
  }

  buildLaserScanRig() {
    // 1. Vertical Laser Scan Plane
    const scanPlaneGeo = new THREE.PlaneGeometry(0.04, 2.2);
    const scanPlaneMat = new THREE.MeshBasicMaterial({
      color: this.options.neonGreen,
      transparent: true,
      opacity: 0.65,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    this.scanBeam = new THREE.Mesh(scanPlaneGeo, scanPlaneMat);
    this.scanBeam.position.set(0, 1.0, 0);
    this.carGroup.add(this.scanBeam);

    // 2. Holographic Scanning Perimeter Ring
    const ringGeo = new THREE.RingGeometry(1.6, 1.64, 48);
    ringGeo.rotateX(-Math.PI / 2);
    const ringMat = new THREE.MeshBasicMaterial({
      color: this.options.accentColor,
      transparent: true,
      opacity: 0.7,
      side: THREE.DoubleSide,
    });
    this.scanRing = new THREE.Mesh(ringGeo, ringMat);
    this.scanRing.position.set(0, 0.05, 0);
    this.carGroup.add(this.scanRing);

    // 3. Active Panel Laser Probe Indicator
    const probeGeo = new THREE.SphereGeometry(0.07, 16, 16);
    const probeMat = new THREE.MeshBasicMaterial({ color: 0xFF4D15 });
    this.probeMarker = new THREE.Mesh(probeGeo, probeMat);
    this.probeMarker.position.copy(this.panelNodes.hood);
    this.carGroup.add(this.probeMarker);
  }

  setCarColor(hexColor) {
    if (this.bodyMaterial) {
      this.bodyMaterial.color.setHex(hexColor);
    }
  }

  focusPanel(panelKey) {
    if (this.panelNodes[panelKey]) {
      this.focusedPanel = panelKey;
      const targetPos = this.panelNodes[panelKey];
      this.probeMarker.position.copy(targetPos);

      // Smooth camera angle adjustment towards targeted panel
      if (panelKey === 'hood') {
        this.targetRotation.y = -0.5;
        this.targetRotation.x = 0.28;
      } else if (panelKey === 'roof') {
        this.targetRotation.y = -0.1;
        this.targetRotation.x = 0.75;
      } else if (panelKey === 'door' || panelKey === 'quarter') {
        this.targetRotation.y = -1.55;
        this.targetRotation.x = 0.18;
      } else if (panelKey === 'tailgate') {
        this.targetRotation.y = 2.8;
        this.targetRotation.x = 0.22;
      }
    }
  }

  setupEventListeners() {
    const el = this.renderer.domElement;

    const onPointerDown = (e) => {
      this.isDragging = true;
      this.options.autoRotate = false;
      this.previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onPointerMove = (e) => {
      if (!this.isDragging) return;
      const deltaX = e.clientX - this.previousMousePosition.x;
      const deltaY = e.clientY - this.previousMousePosition.y;

      this.targetRotation.y += deltaX * 0.008;
      this.targetRotation.x = Math.max(0.05, Math.min(1.2, this.targetRotation.x + deltaY * 0.008));

      this.previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = () => {
      this.isDragging = false;
    };

    el.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    // Touch events for mobile phones & tablets
    el.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        onPointerDown(e.touches[0]);
      }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (e.touches.length === 1 && this.isDragging) {
        onPointerMove(e.touches[0]);
      }
    }, { passive: true });

    window.addEventListener('touchend', onPointerUp);

    // Resize Observer
    window.addEventListener('resize', () => {
      if (!this.container || !this.renderer || !this.camera) return;
      const w = this.container.clientWidth;
      const h = this.container.clientHeight || 420;
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(w, h);
    });
  }

  animate() {
    this.animationFrameId = requestAnimationFrame(() => this.animate());

    // 1. Smooth Exponential Damping for Camera / Car Rotation
    if (this.options.autoRotate && !this.isDragging) {
      this.targetRotation.y += 0.004;
    }

    this.currentRotation.x += (this.targetRotation.x - this.currentRotation.x) * 0.08;
    this.currentRotation.y += (this.targetRotation.y - this.currentRotation.y) * 0.08;

    if (this.carGroup) {
      this.carGroup.rotation.y = this.currentRotation.y;
      this.carGroup.rotation.x = this.currentRotation.x * 0.25;
    }

    // 2. Animated Laser Scan Sweep
    this.scanProgress += 0.022;
    const scanX = Math.sin(this.scanProgress) * 1.85;

    if (this.scanBeam) {
      this.scanBeam.position.x = scanX;
      // Fade beam when reversing
      this.scanBeam.material.opacity = 0.45 + Math.abs(Math.cos(this.scanProgress)) * 0.4;
    }

    if (this.scanRing) {
      this.scanRing.scale.setScalar(1 + Math.sin(this.scanProgress * 1.5) * 0.08);
    }

    // 3. Probe Marker Pulsing
    if (this.probeMarker) {
      const s = 1 + Math.sin(this.scanProgress * 4) * 0.25;
      this.probeMarker.scale.set(s, s, s);
    }

    this.renderer.render(this.scene, this.camera);
  }

  destroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    if (this.renderer && this.renderer.domElement) {
      this.renderer.domElement.remove();
      this.renderer.dispose();
    }
  }
}
