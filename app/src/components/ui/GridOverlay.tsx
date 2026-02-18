"use client";

export default function GridOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.08]">
      <div className="grid grid-cols-12 h-full w-full">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="border-l border-black"
          />
        ))}
      </div>
    </div>
  );
}
