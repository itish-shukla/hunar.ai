# Redial & Guardrails

A single-screen campaign configuration UI. The left column lets you tune four
call-pacing inputs; the right column shows a live **campaign score** (0–100), a
weather illustration that reflects the score's severity level, and a per-input
penalty breakdown.

## How the score works

Each input contributes a penalty (always ≤ 0) drawn from a fixed dictionary
(`FE assignment - penalty dictionary.xlsx`). The score is:

```
score = 100 + calling-days + calling-window + redial-count + redial-interval   (floored at 0)
```

The score maps to a weather **level** (1 best → 4 worst), which selects the
illustration (`public/level-{1..4}.png`) and, from level 3, shows an advisory
banner:

| Level | Score  |
| ----- | ------ |
| 1     | 82–100 |
| 2     | 62–81  |
| 3     | 42–61  |
| 4     | 0–41   |

Submitting logs a backend-shaped payload to the console and stores it in
`sessionStorage` under `campaignPayload`.

## Project layout

```
app/page.tsx              State + orchestration; renders the three cards + submit
components/
  guardrails-card.tsx     Calling days + calling window
  redial-card.tsx         Redial count + redial interval
  score-card.tsx          Weather image, advisory banner, penalty rows
  ui/                     shadcn primitives (button, card, slider, toggle, sonner)
lib/
  constants.ts            DAYS, TIMES, REDIAL_INTERVALS + shared types
  scoring.ts              Penalty dictionaries + pure computeScore()
```

The scoring logic in `lib/scoring.ts` is a pure function of the settings, so it
can be unit-tested independently of the UI.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Built with Next.js 16 (App Router), Tailwind CSS v4, and shadcn/ui on Base UI.
