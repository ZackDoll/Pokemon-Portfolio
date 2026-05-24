import { useState, useEffect, useCallback, useRef } from 'react'
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
  const descRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)

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

  useEffect(() => {
    const container = descRef.current
    const text = textRef.current
    if (!container || !text) return

    const maxH = container.clientHeight
    const maxW = container.clientWidth

    text.style.width = 'max-content'
    let sizeW = 40
    text.style.fontSize = sizeW + 'px'
    while (text.offsetWidth > maxW && sizeW > 8) {
      sizeW -= 1
      text.style.fontSize = sizeW + 'px'
    }
    text.style.width = ''

    let sizeH = 40
    text.style.fontSize = sizeH + 'px'
    while (text.offsetHeight > maxH && sizeH > 8) {
      sizeH -= 1
      text.style.fontSize = sizeH + 'px'
    }

    text.style.fontSize = Math.min(sizeW, sizeH) + 'px'
  }, [focusIndex, isVisible])

  if (!isVisible) return null

  const focused = TM_SKILLS[focusIndex]

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
            <span className={styles.tmNumber}>{tm.number}</span>
            <span className={styles.tmName}>{tm.name}</span>
          </button>
        ))}
      </div>

      <div ref={descRef} className={styles.description} onClick={(e) => e.stopPropagation()}>
        <span ref={textRef} className={styles.descText}>
          {focused.description}
        </span>
      </div>

      <span className={styles.category}>{focused.category}</span>
    </div>
  )
}
