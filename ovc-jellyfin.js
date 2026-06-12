/* ═══════════════════════════════════════════════════════════════════════
   OCEAN VIEW CINEMA — Jellyfin Theme CSS
   OVC-V4.css
   ═══════════════════════════════════════════════════════════════════════
   Applies the Ocean View Cinema aesthetic to Jellyfin's web interface.
   Targets Jellyfin's native DOM structure without breaking functionality.
   ═══════════════════════════════════════════════════════════════════════ */

@import url('https://fonts.googleapis.com/css2?family=Permanent+Marker&family=Share+Tech+Mono&family=Spectral+SC:ital,wght@0,300;0,400;0,600;1,300&display=swap');

/* ═══════════════════════════════════════════════════════
   ROOT VARIABLES
═══════════════════════════════════════════════════════ */
:root {
  --cyan: #00f0ff;
  --cyan-glow: rgba(0,240,255,0.2);
  --glyph-muted: rgba(140, 178, 212, 0.3);
  --glyph-active: #00f0ff;
  
  /* Glass fill — nearly transparent */
  --gf: rgba(195, 220, 255, 0.038);
  --gb: blur(26px) saturate(300%) brightness(1.12);
  
  /* Glass edges */
  --ge-t: rgba(255,255,255,0.52);
  --ge-s: rgba(255,255,255,0.11);
  --ge-b: rgba(0,0,0,0.55);
  
  /* Fonts */
  --font-d: 'Permanent Marker', cursive;
  --font-m: 'Share Tech Mono', monospace;
  --font-b: 'Spectral SC', serif;
  
  /* Text colors */
  --ink:  rgba(225, 242, 255, 0.9);
  --ink2: rgba(180, 212, 238, 0.45);
  --ink3: rgba(140, 178, 212, 0.3);
}

/* ═══════════════════════════════════════════════════════
   GLOBAL RESETS
═══════════════════════════════════════════════════════ */
* { box-sizing: border-box; }
html, body { 
  height: 100%; 
  overflow-x: hidden; 
  -webkit-font-smoothing: antialiased;
  margin: 0;
  padding: 0;
}

body {
  color: var(--ink);
  font-family: var(--font-m);
  background: #000001;
}

@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* ═══════════════════════════════════════════════════════
   BACKGROUND SYSTEM — Void + Vignette
═══════════════════════════════════════════════════════ */

/* Jellyfin's background container — replace with void gradient */
.backgroundContainer,
.dialog,
html {
  background: radial-gradient(
    ellipse 110% 110% at 50% 50%,
    #000001 0%,
    #000103 18%,
    #010408 38%,
    #020810 58%,
    #030c18 78%,
    #050e1e 100%
  ) !important;
}

/* Vignette overlay */
.backgroundContainer::before {
  content: '';
  position: fixed;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background: radial-gradient(
    ellipse 80% 80% at 50% 50%,
    transparent 40%,
    rgba(1,2,4,0.35) 100%
  );
}

/* ═══════════════════════════════════════════════════════
   GRID INJECTION STYLES
   (Grids are injected by JS into .mainAnimatedPages)
═══════════════════════════════════════════════════════ */

#ovc-grid-far,
#ovc-grid-near {
  position: absolute;
  pointer-events: none;
  width: 100%;
  z-index: 0;
  contain: layout;
}

#ovc-grid-far {
  top: -10%; left: -10%; right: -10%; bottom: -10%; width: 120%;
  background-image:
    linear-gradient(rgba(0,240,255,0.028) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,240,255,0.028) 1px, transparent 1px);
  background-size: 88px 88px;
  z-index: 1;
  mask-image: radial-gradient(
    ellipse 62% 62% at 50% 50%,
    black 10%,
    rgba(0,0,0,0.7) 38%,
    rgba(0,0,0,0.3) 60%,
    transparent 78%
  );
  -webkit-mask-image: radial-gradient(
    ellipse 62% 62% at 50% 50%,
    black 10%,
    rgba(0,0,0,0.7) 38%,
    rgba(0,0,0,0.3) 60%,
    transparent 78%
  );
}

#ovc-grid-near {
  top: -8%; left: -8%; right: -8%; bottom: -8%; width: 116%;
  background-image:
    linear-gradient(rgba(0,240,255,0.045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,240,255,0.045) 1px, transparent 1px);
  background-size: 44px 44px;
  z-index: 2;
  mask-image: radial-gradient(
    ellipse 68% 68% at 50% 50%,
    black 15%,
    rgba(0,0,0,0.75) 42%,
    rgba(0,0,0,0.28) 62%,
    transparent 80%
  );
  -webkit-mask-image: radial-gradient(
    ellipse 68% 68% at 50% 50%,
    black 15%,
    rgba(0,0,0,0.75) 42%,
    rgba(0,0,0,0.28) 62%,
    transparent 80%
  );
}

