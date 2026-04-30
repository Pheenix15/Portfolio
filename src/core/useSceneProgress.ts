import { useMemo } from 'react'
import { SCENE_RANGES, type SceneName } from './sceneConfig'


// Calculate localProgress for a specific scene based on global progress
const useSceneProgress = (sceneName: SceneName, globalProgress: number): number => {
  const localProgress = useMemo(() => {
    const scene = SCENE_RANGES[sceneName]
    
    // If global progress is before scene start, localProgress is 0
    if (globalProgress < scene.start) {
      return 0
    }
    
    // If global progress is after scene end, localProgress is 1
    if (globalProgress > scene.end) {
      return 1
    }
    
    // Calculate how far through the scene we are
    // Formula: (current - start) / (end - start)
    const sceneRange = scene.end - scene.start
    const progressIntoScene = globalProgress - scene.start
    const normalized = progressIntoScene / sceneRange
    
    // Clamp between 0 and 1 to handle floating point edge cases
    return Math.max(0, Math.min(1, normalized))
  }, [sceneName, globalProgress])

  return localProgress
}

export default useSceneProgress