import { useState, useEffect, useCallback } from 'react'
import type { Move, BattlePhase, BattleAction } from '../../types/battle'
import styles from './MoveMenu.module.css'

interface Props {
  moves: Move[]
  phase: BattlePhase
  dispatch: React.Dispatch<BattleAction>
}

export default function MoveMenu({ moves, phase, dispatch }: Props) {
  const [focusIndex, setFocusIndex] = useState(0)
  const isVisible = phase === 'move_select'

  const selectMove = useCallback(
    (id: string) => dispatch({ type: 'SELECT_MOVE', moveId: id }),
    [dispatch]
  )

  useEffect(() => {
    if (!isVisible) return
    function onKey(e: KeyboardEvent) {
      if (e.code === 'ArrowRight') setFocusIndex((i) => (i % 2 === 0 ? i + 1 : i))
      if (e.code === 'ArrowLeft')  setFocusIndex((i) => (i % 2 === 1 ? i - 1 : i))
      if (e.code === 'ArrowDown')  setFocusIndex((i) => (i < 2 ? i + 2 : i))
      if (e.code === 'ArrowUp')    setFocusIndex((i) => (i >= 2 ? i - 2 : i))
      if (e.code === 'Enter' || e.code === 'KeyZ') selectMove(moves[focusIndex].id)
      if (e.code === 'Escape' || e.code === 'KeyX') dispatch({ type: 'INTRO_COMPLETE' })
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isVisible, focusIndex, moves, selectMove, dispatch])

  if (!isVisible) return null

  return (
    <div className={styles.container}>
      <div className={styles.optionsBox}>
        {moves.map((move, i) => (
          <button
            key={move.id}
            className={`${styles.moveBtn} ${i === focusIndex ? styles.focused : ''} ${move.used ? styles.used : ''}`}
            onClick={() => selectMove(move.id)}
            onMouseEnter={() => setFocusIndex(i)}
          >
            <span className={styles.arrow} />
            <span className={styles.moveName}>{move.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