/* Center light — injected by JS */
#ovc-center-light {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: rgba(0, 240, 255, 0.9);
  pointer-events: none;
  z-index: 1;
  will-change: transform;
  box-shadow:
    0 0 8px rgba(0,240,255,0.8),
    0 0 16px rgba(0,240,255,0.6),
    0 0 32px rgba(0,240,255,0.4),
    0 0 64px rgba(0,240,255,0.2),
    0 0 128px rgba(0,240,255,0.1),
    0 0 256px rgba(0,240,255,0.05),
    0 0 320px rgba(0,240,255,0.02);
}

/* ═══════════════════════════════════════════════════════
   LIQUID GLASS MIXIN
   Applied to all major containers
═══════════════════════════════════════════════════════ */

.g {
  background: var(--gf);
  backdrop-filter: var(--gb);
  -webkit-backdrop-filter: var(--gb);
  border-radius: 16px;
  box-shadow:
    inset 0  1px 0   rgba(255,255,255,0.55),
    inset 0 -1px 0   rgba(0,0,0,0.38),
    inset  1px 0 0   rgba(255,255,255,0.12),
    inset -1px 0 0   rgba(255,255,255,0.12),
    0  2px  4px rgba(0,0,0,0.3),
    0  8px 24px rgba(0,0,0,0.2),
    0 28px 56px rgba(0,0,0,0.15);
  border: 1px solid rgba(255,255,255,0.09);
  position: relative;
  overflow: hidden;
}

@supports not (backdrop-filter: blur(1px)) {
  .g {
    background: rgba(195, 220, 255, 0.12) !important;
  }
}

.g::before {
  content: '';
  position: absolute;
  top: 1px; left: 6%; right: 22%;
  height: 1px;
  background: linear-gradient(90deg,
    transparent 0%,
    rgba(255,255,255,0.55) 20%,
    rgba(255,255,255,0.85) 55%,
    rgba(255,255,255,0.55) 80%,
    transparent 100%
  );
  border-radius: 50%;
  filter: blur(0.4px);
  z-index: 10;
  pointer-events: none;
}

.g::after {
  content: '';
  position: absolute;
  top: 1px; left: 5%; right: 18%;
  height: 62%;
  background: linear-gradient(
    155deg,
    rgba(255,255,255,0.048) 0%,
    rgba(200,228,255,0.018) 35%,
    transparent 65%
  );
  border-radius: 0 0 55% 38%;
  pointer-events: none;
  z-index: 2;
  animation: gd-a 22s ease-in-out infinite;
}

/* Glass hover state — cyan light from behind */
.g-i {
  transition: box-shadow 0.22s, border-color 0.22s, transform 0.22s;
  cursor: pointer;
  will-change: transform, box-shadow;
}

.g-i:active {
  transform: scale(0.98);
}

.g-i:hover {
  box-shadow:
    inset 0  1px 0   rgba(0,240,255,0.4),
    inset 0 -1px 0   rgba(0,0,0,0.38),
    inset  1px 0 0   rgba(0,240,255,0.15),
    inset -1px 0 0   rgba(0,240,255,0.15),
    0  2px  4px rgba(0,0,0,0.3),
    0  8px 24px rgba(0,0,0,0.2),
    0 28px 56px rgba(0,0,0,0.15);
  border-color: rgba(0,240,255,0.14);
}

/* ═══════════════════════════════════════════════════════
   CAUSTIC DRIFT ANIMATIONS
═══════════════════════════════════════════════════════ */

@keyframes gd-a {
  0%,100% { transform: translateX(0%)   skewX(0deg)    scaleX(1);    opacity: 0.72; }
  28%     { transform: translateX(6%)   skewX(2.2deg)  scaleX(1.06); opacity: 1;    }
  68%     { transform: translateX(-4%)  skewX(-1.4deg) scaleX(0.96); opacity: 0.58; }
}

@keyframes gd-b {
  0%,100% { transform: translateX(2%)   skewX(1deg)    scaleX(0.95); opacity: 0.55; }
  35%     { transform: translateX(-7%)  skewX(-2.8deg) scaleX(1.1);  opacity: 0.95; }
  72%     { transform: translateX(5%)   skewX(1.8deg)  scaleX(1.02); opacity: 0.7;  }
}

@keyframes gd-c {
  0%,100% { transform: translateX(-3%)  skewX(-1deg)   scaleX(1.04); opacity: 0.8; }
  42%     { transform: translateX(8%)   skewX(3deg)    scaleX(0.92); opacity: 0.5; }
  78%     { transform: translateX(-5%)  skewX(-2deg)   scaleX(1.08); opacity: 1;   }
}

