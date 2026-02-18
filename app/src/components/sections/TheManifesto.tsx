"use client";

import { motion } from "framer-motion";

export default function TheManifesto() {
  return (
    <section className="relative border-t-4 border-black bg-white">
      {/* Sticky Section Label */}
      <div className="sticky top-8 z-20 bg-white border-b-2 border-black px-6 py-3">
        <h2 className="text-xs font-mono uppercase tracking-widest">
          THE CONCEPT
        </h2>
      </div>

      <div className="px-6 py-16 max-w-xl mx-auto flex flex-col gap-16">

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-black leading-[1.05] uppercase tracking-tight"
        >
          This is not a party.
          <br />
          It is an exhibition
          <br />
          of your obsession.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="text-lg font-mono leading-relaxed"
        >
          For one evening, I become a curator.
          You become the artist.
          Your fixation becomes the installation.
        </motion.p>

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="border-4 border-black p-6 bg-acid-yellow"
        >
          <p className="font-bold uppercase text-sm leading-tight">
            ENTRY IS LIMITED.
            <br />
            SLOTS ARE CURATED.
            <br />
            THIS IS A PRIVATE VIEWING.
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="text-base font-mono leading-relaxed"
        >
          Submit your thesis.
          Choose your level of spiral.
          Secure your time on the wall.
        </motion.p>
      </div>
    </section>
  );
}
