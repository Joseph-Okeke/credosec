"use client";

import Particles from "@tsparticles/react";

export default function MatrixBackground() {
  return (
    <Particles
      options={{
        preset: "matrix",
        fullScreen: {
          enable: true,
          zIndex: -1,
        },
      }}
    />
  );
}