@keyframes gd-d {
  0%,100% { transform: translateX(4%)   skewX(1.5deg)  scaleX(1);    opacity: 0.65; }
  22%     { transform: translateX(-2%)  skewX(-0.8deg) scaleX(1.12); opacity: 0.9;  }
  60%     { transform: translateX(9%)   skewX(3.5deg)  scaleX(0.9);  opacity: 0.45; }
}

@keyframes gd-e {
  0%,100% { transform: translateX(-1%)  skewX(-0.5deg) scaleX(1.02); opacity: 0.9;  }
  50%     { transform: translateX(5%)   skewX(2deg)    scaleX(0.94); opacity: 0.55; }
  80%     { transform: translateX(-6%)  skewX(-2.5deg) scaleX(1.07); opacity: 0.78; }
}

@keyframes gd-f {
  0%,100% { transform: translateX(6%)   skewX(2.5deg)  scaleX(0.93); opacity: 0.6;  }
  38%     { transform: translateX(-3%)  skewX(-1.2deg) scaleX(1.05); opacity: 1;    }
  75%     { transform: translateX(7%)   skewX(2.8deg)  scaleX(0.97); opacity: 0.48; }
}

/* ═══════════════════════════════════════════════════════
   TOPBAR / HEADER
═══════════════════════════════════════════════════════ */

.skinHeader,
.focuscontainer-x.skinHeader-withBackground.skinHeader-blurred {
  background: rgba(180, 220, 255, 0.038) !important;
  backdrop-filter: blur(26px) saturate(320%) brightness(1.12) !important;
  -webkit-backdrop-filter: blur(26px) saturate(320%) brightness(1.12) !important;
  border-bottom: 1px solid rgba(0,0,0,0.2) !important;
  box-shadow: 0 4px 20px rgba(0,0,0,0.2) !important;
  position: sticky !important;
  top: 0 !important;
  z-index: 100 !important;
  min-height: 56px !important;
}

@supports not (backdrop-filter: blur(1px)) {
  .skinHeader,
  .focuscontainer-x.skinHeader-withBackground.skinHeader-blurred {
    background: rgba(180, 220, 255, 0.12) !important;
  }
}

.skinHeader::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg,
    transparent 0%,
    rgba(0,240,255,0.3) 20%,
    rgba(0,240,255,0.5) 50%,
    rgba(0,240,255,0.3) 80%,
    transparent 100%
  );
  filter: blur(0.5px);
}

/* Logo area */
.headerLogo {
  font-family: var(--font-d);
  font-size: 1.1rem;
  font-weight: 700;
  color: rgba(240,252,255,0.95);
  letter-spacing: 0.5px;
  display: flex !important;
  visibility: visible !important;
  opacity: 1 !important;
}

.skinHeader,
.skinHeader-withBackground {
  visibility: visible !important;
  opacity: 1 !important;
}

/* Search input */
.headerSearchInput,
.emby-input,
.emby-textarea,
.emby-select {
  background: rgba(0,0,0,0.28) !important;
  border: 1px solid rgba(255,255,255,0.07) !important;
  border-top-color: rgba(0,0,0,0.4) !important;
  border-radius: 10px !important;
  color: var(--ink) !important;
  font-family: var(--font-m) !important;
  font-size: 0.7rem !important;
  letter-spacing: 0.5px !important;
  box-shadow: inset 0 2px 6px rgba(0,0,0,0.4) !important;
  transition: border-color 0.15s, box-shadow 0.15s !important;
}

.emby-input::placeholder,
.emby-textarea::placeholder {
  color: var(--ink3) !important;
}

.emby-input:focus,
.emby-textarea:focus,
.emby-select:focus {
  border-color: rgba(0,240,255,0.28) !important;
  box-shadow: inset 0 2px 6px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,240,255,0.1) !important;
}

/* Header buttons */
.headerRight,
.headerButton,
.headerButtonRight,
.headerUserButton,
.paper-icon-button-light {
  color: var(--ink3) !important;
  transition: all 0.14s !important;
}

.headerButton:hover,
.headerButtonRight:hover,
.headerUserButton:hover,
.paper-icon-button-light:hover {
  color: var(--ink) !important;
  background: rgba(255,255,255,0.04) !important;
  border-color: rgba(255,255,255,0.08) !important;
}

.headerButton:focus,
.headerButtonRight:focus,
.headerUserButton:focus,
.paper-icon-button-light:focus {
  outline: 2px solid var(--cyan) !important;
  outline-offset: 2px !important;
}

