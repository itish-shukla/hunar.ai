export const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;
export type Day = (typeof DAYS)[number];

export const REDIAL_INTERVALS = [
  "3 hours",
  "6 hours",
  "9 hours",
  "12 hours",
  "24 hours",
] as const;
export type RedialInterval = (typeof REDIAL_INTERVALS)[number];

// Hour options for the calling window slider. `value` is the 24h clock hour;
// the window duration is the difference between the two selected values.
export const TIMES = [
  { label: "8 AM", value: 8 },
  { label: "9 AM", value: 9 },
  { label: "10 AM", value: 10 },
  { label: "11 AM", value: 11 },
  { label: "12 PM", value: 12 },
  { label: "1 PM", value: 13 },
  { label: "2 PM", value: 14 },
  { label: "3 PM", value: 15 },
  { label: "4 PM", value: 16 },
  { label: "5 PM", value: 17 },
  { label: "6 PM", value: 18 },
  { label: "7 PM", value: 19 },
  { label: "8 PM", value: 20 },
  { label: "9 PM", value: 21 },
] as const;
