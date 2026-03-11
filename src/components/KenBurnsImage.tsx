import React from "react";
import {
    useCurrentFrame,
    useVideoConfig,
    interpolate,
    Img,
    staticFile,
    Easing,
} from "remotion";
import { KenBurnsMotion } from "../config";

interface KenBurnsImageProps {
    src: string;
    motion: KenBurnsMotion;
    hasZoomPunch?: boolean;
}

export const KenBurnsImage: React.FC<KenBurnsImageProps> = ({
    src,
    motion,
    hasZoomPunch = false,
}) => {
    const frame = useCurrentFrame();
    const { durationInFrames } = useVideoConfig();

    const progress = interpolate(frame, [0, durationInFrames], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // Zoom punch on entry: +5% that settles to 0 over 15 frames
    const zoomPunch = hasZoomPunch
        ? interpolate(frame, [0, 15], [0.05, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.cubic),
        })
        : 0;

    let scale = 1;
    let translateX = 0;
    let translateY = 0;

    switch (motion) {
        case "zoomIn":
            scale = 1 + progress * 0.14;
            break;
        case "zoomOut":
            scale = 1.14 - progress * 0.11;
            break;
        case "panLeft":
            scale = 1.1;
            translateX = progress * -55;
            break;
        case "panRight":
            scale = 1.1;
            translateX = progress * 55;
            break;
        case "panUp":
            scale = 1.1;
            translateY = progress * -35;
            break;
        case "zoomInPanLeft":
            scale = 1 + progress * 0.12;
            translateX = progress * -30;
            break;
        case "zoomInPanRight":
            scale = 1 + progress * 0.12;
            translateX = progress * 30;
            break;
    }

    scale += zoomPunch;

    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                overflow: "hidden",
                position: "relative",
            }}
        >
            <Img
                src={staticFile(src)}
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transform: `scale(${scale}) translate(${translateX}px, ${translateY}px)`,
                    transformOrigin: "center center",
                    filter: "contrast(1.08) saturate(1.15) brightness(0.95)",
                }}
            />

            {/* Strong cinematic vignette */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background:
                        "radial-gradient(ellipse at center, transparent 25%, rgba(0,0,0,0.5) 65%, rgba(0,0,0,0.85) 100%)",
                    pointerEvents: "none",
                }}
            />

            {/* Film grain overlay */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    opacity: 0.08,
                    background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    pointerEvents: "none",
                    mixBlendMode: "overlay",
                }}
            />

            {/* Warm gold highlights color grade */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "radial-gradient(ellipse at 50% 30%, rgba(201,168,76,0.06) 0%, transparent 60%)",
                    pointerEvents: "none",
                    mixBlendMode: "color-dodge",
                }}
            />
        </div>
    );
};
