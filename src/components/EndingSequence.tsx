import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";
import { COLORS } from "../config";

export const EndingSequence: React.FC = () => {
    const frame = useCurrentFrame();

    // Fade in dark overlay (0-40)
    const bgOpacity = interpolate(frame, [0, 40], [0, 1], {
        extrapolateRight: "clamp",
        easing: Easing.out(Easing.cubic),
    });

    // Main text (25-60)
    const textOpacity = interpolate(frame, [25, 55], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const textY = interpolate(frame, [25, 60], [25, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.out(Easing.cubic),
    });

    // Subtext (45-75)
    const subOpacity = interpolate(frame, [45, 75], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // Gold line (30-65)
    const lineWidth = interpolate(frame, [30, 65], [0, 300], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.out(Easing.cubic),
    });

    // Ornamental frame (40-80)
    const frameProgress = interpolate(frame, [40, 80], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.inOut(Easing.cubic),
    });
    const frameDash = (1 - frameProgress) * 2000;

    // Final fade to black (120-150)
    const finalFade = interpolate(frame, [120, 150], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const glowPulse = 0.5 + 0.5 * Math.sin(frame * 0.07);

    return (
        <div
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 200,
            }}
        >
            {/* Dark overlay */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: COLORS.background,
                    opacity: bgOpacity,
                }}
            />

            {/* Gold glow */}
            <div
                style={{
                    position: "absolute",
                    width: 500,
                    height: 500,
                    borderRadius: "50%",
                    background: `radial-gradient(circle, ${COLORS.gold}15 0%, transparent 70%)`,
                    opacity: textOpacity * glowPulse,
                    filter: "blur(50px)",
                }}
            />

            {/* SVG ornamental frame */}
            <svg
                viewBox="0 0 600 300"
                style={{
                    position: "absolute",
                    width: "45%",
                    zIndex: 2,
                }}
            >
                <rect
                    x={10}
                    y={10}
                    width={580}
                    height={280}
                    fill="none"
                    stroke={COLORS.gold}
                    strokeWidth={1}
                    rx={4}
                    strokeDasharray={2000}
                    strokeDashoffset={frameDash}
                    opacity={0.5}
                />
                <rect
                    x={20}
                    y={20}
                    width={560}
                    height={260}
                    fill="none"
                    stroke={COLORS.gold}
                    strokeWidth={0.5}
                    rx={2}
                    strokeDasharray={2000}
                    strokeDashoffset={frameDash * 1.2}
                    opacity={0.3}
                />
            </svg>

            {/* Main text */}
            <div
                style={{
                    opacity: textOpacity,
                    transform: `translateY(${textY}px)`,
                    zIndex: 10,
                    textAlign: "center",
                }}
            >
                <div
                    style={{
                        fontFamily: "'Cinzel Decorative', 'Georgia', serif",
                        fontSize: 52,
                        fontWeight: 400,
                        color: COLORS.offWhite,
                        letterSpacing: "0.06em",
                        textShadow: `0 0 30px ${COLORS.gold}20`,
                    }}
                >
                    Subscribe to <span style={{ color: COLORS.gold }}>AncientOS</span>
                </div>
            </div>

            {/* Gold separator */}
            <div
                style={{
                    width: lineWidth,
                    height: 1.5,
                    backgroundColor: COLORS.gold,
                    marginTop: 25,
                    marginBottom: 25,
                    boxShadow: `0 0 15px ${COLORS.gold}50`,
                    zIndex: 10,
                }}
            />

            {/* Subtext */}
            <div
                style={{
                    opacity: subOpacity,
                    zIndex: 10,
                }}
            >
                <span
                    style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 20,
                        fontWeight: 300,
                        color: `${COLORS.offWhite}70`,
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                    }}
                >
                    New wisdom. Every day.
                </span>
            </div>

            {/* Final fade to black */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#000",
                    opacity: finalFade,
                    zIndex: 100,
                }}
            />
        </div>
    );
};
