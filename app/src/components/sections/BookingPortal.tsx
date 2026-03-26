"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QUESTION_FLOW, SLOTS } from "../../lib/constants";
import { db } from "../../lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import Confetti from "../ui/confetti";

// free calendly priviledges ended 😩
// const CALENDLY_LINKS = {
//   virtual: process.env.NEXT_PUBLIC_VIRTUAL_LINK || "",
//   physical: process.env.NEXT_PUBLIC_INPERSON_LINK || "",
//   walk: process.env.NEXT_PUBLIC_INPERSON_LINK || "",
// } as const;

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
  const [loading, setLoading] = useState(false);

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
      setCurrentId("complete" as QuestionKey);
    } else if ("next" in current && current.next) {
      goTo(current.next as QuestionKey);
    }
  };

  const handleFinalBooking = async (slotLabel: string) => {
    setLoading(true);
    const finalAnswers = { 
      ...answers, 
      selectedSlot: slotLabel,
      bookingStatus: "confirmed" 
    };
    
    const success = await saveToFirebase(finalAnswers);
    if (success) {
      setAnswers(finalAnswers);
      setIsBooked(true);
    } else {
      setError("Connection error. Please try again.");
    }
    setLoading(false);
  };

  // useEffect(() => {
  //   const handleCalendlyEvent = (e: MessageEvent) => {
  //     if (e.data.event === 'calendly.event_scheduled') {
  //       setIsBooked(true);
  //     }
  //   };

  //   window.addEventListener('message', handleCalendlyEvent);
  //   return () => window.removeEventListener('message', handleCalendlyEvent);
  // }, []);

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
            key={loading ? "loading" : currentId} 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            className="bg-white w-full p-8 rounded-2xl shadow-2xl border-2 border-black overflow-hidden"
          >
            {loading ? (
              /* LOADING VIEW */
              <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <motion.div 
                  animate={{ rotate: 360 }} 
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="w-10 h-10 border-4 border-black border-t-transparent rounded-full"
                />
                <p className="font-mono text-xs uppercase animate-pulse">Syncing with Archive...</p>
              </div>
            ) : currentId === "complete" ? (
              /* COMPLETE / SUCCESS VIEW */
              <div className="space-y-4">
                {isBooked ? (
                  /* SUCCESS TICKET STUB */
                  <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="text-center py-6 space-y-4">
                    <div className="bg-acid-yellow border-2 border-black p-4 rotate-2">
                      <h2 className="text-3xl font-black uppercase">Entry Granted.</h2>
                    </div>
                    <p className="font-bold uppercase text-xs">The Archive is ready, {answers.name}.</p>
                    <div className="border-t-2 border-dashed border-black pt-4 text-[10px] text-left font-mono">
                      <p>TOPIC: {answers.topic?.toUpperCase()}</p>
                      <p>FORMAT: {answers.format?.toUpperCase()}</p>
                      <p className="text-blue-600 font-bold">TIME: {answers.selectedSlot?.toUpperCase()}</p>
                      <p className="mt-4 italic text-xs leading-tight text-center">
                        THIS IS A LEGALLY BINDING BIRTHDAY COMMITMENT. <br/> SCREENSHOT THIS TICKET.
                      </p>
                      <p className="mt-4 opacity-50 italic text-center">I‘ll reach out on WhatsApp shortly.</p>
                    </div>
                  </motion.div>
                ) : (
                  /* --- CALENDLY VIEW --- */
                  // <div className="space-y-6 text-center py-4">
                  //   <h2 className="text-2xl font-black uppercase tracking-tight">Final Step: Secure the Time</h2>
                    
                  //   <div className="bg-neutral-100 p-4 border-2 border-dashed border-black">
                  //     <p className="text-[10px] font-mono uppercase mb-1 opacity-60">Session Mode</p>
                  //     <p className="font-bold text-lg uppercase">{answers.format}</p>
                  //   </div>

                  //   <button 
                  //     onClick={() => {
                  //       const baseUrl = CALENDLY_LINKS[answers.format as keyof typeof CALENDLY_LINKS] || CALENDLY_LINKS.virtual;
                  //       // We pass the name and topic via URL parameters so they are still pre-filled!
                  //       const finalUrl = `${baseUrl}?name=${encodeURIComponent(answers.name || "")}&a8=${encodeURIComponent(answers.topic || "")}`;
                        
                  //       window.open(finalUrl, '_blank'); // Opens in a fresh, secure tab
                  //     }}
                  //     className="w-full bg-black text-white p-6 font-black text-xl shadow-[6px_6px_0_0_#4ade80] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                  //   >
                  //     OPEN CALENDAR →
                  //   </button>

                  //   <p className="text-[10px] uppercase font-bold opacity-40 mt-4">
                  //     Confirm your time there to finalize.
                  //   </p>
                  // </div>

                  /* --- SLOT PICKER VIEW --- */
                  <div className="space-y-4">
                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-black uppercase tracking-tight">Claim a Slot</h2>
                      <p className="text-[10px] font-mono bg-black text-white px-2 py-1 inline-block mt-2">
                        MODE: {answers.format?.toUpperCase()}
                      </p>
                    </div>

                    <div className="grid gap-2 max-h-75 px-4 overflow-y-auto custom-scrollbar">
                      {(SLOTS[answers.format as keyof typeof SLOTS] || SLOTS.virtual).map((slot) => (
                        <button
                          key={slot.id}
                          onClick={() => handleFinalBooking(slot.label)}
                          className="border-2 border-black p-4 text-left font-bold hover:bg-acid-yellow transition-all active:scale-95 flex justify-between items-center group"
                        >
                          <span className="text-sm">{slot.label}</span>
                          <span className="opacity-40 group-hover:opacity-100 italic">BOOK →</span>
                        </button>
                      ))}
                    </div>

                    <p className="text-[10px] text-center opacity-50 font-medium uppercase mt-4">
                      *All times are in WAT (Lagos Time)
                    </p>
                    
                    {error && <p className="text-red-500 text-center text-xs font-bold">{error}</p>}
                  </div>
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