/* Header nav tabs (Home, Favorites, Libraries) */
.skinHeader .headerTabs,
.skinHeader-withBackground .headerTabs,
.skinHeader .headerLeft,
.skinHeader .headerCenter,
.skinHeader .headerRight {
  display: flex !important;
  align-items: center !important;
}

/* Jellyfin docs tweak: Enlarge Tab Buttons */
.headerTabs.sectionTabs {
  text-size-adjust: 110% !important;
  -webkit-text-size-adjust: 110% !important;
  font-size: 110% !important;
  display: flex !important;
  flex-direction: row !important;
  align-items: center !important;
  flex-wrap: nowrap !important;
  gap: 8px !important;
  overflow-x: auto !important;
  overflow-y: hidden !important;
  white-space: nowrap !important;
}

.pageTitle {
  margin-top: auto !important;
  margin-bottom: auto !important;
  display: flex !important;
  align-items: center !important;
}

.headerTabs .emby-tab-button,
.headerTabs .headerTabButton {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 6px !important;
  min-height: 34px !important;
  padding: 1.1em 1.15em !important;
  white-space: nowrap !important;
  flex: 0 0 auto !important;
  margin-right: 10px !important;
}

.headerTabs .emby-tab-button:last-child,
.headerTabs .headerTabButton:last-child {
  margin-right: 0 !important;
}

.headerTabs .emby-tab-button .emby-button-foreground,
.headerTabs .headerTabButton .emby-button-foreground {
  display: inline-flex !important;
  align-items: center !important;
  gap: 6px !important;
}

.headerTabs .tabText,
.headerTabs .emby-tab-button .button-text,
.headerTabs .emby-tab-button span:not(.material-icons):not(.md-icon) {
  display: inline !important;
  visibility: visible !important;
  opacity: 1 !important;
}

.headerTabs .material-icons,
.headerTabs .md-icon,
.headerTabs i {
  font-size: 16px !important;
  line-height: 16px !important;
  height: 16px !important;
  width: 16px !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
}

/* Library labels for header tabs (CSS-only relabel of existing tab buttons) */
.headerTabs .emby-tab-button[data-index="0"] .button-text,
.headerTabs .emby-tab-button[data-index="1"] .button-text,
.headerTabs .emby-tab-button[data-index="2"] .button-text,
.headerTabs .emby-tab-button[data-index="3"] .button-text,
.headerTabs .emby-tab-button[data-index="4"] .button-text,
.headerTabs .emby-tab-button[data-index="5"] .button-text {
  font-size: 0 !important;
}

.headerTabs .emby-tab-button[data-index="0"] .button-text::after { content: 'Ambient Music'; font-size: 0.82rem; }
.headerTabs .emby-tab-button[data-index="1"] .button-text::after { content: 'Anime'; font-size: 0.82rem; }
.headerTabs .emby-tab-button[data-index="2"] .button-text::after { content: 'Movies'; font-size: 0.82rem; }
.headerTabs .emby-tab-button[data-index="3"] .button-text::after { content: 'Music Videos'; font-size: 0.82rem; }
.headerTabs .emby-tab-button[data-index="4"] .button-text::after { content: 'Shows'; font-size: 0.82rem; }
.headerTabs .emby-tab-button[data-index="5"] .button-text::after { content: 'YouTube Videos'; font-size: 0.82rem; }

