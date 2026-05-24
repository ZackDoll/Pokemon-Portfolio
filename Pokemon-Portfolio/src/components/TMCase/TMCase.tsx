import { useState, useEffect, useCallback } from 'react'
import type { BattlePhase, BattleAction } from '../../types/battle'
import { TM_SKILLS } from '../../data/battleData'
import styles from './TMCase.module.css'

interface Props {
  phase: BattlePhase
  dispatch: React.Dispatch<BattleAction>
}

export default function TMCase({ phase, dispatch }: Props) {
  const isVisible = phase === 'tm_case'
  const [focusIndex, setFocusIndex] = useState(0)

  const close = useCallback(
    () => dispatch({ type: 'CLOSE_TM_CASE' }),
    [dispatch]
  )

  useEffect(() => {
    if (!isVisible) { setFocusIndex(0); return }
    function onKey(e: KeyboardEvent) {
      if (e.code === 'Escape' || e.code === 'KeyX') { close(); return }
      if (e.code === 'ArrowDown') setFocusIndex((i) => Math.min(i + 1, TM_SKILLS.length - 1))
      if (e.code === 'ArrowUp')   setFocusIndex((i) => Math.max(i - 1, 0))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isVisible, close])

  if (!isVisible) return null

  return (
    <div className={styles.overlay} onClick={close}>
      <img src="/pokemon-assets/tm_case.png" className={styles.bgImg} alt="" draggable={false} />

      <div className={styles.tmList} onClick={(e) => e.stopPropagation()}>
        {TM_SKILLS.map((tm, i) => (
          <button
            key={tm.id}
            className={`${styles.tmBtn} ${i === focusIndex ? styles.focused : ''}`}
            onMouseEnter={() => setFocusIndex(i)}
            onClick={(e) => { e.stopPropagation(); setFocusIndex(i) }}
          >
            <span className={styles.selector} />
            {tm.isHM && <img src="/pokemon-assets/HM_icon.png" className={styles.hmIcon} alt="HM" draggable={false} />}
            <span className={styles.tmNumber}>{tm.number}</span>
            <span className={styles.tmName}>{tm.name}</span>
          </button>
        ))}
      </div>

    </div>
  )
}
