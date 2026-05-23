import { useState, useEffect, useCallback } from 'react'
import type { BattlePhase, BattleAction } from '../../types/battle'
import styles from './BagMenu.module.css'

interface Props {
  phase: BattlePhase
  dispatch: React.Dispatch<BattleAction>
}

export default function BagMenu({ phase, dispatch }: Props) {
  const isVisible = phase === 'bag_menu'
  const OPTIONS = ['TEST OPTION 1', 'TEST OPTION 2', 'TEST OPTION 3', 'CANCEL']
  const [focusIndex, setFocusIndex] = useState(0)

  const close = useCallback(
    () => dispatch({ type: 'CLOSE_BAG_MENU' }),
    [dispatch]
  )

  useEffect(() => {
    if (!isVisible) { setFocusIndex(0); return }
    function onKey(e: KeyboardEvent) {
      if (e.code === 'Escape' || e.code === 'KeyX') { close(); return }
      if (e.code === 'ArrowDown') setFocusIndex((i) => Math.min(i + 1, OPTIONS.length - 1))
      if (e.code === 'ArrowUp')   setFocusIndex((i) => Math.max(i - 1, 0))
      if (e.code === 'Enter' || e.code === 'KeyZ') {
        if (focusIndex === OPTIONS.length - 1) close()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isVisible, focusIndex, close, OPTIONS.length])

  if (!isVisible) return null

  return (
    <div className={styles.overlay}>
      <img src="/pokemon-assets/bag_back_blue.png" className={styles.bgImg} alt="" draggable={false} />
      <img src="/pokemon-assets/red_bag_arrow.png" className={styles.arrow} alt="" draggable={false} />

      <div className={styles.optionList}>
        {OPTIONS.map((label, i) => (
          <button
            key={label}
            className={`${styles.optionBtn} ${i === focusIndex ? styles.focused : ''}`}
            onClick={label === 'CANCEL' ? close : undefined}
            onMouseEnter={() => setFocusIndex(i)}
          >
            <span className={styles.selector} />
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}