/* Avatar */
.userProfileImg {
  background: linear-gradient(145deg, var(--cyan), #0088aa) !important;
  border-radius: 9px !important;
  box-shadow:
    0 0 12px rgba(0,240,255,0.3),
    0 0 24px rgba(0,240,255,0.15),
    inset 0 1px 0 rgba(255,255,255,0.3),
    inset 0 -1px 0 rgba(0,0,0,0.3) !important;
}

/* ═══════════════════════════════════════════════════════
   NAVIGATION RAIL / SIDEBAR
═══════════════════════════════════════════════════════ */

.mainDrawer,
.mainDrawer-scrollContainer {
  background: rgba(160, 210, 255, 0.022) !important;
  backdrop-filter: blur(20px) !important;
  -webkit-backdrop-filter: blur(20px) !important;
  border-right: 1px solid rgba(255,255,255,0.05) !important;
  box-shadow: inset -1px 0 0 rgba(0,0,0,0.2) !important;
}

.mainDrawer {
  width: 220px !important;
  min-width: 220px !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: stretch !important;
  padding: 14px 10px !important;
  gap: 4px !important;
  max-height: calc(100vh - 56px) !important;
  overflow-y: auto !important;
}

.mainDrawer-scrollContainer {
  padding: 0 !important;
  display: flex !important;
  flex-direction: column !important;
  gap: 4px !important;
  width: 100% !important;
  align-items: stretch !important;
}

.navMenuOption {
  width: 100% !important;
  min-width: 100% !important;
  height: 36px !important;
  max-height: 36px !important;
  min-height: 36px !important;
  padding: 0 12px !important;
  justify-content: flex-start !important;
  align-items: center !important;
  position: relative !important;
  overflow: visible !important;
  color: var(--ink3) !important;
  transition: all 0.14s !important;
  border-radius: 10px !important;
  margin: 0 !important;
  display: flex !important;
  gap: 10px !important;
  font-family: var(--font-m) !important;
  font-size: 0.65rem !important;
  letter-spacing: 0.5px !important;
  text-transform: uppercase !important;
}

/* Keep Home row same height as all other rows */
.mainDrawer .navMenuOption:first-child {
  height: 36px !important;
  min-height: 36px !important;
  max-height: 36px !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}

.navMenuOptionText,
.navMenuOption .navMenuOptionText,
.navMenuOption .listItemBodyText {
  display: inline !important;
  font-family: var(--font-m) !important;
  font-size: 0.65rem !important;
  letter-spacing: 0.5px !important;
  text-transform: uppercase !important;
  color: inherit !important;
}

.navMenuOption i,
.navMenuOption .material-icons,
.navMenuOption .md-icon {
  font-size: 16px !important;
  font-weight: 400 !important;
  text-rendering: geometricPrecision !important;
  -webkit-font-smoothing: antialiased !important;
  color: var(--glyph-muted) !important;
  transition: color 0.14s ease, text-shadow 0.14s ease, transform 0.14s ease !important;
  line-height: 16px !important;
  margin: 0 !important;
  flex-shrink: 0 !important;
  height: 16px !important;
  width: 16px !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
}

.navMenuOption svg,
.navMenuOption .md-icon svg,
.navMenuOption .material-icons svg {
  width: 16px !important;
  height: 16px !important;
  max-width: 16px !important;
  max-height: 16px !important;
  display: block !important;
}

.navMenuOption:hover i,
.navMenuOption:hover .material-icons,
.navMenuOption:hover .md-icon {
  color: var(--ink) !important;
  transform: translateZ(0) scale(1.02);
}

.navMenuOption-selected i,
.navMenuOption-selected .material-icons,
.navMenuOption-selected .md-icon {
  color: var(--glyph-active) !important;
  text-shadow: 0 0 8px rgba(0,240,255,0.22), 0 0 14px rgba(0,240,255,0.12) !important;
}

.navMenuOption:hover {
  color: var(--ink) !important;
  background: rgba(255,255,255,0.04) !important;
  border-color: rgba(255,255,255,0.07) !important;
}

.navMenuOption-selected {
  color: var(--cyan) !important;
  background: rgba(0,240,255,0.07) !important;
  border-color: rgba(0,240,255,0.18) !important;
  box-shadow: inset 0 1px 0 rgba(0,240,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.2), 0 0 10px rgba(0,240,255,0.06) !important;
}

.navMenuOption-selected::after {
  content: '';
  position: absolute;
  right: -1px;
  top: 50%;
  transform: translateY(-50%);
  width: 2px;
  height: 10px;
  border-radius: 1px;
  background: var(--cyan);
  box-shadow: 0 0 6px var(--cyan);
}

.navMenuOption:focus {
  outline: 2px solid var(--cyan) !important;
  outline-offset: -2px !important;
}

/* Menu dividers — geometric separators between sections */
.navMenuOption.navMenuDivider,
.navMenuOption[data-index="divider"],
.navMenuDivider {
  width: 100% !important;
  height: 1px !important;
  background: rgba(255,255,255,0.05) !important;
  margin: 4px 0 !important;
  border: none !important;
  cursor: default !important;
  pointer-events: none !important;
  padding: 0 !important;
  min-height: 1px !important;
}

/* Hamburger button — force visible on all pages */
.mainDrawerButton {
  display: flex !important;
  visibility: visible !important;
  opacity: 1 !important;
  color: var(--ink3) !important;
  transition: all 0.14s !important;
}

.mainDrawerButton:hover {
  color: var(--ink) !important;
  background: rgba(255,255,255,0.04) !important;
}

.mainDrawerButton:focus {
  outline: 2px solid var(--cyan) !important;
  outline-offset: 2px !important;
}

/* ═══════════════════════════════════════════════════════
   MAIN CONTENT AREA
═══════════════════════════════════════════════════════ */

.mainAnimatedPages,
.mainAnimatedPage {
  position: relative;
  z-index: 10;
}

.mainAnimatedPages {
  overflow-y: auto;
  overflow-x: hidden;
  max-height: none !important;
  height: calc(100vh - 56px) !important;
}

.mainAnimatedPage {
  min-height: calc(100vh - 56px) !important;
}

.mainDrawer-contentContainer,
.skinBody,
.pageContainer {
  min-height: 100vh !important;
  height: auto !important;
}

/* ═══════════════════════════════════════════════════════
   SECTION HEADERS
═══════════════════════════════════════════════════════ */

.sectionTitleContainer {
  position: relative;
  padding-left: 18px;
  margin-bottom: 24px;
  margin-top: 32px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.sectionTitleContainer::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 7px;
  height: 7px;
  border-left: 1.5px solid rgba(0,240,255,0.45);
  border-top: 1.5px solid rgba(0,240,255,0.45);
}

.sectionTitleContainer h2 {
  font-family: var(--font-d) !important;
  font-size: 1.3rem !important;
  font-weight: 700 !important;
  color: var(--ink) !important;
  display: inline-block !important;
  padding: 4px 10px !important;
  border-radius: 8px !important;
  margin: 0 !important;
  letter-spacing: 0.5px !important;
}

/* ═══════════════════════════════════════════════════════
   CARDS — Media Items
═══════════════════════════════════════════════════════ */

.cardBox,
.card,
.overflowPortraitCard,
.overflowBackdropCard,
.overflowSquareCard {
  background: rgba(175,215,255,0.008) !important;
  backdrop-filter: blur(8px) saturate(150%) brightness(1.05) !important;
  -webkit-backdrop-filter: blur(8px) saturate(150%) brightness(1.05) !important;
  box-shadow:
    inset 0  1px 0   rgba(255,255,255,0.5),
    inset 0 -1px 0   rgba(0,0,0,0.4),
    inset  1px 0 0   rgba(255,255,255,0.1),
    inset -1px 0 0   rgba(255,255,255,0.1),
    0  4px 16px rgba(0,0,0,0.2) !important;
  border: 1px solid rgba(255,255,255,0.08) !important;
  border-radius: 16px !important;
  transition: box-shadow 0.2s, transform 0.2s, border-color 0.2s, opacity 0.6s ease-out !important;
  position: relative;
  overflow: hidden;
  will-change: transform, box-shadow;
  opacity: 0;
  animation: fadeInCard 0.6s ease-out forwards;
  margin: 8px !important;
}

.cardBox::before,
.card::before,
.overflowPortraitCard::before,
.overflowBackdropCard::before,
.overflowSquareCard::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(0,240,255,0.08) 0%,
    rgba(0,240,255,0.04) 25%,
    transparent 50%,
    rgba(0,240,255,0.04) 75%,
    rgba(0,240,255,0.08) 100%
  );
  border-radius: 16px !important;
  pointer-events: none;
  animation: gd-a 18s ease-in-out infinite;
  z-index: 1;
}

