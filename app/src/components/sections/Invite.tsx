 "use client";

import { motion } from "framer-motion";

const topics = [
  "Why you believe One Piece is peak fiction",
  "The economics of sneaker culture",
  "Your 12-step espresso optimization ritual",
  "A breakdown of your D&D campaign lore",
  "Why your startup idea might change the world",
  "The psychology of villain origin stories",
];

export default function Invitation() {
  return (
    <section id="invitation" className="relative py-32 px-6 overflow-hidden">
        <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
            backgroundImage: "url('/me/paper.jpg')",
            backgroundSize: "600px",
            }}
        />

      {/* SECTION HEADER */}
      <div className="relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black uppercase mb-6">
            What Is This?
            </h2>

            <p className="text-lg md:text-xl leading-relaxed">
            For one month after my birthday,
            I’m hosting intentional 1:1 deep dives.
            <br /><br />
            Your topic. Your obsession.
            <br />
            I listen. Fully.
            </p>
        </div>

        {/* COLLAGE CARDS */}
        <div className="relative max-w-6xl mx-auto h-125 space-y-2">

            {topics.map((topic, i) => (
            <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, rotate: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute bg-white shadow-xl border-2 border-black p-6 w-65 rounded-xl"
                style={{
                top: `${(i % 3) * 140}px`,
                left: `${(i % 2) * 320 + (i > 2 ? 150 : 0)}px`,
                transform: `rotate(${i % 2 === 0 ? -6 : 5}deg)`
                }}
            >
                <p className="text-sm uppercase mb-3">
                Possible Topic
                </p>

                <p className="text-xl tracking-wide" style={{ fontFamily: "var(--font-hand)" }}>
                {topic}
                </p>
            </motion.div>
            ))}

        </div>

        {/* CTA */}
        <div className="text-center mt-24">
            <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="bg-black text-white px-10 py-4 rounded-full font-bold text-lg shadow-lg"
            >
            I’m Ready to Bore You.
            </motion.button>
        </div>
      </div>

    </section>
  );
}
