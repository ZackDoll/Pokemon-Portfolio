import { useState, useEffect, useRef } from 'react'

export function useHpAnimation(
  targetHp: number,
  _hpMax: number,
  onComplete?: () => void
) {
  const [displayHp, setDisplayHp] = useState(targetHp)
  const rafRef = useRef<number | null>(null)
  const prevTargetRef = useRef(targetHp)

  useEffect(() => {
    if (targetHp === prevTargetRef.current) return
    prevTargetRef.current = targetHp

    function step() {
      setDisplayHp((curr) => {
        if (curr <= targetHp) {
          onComplete?.()
          return targetHp
        }
        const next = Math.max(targetHp, curr - 2)
        if (next <= targetHp) {
          onComplete?.()
          return targetHp
        }
        rafRef.current = requestAnimationFrame(step)
        return next
      })
    }

    rafRef.current = requestAnimationFrame(step)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [targetHp, onComplete])

  return { displayHp }
}
