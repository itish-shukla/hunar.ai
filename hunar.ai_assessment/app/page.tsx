"use client";

import { useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import level_1 from "@/public/level-1.png";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

export default function Home() {
  const [selectedDays, setSelectedDays] = useState<string[]>([
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
  ]);

  const TIMES = [
    { label: "8 AM", value: 8 },
    { label: "11 AM", value: 11 },
    { label: "2 PM", value: 14 },
    { label: "5 PM", value: 17 },
    { label: "9 PM", value: 21 },
  ];

  const [callingWindow, setCallingWindow] = useState<[number, number]>([0, 4]);

  const REDIAL_INTERVALS = ["3 hours", "6 hours", "9 hours", "12 hours", "24 hours"];

  const [redialCount, setRedialCount] = useState<number>(5);
  const [redialInterval, setRedialInterval] = useState<string>("3 hours");

  const campaignScore = 100;
  const penalties = [
    { label: "Calling days penalty", value: 0 },
    { label: "Calling window penalty", value: 0 },
    { label: "Redial count penalty", value: 0 },
    { label: "Redial interval penalty", value: 0 },
  ];

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day)
        ? prev.filter((d) => d !== day)
        : [...prev, day]
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log({
      callingDays: selectedDays,
      callingWindow,
      redialCount,
      redialInterval,
    });
  };

  return (
    <div className="min-h-screen bg-white py-6 pl-10 pr-20">
      <main className="w-full">
        <h1 className="mb-10 text-3xl font-bold tracking-[-0.04em]">
          Redial & Guardrails
        </h1>

       <div className="flex justify-between gap-10 w-full">
        <form onSubmit={handleSubmit} className="flex flex-col gap-10 w-1/2">
          <Card className="w-full rounded-[16px] py-2.5 px-6 bg-[#F4F4F5] gap-2.5 ring-0">
            <span className="text-lg font-semibold">Guardrails</span>
            <CardContent className="space-y-10 p-8 bg-white -mx-6 -mb-2.5 rounded-[16px] border border-[#E4E4E7]">
              <section>
                <h2 className="mb-3 text-lg font-semibold underline-offset-4">
                  Calling days
                </h2>

                <div className="flex flex-wrap gap-3">
                  {DAYS.map((day) => (
                    <Toggle
                      key={day}
                      pressed={selectedDays.includes(day)}
                      onPressedChange={() => toggleDay(day)}
                      className="px-4 py-6 min-w-18 rounded-[8px] border text-[14px] font-medium"
                      variant="outline"
                    >
                      {day}
                    </Toggle>
                  ))}
                </div>
              </section>

              {/* Calling Window */}
              <section>
                <h2 className="mb-6 text-lg font-semibold">
                  Calling window
                </h2>

                <Slider
                  value={callingWindow}
                  min={0}
                  max={TIMES.length - 1}
                  step={1}
                  onValueChange={(value) => {
                    if (Array.isArray(value) && value.length === 2) {
                      setCallingWindow([value[0], value[1]]);
                    }
                  }}
                />

                <div className="mt-5 flex justify-between text-sm text-zinc-500">
                  <span>8 AM</span>
                  <span>11 AM</span>
                  <span>2 PM</span>
                  <span>5 PM</span>
                  <span>9 PM</span>
                </div>
              </section>

            </CardContent>
          </Card>
          <Card className="w-full rounded-[16px] py-2.5 px-6 bg-[#F4F4F5] gap-2.5 ring-0 overflow-visible">
            <span className="text-lg font-semibold">Redial</span>
            <CardContent className="space-y-10 p-8 bg-white -mx-6 -mb-2.5 rounded-[16px] border border-[#E4E4E7]">
              <section>
                <h2 className="mb-6 text-lg font-semibold underline-offset-4">
                  Redial count
                </h2>

                <Slider
                  value={redialCount}
                  min={0}
                  max={10}
                  step={1}
                  onValueChange={(value) => {
                    if (typeof value === "number") {
                      setRedialCount(value);
                    }
                  }}
                />

                <div className="mt-5 flex justify-between text-sm text-zinc-500">
                  <span>0</span>
                  <span>2</span>
                  <span>4</span>
                  <span>6</span>
                  <span>8</span>
                  <span>10</span>
                </div>
              </section>

              <section>
                <h2 className="mb-6 text-lg font-semibold">
                  Redial interval
                </h2>

                <div className="flex gap-1 rounded-[12px] bg-[#F4F4F5] p-0.75">
                  {REDIAL_INTERVALS.map((interval) => (
                    <button
                      key={interval}
                      type="button"
                      onClick={() => setRedialInterval(interval)}
                      aria-pressed={redialInterval === interval}
                      className={cn(
                        "flex-1 whitespace-nowrap rounded-[8px] px-4 py-2 text-sm font-medium transition-colors text-[14px]",
                        redialInterval === interval
                          ? "bg-white text-foreground shadow-sm"
                          : "text-zinc-600 hover:text-foreground"
                      )}
                    >
                      {interval}
                    </button>
                  ))}
                </div>
              </section>

            </CardContent>
          </Card>
        </form>

        <div className="w-1/2 rounded-[24px] border border-[#E4E4E7] overflow-auto h-full">
          <div className="relative w-full">
            <Image
              src={level_1}
              alt="Campaign score"
              className="w-full h-full"
              priority
            />
            <div className="absolute inset-0 w-full flex flex-col items-center justify-center gap-1 text-white">
              <span className="text-5xl font-bold">{campaignScore}</span>
              <span className="text-sm font-medium">Campaign score</span>
            </div>
          </div>

          <div className="divide-y divide-[#F4F4F5] py-2">
            {penalties.map((penalty) => (
              <div
                key={penalty.label}
                className="flex items-center justify-between px-8 py-4 text-sm"
              >
                <span className="text-[#71717A] font-semibold text-[14px]">{penalty.label}</span>
                <span className="font-semibold text-green-600">
                  {penalty.value}
                </span>
              </div>
            ))}
          </div>
        </div>
        </div>
      </main>
    </div>
  );
}