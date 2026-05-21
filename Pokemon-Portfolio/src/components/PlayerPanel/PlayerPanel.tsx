import HpBar from '../HpBar/HpBar'
import styles from './PlayerPanel.module.css'

interface Props {
  hp: number
  hpMax: number
  name: string
  level: number
}

export default function PlayerPanel({ hp, hpMax, name, level }: Props) {
  return (
    <div className={styles.panel}>
      <div className={styles.nameRow}>
        <span className={styles.name}>{name}</span>
        <span className={styles.level}>Lv{level}</span>
      </div>
      <HpBar current={hp} max={hpMax} showNumbers />
      <div className={styles.expBar} />
    </div>
  )
}
