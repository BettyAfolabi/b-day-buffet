"use client";

import { useEffect, useState } from "react";

export default function Typewriter({
  text,
  delay = 0,
  speed = 50,
  onComplete,
}: {
  text: string;
  delay?: number;
  speed?: number;
  onComplete?: () => void;
}) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const start = setTimeout(() => {
      let i = 0;

      interval = setInterval(() => {
        setDisplayed(text.slice(0, i));
        i++;

        if (i > text.length) {
          clearInterval(interval);
          onComplete?.();
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, [text, delay, speed, onComplete]);

  return <span>{displayed}</span>;
}
