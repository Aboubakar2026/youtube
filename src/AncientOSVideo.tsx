import React from "react";
import { Audio, Sequence, staticFile, useVideoConfig } from "remotion";
import { Scene } from "./components/Scene";
import { WordByWordSubtitles } from "./components/WordByWordSubtitles";
import { FloatingParticles } from "./components/FloatingParticles";
import { CircuitBoard } from "./components/CircuitBoard";
import { OpeningSequence } from "./components/OpeningSequence";
import { EndingSequence } from "./components/EndingSequence";
import { TransitionCard } from "./components/TransitionCard";
import { LightLeak } from "./components/LightLeak";
import { ProgressBar } from "./components/ProgressBar";
import {
    SCENES,
    COLORS,
    TIMING,
    TRANSITIONS,
    VIDEO_CONFIG,
    FONT_IMPORT,
} from "./config";

export const AncientOSVideo: React.FC = () => {
    const { width, height } = useVideoConfig();
    const totalFrames = VIDEO_CONFIG.durationInFrames;

    return (
        <div
            style={{
                width,
                height,
                backgroundColor: COLORS.background,
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Font loading */}
            <style>{FONT_IMPORT}</style>

            {/* ===== OPENING SEQUENCE (5s overlay) ===== */}
            <Sequence
                from={0}
                durationInFrames={TIMING.openingDuration}
                name="Opening"
            >
                <OpeningSequence />
            </Sequence>

            {/* ===== 8 SCENE LAYERS ===== */}
            {SCENES.map((scene) => (
                <Sequence
                    key={scene.id}
                    from={scene.startFrame}
                    durationInFrames={scene.durationFrames}
                    name={`Scene ${scene.id}`}
                >
                    <Scene src={scene.src} motion={scene.motion} />
                </Sequence>
            ))}

            {/* ===== 7 TRANSITION CARDS (3s overlays) ===== */}
            {TRANSITIONS.map((t, i) => (
                <Sequence
                    key={`transition-${i}`}
                    from={t.startFrame}
                    durationInFrames={t.durationFrames}
                    name={`Transition ${i + 1}`}
                >
                    <TransitionCard quote={t.quote} />
                </Sequence>
            ))}

            {/* ===== ENDING SEQUENCE (5s overlay) ===== */}
            <Sequence
                from={totalFrames - TIMING.endingDuration}
                durationInFrames={TIMING.endingDuration}
                name="Ending"
            >
                <EndingSequence />
            </Sequence>

            {/* ===== CINEMATIC OVERLAYS (always visible) ===== */}

            {/* Letterbox top bar */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 50,
                    backgroundColor: "#000",
                    zIndex: 70,
                    pointerEvents: "none",
                }}
            />

            {/* Letterbox bottom bar */}
            <div
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 50,
                    backgroundColor: "#000",
                    zIndex: 70,
                    pointerEvents: "none",
                }}
            />

            {/* Top cinematic gradient */}
            <div
                style={{
                    position: "absolute",
                    top: 50,
                    left: 0,
                    right: 0,
                    height: 180,
                    background:
                        "linear-gradient(to bottom, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.3) 40%, transparent 100%)",
                    zIndex: 52,
                    pointerEvents: "none",
                }}
            />

            {/* Bottom cinematic gradient */}
            <div
                style={{
                    position: "absolute",
                    bottom: 50,
                    left: 0,
                    right: 0,
                    height: 250,
                    background:
                        "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 40%, transparent 100%)",
                    zIndex: 52,
                    pointerEvents: "none",
                }}
            />

            {/* Left edge gradient */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    width: 120,
                    background: "linear-gradient(to right, rgba(0,0,0,0.5) 0%, transparent 100%)",
                    zIndex: 51,
                    pointerEvents: "none",
                }}
            />

            {/* Right edge gradient */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    bottom: 0,
                    width: 120,
                    background: "linear-gradient(to left, rgba(0,0,0,0.5) 0%, transparent 100%)",
                    zIndex: 51,
                    pointerEvents: "none",
                }}
            />

            {/* ===== ATMOSPHERIC EFFECTS ===== */}

            {/* Circuit board lines */}
            <Sequence from={0} name="Circuit Board">
                <CircuitBoard />
            </Sequence>

            {/* Floating gold particles */}
            <Sequence from={0} name="Particles">
                <FloatingParticles />
            </Sequence>

            {/* Light leak effects */}
            <Sequence from={0} name="Light Leaks">
                <LightLeak />
            </Sequence>

            {/* ===== UI LAYERS ===== */}

            {/* Word-by-word subtitles */}
            <Sequence from={0} name="Subtitles">
                <WordByWordSubtitles />
            </Sequence>

            {/* Progress bar */}
            <Sequence from={0} name="Progress Bar">
                <ProgressBar />
            </Sequence>

            {/* ===== AUDIO ===== */}
            <Audio src={staticFile("voiceover.wav")} volume={1} />
        </div>
    );
};
