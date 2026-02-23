"use client";

import { useEffect, useRef, useState } from "react";

type ScriptLine = {
  text: string;
  pauseAfter?: number;
  clearAfter?: boolean;
};

export default function ScriptedTypewriter({
  script,
  speed = 60,
  startDelay = 0,
}: {
  script: ScriptLine[];
  speed?: number;
  startDelay?: number;
}) {
  const [lineIndex, setLineIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [hasStarted, setHasStarted] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // ⏳ Delay start
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasStarted(true);
    }, startDelay);

    return () => clearTimeout(timer);
  }, [startDelay]);

  useEffect(() => {
    if (!hasStarted) return;
    if (lineIndex >= script.length) return;

    const currentLine = script[lineIndex];
    let i = 0;

    setDisplayed("");

    intervalRef.current = setInterval(() => {
      setDisplayed(currentLine.text.slice(0, i));
      i++;

      if (i > currentLine.text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);

        timeoutRef.current = setTimeout(() => {
          if (currentLine.clearAfter) {
            setDisplayed("");
          }
          setLineIndex((prev) => prev + 1);
        }, currentLine.pauseAfter ?? 1200);
      }
    }, speed);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [lineIndex, hasStarted, script, speed]);

  return <span>{displayed}</span>;
}