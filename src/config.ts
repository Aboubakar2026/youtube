// ===== VIDEO CONFIGURATION =====
export const VIDEO_CONFIG = {
    width: 1920,
    height: 1080,
    fps: 30,
    durationInSeconds: 321,
    durationInFrames: 9630, // 321 * 30
};

// ===== PREMIUM COLOR PALETTE =====
export const COLORS = {
    background: "#0a0a0a",
    gold: "#C9A84C",
    goldLight: "#E8D48B",
    goldDark: "#8B7332",
    white: "#FFFFFF",
    offWhite: "#F0EDE6",
    subtitleActive: "#C9A84C",
    subtitleInactive: "rgba(255, 255, 255, 0.7)",
    overlayDark: "rgba(0, 0, 0, 0.6)",
};

// ===== FONT IMPORT =====
export const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800;900&family=Cinzel+Decorative:wght@400;700;900&family=Inter:wght@400;600;700&display=swap');`;

// ===== TIMING =====
export const TIMING = {
    openingDuration: 150,    // 5s
    endingDuration: 150,     // 5s
    transitionDuration: 90,  // 3s
    glitchDuration: 9,       // 0.3s
    zoomPunchDuration: 15,   // 0.5s
};

// ===== KEN BURNS MOTION TYPES =====
export type KenBurnsMotion =
    | "zoomIn"
    | "zoomOut"
    | "panLeft"
    | "panRight"
    | "panUp"
    | "zoomInPanLeft"
    | "zoomInPanRight";

// ===== SCENE CONFIG =====
export interface SceneConfig {
    id: number;
    src: string;
    startFrame: number;
    durationFrames: number;
    motion: KenBurnsMotion;
}

const FPS = VIDEO_CONFIG.fps;

// Scene timing based on voiceover segments (exact user specification)
const sceneTimings: { startSec: number; endSec: number }[] = [
    { startSec: 0, endSec: 33 },      // scene1: segments 0-4
    { startSec: 33, endSec: 120 },     // scene2: segments 5-14
    { startSec: 120, endSec: 156 },    // scene3: segments 15-25
    { startSec: 156, endSec: 194 },    // scene4: segments 26-34
    { startSec: 194, endSec: 235 },    // scene5: segments 35-42
    { startSec: 235, endSec: 273 },    // scene6: segments 43-45
    { startSec: 273, endSec: 300 },    // scene7: segments 46-52
    { startSec: 300, endSec: 321 },    // scene8: segments 53-59
];

const motions: KenBurnsMotion[] = [
    "zoomIn", "panRight", "zoomOut", "zoomInPanLeft",
    "panLeft", "zoomInPanRight", "panUp", "zoomIn",
];

export const SCENES: SceneConfig[] = sceneTimings.map((t, i) => ({
    id: i + 1,
    src: `scene${i + 1}.png`,
    startFrame: Math.round(t.startSec * FPS),
    durationFrames: Math.round((t.endSec - t.startSec) * FPS),
    motion: motions[i],
}));

// ===== TRANSITION QUOTES =====
export interface TransitionConfig {
    startFrame: number;
    durationFrames: number;
    quote: string;
}

export const TRANSITIONS: TransitionConfig[] = [
    { startFrame: SCENES[0].startFrame + SCENES[0].durationFrames - 45, durationFrames: 90, quote: "You have power over your mind, not outside events." },
    { startFrame: SCENES[1].startFrame + SCENES[1].durationFrames - 45, durationFrames: 90, quote: "The impediment to action advances action." },
    { startFrame: SCENES[2].startFrame + SCENES[2].durationFrames - 45, durationFrames: 90, quote: "Waste no more time arguing. Begin." },
    { startFrame: SCENES[3].startFrame + SCENES[3].durationFrames - 45, durationFrames: 90, quote: "Confine yourself to the present." },
    { startFrame: SCENES[4].startFrame + SCENES[4].durationFrames - 45, durationFrames: 90, quote: "Never let the future disturb you." },
    { startFrame: SCENES[5].startFrame + SCENES[5].durationFrames - 45, durationFrames: 90, quote: "If it is not right, do not do it." },
    { startFrame: SCENES[6].startFrame + SCENES[6].durationFrames - 45, durationFrames: 90, quote: "The best revenge is to be unlike your enemy." },
];

// ===== PARTICLES CONFIG =====
export const PARTICLES = {
    count: 40,
    minSize: 1.5,
    maxSize: 4.5,
    minOpacity: 0.12,
    maxOpacity: 0.45,
    speed: 0.35,
};
