(() => {
  const root = document.documentElement;
  const themeButton = document.querySelector("#theme-toggle");
  const themeLabel = document.querySelector("#theme-label");
  const soundButton = document.querySelector("#sound-toggle");
  const soundLabel = document.querySelector(".sound-label");
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  let audioContext = null;
  let engine = null;
  let soundsOn = false;
  let lastScrollCueAt = 0;
  let lastScrollCueY = window.scrollY;

  let storedTheme = null;
  try { storedTheme = localStorage.getItem("moto365-case-theme"); } catch (_) {}
  root.dataset.theme = storedTheme || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  updateThemeLabel();

  themeButton?.addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    try { localStorage.setItem("moto365-case-theme", root.dataset.theme); } catch (_) {}
    updateThemeLabel();
    document.dispatchEvent(new CustomEvent("moto365:themechange", { detail: { theme: root.dataset.theme } }));
  });

  function updateThemeLabel() {
    if (!themeButton) return;
    const dark = root.dataset.theme === "dark";
    themeLabel.textContent = dark ? "Light" : "Dark";
    themeButton.setAttribute("aria-label", `Switch to ${dark ? "light" : "dark"} mode`);
    themeButton.setAttribute("aria-pressed", String(dark));
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", dark ? "#111311" : "#f4f3ef");
  }

  function getAudioContext() {
    if (!AudioContextClass) return null;
    audioContext ||= new AudioContextClass();
    if (audioContext.state === "suspended") audioContext.resume().catch(() => {});
    return audioContext;
  }

  function setSoundState(on) {
    soundsOn = on;
    soundButton?.setAttribute("aria-pressed", String(on));
    soundButton?.setAttribute("aria-label", on ? "Turn engine ambience and interface sounds off" : "Turn engine ambience and interface sounds on");
    if (soundLabel) soundLabel.textContent = on ? "AMBIENCE ON" : "SOUND OFF";
    if (on) startEngine(); else fadeEngineOut();
  }

  soundButton?.addEventListener("click", () => setSoundState(!soundsOn));

  function startEngine() {
    const context = getAudioContext();
    if (!context) {
      if (soundLabel) soundLabel.textContent = "AUDIO UNAVAILABLE";
      return;
    }
    if (engine) {
      if (engine.stopTimer) window.clearTimeout(engine.stopTimer);
      engine.master.gain.cancelScheduledValues(context.currentTime);
      engine.master.gain.setTargetAtTime(.06, context.currentTime, .8);
      return;
    }

    const now = context.currentTime;
    const master = context.createGain();
    master.gain.setValueAtTime(.0001, now);
    master.gain.setTargetAtTime(.06, now, 1.1);
    master.connect(context.destination);

    const lowPass = context.createBiquadFilter();
    lowPass.type = "lowpass";
    lowPass.frequency.value = 170;
    lowPass.Q.value = .55;
    lowPass.connect(master);

    const crank = context.createOscillator();
    crank.type = "sine";
    crank.frequency.value = 37;
    const crankGain = context.createGain();
    crankGain.gain.value = .085;
    crank.connect(crankGain).connect(lowPass);

    const harmonic = context.createOscillator();
    harmonic.type = "triangle";
    harmonic.frequency.value = 74;
    const harmonicGain = context.createGain();
    harmonicGain.gain.value = .016;
    harmonic.connect(harmonicGain).connect(lowPass);

    const rpmWaver = context.createOscillator();
    rpmWaver.type = "sine";
    rpmWaver.frequency.value = .075;
    const crankWaver = context.createGain();
    crankWaver.gain.value = 1.15;
    rpmWaver.connect(crankWaver).connect(crank.frequency);
    const harmonicWaver = context.createGain();
    harmonicWaver.gain.value = 2.3;
    rpmWaver.connect(harmonicWaver).connect(harmonic.frequency);

    const buffer = context.createBuffer(1, context.sampleRate, context.sampleRate);
    const channel = buffer.getChannelData(0);
    for (let i = 0; i < channel.length; i += 1) channel[i] = (Math.random() * 2 - 1) * .28;
    const air = context.createBufferSource();
    air.buffer = buffer;
    air.loop = true;
    const airFilter = context.createBiquadFilter();
    airFilter.type = "lowpass";
    airFilter.frequency.value = 112;
    const airGain = context.createGain();
    airGain.gain.value = .004;
    air.connect(airFilter).connect(airGain).connect(master);

    [crank, harmonic, rpmWaver].forEach(node => node.start(now));
    air.start(now);
    engine = { master, nodes: [crank, harmonic, rpmWaver, air], stopTimer: null };
    document.documentElement.classList.add("audio-active");
  }

  function fadeEngineOut() {
    if (!engine || !audioContext) return;
    const current = engine;
    current.master.gain.cancelScheduledValues(audioContext.currentTime);
    current.master.gain.setTargetAtTime(.0001, audioContext.currentTime, .12);
    current.stopTimer = window.setTimeout(() => {
      current.nodes.forEach(node => { try { node.stop(); } catch (_) {} });
      if (engine === current) engine = null;
      document.documentElement.classList.remove("audio-active");
    }, 650);
  }

  function playClickSfx(baseFrequency = 620) {
    if (!soundsOn) return;
    const context = getAudioContext();
    if (!context) return;
    const now = context.currentTime;
    const oscillator = context.createOscillator();
    const envelope = context.createGain();
    const filter = context.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 1800;
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(baseFrequency, now);
    oscillator.frequency.exponentialRampToValueAtTime(Math.max(220, baseFrequency * .72), now + .08);
    envelope.gain.setValueAtTime(.0001, now);
    envelope.gain.exponentialRampToValueAtTime(.009, now + .008);
    envelope.gain.exponentialRampToValueAtTime(.0001, now + .095);
    oscillator.connect(filter).connect(envelope).connect(context.destination);
    oscillator.start(now);
    oscillator.stop(now + .1);
  }

  function playScrollSfx() {
    if (!soundsOn) return;
    const context = getAudioContext();
    if (!context) return;
    const now = context.currentTime;
    const oscillator = context.createOscillator();
    const envelope = context.createGain();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(540, now);
    oscillator.frequency.exponentialRampToValueAtTime(390, now + .065);
    envelope.gain.setValueAtTime(.0001, now);
    envelope.gain.exponentialRampToValueAtTime(.0035, now + .006);
    envelope.gain.exponentialRampToValueAtTime(.0001, now + .075);
    oscillator.connect(envelope).connect(context.destination);
    oscillator.start(now);
    oscillator.stop(now + .08);
  }

  // The sound switch is opt-in. A soft scroll cue is throttled so fast reading never becomes a rattle.
  document.addEventListener("click", event => {
    const origin = event.target instanceof Element ? event.target : event.target?.parentElement;
    const control = origin?.closest("a, button, [role='button'], summary");
    if (!control || control.hasAttribute("data-sfx-silent")) return;
    playClickSfx();
  });

  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    const now = performance.now();
    if (Math.abs(y - lastScrollCueY) >= 360 && now - lastScrollCueAt >= 850) {
      playScrollSfx();
      lastScrollCueY = y;
      lastScrollCueAt = now;
    }
  }, { passive: true });

  document.addEventListener("visibilitychange", () => {
    if (!audioContext) return;
    if (document.hidden) audioContext.suspend().catch(() => {});
    else if (soundsOn) audioContext.resume().catch(() => {});
  });

  window.moto365UI = { playClickSfx, playScrollSfx, get soundsOn() { return soundsOn; } };
})();
