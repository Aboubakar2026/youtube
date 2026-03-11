import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";
import { COLORS } from "../config";

export const OpeningSequence: React.FC = () => {
    const frame = useCurrentFrame();

    // Phase 1: Pure black (0-20)
    // Phase 2: Gold glow appears (20-50)
    const glowOpacity = interpolate(frame, [20, 50], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.out(Easing.cubic),
    });

    // Phase 3: AncientOS text fades in (35-65)
    const titleOpacity = interpolate(frame, [35, 65], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const titleScale = interpolate(frame, [35, 70], [0.9, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.out(Easing.cubic),
    });

    // Phase 4: Tagline appears (55-85)
    const taglineOpacity = interpolate(frame, [55, 85], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // Phase 5: Gold line expands (45-80)
    const lineWidth = interpolate(frame, [45, 80], [0, 350], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.out(Easing.cubic),
    });

    // Phase 6: Whoosh transition — everything scales up and fades (110-150)
    const exitProgress = interpolate(frame, [110, 150], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.in(Easing.cubic),
    });
    const exitScale = 1 + exitProgress * 0.3;
    const exitOpacity = 1 - exitProgress;

    // Gold particle burst (60-100)
    const burstProgress = interpolate(frame, [60, 100], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    return (
        <div
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: COLORS.background,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 200,
                opacity: exitOpacity,
                transform: `scale(${exitScale})`,
            }}
        >
            {/* Gold radial glow */}
            <div
                style={{
                    position: "absolute",
                    width: 700,
                    height: 700,
                    borderRadius: "50%",
                    background: `radial-gradient(circle, ${COLORS.gold}20 0%, transparent 65%)`,
                    opacity: glowOpacity * (0.5 + 0.5 * Math.sin(frame * 0.06)),
                    filter: "blur(50px)",
                }}
            />

            {/* Gold particle burst */}
            {Array.from({ length: 20 }, (_, i) => {
                const angle = (i / 20) * Math.PI * 2 + i * 0.3;
                const dist = burstProgress * (120 + i * 15);
                const pOpacity = interpolate(burstProgress, [0, 0.2, 1], [0, 0.7, 0], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                });
                return (
                    <div
                        key={i}
                        style={{
                            position: "absolute",
                            width: 2 + (i % 3),
                            height: 2 + (i % 3),
                            borderRadius: "50%",
                            backgroundColor: COLORS.goldLight,
                            transform: `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px)`,
                            opacity: pOpacity,
                            boxShadow: `0 0 6px ${COLORS.gold}`,
                        }}
                    />
                );
            })}

            {/* AncientOS logo text */}
            <div
                style={{
                    opacity: titleOpacity,
                    transform: `scale(${titleScale})`,
                    zIndex: 10,
                    textAlign: "center",
                }}
            >
                <div
                    style={{
                        fontFamily: "'Cinzel Decorative', 'Georgia', serif",
                        fontSize: 72,
                        fontWeight: 700,
                        color: COLORS.offWhite,
                        letterSpacing: "0.12em",
                        textShadow: `0 0 40px ${COLORS.gold}30`,
                    }}
                >
                    Ancient<span style={{ color: COLORS.gold }}>OS</span>
                </div>
            </div>

            {/* Gold separator line */}
            <div
                style={{
                    width: lineWidth,
                    height: 2,
                    backgroundColor: COLORS.gold,
                    marginTop: 25,
                    marginBottom: 25,
                    boxShadow: `0 0 20px ${COLORS.gold}60`,
                    zIndex: 10,
                }}
            />

            {/* Tagline */}
            <div
                style={{
                    opacity: taglineOpacity,
                    zIndex: 10,
                }}
            >
                <span
                    style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 20,
                        fontWeight: 300,
                        color: `${COLORS.offWhite}80`,
                        letterSpacing: "0.25em",
                        textTransform: "uppercase",
                    }}
                >
                    Install Ancient Wisdom. Upgrade Your Mind.
                </span>
            </div>
        </div>
    );
};
