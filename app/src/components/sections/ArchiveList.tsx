"use client";
import { motion } from "framer-motion";
import { GEEK_LEVELS } from "../../lib/constants";

interface Props {
  onSelect: (level: string) => void;
}

export default function ArchiveList({ onSelect }: Props) {
  return (
    <section className="p-6 border-t-4 border-black bg-white">
      <h2 className="text-4xl font-black uppercase tracking-tighter mb-10">
        Geek Level Selector
      </h2>

      <div className="grid gap-6">
        {GEEK_LEVELS.map((level, i) => (
          <motion.div
            key={level.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            onClick={() => onSelect(level.id)}
            className="border-4 border-black p-6 cursor-pointer hover:bg-acid-yellow transition-colors"
          >
            <h3 className="text-2xl font-black uppercase">
              {level.title}
            </h3>
            <p className="font-mono text-sm mt-2">
              {level.description}
            </p>
            <p className="font-mono text-xs mt-2 opacity-60">
              {level.duration} Minutes
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