.card:nth-child(2n)::before {
  animation: gd-b 20s ease-in-out infinite;
}

.card:nth-child(3n)::before {
  animation: gd-c 22s ease-in-out infinite;
}

.card:nth-child(4n)::before {
  animation: gd-d 24s ease-in-out infinite;
}

.card:nth-child(5n)::before {
  animation: gd-e 26s ease-in-out infinite;
}

.card:nth-child(6n)::before {
  animation: gd-f 28s ease-in-out infinite;
}

/* Home page carousel sections - NO wrap (horizontal scroll) */
.homeSectionsContainer .itemsContainer,
.homeSectionsContainer .scrollFrameContent,
div[is="emby-scroller"] .itemsContainer,
div[is="emby-scroller"] .scrollFrameContent,
.cardContainer,
.scrollFrameContent {
  display: flex !important;
  flex-wrap: nowrap !important;
  justify-content: flex-start !important;
  align-items: flex-start !important;
  gap: 8px !important;
  padding-bottom: 8px !important;
}

/* Library page grids - YES wrap */
.libraryPage:not(.homePage) .itemsContainer,
.itemsContainer.vertical-wrap {
  flex-wrap: wrap !important;
}

@keyframes fadeInCard {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.cardBox:nth-child(1) { animation-delay: 0.05s; }
.cardBox:nth-child(2) { animation-delay: 0.1s; }
.cardBox:nth-child(3) { animation-delay: 0.15s; }
.cardBox:nth-child(4) { animation-delay: 0.2s; }
.cardBox:nth-child(5) { animation-delay: 0.25s; }
.cardBox:nth-child(6) { animation-delay: 0.3s; }
.cardBox:nth-child(n+7) { animation-delay: 0.35s; }

@supports not (backdrop-filter: blur(1px)) {
  .cardBox,
  .card,
  .overflowPortraitCard,
  .overflowBackdropCard,
  .overflowSquareCard {
    background: rgba(175,215,255,0.12) !important;
  }
}

.cardBox:hover,
.card:hover,
.overflowPortraitCard:hover,
.overflowBackdropCard:hover,
.overflowSquareCard:hover {
  transform: translateY(-6px) scale(1.015) !important;
  box-shadow:
    inset 0  1px 0   rgba(0,240,255,0.45),
    inset 0 -1px 0   rgba(0,0,0,0.42),
    inset  1px 0 0   rgba(0,240,255,0.12),
    inset -1px 0 0   rgba(0,240,255,0.12),
    0  8px 24px rgba(0,0,0,0.3),
    0 0 20px rgba(0,240,255,0.07) !important;
  border-color: rgba(0,240,255,0.12) !important;
}

.cardBox:focus,
.card:focus,
.overflowPortraitCard:focus,
.overflowBackdropCard:focus,
.overflowSquareCard:focus {
  outline: 2px solid var(--cyan) !important;
  outline-offset: 2px !important;
}

/* ═══════════════════════════════════════════════════════
   BUTTONS
═══════════════════════════════════════════════════════ */

.emby-button,
.button-submit,
.raised,
.paper-button {
  background: rgba(0,240,255,0.1) !important;
  backdrop-filter: blur(12px) !important;
  border-radius: 10px !important;
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.2),
    inset 0 -1px 0 rgba(0,0,0,0.25),
    0 0 22px rgba(0,240,255,0.12),
    0 4px 14px rgba(0,0,0,0.3) !important;
  border: 1px solid rgba(0,240,255,0.09) !important;
  color: rgba(200,248,255,0.95) !important;
  font-family: var(--font-d) !important;
  font-size: 0.82rem !important;
  padding: 8px 18px !important;
  cursor: pointer !important;
  transition: all 0.16s !important;
  will-change: transform, box-shadow;
  margin-left: 2px !important;
}

