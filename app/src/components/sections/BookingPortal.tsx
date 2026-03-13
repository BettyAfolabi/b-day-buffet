"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { InlineWidget } from "react-calendly";
import { QUESTION_FLOW } from "../../lib/constants";
import { db } from "../../lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import Confetti from "../ui/confetti";

const CALENDLY_LINKS = {
  virtual: process.env.NEXT_PUBLIC_VIRTUAL_LINK || "",
  physical: process.env.NEXT_PUBLIC_INPERSON_LINK || "",
  walk: process.env.NEXT_PUBLIC_INPERSON_LINK || "",
} as const;

type QuestionKey = keyof typeof QUESTION_FLOW;
type Answers = Record<string, string>;

export default function BookingFlow() {
  const [answers, setAnswers] = useState<Answers>({});
  const [inputValue, setInputValue] = useState("");
  const [currentId, setCurrentId] = useState<QuestionKey>("geekLevel");
  const [showFinePrint, setShowFinePrint] = useState(false);
  const [history, setHistory] = useState<QuestionKey[]>([]);
  const [isBooked, setIsBooked] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const current = QUESTION_FLOW[currentId];

  const goTo = (next: QuestionKey) => {
    setHistory((prev) => [...prev, currentId]);
    setCurrentId(next);
  };

  const handleBack = () => {
    if (history.length === 0) return;
    const previous = history[history.length - 1];
    setHistory((prev) => prev.slice(0, -1));
    setCurrentId(previous);
  };

  const saveToFirebase = async (finalAnswers: Answers) => {
    try {
      const docRef = await addDoc(collection(db, "bookings"), {
        ...finalAnswers,
        createdAt: serverTimestamp(),
      });
      console.log("Document written with ID: ", docRef.id); 
      return true;
    } catch (error) {
      console.error("Firebase Error:", error);
      return false;
    }
  };

  const handleOptionSelect = (value: string, next?: QuestionKey) => {
    const updatedAnswers = { ...answers, [currentId]: value };
    setAnswers(updatedAnswers);

    if (currentId === "location" && value === "island") {
      setShowFinePrint(true);
      return;
    }

    if (currentId === "location" && value === "outside") {
      setAnswers({ ...updatedAnswers, format: "virtual" });
      goTo("topic");
      return;
    }

    if (next) goTo(next);
  };

  const handleTextSubmit = async () => {
    if (!inputValue.trim()) return;

    if (currentId === "contact") {
      const phoneRegex = /^[+]?[\d\s-]{10,15}$/;
      if (!phoneRegex.test(inputValue.trim())) {
        setError("Please enter a valid phone number (digits only)");
        return; 
      }
    }
    setError(null);

    const updatedAnswers = { ...answers, [currentId]: inputValue };
    setAnswers(updatedAnswers);
    setInputValue("");

    if (currentId === "askMe") {
      await saveToFirebase(updatedAnswers);
      setCurrentId("complete");
    } else if ("next" in current && current.next) {
      goTo(current.next as QuestionKey);
    }
  };

  useEffect(() => {
    const handleCalendlyEvent = (e: MessageEvent) => {
      if (e.data.event === 'calendly.event_scheduled') {
        setIsBooked(true);
      }
    };

    window.addEventListener('message', handleCalendlyEvent);
    return () => window.removeEventListener('message', handleCalendlyEvent);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-yellow-300 via-pink-300 to-blue-300 p-6">
      {isBooked && <Confetti />}
      
      <div className="relative w-full max-w-md">
        {history.length > 0 && currentId !== "complete" && (
          <button onClick={handleBack} className="mb-4 text-sm font-bold hover:opacity-60 transition uppercase">
            ← Previous Question
          </button>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={currentId}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            className="bg-white w-full p-8 rounded-2xl shadow-2xl border-2 border-black overflow-hidden"
          >
            {currentId === "complete" ? (
              <div className="space-y-4">
                {isBooked ? (
                  /* --- SUCCESS TICKET STUB --- */
                  <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="text-center py-6 space-y-4">
                    <div className="bg-acid-yellow border-2 border-black p-4 rotate-2">
                      <h2 className="text-3xl font-black uppercase">Entry Granted.</h2>
                    </div>
                    <p className="font-bold uppercase text-xs">The Archive is ready, {answers.name}.</p>
                    <div className="border-t-2 border-dashed border-black pt-4 text-[10px] text-left font-mono">
                      <p>TOPIC: {answers.topic?.toUpperCase()}</p>
                      <p>FORMAT: {answers.format?.toUpperCase()}</p>
                      <p className="mt-4 opacity-50 italic text-center">Check your WhatsApp/Email for details.</p>
                    </div>
                  </motion.div>
                ) : (
                  /* --- CALENDLY VIEW --- */
                  <>
                    <h2 className="text-2xl font-black uppercase">Secure Your Slot</h2>
                    <p className="text-[10px] font-mono bg-black text-white p-2 inline-block">
                      MODE: {answers.format?.toUpperCase()}
                    </p>
                    <div className="h-125 -mx-4 overflow-y-auto border-t-2 border-black mt-4">
                      <InlineWidget 
                        url={CALENDLY_LINKS[answers.format as keyof typeof CALENDLY_LINKS] || CALENDLY_LINKS.virtual}
                        prefill={{
                          name: answers.name,
                        }}
                        styles={{ height: '1000px' }}
                      />
                    </div>
                  </>
                )}
              </div>
            ) : (
              /* --- STANDARD QUESTION VIEW --- */
              <>
                <h2 className="text-xl font-black mb-8 uppercase tracking-tight">{current.question}</h2>
                {"options" in current && (
                  <div className="grid gap-3">
                    {current.options.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => handleOptionSelect(opt.value, opt.next as QuestionKey)}
                        className="border-2 border-black p-4 text-left font-bold hover:bg-black hover:text-white transition-all active:scale-95"
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
                {("type" in current) && (
                  <div className="space-y-4">
                    <motion.div
                      animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
                      transition={{ duration: 0.4 }}
                    >
                      {current.type === "input" ? (
                        <input 
                          value={inputValue} 
                          onChange={(e) => {
                            setError(null); 
                            setInputValue(currentId === "contact" 
                              ? e.target.value.replace(/[^\d+]/g, "") 
                              : e.target.value
                            );
                          }} 
                          type={currentId === "contact" ? "tel" : "text"}
                          className={`border-2 p-4 w-full font-bold outline-none transition-colors ${
                            error ? "border-red-500 bg-red-50" : "border-black"
                          }`} 
                          placeholder={currentId === "contact" ? "08012345678" : "Type here..."} 
                        />
                      ) : (
                        <textarea 
                          value={inputValue} 
                          onChange={(e) => {
                            setError(null);
                            setInputValue(e.target.value);
                          }} 
                          className={`border-2 p-4 w-full h-32 font-bold outline-none transition-colors ${
                            error ? "border-red-500 bg-red-50" : "border-black focus:bg-yellow-50"
                          }`} 
                          placeholder="Go deep..." 
                        />
                      )}
                    </motion.div>

                    {/* Display the error message if it exists */}
                    <AnimatePresence>
                      {error && (
                        <motion.p 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-red-600 font-mono text-[10px] uppercase tracking-widest font-bold"
                        >
                          {error}
                        </motion.p>
                      )}
                    </AnimatePresence>

                    <button 
                      onClick={handleTextSubmit} 
                      className="bg-black text-white p-4 font-bold w-full active:scale-95 transition-transform"
                    >
                      CONTINUE →
                    </button>
                  </div>
                )}
              </>
            )}
          </motion.div>
        </AnimatePresence>

        {/* --- FINE PRINT MODAL --- */}
        <AnimatePresence>
          {showFinePrint && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-6">
              <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-yellow-300 border-4 border-black p-8 max-w-sm">
                <h3 className="text-2xl font-black mb-4 uppercase">Patronage Advisory</h3>
                <p className="font-medium mb-6 leading-relaxed text-sm"> 
                  If we’re meeting somewhere with a bill above 5k,that bill is 100% your birthday gift to me.
                  I’m the talent. You’re the patron of the arts.
                  Deal? 
                </p>
                <div className="flex flex-col gap-3">
                  <button onClick={() => { setAnswers({...answers, format: 'physical'}); setShowFinePrint(false); goTo("topic"); }} className="bg-black text-white p-4 font-black">I ACCEPT THE TERMS</button>
                  <button onClick={() => { setAnswers({...answers, format: 'virtual'}); setShowFinePrint(false); goTo("topic"); }} className="border-2 border-black p-4 font-black uppercase text-xs">{`Actually, let's do virtual`}</button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}