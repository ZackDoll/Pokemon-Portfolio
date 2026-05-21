import { useEffect } from 'react'
import type { BattlePhase, BattleAction } from '../../types/battle'
import styles from './BattleIntro.module.css'

interface Props {
  phase: BattlePhase
  dispatch: React.Dispatch<BattleAction>
}

// Total intro duration: stripe delay (0.4s) + stripe duration (0.7s) = 1.1s
const INTRO_DURATION_MS = 2700

export default function BattleIntro({ phase, dispatch }: Props) {
  useEffect(() => {
    if (phase !== 'intro') return
    const id = setTimeout(() => dispatch({ type: 'INTRO_COMPLETE' }), INTRO_DURATION_MS)
    return () => clearTimeout(id)
  }, [phase, dispatch])

  if (phase !== 'intro') return null

  return (
    <>
      <div className={styles.terrain} />
      <div className={styles.overlay}>
        <div className={styles.barTop} />
        <div className={styles.barBottom} />
        <div className={styles.flash} />
        <div className={styles.stripe} />
      </div>
    </>
  )
}
