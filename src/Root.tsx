import React from "react";
import { Composition } from "remotion";
import { AncientOSVideo } from "./AncientOSVideo";
import { VIDEO_CONFIG } from "./config";

export const RemotionRoot: React.FC = () => {
    return (
        <>
            <Composition
                id="AncientOSVideo"
                component={AncientOSVideo}
                durationInFrames={VIDEO_CONFIG.durationInFrames}
                fps={VIDEO_CONFIG.fps}
                width={VIDEO_CONFIG.width}
                height={VIDEO_CONFIG.height}
            />
        </>
    );
};
