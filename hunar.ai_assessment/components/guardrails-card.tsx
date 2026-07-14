"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";
import { Slider } from "@/components/ui/slider";
import { DAYS, TIMES, type Day } from "@/lib/constants";

const WINDOW_TICKS = [0, 3, 6, 9, 13];

type GuardrailsCardProps = {
  selectedDays: Day[];
  onToggleDay: (day: Day) => void;
  callingWindow: [number, number];
  onWindowChange: (range: [number, number]) => void;
};

export function GuardrailsCard({
  selectedDays,
  onToggleDay,
  callingWindow,
  onWindowChange,
}: GuardrailsCardProps) {
  return (
    <Card className="w-full gap-2.5 rounded-2xl bg-zinc-100 px-6 py-2.5 ring-0">
      <span className="text-lg font-semibold">Guardrails</span>
      <CardContent className="-mx-6 -mb-2.5 space-y-10 rounded-2xl border border-zinc-200 bg-white p-8">
        <section>
          <h2 className="mb-3 text-lg font-semibold">Calling days</h2>

          <div className="flex flex-wrap gap-3">
            {DAYS.map((day) => (
              <Toggle
                key={day}
                pressed={selectedDays.includes(day)}
                onPressedChange={() => onToggleDay(day)}
                variant="outline"
                className="min-w-18 rounded-lg border px-4 py-6 text-sm font-medium aria-pressed:bg-zinc-800 aria-pressed:text-white data-[state=on]:bg-zinc-800 data-[state=on]:text-white"
              >
                {day}
              </Toggle>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-6 text-lg font-semibold">Calling window</h2>

          <Slider
            aria-label="Calling window"
            value={callingWindow}
            min={0}
            max={TIMES.length - 1}
            step={1}
            onValueChange={(value) => {
              if (Array.isArray(value) && value.length === 2) {
                onWindowChange([value[0], value[1]]);
              }
            }}
          />

          <div className="mt-5 flex justify-between text-sm text-zinc-500">
            {WINDOW_TICKS.map((idx) => (
              <span key={idx}>{TIMES[idx].label}</span>
            ))}
          </div>
        </section>
      </CardContent>
    </Card>
  );
}
