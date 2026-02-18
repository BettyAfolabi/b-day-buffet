"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { InlineWidget } from "react-calendly";
import { db } from "../../lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { EVENT_CONFIG } from "../../lib/constants";

interface Props {
  level: string;
}

export default function BookingPortal({ level }: Props) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    topic: "",
    format: "",
  });

  const handleNext = () => {
    if (!formData.name || !formData.topic) return;
    setStep(2);
  };

  const handleFormat = (format: "virtual" | "physical") => {
    setFormData({ ...formData, format });
    setStep(3);
  };

  const saveSubmission = async () => {
    setLoading(true);
    try {
      await addDoc(collection(db, "event_submissions"), {
        ...formData,
        level,
        projectCode: EVENT_CONFIG.projectCode,
        createdAt: new Date(),
      });
      setStep(4);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const calendlyUrl =
    formData.format === "physical"
      ? EVENT_CONFIG.calendlyUrlPhysical
      : EVENT_CONFIG.calendlyUrlVirtual;

  return (
    <section className="p-6 min-h-[60vh] border-t-4 border-black">
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="step1">
            <h2 className="text-4xl font-black uppercase mb-6">
              The Intake
            </h2>
            <input
              placeholder="YOUR NAME"
              className="border-b-4 border-black p-3 text-xl font-bold uppercase w-full mb-4"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <textarea
              placeholder="WHAT IS YOUR OBSESSION?"
              className="border-b-4 border-black p-3 text-lg font-bold uppercase w-full h-32"
              onChange={(e) =>
                setFormData({ ...formData, topic: e.target.value })
              }
            />
            <button
              onClick={handleNext}
              className="mt-6 bg-black text-white p-4 font-black uppercase"
            >
              Continue
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="step2">
            <h2 className="text-4xl font-black uppercase mb-6">
              Choose Format
            </h2>
            <div className="grid gap-4">
              <button
                onClick={() => handleFormat("virtual")}
                className="border-4 border-black p-6 font-black uppercase"
              >
                Virtual
              </button>
              <button
                onClick={() => handleFormat("physical")}
                className="border-4 border-black p-6 font-black uppercase"
              >
                Physical ({EVENT_CONFIG.city})
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="step3">
            <h3 className="text-xl font-black uppercase mb-4">
              Confirm Submission
            </h3>
            <p className="font-mono text-sm mb-6">
              {EVENT_CONFIG.physicalPolicy}
            </p>
            <button
              onClick={saveSubmission}
              disabled={loading}
              className="bg-black text-white p-4 font-black uppercase"
            >
              {loading ? "Saving..." : "Proceed to Booking"}
            </button>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div key="step4" className="h-175">
            <h2 className="text-2xl font-black uppercase mb-4">
              Select Your Slot
            </h2>
            <InlineWidget url={calendlyUrl} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
