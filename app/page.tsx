"use client";

import { useState } from "react";
import Hero from "./src/components/sections/Hero";
import ArchiveList from "./src/components/sections/ArchiveList";
import BookingPortal from "./src/components/sections/BookingPortal";
import VibeToggle from "./src/components/ui/VibeToggle";
import { EVENT_CONFIG } from "./src/lib/constants";
import GridOverlay from "./src/components/ui/GridOverlay";
import TheManifesto from "./src/components/sections/TheManifesto";
import NoiseTexture from "./src/components/ui/NoiseTexture";
import Invitation from "./src/components/sections/Invite";

export default function Home() {
  const [geekLevel, setGeekLevel] = useState<string | null>(null);

  return (
    <main className="relative min-h-screen font-sans bg-white overflow-x-hidden">

      <GridOverlay />
      <NoiseTexture />

      {/* Sticky Header */}
      <div className="fixed top-0 w-full border-b-2 border-black bg-white z-50 p-2 text-[10px] font-mono flex justify-between uppercase">
        <span>Project: {EVENT_CONFIG.projectCode}</span>
        <span>{geekLevel ? "Booking Active" : "Selection Mode"}</span>
      </div>

      <div className="md:pt-10">
        <Hero />
        <Invitation />
        <TheManifesto />
        <ArchiveList onSelect={(level) => setGeekLevel(level)} />
        {geekLevel && <BookingPortal level={geekLevel} />}
      </div>

      <VibeToggle />
    </main>
  );
}
