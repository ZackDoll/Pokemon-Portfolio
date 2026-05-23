import { useState, useEffect, useCallback, useRef } from 'react'
import type { BattlePhase, BattleAction } from '../../types/battle'
import styles from './BagMenu.module.css'

interface Props {
  phase: BattlePhase
  dispatch: React.Dispatch<BattleAction>
}

export default function BagMenu({ phase, dispatch }: Props) {
  const isVisible = phase === 'bag_menu'
  const OPTIONS = [
    {
      label: 'TEST OPTION 1',
      description: 'This is the first test option.\nIt has a second line of description\nand even a third line here.',
    },
    {
      label: 'TEST OPTION 2',
      description: 'Second option description goes here.\nThis one only has two lines.',
    },
    {
      label: 'TEST OPTION 3',
      description: 'Third test option with a longer description to check how the text wraps across multiple lines naturally.',
    },
    {
      label: 'CANCEL',
      description: 'Close the bag and return\nto the battle.',
    },
  ]
  const [focusIndex, setFocusIndex] = useState(0)
  const descRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)

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
      if ((e.code === 'Enter' || e.code === 'KeyZ') && focusIndex === OPTIONS.length - 1) close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isVisible, focusIndex, close, OPTIONS.length])

  useEffect(() => {
    const container = descRef.current
    const text = textRef.current
    if (!container || !text) return

    const maxH = container.clientHeight
    const maxW = container.clientWidth

    // Measure width using max-content so container width doesn't cause wrapping
    text.style.width = 'max-content'
    let sizeW = 40
    text.style.fontSize = sizeW + 'px'
    while (text.offsetWidth > maxW && sizeW > 8) {
      sizeW -= 1
      text.style.fontSize = sizeW + 'px'
    }
    text.style.width = ''

    // Find largest size fitting height (with normal wrapping)
    let sizeH = 40
    text.style.fontSize = sizeH + 'px'
    while (text.offsetHeight > maxH && sizeH > 8) {
      sizeH -= 1
      text.style.fontSize = sizeH + 'px'
    }

    text.style.fontSize = Math.min(sizeW, sizeH) + 'px'
  }, [focusIndex, isVisible])

  if (!isVisible) return null

  return (
    <div className={styles.overlay}>
      <img src="/pokemon-assets/bag_back_blue.png" className={styles.bgImg} alt="" draggable={false} />
      <img src="/pokemon-assets/red_bag_arrow.png" className={styles.arrow} alt="" draggable={false} />

      <div className={styles.optionList}>
        {OPTIONS.map((opt, i) => (
          <button
            key={opt.label}
            className={`${styles.optionBtn} ${i === focusIndex ? styles.focused : ''}`}
            onClick={opt.label === 'CANCEL' ? close : undefined}
            onMouseEnter={() => setFocusIndex(i)}
          >
            <span className={styles.selector} />
            {opt.label}
          </button>
        ))}
      </div>

      <div ref={descRef} className={styles.description}>
        <span ref={textRef} className={styles.descText}>
          {OPTIONS[focusIndex].description}
        </span>
      </div>
    </div>
  )
}
