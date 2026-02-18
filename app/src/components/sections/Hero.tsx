/* eslint-disable react-hooks/purity */
"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const photos = [
  "/me/p5.jpg",
  "/me/p4.jpg",
  "/me/p2.jpg",
];

export default function Hero() {
  return (
    <section className="relative min-h-dvh overflow-hidden bg-[#FFF9EC]">

      {/* BACKGROUND RAVE BLOBS */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            x: [0, Math.random() * 60 - 30, 0],
            y: [0, Math.random() * 60 - 30, 0],
            rotate: [0, 360, 0],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute rounded-full opacity-70"
          style={{
            width: `${100 + Math.random() * 200}px`,
            height: `${100 + Math.random() * 200}px`,
            top: `${Math.random() * 80}%`,
            left: `${Math.random() * 80}%`,
            background: `hsl(${Math.random() * 360}, 80%, 60%)`,
            filter: "blur(2rem)",
          }}
        />
      ))}

      {/* SCATTERED PHOTOS */}
      {photos.map((src, i) => (
        <motion.div
          key={i}
          initial={{ rotate: -20, scale: 0.8, opacity: 0 }}
          animate={{
            rotate: i % 2 === 0 ? [-20, 20, -15] : [15, -15, 15],
            scale: [1, 1.2, 1],
            opacity: [0, 1, 1],
          }}
          transition={{
            delay: 0.3 + i * 0.2,
            duration: 4,
            repeat: Infinity,
            repeatType: "mirror",
          }}
          whileHover={{ scale: 1.3, rotate: 0 }}
          className="absolute bg-white p-2 shadow-2xl border-4 border-black rounded"
          style={{
            width: "120px",
            top: `${15 + i * 18}%`,
            left: i % 2 === 0 ? "5%" : "65%",
          }}
        >
          <Image src={src} alt="birthday" width={200} height={200} className="object-cover" />
        </motion.div>
      ))}

      {/* MAIN TYPOGRAPHY */}
      <div className="relative z-20 flex flex-col justify-center min-h-dvh px-6 text-center">

        <motion.h1
          animate={{ rotate: [-5, 5, -5], scale: [1, 1.2, 1] }}
          transition={{ duration: 0.6, repeat: Infinity, repeatType: "mirror" }}
          className="text-[16vw] md:text-[12vw] font-black uppercase leading-[0.85]"
          style={{
            background: "linear-gradient(45deg,#FF0080,#FFEC00,#00FFE0,#FF3D00)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          IT’S MY
        </motion.h1>

        <motion.h1
          animate={{ y: [-10, 10, -10], rotate: [-2, 2, -2] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "mirror" }}
          className="text-[20vw] md:text-[14vw] font-black uppercase leading-[0.8]"
          style={{
            background: "linear-gradient(90deg,#FF00FF,#00FFFF,#FFFF00,#FF6C00)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          BIRTHDAY.
        </motion.h1>

        <motion.p
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-6 text-xl md:text-2xl font-bold text-white text-shadow-blue-600"
        >
          But instead of gifts, <br />
          I want your nerdiest obsession.
        </motion.p>

      </div>

      {/* FLOATING SCRIBBLES / CONFETTI */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, 10 + Math.random() * 20, 0],
            x: [0, -10 + Math.random() * 20, 0],
            rotate: [0, 360, 0],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute w-4 h-4 rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            background: `hsl(${Math.random() * 360}, 90%, 60%)`,
          }}
        />
      ))}

      {/* SCROLL CUE */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm font-bold animate-bounce">
        ↓ ENTER THE EXHIBITION ↓
      </div>

    </section>
  );
}
