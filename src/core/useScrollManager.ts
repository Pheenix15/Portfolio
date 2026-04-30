import { useState, useEffect, useRef } from 'react'

interface ScrollData {
  progress: number  // Normalized scroll progress (0 to 1)
  scrollY: number   // Current vertical scroll position in pixels
}

const useScrollManager = (): ScrollData => {
  const [progress, setProgress] = useState<number>(0) // Store the normalized progress value (0 to 1)
  const [scrollY, setScrollY] = useState<number>(0) // Store the raw scroll position in pixels

  const rafRef = useRef<number | null>(null) // Store the requestAnimationFrame (raf) ID so it can canceled on cleanup

  useEffect(() => {
    //Calculate scroll progress whenever user scrolls
    const handleScroll = () => {
      // If rafRef already exists, cancel the animation fraame
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }

      // Request a new animation frame to calculate scroll progress
      rafRef.current = requestAnimationFrame(() => {
        // Get the current vertical scroll position
        const currentScrollY = window.scrollY

        // Get the total height of the scrollable content
        const scrollHeight = document.documentElement.scrollHeight

        // Get the height of the visible viewport
        const viewportHeight = window.innerHeight

        // Calculate the maximum scrollable distance
        const maxScroll = scrollHeight - viewportHeight

        // Calculate normalized progress (0 to 1)
        const normalizedProgress = maxScroll > 0 ? currentScrollY / maxScroll : 0 //if maxScroll > 0 then calculate progress, else set to 0

        // Clamp progress between 1 and 0 to avoid any potential issues with overscrolling
        const clampedProgress = Math.max(0, Math.min(1, normalizedProgress))

        //Update state with the new progress and scrollY values
        setProgress(clampedProgress)
        setScrollY(currentScrollY)

        //Console log for debugging purposes
        console.log({
          scrollY: currentScrollY.toFixed(0), // Raw Scroll Position
          progress: clampedProgress.toFixed(4), //Normalized progress
          percentage: (clampedProgress * 100).toFixed(2) + '%' // Percentage format
        })
      })
    }

    //run handleScroll on mount
    handleScroll()

    //Add event scroll event listner
    window.addEventListener('scroll', handleScroll, {passive: true})

    // cleanup when component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll)

      //cancle any pending animation frame
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  return { progress, scrollY}
}

export default useScrollManager