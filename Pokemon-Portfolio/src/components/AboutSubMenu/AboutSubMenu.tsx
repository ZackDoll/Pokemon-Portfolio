import { useState, useEffect, useCallback } from 'react'
import type { BattlePhase, BattleAction } from '../../types/battle'
import { ABOUT_SUBMOVES } from '../../data/battleData'
import styles from './AboutSubMenu.module.css'

interface Props {
  phase: BattlePhase
  dispatch: React.Dispatch<BattleAction>
}

export default function AboutSubMenu({ phase, dispatch }: Props) {
  const [focusIndex, setFocusIndex] = useState(0)
  const isVisible = phase === 'about_submenu'

  const selectSubmove = useCallback(
    (id: string) => {
      const move = ABOUT_SUBMOVES.find((m) => m.id === id)
      if (move?.downloadUrl) window.open(move.downloadUrl, '_blank')
      dispatch({ type: 'SELECT_SUBMOVE', submoveId: id })
    },
    [dispatch]
  )

  const close = useCallback(
    () => dispatch({ type: 'CLOSE_ABOUT_SUBMENU' }),
    [dispatch]
  )

  useEffect(() => {
    if (!isVisible) return
    function onKey(e: KeyboardEvent) {
      if (e.code === 'Escape' || e.code === 'KeyX') { close(); return }
      if (e.code === 'ArrowRight') setFocusIndex((i) => (i % 2 === 0 ? i + 1 : i))
      if (e.code === 'ArrowLeft')  setFocusIndex((i) => (i % 2 === 1 ? i - 1 : i))
      if (e.code === 'ArrowDown')  setFocusIndex((i) => (i < 2 ? i + 2 : i))
      if (e.code === 'ArrowUp')    setFocusIndex((i) => (i >= 2 ? i - 2 : i))
      if (e.code === 'Enter' || e.code === 'KeyZ') selectSubmove(ABOUT_SUBMOVES[focusIndex].id)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isVisible, focusIndex, selectSubmove, close])

  if (!isVisible) return null

  const focused = ABOUT_SUBMOVES[focusIndex]

  return (
    <div className={styles.overlay}>
      <img src="/pokemon-assets/move_inspect.png" className={styles.bgImg} alt="" draggable={false} />
      <div className={styles.optionsBox}>
        {ABOUT_SUBMOVES.map((move, i) => (
          <button
            key={move.id}
            className={`${styles.moveBtn} ${i === focusIndex ? styles.focused : ''}`}
            onClick={() => selectSubmove(move.id)}
            onMouseEnter={() => setFocusIndex(i)}
          >
            <span className={styles.arrow} />
            <span className={styles.moveName}>{move.name}</span>
          </button>
        ))}
      </div>

      <span className={styles.ppValue}>{focused.pp}&nbsp;&nbsp;{focused.ppMax}</span>
      <span className={styles.typeValue}>{focused.type}</span>
    </div>
  )
}