.emby-button:focus,
.button-submit:focus,
.raised:focus,
.paper-button:focus {
  outline: 2px solid var(--cyan) !important;
  outline-offset: 2px !important;
}

.emby-button:hover,
.button-submit:hover,
.raised:hover,
.paper-button:hover {
  background: rgba(0,240,255,0.16) !important;
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.3),
    inset 0 -1px 0 rgba(0,0,0,0.25),
    0 0 28px rgba(0,240,255,0.18),
    0 6px 20px rgba(0,0,0,0.3) !important;
}

/* Info button variant */
.button-flat,
.paper-button-light {
  background: rgba(210,230,255,0.03) !important;
  backdrop-filter: blur(10px) !important;
  border-radius: 10px !important;
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(0,0,0,0.25) !important;
  border: 1px solid rgba(255,255,255,0.07) !important;
  color: var(--ink2) !important;
  font-family: var(--font-m) !important;
  font-size: 0.58rem !important;
  letter-spacing: 2px !important;
  text-transform: uppercase !important;
  padding: 8px 14px !important;
  transition: all 0.16s !important;
  will-change: transform, box-shadow;
}

.button-flat:focus,
.paper-button-light:focus {
  outline: 2px solid var(--cyan) !important;
  outline-offset: 2px !important;
}

.button-flat:hover,
.paper-button-light:hover {
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.38), inset 0 -1px 0 rgba(0,0,0,0.25) !important;
  color: var(--ink) !important;
}

/* Button spacing: scoped to detail-page action groups only */
.itemDetailPage .detailPagePrimaryContainer,
.itemDetailPage .detailPageSecondaryContainer,
.itemDetailPage .detailButtons,
.itemDetailPage .mainDetailButtons {
  display: flex !important;
  flex-wrap: wrap !important;
  gap: 10px !important;
}

/* Explicit spacing for watched/favorite style user-data controls */
.itemDetailPage .userDataButtons,
.itemDetailPage .itemDetailButtons,
.itemDetailPage .detailButtons,
.itemDetailPage .mainDetailButtons {
  display: flex !important;
  align-items: center !important;
  flex-wrap: wrap !important;
  column-gap: 10px !important;
  row-gap: 10px !important;
}

/* Space BETWEEN buttons (sibling spacing), not bigger button padding */
.itemDetailPage .userDataButtons > * + *,
.itemDetailPage .itemDetailButtons > * + *,
.itemDetailPage .detailButtons > * + *,
.itemDetailPage .mainDetailButtons > * + *,
.itemDetailPage .btnUserData + .btnUserData,
.itemDetailPage .btnPlayed + .btnFavorite,
.itemDetailPage .btnFavorite + .btnPlayed,
.itemDetailPage .btnPlaystate + .btnUserData {
  margin-left: 10px !important;
}

