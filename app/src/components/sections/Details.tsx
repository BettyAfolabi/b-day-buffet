"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Details() {
  const scrollToBooking = () => {
    const element = document.getElementById("booking-portal");
    if (element) {
      element.scrollIntoView({ 
        behavior: "smooth",
        block: "start" 
      });
    }
  };

  return (
    <section className="relative py-28 px-6 bg-neutral-50 border-t border-neutral-300">

      <div className="max-w-4xl mx-auto">

        {/* SECTION LABEL */}
        <div className="mb-16 text-center">
          <p className="text-xs font-mono uppercase tracking-widest mb-4">
            How It Works
          </p>

          <h2 className="text-3xl md:text-5xl font-black leading-tight">
            Structured. Intentional. Finite.
          </h2>
        </div>

        {/* FORMAT */}
        <div className="mb-20">
          <h3 className="text-sm font-mono uppercase tracking-widest mb-6">
            Format
          </h3>

          <div className="flex flex-col gap-6">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="border border-neutral-800 p-6 bg-white"
            >
              <p className="text-2xl font-bold">45 min</p>
              <p className="text-neutral-700">
                Tell me about the idea you’ve been obsessing over lately.
                <br></br>
                No prior reading required.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="border border-neutral-800 p-6 bg-white"
            >
              <p className="text-2xl font-bold">15 min</p>
              <p className="text-neutral-700">
                We discuss, question, refine, expand.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="border border-neutral-800 p-6 bg-white"
            >
              <p className="text-2xl font-bold">Optional Extension</p>
              <p className="text-neutral-700">
                If the energy is good, we continue informally.
                <br></br>
                Or we pivot into chaos and general life updates.
              </p>
            </motion.div>

          </div>
        </div>

        <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-5 mb-20"
          >
            <div className="relative aspect-4/5 bg-neutral-200 border-2 border-black grayscale shadow-[12px_12px_0_0_#000] overflow-hidden">
              <Image 
                src="/me/p1.jpg" 
                alt="The Curator"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

        {/* LOCATION OPTIONS */}
        <div className="mt-2 mb-20">
          <h3 className="text-sm font-mono uppercase tracking-widest mb-6">
            Location Options
          </h3>

          <div className="grid gap-6 md:grid-cols-2">

            <div className="border border-neutral-800 p-6 bg-white">
              <p className="font-semibold">Virtual</p>
              <p className="text-neutral-600 text-sm mt-2">
                Scheduled via Calendly. Structured and focused.
              </p>
            </div>

            <div className="border border-neutral-800 p-6 bg-white">
              <p className="font-semibold">In Person</p>
              <p className="text-neutral-600 text-sm mt-2">
                Quiet space. No distractions.
              </p>
            </div>

            <div className="border border-neutral-800 p-6 bg-white">
              <p className="font-semibold">Walk & Talk</p>
              <p className="text-neutral-600 text-sm mt-2">
                Movement often unlocks clarity.
              </p>
            </div>

            <div className="border border-neutral-800 p-6 bg-white">
              <p className="font-semibold">Just Hang Out</p>
              <p className="text-neutral-600 text-sm mt-2">
                Structure dissolves if it needs to.
              </p>
            </div>

          </div>
        </div>

        {/* TIMELINE */}
        <div>
          <h3 className="text-sm font-mono uppercase tracking-widest mb-10">
            Timeline
          </h3>

          {/* Visual Timeline */}
          <div className="relative">

            <div className="absolute top-4 left-0 right-0 h-0.5 bg-neutral-800" />

            <div className="flex justify-between relative">

              <div className="text-center">
                <div className="w-4 h-4 bg-neutral-800 mx-auto mb-4 rounded-full" />
                <p className="font-semibold">T – 2 Days</p>
                <p className="text-sm text-neutral-600">
                  Booking opens
                </p>
              </div>

              <div className="text-center">
                <div className="w-4 h-4 bg-neutral-800 mx-auto mb-4 rounded-full" />
                <p className="font-semibold">Birthday</p>
                <p className="text-sm text-neutral-600">
                  Sessions begin
                </p>
              </div>

              <div className="text-center">
                <div className="w-4 h-4 bg-neutral-800 mx-auto mb-4 rounded-full" />
                <p className="font-semibold">+1 Month</p>
                <p className="text-sm text-neutral-600">
                  Exhibition closes
                </p>
              </div>

            </div>

          </div>
        </div>

        
        {/* ===== CTA ===== */}
        <div className="text-center mt-28">
          <motion.button
            onClick={scrollToBooking} 
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            className="bg-black text-white px-10 py-4 rounded-full font-bold text-lg shadow-lg"
          >
            Initiate Conversation
          </motion.button>
        </div>

      </div>
    </section>
  );
}