import { useEffect, useCallback, useState } from 'react'
import type { BattlePhase, BattleAction } from '../../types/battle'
import { useTypewriter } from '../../hooks/useTypewriter'
import styles from './BattleDialogue.module.css'

interface Props {
  text: string
  complete: boolean
  phase: BattlePhase
  dispatch: React.Dispatch<BattleAction>
}

const FAINTED_SEQUENCE = [
  'ZACHARY DOLL fainted!',
  "You've learned everything\nabout ZACHARY DOLL.",
  'Visit these links\nto connect:',
]

export default function BattleDialogue({ text, complete, phase, dispatch }: Props) {
  const [faintedStep, setFaintedStep] = useState(0)
  const [showLinks, setShowLinks] = useState(false)

  const isFainted = phase === 'fainted'
  const faintedText = FAINTED_SEQUENCE[faintedStep] ?? ''
  const activeText = isFainted ? faintedText : text
  const isActive = phase === 'dialogue' || phase === 'idle' || phase === 'move_select' || phase === 'animating' || isFainted

  const { displayedText, complete: typeComplete, skip } = useTypewriter(
    activeText,
    isActive && activeText.length > 0,
    40
  )

  useEffect(() => {
    if (typeComplete && !complete && !isFainted) {
      dispatch({ type: 'TYPEWRITER_COMPLETE' })
    }
  }, [typeComplete, complete, isFainted, dispatch])

  const advance = useCallback(() => {
    if (isFainted) {
      if (!typeComplete) { skip(); return }
      if (faintedStep < FAINTED_SEQUENCE.length - 1) {
        setFaintedStep((s) => s + 1)
      } else {
        setShowLinks(true)
      }
      return
    }
    if (!typeComplete) { skip(); return }
    if (complete) dispatch({ type: 'ADVANCE_DIALOGUE' })
  }, [complete, isFainted, typeComplete, faintedStep, dispatch, skip])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.code === 'Space' || e.code === 'Enter' || e.code === 'KeyZ') {
        advance()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [advance])

  // Fainted: show links overlay
  if (isFainted && showLinks) {
    return (
      <div className={styles.box}>
        <div className={styles.linksTitle}>Connect with ZACHARY DOLL:</div>
        <div className={styles.links}>
          <a className={styles.link} href="https://github.com/zack" target="_blank" rel="noreferrer">▶ GitHub</a>
          <a className={styles.link} href="https://linkedin.com/in/zack" target="_blank" rel="noreferrer">▶ LinkedIn</a>
          <a className={styles.link} href="mailto:zack@example.com">▶ Email</a>
        </div>
      </div>
    )
  }

  // Move select phase — show "What will RECRUITER do?" without advance cursor
  if (phase === 'move_select') {
    return (
      <div className={styles.box}>
        <pre className={styles.text}>{displayedText}</pre>
      </div>
    )
  }

  if (!isActive) return <div className={styles.box} />

  return (
    <div className={styles.box} onClick={advance}>
      <pre className={styles.text}>{displayedText}</pre>
      {(complete || (isFainted && typeComplete)) && (
        <span className={styles.cursor} />
      )}
    </div>
  )
}
