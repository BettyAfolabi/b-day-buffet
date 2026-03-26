/* eslint-disable react-hooks/purity */
"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";
import ScriptedTypewriter from "../ui/Typewriter";

const photos = [
  "/me/p5.jpg",
  "/me/p4.jpg",
  "/me/p2.jpg",
  "/me/p6.jpg",
];

function getBirthdayStatus() {
  const today = new Date();
  today.setHours(0, 0, 0, 0); 
  
  const year = today.getFullYear();
  const birthday = new Date(year, 2, 14); 
  birthday.setHours(0, 0, 0, 0);

  const diffTime = birthday.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return { phase: "today", days: 0 };
  if (diffDays < 0) return { phase: "past", days: 0 };
  return { phase: "future", days: diffDays };
}

export default function Hero() {
  const birthdayStatus = getBirthdayStatus();

  let birthdayText = "";
  if (birthdayStatus.phase === "today") {
    birthdayText = "and today is my birthday!";
  } else if (birthdayStatus.phase === "past") {
    birthdayText = "and I did something peculiar for my birthday.";
  } else {
    birthdayText = `and my birthday is in ${birthdayStatus.days} days.`;
  }

  const script = [
    {
      text: "Hiii...",
      pauseAfter: 1200,
      clearAfter: true,
    },
    {
      text: "My name is Betty",
      pauseAfter: 1800,
      clearAfter: true,
    },
    {
      text: birthdayText,
      pauseAfter: 2000,
      clearAfter: true,
    },
    {
      text: "Instead of gifts, I want your nerdiest obsessions. Healthy ones 🌚",
      pauseAfter: 2500,
      clearAfter: false,
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      document.getElementById("invitation")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 23500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-dvh overflow-hidden bg-[#FFF9EC] flex items-center justify-center">

      {/* COLORFUL RAVE BLOBS (kept, but softer) */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            x: [0, Math.random() * 60 - 30, 0],
            y: [0, Math.random() * 60 - 30, 0],
          }}
          transition={{
            duration: 12 + Math.random() * 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute rounded-full opacity-70 blur-3xl"
          style={{
            width: `${200 + Math.random() * 200}px`,
            height: `${200 + Math.random() * 200}px`,
            top: `${Math.random() * 80}%`,
            left: `${Math.random() * 80}%`,
            background: `hsl(${Math.random() * 360}, 90%, 65%)`,
          }}
        />
      ))}

      {/* LEFT VERTICAL HAPPY BIRTHDAY */}
      <div className="absolute left-8 top-0 h-full w-24 overflow-hidden">
        <motion.div
          animate={{ y: ["0%", "-50%"] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="flex flex-col gap-10 text-3xl font-black uppercase"
        >
          {[...Array(10)].map((_, i) => (
            <span
              key={i}
              className="rotate-180 [writing-mode:vertical-rl]"
            >
              Happy Birthday
            </span>
          ))}
        </motion.div>
      </div>

      {/* RIGHT VERTICAL HAPPY BIRTHDAY */}
      <div className="absolute right-8 top-0 h-full w-24 overflow-hidden">
        <motion.div
          animate={{ y: ["-50%", "0%"] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="flex flex-col gap-10 text-3xl font-black uppercase"
        >
          {[...Array(10)].map((_, i) => (
            <span
              key={i}
              className="[writing-mode:vertical-rl]"
            >
              Happy Birthday
            </span>
          ))}
        </motion.div>
      </div>

      {/* CENTER STACK SEQUENCE */}
      <div className="relative w-full max-w-lg h-130 flex items-center justify-center">

        {/* SCATTERED PHOTO COMPOSITION */}
        {photos.map((src, i) => {
          const positions = [
            { top: "15%", left: "18%", rotate: -12 },
            { top: "55%", left: "12%", rotate: 8 },
            { top: "20%", right: "18%", rotate: 10 },
            { top: "60%", right: "14%", rotate: -6 },
          ];

          const pos = positions[i];

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.6, y: 80 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                delay: 0.8 + i * 1.2,
                duration: 1.4,
                ease: "easeOut",
              }}
              className="absolute shadow-2xl border-4 border-black bg-white"
              style={{
                ...pos,
                zIndex: 5,
              }}
            >
              <Image
                src={src}
                alt="birthday"
                width={280}
                height={340}
                className="object-cover"
              />
            </motion.div>
          );
        })}

        {/* MAIN TEXT — DOMINANT AFTER SHRINK */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 6.6, duration: 1 }}
          className="absolute z-30"
        >
          <div className="bg-white px-10 py-8 rounded-3xl shadow-2xl border-4 border-white max-w-lg mx-auto">

            <p className="text-lg md:text-xl font-semibold text-black text-center leading-relaxed">
              <ScriptedTypewriter
                script={script}
                speed={70}
                startDelay={7200}
              />
            </p>

          </div>
        </motion.div>

      </div>

    </section>
  );
}
