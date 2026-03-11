import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { COLORS, PARTICLES } from "../config";

interface Particle {
    x: number;
    y: number;
    size: number;
    speed: number;
    opacity: number;
    delay: number;
    drift: number;
}

const seededRandom = (seed: number) => {
    const x = Math.sin(seed * 9301 + 49297) * 49297;
    return x - Math.floor(x);
};

const particles: Particle[] = Array.from({ length: PARTICLES.count }, (_, i) => ({
    x: seededRandom(i * 7 + 1) * 100,
    y: seededRandom(i * 13 + 3) * 100,
    size: PARTICLES.minSize + seededRandom(i * 17 + 5) * (PARTICLES.maxSize - PARTICLES.minSize),
    speed: 0.12 + seededRandom(i * 23 + 7) * PARTICLES.speed,
    opacity: PARTICLES.minOpacity + seededRandom(i * 29 + 11) * (PARTICLES.maxOpacity - PARTICLES.minOpacity),
    delay: seededRandom(i * 31 + 13) * 200,
    drift: (seededRandom(i * 37 + 17) - 0.5) * 0.3,
}));

export const FloatingParticles: React.FC = () => {
    const frame = useCurrentFrame();
    const { durationInFrames } = useVideoConfig();

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
                overflow: "hidden",
                pointerEvents: "none",
                zIndex: 60,
                opacity: globalOpacity,
            }}
        >
            {particles.map((p, i) => {
                const adj = Math.max(0, frame - p.delay);
                const yPos = (p.y + adj * p.speed * 0.07) % 115 - 7;
                const xPos = p.x + Math.sin(adj * 0.013 + i) * 4 * p.drift * 10;
                const twinkle = 0.4 + 0.6 * Math.sin(adj * 0.035 + i * 2.7);

                return (
                    <div
                        key={i}
                        style={{
                            position: "absolute",
                            left: `${xPos}%`,
                            top: `${yPos}%`,
                            width: p.size,
                            height: p.size,
                            borderRadius: "50%",
                            backgroundColor: COLORS.goldLight,
                            opacity: p.opacity * twinkle,
                            boxShadow: `0 0 ${p.size * 4}px ${p.size * 1.5}px ${COLORS.gold}35`,
                            filter: "blur(0.5px)",
                        }}
                    />
                );
            })}
        </div>
    );
};
