import { useState, useEffect, useCallback } from 'react'

export function useTypewriter(text: string, active: boolean, speedMs = 40) {
  const [prevText, setPrevText] = useState(text)
  const [index, setIndex] = useState(0)

  // Reset index synchronously when text changes so no intermediate render
  // paints new text at the old cursor position (flash of unintended text).
  if (prevText !== text) {
    setPrevText(text)
    setIndex(0)
  }

  const effectiveIndex = prevText === text ? index : 0

  useEffect(() => {
    if (!active || effectiveIndex >= text.length) return

    const char = text[effectiveIndex]
    const delay =
      char === '.' || char === '!' || char === '?' ? speedMs * 5 : speedMs

    const id = setTimeout(() => setIndex((i) => i + 1), delay)
    return () => clearTimeout(id)
  }, [active, effectiveIndex, text, speedMs])

  const skip = useCallback(() => setIndex(text.length), [text.length])

  return {
    displayedText: text.slice(0, effectiveIndex),
    complete: active && effectiveIndex >= text.length,
    skip,
  }
}
