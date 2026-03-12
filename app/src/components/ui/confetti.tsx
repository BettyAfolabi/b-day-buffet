/* eslint-disable react-hooks/purity */
"use client"
import { motion } from 'framer-motion';

const SHAPES = ['rect', 'circle', 'triangle'];
const COLORS = ['#FF00FF', '#0038FF', '#D1FF00', '#0A0A0A'];

export default function Confetti() {
  const pieces = Array.from({ length: 50 });

  return (
    <div className="fixed inset-0 pointer-events-none z-100 overflow-hidden">
      {pieces.map((_, i) => {
        const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];
        
        return (
          <motion.div
            key={i}
            initial={{ 
              top: "50%", 
              left: "50%", 
              opacity: 1, 
              scale: 0,
              rotate: 0 
            }}
            animate={{ 
              top: `${Math.random() * 100}%`, 
              left: `${Math.random() * 100}%`,
              opacity: 0,
              scale: Math.random() * 1.5,
              rotate: Math.random() * 360
            }}
            transition={{ 
              duration: 2, 
              ease: "easeOut",
              delay: Math.random() * 0.2 
            }}
            style={{
              position: 'absolute',
              width: '15px',
              height: '15px',
              backgroundColor: shape !== 'triangle' ? color : 'transparent',
              borderRadius: shape === 'circle' ? '50%' : '0%',
              borderLeft: shape === 'triangle' ? '10px solid transparent' : '',
              borderRight: shape === 'triangle' ? '10px solid transparent' : '',
              borderBottom: shape === 'triangle' ? `20px solid ${color}` : '',
            }}
          />
        );
      })}
    </div>
  );
}