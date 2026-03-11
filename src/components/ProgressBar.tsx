import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { COLORS, VIDEO_CONFIG, TIMING } from "../config";

export const ProgressBar: React.FC = () => {
    const frame = useCurrentFrame();
    const totalFrames = VIDEO_CONFIG.durationInFrames;
    const introEnd = TIMING.openingDuration;

    // Only show after intro
    if (frame < introEnd) return null;

    const progress = interpolate(
        frame,
        [introEnd, totalFrames],
        [0, 100],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );

    // Subtle fade in
    const opacity = interpolate(
        frame,
        [introEnd, introEnd + 30],
        [0, 0.6],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );

    return (
        <div
            style={{
                position: "absolute",
                bottom: 48,
                left: 0,
                right: 0,
                height: 3,
                backgroundColor: "rgba(255,255,255,0.08)",
                zIndex: 90,
                opacity,
            }}
        >
            <div
                style={{
                    width: `${progress}%`,
                    height: "100%",
                    background: `linear-gradient(90deg, ${COLORS.gold}, ${COLORS.goldLight})`,
                    boxShadow: `0 0 10px ${COLORS.gold}80`,
                }}
            />
        </div>
    );
};
