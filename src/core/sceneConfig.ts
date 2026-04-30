// Scene range interface
interface SceneRange {
  start: number  // Where scene starts in global progress (0-1)
  end: number    // Where scene ends in global progress (0-1)
}

// All scene ranges as defined in Phase 1
export const SCENE_RANGES: Record<string, SceneRange> = {
  intro: { start: 0.00, end: 0.15 },
  about: { start: 0.15, end: 0.35 },
  skills: { start: 0.35, end: 0.55 },
  projects: { start: 0.55, end: 0.90 },
  contact: { start: 0.90, end: 1.00 },
}

// Scene names for type safety
export type SceneName = keyof typeof SCENE_RANGES