.itemDetailPage .btnUserData,
.itemDetailPage .btnPlayed,
.itemDetailPage .btnFavorite,
.itemDetailPage .btnPlaystate {
  margin-right: 0 !important;
}

/* ═══════════════════════════════════════════════════════
   DIALOGS / MODALS
═══════════════════════════════════════════════════════ */

.dialog,
.dialogContent,
.formDialogContent {
  background: rgba(190,225,255,0.04) !important;
  backdrop-filter: blur(26px) saturate(300%) brightness(1.15) !important;
  -webkit-backdrop-filter: blur(26px) saturate(300%) brightness(1.15) !important;
  border: 1px solid rgba(255,255,255,0.08) !important;
  border-radius: 18px !important;
  box-shadow:
    inset 0  1px 0   rgba(255,255,255,0.03),
    inset 0 -1px 0   rgba(0,0,0,0.25),
    0  2px  4px rgba(0,0,0,0.2),
    0  8px 24px rgba(0,0,0,0.2),
    0 24px 60px rgba(0,0,0,0.18) !important;
}

@supports not (backdrop-filter: blur(1px)) {
  .dialog,
  .dialogContent,
  .formDialogContent {
    background: rgba(190,225,255,0.12) !important;
  }
}

.dialog::before {
  content: '';
  position: absolute;
  top: 1px;
  left: 8%;
  right: 20%;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.7) 30%, rgba(255,255,255,0.9) 55%, rgba(255,255,255,0.65) 80%, transparent);
  filter: blur(0.5px);
  border-radius: 50%;
  z-index: 10;
  pointer-events: none;
}

.dialog::after {
  content: '';
  position: absolute;
  top: 1px;
  left: 5%;
  right: 25%;
  height: 65%;
  background: linear-gradient(160deg, rgba(255,255,255,0.044) 0%, rgba(200,228,255,0.018) 35%, transparent 65%);
  border-radius: 0 0 60% 30%;
  pointer-events: none;
  z-index: 2;
  animation: gd-b 24s ease-in-out infinite;
}

/* ═══════════════════════════════════════════════════════
   SCROLLBAR
═══════════════════════════════════════════════════════ */

* {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

::-webkit-scrollbar {
  display: none;
}

/* ═══════════════════════════════════════════════════════
   UTILITY CLASSES
═══════════════════════════════════════════════════════ */

.padded-left,
.padded-right,
.padded-top,
.padded-bottom {
  padding: 18px !important;
}

.mainAnimatedPages {
  padding: 18px 18px 44px !important;
}

/* Keep login form visible and unaffected by viewport-height overrides */
#loginPage,
#loginPage .mainAnimatedPages,
#loginPage .mainAnimatedPage {
  height: auto !important;
  min-height: 100vh !important;
  max-height: none !important;
}

#loginPage .readOnlyContent,
#loginPage form {
  display: block !important;
  visibility: visible !important;
  opacity: 1 !important;
  max-width: 24rem !important;
  margin: 8vh auto 0 !important;
}

.section2 {
  position: relative;
  z-index: 3;
}

/* Hide default Jellyfin elements that conflict */
.backdropImage {
  display: none !important;
}

/* ═══════════════════════════════════════════════════════
   VIDEO PLAYER — Keep header visible, video below it
   -----------------------------------------------------------------------
   Windowed playback: header stays visible, push the video down by the
   header height (56px) so the header no longer covers it.
   Fullscreen: video fills the whole screen, header out of the way.
═══════════════════════════════════════════════════════ */

/* Windowed playback — video starts under the 56px header */
.videoPlayerContainer,
.videoPlayerContainer .htmlvideoplayer {
  top: 56px !important;
  height: calc(100% - 56px) !important;
}

/* Fullscreen — reset video to fill the screen, header out of view */
.videoPlayerContainer:fullscreen,
.videoPlayerContainer:-webkit-full-screen,
.videoPlayerContainer:fullscreen .htmlvideoplayer,
.videoPlayerContainer:-webkit-full-screen .htmlvideoplayer {
  top: 0 !important;
  height: 100% !important;
}

/* ═══════════════════════════════════════════════════════
   RESPONSIVE
═══════════════════════════════════════════════════════ */

@media (max-width: 1200px) {
  .g {
    border-radius: 12px !important;
  }
}

@media (max-width: 768px) {
  .g {
    border-radius: 10px !important;
  }
  
  .sectionTitleContainer h2 {
    font-size: 0.85rem !important;
  }
}
