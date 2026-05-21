import { useState, useEffect, useRef } from 'react'

export function useTypewriter(text: string, active: boolean, speedMs = 40) {
  const [index, setIndex] = useState(0)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Reset when text or active changes
  useEffect(() => {
    setIndex(0)
  }, [text, active])

  useEffect(() => {
    if (!active || index >= text.length) return

    const char = text[index]
    // Pause longer on sentence-ending punctuation
    const delay =
      char === '.' || char === '!' || char === '?' ? speedMs * 5 : speedMs

    timeoutRef.current = setTimeout(() => {
      setIndex((i) => i + 1)
    }, delay)

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [active, index, text, speedMs])

  return {
    displayedText: text.slice(0, index),
    complete: active && index >= text.length,
  }
}
