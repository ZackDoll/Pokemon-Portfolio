import { useEffect, useState, useCallback } from 'react'
import type { BattlePhase, BattleAction } from '../../types/battle'
import { useHpAnimation } from '../../hooks/useHpAnimation'
import styles from './EnemyPanel.module.css'

interface Props {
  hp: number
  hpMax: number
  name: string
  level: number
  phase: BattlePhase
  dispatch: React.Dispatch<BattleAction>
}

export default function EnemyPanel({ hp, hpMax, name, level, phase, dispatch }: Props) {
  const [flashing, setFlashing] = useState(false)

  const onHpDone = useCallback(() => {
    if (phase === 'animating') {
      dispatch({ type: 'HP_DRAIN_COMPLETE' })
    }
  }, [phase, dispatch])

  const { displayHp } = useHpAnimation(hp, hpMax, onHpDone)

  useEffect(() => {
    if (phase === 'animating') {
      setFlashing(true)
      const id = setTimeout(() => setFlashing(false), 500)
      return () => clearTimeout(id)
    }
  }, [phase])

  return (
    <div className={`${styles.panel} ${flashing ? styles.flashing : ''}`}>
      <span className={styles.name}>
        {name}
        <img src="/pokemon-assets/male_symbol.png" className={styles.genderIcon} alt="" />
      </span>
      <span className={styles.level}>Lv{level}</span>
    </div>
  )
}
