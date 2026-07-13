"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { REDIAL_INTERVALS, type RedialInterval } from "@/lib/constants";

const REDIAL_COUNT_TICKS = [0, 2, 4, 6, 8, 10];

type RedialCardProps = {
  redialCount: number;
  onCountChange: (count: number) => void;
  redialInterval: RedialInterval;
  onIntervalChange: (interval: RedialInterval) => void;
};

export function RedialCard({
  redialCount,
  onCountChange,
  redialInterval,
  onIntervalChange,
}: RedialCardProps) {
  return (
    <Card className="w-full gap-2.5 overflow-visible rounded-2xl bg-zinc-100 px-6 py-2.5 ring-0">
      <span className="text-lg font-semibold">Redial</span>
      <CardContent className="-mx-6 -mb-2.5 space-y-10 rounded-2xl border border-zinc-200 bg-white p-8">
        <section>
          <h2 className="mb-6 text-lg font-semibold">Redial count</h2>

          <Slider
            aria-label="Redial count"
            value={redialCount}
            min={0}
            max={10}
            step={1}
            onValueChange={(value) => {
              if (typeof value === "number") onCountChange(value);
            }}
          />

          <div className="mt-5 flex justify-between text-sm text-zinc-500">
            {REDIAL_COUNT_TICKS.map((n) => (
              <span key={n}>{n}</span>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold">Redial interval</h2>

          <div
            role="radiogroup"
            aria-label="Redial interval"
            className="flex gap-1 rounded-xl bg-zinc-100 p-1.5"
          >
            {REDIAL_INTERVALS.map((interval) => (
              <button
                key={interval}
                type="button"
                role="radio"
                aria-checked={redialInterval === interval}
                onClick={() => onIntervalChange(interval)}
                className={cn(
                  "flex-1 whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                  redialInterval === interval
                    ? "bg-white text-foreground shadow-sm"
                    : "text-zinc-600 hover:text-foreground",
                )}
              >
                {interval}
              </button>
            ))}
          </div>
        </section>
      </CardContent>
    </Card>
  );
}
