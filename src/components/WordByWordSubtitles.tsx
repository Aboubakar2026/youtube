import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";
import { SUBTITLE_BLOCKS } from "../subtitles";
import { COLORS } from "../config";

export const WordByWordSubtitles: React.FC = () => {
    const frame = useCurrentFrame();

    // Find the current block
    const currentBlock = SUBTITLE_BLOCKS.find(
        (b) => frame >= b.startFrame - 5 && frame <= b.endFrame + 5
    );

    if (!currentBlock) return null;

    // Block-level fade in/out
    const blockFadeIn = interpolate(
        frame,
        [currentBlock.startFrame, currentBlock.startFrame + 8],
        [0, 1],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) }
    );
    const blockFadeOut = interpolate(
        frame,
        [currentBlock.endFrame - 8, currentBlock.endFrame],
        [1, 0],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.cubic) }
    );
    const blockOpacity = Math.min(blockFadeIn, blockFadeOut);

    // Slide up on entrance
    const slideY = interpolate(
        frame,
        [currentBlock.startFrame, currentBlock.startFrame + 10],
        [12, 0],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) }
    );

    return (
        <div
            style={{
                position: "absolute",
                bottom: 120,
                left: 0,
                right: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 100,
                opacity: blockOpacity,
                transform: `translateY(${slideY}px)`,
            }}
        >
            {/* Soft blur background */}
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "10px 18px",
                    maxWidth: "75%",
                    padding: "16px 36px",
                    borderRadius: 12,
                    background: "linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.7) 100%)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.04)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                }}
            >
                {currentBlock.words.map((word, i) => {
                    // Is this word currently active?
                    const isActive = frame >= word.startFrame && frame <= word.endFrame;
                    const isPast = frame > word.endFrame;

                    // Active word scale animation (safe for short words)
                    const wordDuration = word.endFrame - word.startFrame;
                    const midPoint = word.startFrame + Math.max(1, Math.floor(wordDuration * 0.3));
                    const safeEnd = Math.max(midPoint + 1, word.endFrame);
                    const wordScale = isActive
                        ? interpolate(
                            frame,
                            [word.startFrame, midPoint, safeEnd],
                            [1.08, 1.12, 1.05],
                            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                        )
                        : 1;

                    return (
                        <span
                            key={i}
                            style={{
                                fontFamily: "'Montserrat', 'Inter', sans-serif",
                                fontSize: isActive ? 60 : 58,
                                fontWeight: isActive ? 800 : 700,
                                color: isActive
                                    ? COLORS.subtitleActive
                                    : isPast
                                        ? COLORS.white
                                        : COLORS.subtitleInactive,
                                transform: `scale(${wordScale})`,
                                transition: "color 0.1s ease",
                                textShadow: isActive
                                    ? `0 0 20px ${COLORS.gold}60, 0 2px 10px rgba(0,0,0,0.9)`
                                    : "0 2px 8px rgba(0,0,0,0.8)",
                                lineHeight: 1.4,
                                letterSpacing: "-0.01em",
                                display: "inline-block",
                            }}
                        >
                            {word.text}
                        </span>
                    );
                })}
            </div>
        </div>
    );
};
