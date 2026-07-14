"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { GuardrailsCard } from "@/components/guardrails-card";
import { RedialCard } from "@/components/redial-card";
import { ScoreCard } from "@/components/score-card";
import { TIMES, type Day, type RedialInterval } from "@/lib/constants";
import { computeScore } from "@/lib/scoring";

export default function Home() {
  const [selectedDays, setSelectedDays] = useState<Day[]>([
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
  ]);
  const [callingWindow, setCallingWindow] = useState<[number, number]>([
    0,
    TIMES.length - 1,
  ]);
  const [redialCount, setRedialCount] = useState(5);
  const [redialInterval, setRedialInterval] =
    useState<RedialInterval>("3 hours");

  const { penalties, score, level, windowHours } = computeScore({
    selectedDays,
    callingWindow,
    redialCount,
    redialInterval,
  });

  const toggleDay = (day: Day) =>
    setSelectedDays((prev) => {
      if (!prev.includes(day)) return [...prev, day];
      // Keep at least one calling day selected.
      if (prev.length === 1) return prev;
      return prev.filter((d) => d !== day);
    });

  // Keep the two window thumbs at least one hour apart (no zero-width window).
  const handleWindowChange = ([start, end]: [number, number]) => {
    if (end - start < 1) return;
    setCallingWindow([start, end]);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Simulated request payload, shaped like what we'd POST to the backend.
    const payload = {
      guardrails: {
        callingDays: selectedDays,
        callingWindow: {
          start: TIMES[callingWindow[0]].value,
          end: TIMES[callingWindow[1]].value,
          startLabel: TIMES[callingWindow[0]].label,
          endLabel: TIMES[callingWindow[1]].label,
          hours: windowHours,
        },
      },
      redial: {
        count: redialCount,
        interval: redialInterval,
      },
      penalties,
      campaignScore: score,
      level,
      submittedAt: new Date().toISOString(),
    };

    console.log("Campaign submit payload:", payload);
    sessionStorage.setItem("campaignPayload", JSON.stringify(payload));

    toast.success("Message sent successfully", {
      description: `Campaign score ${score} (level ${level}) saved.`,
      duration: 5000,
    });
  };

  return (
    <div className="min-h-screen bg-white py-6 pr-20 pl-10">
      <main className="w-full">
        <h1 className="mb-10 text-3xl font-bold tracking-[-0.04em]">
          Redial & Guardrails
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="flex w-full flex-col gap-10 lg:flex-row">
            <div className="flex w-full flex-col gap-10 lg:w-1/2">
              <GuardrailsCard
                selectedDays={selectedDays}
                onToggleDay={toggleDay}
                callingWindow={callingWindow}
                onWindowChange={handleWindowChange}
              />
              <RedialCard
                redialCount={redialCount}
                onCountChange={setRedialCount}
                redialInterval={redialInterval}
                onIntervalChange={setRedialInterval}
              />
            </div>

            <ScoreCard score={score} level={level} penalties={penalties} />
          </div>

          <div className="mt-10 flex justify-end">
            <Button type="submit" className="bg-zinc-800 px-6">
              Submit
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
