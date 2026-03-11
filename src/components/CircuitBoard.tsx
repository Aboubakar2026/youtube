import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { COLORS } from "../config";

export const CircuitBoard: React.FC = () => {
    const frame = useCurrentFrame();
    const { durationInFrames } = useVideoConfig();

    // Very slow horizontal scroll
    const scrollX = (frame * 0.15) % 200;

    // Global fade
    const opacity = interpolate(
        frame,
        [0, 60, durationInFrames - 60, durationInFrames],
        [0, 1, 1, 0],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );

    // Pulsing opacity
    const pulse = 0.015 + 0.01 * Math.sin(frame * 0.02);

    return (
        <div
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                overflow: "hidden",
                pointerEvents: "none",
                zIndex: 45,
                opacity: opacity * pulse,
            }}
        >
            <svg
                viewBox="0 0 1920 1080"
                style={{
                    width: "100%",
                    height: "100%",
                    transform: `translateX(${-scrollX}px)`,
                }}
            >
                {/* Horizontal lines */}
                {[180, 360, 540, 720, 900].map((y, i) => (
                    <line
                        key={`h${i}`}
                        x1={0}
                        y1={y}
                        x2={1920}
                        y2={y}
                        stroke={COLORS.gold}
                        strokeWidth={0.5}
                        strokeDasharray="8 40"
                        opacity={0.4}
                    />
                ))}
                {/* Vertical lines */}
                {[320, 640, 960, 1280, 1600].map((x, i) => (
                    <line
                        key={`v${i}`}
                        x1={x}
                        y1={0}
                        x2={x}
                        y2={1080}
                        stroke={COLORS.gold}
                        strokeWidth={0.5}
                        strokeDasharray="6 50"
                        opacity={0.3}
                    />
                ))}
                {/* Circuit nodes */}
                {[
                    [320, 180], [640, 360], [960, 540], [1280, 720], [1600, 900],
                    [480, 540], [800, 180], [1120, 900], [1440, 360],
                ].map(([cx, cy], i) => (
                    <circle
                        key={`n${i}`}
                        cx={cx}
                        cy={cy}
                        r={3}
                        fill="none"
                        stroke={COLORS.gold}
                        strokeWidth={0.8}
                        opacity={0.3 + 0.2 * Math.sin(frame * 0.03 + i)}
                    />
                ))}
                {/* Right-angle connectors */}
                {[
                    "M 320 180 L 480 180 L 480 360",
                    "M 640 360 L 640 540 L 800 540",
                    "M 960 540 L 1120 540 L 1120 720",
                    "M 1280 720 L 1280 900 L 1440 900",
                ].map((d, i) => (
                    <path
                        key={`c${i}`}
                        d={d}
                        fill="none"
                        stroke={COLORS.gold}
                        strokeWidth={0.5}
                        opacity={0.25}
                        strokeDasharray="4 12"
                    />
                ))}
            </svg>
        </div>
    );
};
