/**
 * Level definitions. The old build scattered the three level ids ('begin',
 * 'adv', 'pro') across pages as bare strings, with the display names duplicated
 * wherever they were shown. Everything about a level now lives here.
 */

export const LEVELS = [
  {
    id: "begin",
    name: "Beginner",
    tagline: "Home row & finger placement",
    description:
      "Drill the home row until your fingers find the keys without looking. Short, repetitive sets built for muscle memory.",
    video: "https://www.youtube.com/embed/YlBZ2Jd68lY",
    videoTitle: "Touch typing basics — home row and posture",
    accent: "var(--success)",
    accentSoft: "var(--success-soft)",
    targetWpm: 25,
  },
  {
    id: "adv",
    name: "Intermediate",
    tagline: "Full keyboard & real sentences",
    description:
      "Reach beyond the home row into the top and bottom rows, then put it together on real sentences with punctuation.",
    video: "https://www.youtube.com/embed/A-CT48rRi3M",
    videoTitle: "Reaching the top and bottom rows accurately",
    accent: "var(--info)",
    accentSoft: "var(--info-soft)",
    targetWpm: 45,
  },
  {
    id: "pro",
    name: "Advanced",
    tagline: "Speed, rhythm & endurance",
    description:
      "Longer passages at pace. Randomised every run so you are typing what you read, not what you remember.",
    video: "https://www.youtube.com/embed/b-6YH-Y55TA",
    videoTitle: "Building speed without losing accuracy",
    accent: "var(--accent)",
    accentSoft: "var(--accent-soft)",
    targetWpm: 70,
  },
];

export const DEFAULT_LEVEL = "begin";

export function getLevel(id) {
  return LEVELS.find((level) => level.id === id) ?? LEVELS[0];
}

export function isLevelId(id) {
  return LEVELS.some((level) => level.id === id);
}
