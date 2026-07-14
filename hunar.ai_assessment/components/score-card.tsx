import Image from "next/image";
import { Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Level, Penalties } from "@/lib/scoring";
import level_1 from "@/public/level-1.png";
import level_2 from "@/public/level-2.png";
import level_3 from "@/public/level-3.png";
import level_4 from "@/public/level-4.png";

const LEVEL_IMAGES = [level_1, level_2, level_3, level_4];

const PENALTY_ROWS: { label: string; key: keyof Penalties }[] = [
  { label: "Calling days penalty", key: "callingDays" },
  { label: "Calling window penalty", key: "callingWindow" },
  { label: "Redial count penalty", key: "redialCount" },
  { label: "Redial interval penalty", key: "redialInterval" },
];

type ScoreCardProps = {
  score: number;
  level: Level;
  penalties: Penalties;
};

export function ScoreCard({ score, level, penalties }: ScoreCardProps) {
  return (
    <div className="w-full overflow-hidden rounded-3xl border border-zinc-200 lg:w-1/2">
      <div className="relative">
        <Image
          src={LEVEL_IMAGES[level - 1]}
          alt={`Campaign score — level ${level}`}
          className="h-full w-full"
          priority
        />
        <div className="absolute top-[32%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-white">
          <div className="flex flex-col items-center gap-1">
            <span className="text-[64px] font-bold leading-none">{score}</span>
            <span className="text-sm font-medium">Campaign score</span>
          </div>
        </div>
      </div>

      {level >= 3 && (
        <div className="bg-blue-50 px-8 py-5">
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 fill-[#12367E] text-[#12367E]" />
            <span className="font-semibold text-[#12367E]">
              Your settings are not optimized!
            </span>
          </div>
          <p className="mt-2 text-sm text-zinc-800 font-medium">
            Your settings may slow down your calling operations and campaign
            completion. We recommend fixing your settings.
          </p>
        </div>
      )}

      <div className="divide-y divide-zinc-100 py-2">
        {PENALTY_ROWS.map(({ label, key }) => (
          <div
            key={key}
            className="flex items-center justify-between px-8 py-4 text-sm"
          >
            <span className="font-semibold text-zinc-500">{label}</span>
            <span
              className={cn(
                "font-semibold",
                penalties[key] === 0 ? "text-green-600" : "text-red-500",
              )}
            >
              {penalties[key]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
