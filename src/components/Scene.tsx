import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";
import { KenBurnsImage } from "./KenBurnsImage";
import { KenBurnsMotion, COLORS } from "../config";

interface SceneProps {
    src: string;
    motion: KenBurnsMotion;
}

export const Scene: React.FC<SceneProps> = ({ src, motion }) => {
    const frame = useCurrentFrame();
    const { durationInFrames } = useVideoConfig();

    // Entry fade (0-30 frames = 1s)
    const fadeIn = interpolate(frame, [0, 30], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.out(Easing.cubic),
    });

    // Exit fade (last 30 frames = 1s)
    const fadeOut = interpolate(
        frame,
        [durationInFrames - 30, durationInFrames],
        [1, 0],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.cubic) }
    );

    const opacity = Math.min(fadeIn, fadeOut);

    // Light leak effect on scene entry (first 20 frames)
    const lightLeakOpacity = interpolate(frame, [0, 5, 20], [0, 0.4, 0], {
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
                opacity,
            }}
        >
            <KenBurnsImage src={src} motion={motion} hasZoomPunch={true} />

            {/* Entry light leak */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: `radial-gradient(ellipse at 60% 40%, ${COLORS.goldLight}50 0%, transparent 60%)`,
                    opacity: lightLeakOpacity,
                    pointerEvents: "none",
                    mixBlendMode: "screen",
                    zIndex: 5,
                }}
            />
        </div>
    );
};
