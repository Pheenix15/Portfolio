import { SCENE_RANGES, type SceneName } from "./sceneConfig"

// Navigate to a specific scene by setting scroll position
export const navigateToScene = (sceneName: SceneName) => {
    // Get the scene's start position (0 to 1)
    const sceneStart = SCENE_RANGES[sceneName].start
    
    // Calculate total scrollable height
    const scrollHeight = document.documentElement.scrollHeight
    const viewportHeight = window.innerHeight
    const maxScroll = scrollHeight - viewportHeight
    
    // Convert scene start percentage to actual scroll position
    const targetScroll = sceneStart * maxScroll

    // Offset so section starts inside the scene not on boundary
    // 0.001 = approx 14vh of buffer
    const offset = maxScroll * 0.002
    
    // Scroll to position with smooth animation
    window.scrollTo({
    top: targetScroll + offset,
    behavior: 'smooth' // Browser animates the scroll
    })
}
