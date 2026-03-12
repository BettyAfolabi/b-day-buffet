"use client";

import Hero from "./src/components/sections/Hero";
import VibeToggle from "./src/components/ui/VibeToggle";
import { EVENT_CONFIG } from "./src/lib/constants";
import GridOverlay from "./src/components/ui/GridOverlay";
import NoiseTexture from "./src/components/ui/NoiseTexture";
import Invitation from "./src/components/sections/Invite";
import Details from "./src/components/sections/Details";
import BookingFlow from "./src/components/sections/BookingPortal";

export default function Home() {

  return (
    <main className="relative min-h-screen font-sans bg-white overflow-x-hidden">

      <GridOverlay />
      <NoiseTexture />

      {/* Sticky Header */}
      <div className="fixed top-0 w-full border-b-2 border-black bg-white z-50 p-2 text-[10px] font-mono flex justify-between uppercase">
        <span>Project: {EVENT_CONFIG.projectCode}</span>
      </div>

      <div className="md:pt-10">
        <Hero />
        <Invitation />
        <Details />
        <section id="booking-portal"> 
          <BookingFlow />
        </section>
      </div>

      <VibeToggle />
    </main>
  );
}