"use client";

export default function NoiseTexture() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-1 opacity-[0.04] mix-blend-multiply"
      style={{
        backgroundImage:
          "url('https://grainy-gradients.vercel.app/noise.svg')",
        backgroundRepeat: "repeat",
      }}
    />
  );
}
