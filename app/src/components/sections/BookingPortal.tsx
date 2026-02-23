"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QUESTION_FLOW } from "../../lib/constants";

// --- Types ---
type QuestionKey = keyof typeof QUESTION_FLOW;

type Option = {
  label: string;
  value: string;
  next: QuestionKey; // strictly typed to valid keys
};

type Question = {
  id: QuestionKey;
  question: string;
  options?: readonly Option[];
  type?: "input" | "textarea";
  next?: QuestionKey;
};

type Answers = Record<string, string>;

// --- Component ---
export default function BookingFlow() {
  const [answers, setAnswers] = useState<Answers>({});
  const [inputValue, setInputValue] = useState("");

  const [currentId, setCurrentId] = useState<keyof typeof QUESTION_FLOW>("geekLevel");
  const current = QUESTION_FLOW[currentId] as Question; 

  // --- Option button click ---
  const handleOptionSelect = (value: string, next?: QuestionKey) => {
    const updatedAnswers = { ...answers, [current.id]: value };
    setAnswers(updatedAnswers);
    setInputValue("");

    if (next && next in QUESTION_FLOW) {
      setCurrentId(next);
    } else {
      console.log("FINAL ANSWERS (Option):", updatedAnswers);
    }
  };

  // --- Input / textarea submit ---
  const handleTextSubmit = () => {
    if (!inputValue.trim()) return;

    const updatedAnswers = { ...answers, [current.id]: inputValue };
    setAnswers(updatedAnswers);
    setInputValue("");

    if (current.next && current.next in QUESTION_FLOW) {
      setCurrentId(current.next);
    } else {
      console.log("FINAL ANSWERS (Text):", updatedAnswers);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-yellow-300 via-pink-300 to-blue-300 p-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentId}
          initial={{ x: 120, opacity: 0, rotate: 3 }}
          animate={{ x: 0, opacity: 1, rotate: 0 }}
          exit={{ x: -120, opacity: 0, rotate: -3 }}
          transition={{ duration: 0.4 }}
          className="bg-white w-full max-w-md p-10 rounded-2xl shadow-2xl relative"
        >
          {/* Question */}
          <h2 className="text-2xl font-black mb-8">{current.question}</h2>

          {/* Options */}
          {current.options && (
            <div className="grid gap-4">
              {current.options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleOptionSelect(opt.value, opt.next)}
                  className="border-2 border-black p-4 font-bold hover:bg-black hover:text-white transition rounded-lg"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          {current.type === "input" && (
            <div className="space-y-4">
              <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="border-2 border-black p-4 w-full rounded-lg"
                placeholder="Type your answer here..."
              />
              <button
                onClick={handleTextSubmit}
                className="bg-black text-white p-4 font-bold w-full rounded-lg"
              >
                Continue
              </button>
            </div>
          )}

          {/* Textarea */}
          {current.type === "textarea" && (
            <div className="space-y-4">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="border-2 border-black p-4 w-full h-32 rounded-lg"
                placeholder="Write your answer here..."
              />
              <button
                onClick={handleTextSubmit}
                className="bg-black text-white p-4 font-bold w-full rounded-lg"
              >
                Continue
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}