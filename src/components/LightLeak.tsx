import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { COLORS } from "../config";

export const LightLeak: React.FC = () => {
    const frame = useCurrentFrame();
    const { durationInFrames } = useVideoConfig();

    // Slow-moving light leak positions
    const leak1X = 20 + Math.sin(frame * 0.008) * 30;
    const leak1Y = 10 + Math.cos(frame * 0.006) * 20;
    const leak2X = 70 + Math.cos(frame * 0.01) * 25;
    const leak2Y = 80 + Math.sin(frame * 0.007) * 15;

    // Pulsing opacity
    const leak1Opacity = 0.03 + 0.025 * Math.sin(frame * 0.012);
    const leak2Opacity = 0.02 + 0.02 * Math.sin(frame * 0.009 + 2);

    // Global fade
    const globalOpacity = interpolate(
        frame,
        [0, 60, durationInFrames - 60, durationInFrames],
        [0, 1, 1, 0],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );

    return (
        <div
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none",
                zIndex: 55,
                opacity: globalOpacity,
            }}
        >
            {/* Warm gold light leak */}
            <div
                style={{
                    position: "absolute",
                    left: `${leak1X}%`,
                    top: `${leak1Y}%`,
                    width: 600,
                    height: 600,
                    borderRadius: "50%",
                    background: `radial-gradient(circle, ${COLORS.gold}30 0%, transparent 70%)`,
                    opacity: leak1Opacity,
                    filter: "blur(80px)",
                    transform: "translate(-50%, -50%)",
                }}
            />

            {/* Secondary warm leak */}
            <div
                style={{
                    position: "absolute",
                    left: `${leak2X}%`,
                    top: `${leak2Y}%`,
                    width: 400,
                    height: 400,
                    borderRadius: "50%",
                    background: `radial-gradient(circle, ${COLORS.goldLight}25 0%, transparent 70%)`,
                    opacity: leak2Opacity,
                    filter: "blur(60px)",
                    transform: "translate(-50%, -50%)",
                }}
            />
        </div>
    );
};
