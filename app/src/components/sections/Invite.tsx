"use client";

import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const topics = [
  "The psychology of concentrated wealth",
  "Food",
  "The mechanics of the four wheeled beast know as cars",
  "Startups and Businesses in Africa",
  "The political history of architecture as a tool of power",
  "How agricultural systems quietly shaped empires",
  "Energy transitions and who actually benefits from them",
  "Exchange theory and the invisible rules of markets",
  "Space exploration as geopolitical theater",
  "The anatomy of financial bubbles",
  "How infrastructure determines destiny",
  "What investment culture reveals about modern belief systems",
];

export default function Invitation() {
  const rotations = [-3, 2, -2, 3, -1, 2];

  const carouselRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      setWidth(
        carouselRef.current.scrollWidth - carouselRef.current.offsetWidth
      );
    }
  }, []);

  return (
    <section id="invitation" className="relative py-20 px-6">
      {/* subtle paper texture */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: "url('/me/paper.jpg')",
          backgroundSize: "600px",
        }}
      />

      <div className="relative z-10">

        {/* ===== MANIFESTO + INTRO ===== */}
        <div className="max-w-3xl mx-auto text-center mb-24">

          <p className="text-base font-mono uppercase tracking-widest mb-6">
            The Concept
          </p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black leading-tight uppercase tracking-tight mb-10"
          >
            This is not a party.
            <br />
            It is an exhibition
            <br />
            of your interest.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg md:text-xl leading-relaxed"
          >
            For one month after my birthday,
            I’m setting aside time for intentional 1:1 conversations.
            <br /><br />
            No small talk. No performative catchups.
            <br /><br />
             For one evening, I become a curator.
              You become the artist.
              Your fixation becomes the installation.
            <br /><br />
            I’ll listen carefully.
          </motion.p>
        </div>

        {/* ===== MOBILE SWIPEABLE CARDS ===== */}
        <div className="md:hidden overflow-hidden">
          <motion.div
            ref={carouselRef}
            drag="x"
            dragConstraints={{ left: -width, right: 0 }}
            className="flex gap-8 cursor-grab active:cursor-grabbing"
          >
            {topics.map((topic, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="relative min-w-[75%] max-w-70 bg-white border border-neutral-800 p-8 shadow-lg"
                style={{
                  transform: `rotate(${rotations[i]}deg)`
                }}
              >
                <p className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-6">
                  Possible Topic
                </p>

                <p className="text-lg leading-snug">
                  {topic}
                </p>

                <div className="absolute top-0 right-0 h-full w-0.75 bg-neutral-800 opacity-10" />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ===== DESKTOP COLLAGE ===== */}
        {/* ===== DESKTOP COLLAGE (FIXED SPACING) ===== */}
        <div className="relative max-w-6xl mx-auto min-h-200 hidden md:block mt-16">
          {topics.map((topic, i) => {
            // Math to spread 12 items across a 4-column grid
            const column = i % 4; // 0, 1, 2, 3
            const row = Math.floor(i / 4); // 0, 1, 2
            
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.05, 
                  zIndex: 50, // Brings the hovered card to the very front
                  transition: { duration: 0.2 } 
                }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="absolute bg-white shadow-xl border border-neutral-800 p-6 rounded-lg w-70"
                style={{
                  // Spreading cards out: 220px vertical gap, 300px horizontal gap
                  top: `${row * 220 + (column % 2 === 0 ? 0 : 40)}px`, 
                  left: `${column * 280}px`,
                  transform: `rotate(${rotations[i % rotations.length]}deg)`,
                  zIndex: i, // Ensures natural stacking
                }}
              >
                <p className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-3">
                  Possible Topic / {String(i + 1).padStart(2, '0')}
                </p>

                <p className="text-lg font-bold leading-tight tracking-tight">
                  {topic}
                </p>
              </motion.div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}