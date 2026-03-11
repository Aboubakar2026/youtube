import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";
import { COLORS } from "../config";

interface TransitionCardProps {
    quote: string;
}

export const TransitionCard: React.FC<TransitionCardProps> = ({ quote }) => {
    const frame = useCurrentFrame();
    const { durationInFrames } = useVideoConfig(); // 90 frames

    // Phase: fade in bg (0-15)
    const bgOpacity = interpolate(frame, [0, 15], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.out(Easing.cubic),
    });

    // Phase: ornamental border draws (10-40)
    const borderProgress = interpolate(frame, [10, 45], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.inOut(Easing.cubic),
    });

    // Phase: quote word-by-word (15-70)
    const words = quote.split(" ");
    const wordRevealEnd = 70;
    const wordRevealStart = 18;
    const framesPerWord = (wordRevealEnd - wordRevealStart) / words.length;

    // Phase: gold particle burst (30-60)
    const particleBurst = interpolate(frame, [30, 60], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // Phase: glitch flash at end (81-90)
    const isGlitch = frame >= durationInFrames - 9;
    const glitchIntensity = isGlitch
        ? interpolate(frame, [durationInFrames - 9, durationInFrames - 3, durationInFrames], [0, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
        : 0;

    // Phase: fade out (72-90)
    const fadeOut = interpolate(frame, [72, durationInFrames], [1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const totalOpacity = bgOpacity * fadeOut;

    // SVG border path length for animation
    const borderDashOffset = (1 - borderProgress) * 2000;

    // Gold glow pulse
    const glowPulse = 0.5 + 0.5 * Math.sin(frame * 0.08);

    return (
        <div
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                opacity: totalOpacity,
                zIndex: 150,
            }}
        >
            {/* Dark marble background */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: `
            radial-gradient(ellipse at 30% 40%, rgba(60,50,35,0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 60%, rgba(50,45,30,0.1) 0%, transparent 40%),
            radial-gradient(ellipse at center, rgba(20,18,15,0.95) 0%, #0a0908 100%)
          `,
                }}
            />

            {/* Gold glow behind text */}
            <div
                style={{
                    position: "absolute",
                    width: 500,
                    height: 500,
                    borderRadius: "50%",
                    background: `radial-gradient(circle, ${COLORS.gold}18 0%, transparent 70%)`,
                    opacity: borderProgress * glowPulse,
                    filter: "blur(60px)",
                }}
            />

            {/* Ornamental border SVG */}
            <svg
                viewBox="0 0 800 400"
                style={{
                    position: "absolute",
                    width: "60%",
                    height: "auto",
                    overflow: "visible",
                }}
            >
                {/* Corner ornaments */}
                <path
                    d="M 50 10 L 10 10 L 10 50 M 50 10 Q 30 10 10 30"
                    fill="none"
                    stroke={COLORS.gold}
                    strokeWidth={1.5}
                    strokeDasharray={2000}
                    strokeDashoffset={borderDashOffset}
                    opacity={0.8}
                />
                <path
                    d="M 750 10 L 790 10 L 790 50 M 750 10 Q 770 10 790 30"
                    fill="none"
                    stroke={COLORS.gold}
                    strokeWidth={1.5}
                    strokeDasharray={2000}
                    strokeDashoffset={borderDashOffset}
                    opacity={0.8}
                />
                <path
                    d="M 50 390 L 10 390 L 10 350 M 50 390 Q 30 390 10 370"
                    fill="none"
                    stroke={COLORS.gold}
                    strokeWidth={1.5}
                    strokeDasharray={2000}
                    strokeDashoffset={borderDashOffset}
                    opacity={0.8}
                />
                <path
                    d="M 750 390 L 790 390 L 790 350 M 750 390 Q 770 390 790 370"
                    fill="none"
                    stroke={COLORS.gold}
                    strokeWidth={1.5}
                    strokeDasharray={2000}
                    strokeDashoffset={borderDashOffset}
                    opacity={0.8}
                />
                {/* Top/bottom lines */}
                <line x1={60} y1={10} x2={740} y2={10} stroke={COLORS.gold} strokeWidth={0.5} opacity={borderProgress * 0.4} />
                <line x1={60} y1={390} x2={740} y2={390} stroke={COLORS.gold} strokeWidth={0.5} opacity={borderProgress * 0.4} />
            </svg>

            {/* Quote — word by word reveal */}
            <div
                style={{
                    position: "relative",
                    zIndex: 10,
                    textAlign: "center",
                    maxWidth: "55%",
                    padding: 40,
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        gap: "8px 12px",
                    }}
                >
                    {words.map((word, i) => {
                        const wordStart = wordRevealStart + i * framesPerWord;
                        const wordOpacity = interpolate(frame, [wordStart, wordStart + 8], [0, 1], {
                            extrapolateLeft: "clamp",
                            extrapolateRight: "clamp",
                        });
                        const wordY = interpolate(frame, [wordStart, wordStart + 10], [15, 0], {
                            extrapolateLeft: "clamp",
                            extrapolateRight: "clamp",
                            easing: Easing.out(Easing.cubic),
                        });

                        return (
                            <span
                                key={i}
                                style={{
                                    fontFamily: "'Cinzel Decorative', 'Georgia', serif",
                                    fontSize: 42,
                                    fontWeight: 400,
                                    color: COLORS.goldLight,
                                    opacity: wordOpacity,
                                    transform: `translateY(${wordY}px)`,
                                    display: "inline-block",
                                    letterSpacing: "0.04em",
                                    lineHeight: 1.6,
                                    textShadow: `0 0 25px ${COLORS.gold}40, 0 2px 12px rgba(0,0,0,0.8)`,
                                }}
                            >
                                {word}
                            </span>
                        );
                    })}
                </div>

                {/* Attribution */}
                <div
                    style={{
                        marginTop: 30,
                        opacity: interpolate(frame, [55, 70], [0, 0.6], {
                            extrapolateLeft: "clamp",
                            extrapolateRight: "clamp",
                        }),
                    }}
                >
                    <span
                        style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: 16,
                            fontWeight: 300,
                            color: COLORS.gold,
                            letterSpacing: "0.2em",
                            textTransform: "uppercase",
                        }}
                    >
                        — Marcus Aurelius
                    </span>
                </div>
            </div>

            {/* Gold particle burst */}
            {Array.from({ length: 12 }, (_, i) => {
                const angle = (i / 12) * Math.PI * 2;
                const distance = particleBurst * 200 + 20;
                const pX = Math.cos(angle) * distance;
                const pY = Math.sin(angle) * distance;
                const pOpacity = interpolate(particleBurst, [0, 0.3, 1], [0, 0.8, 0], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                });

                return (
                    <div
                        key={i}
                        style={{
                            position: "absolute",
                            left: "50%",
                            top: "50%",
                            width: 3,
                            height: 3,
                            borderRadius: "50%",
                            backgroundColor: COLORS.goldLight,
                            transform: `translate(${pX}px, ${pY}px)`,
                            opacity: pOpacity,
                            boxShadow: `0 0 8px ${COLORS.gold}`,
                            zIndex: 5,
                        }}
                    />
                );
            })}

            {/* Glitch flash overlay */}
            {isGlitch && (
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: `rgba(255,255,255,${glitchIntensity * 0.8})`,
                        mixBlendMode: "overlay",
                        zIndex: 200,
                    }}
                />
            )}
        </div>
    );
};
