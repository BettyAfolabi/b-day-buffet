"use client";
import { useState, useEffect } from "react";

export default function VibeToggle() {
  const [weird, setWeird] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (weird) {
      root.classList.add("vibe-weird");
    } else {
      root.classList.remove("vibe-weird");
    }
  }, [weird]);

  return (
    <button
      onClick={() => setWeird(!weird)}
      className="fixed bottom-6 right-6 bg-acid-yellow border-4 border-black px-4 py-2 font-black uppercase shadow-[4px_4px_0_#000] z-50"
    >
      {weird ? "Normalize It." : "Make It Weird."}
    </button>
  );
}
