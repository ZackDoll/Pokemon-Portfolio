import styles from './HpBar.module.css'

interface Props {
  current: number
  max: number
  showNumbers?: boolean
}

export default function HpBar({ current, max, showNumbers = false }: Props) {
  const pct = max > 0 ? current / max : 0
  const colorClass =
    pct > 0.5 ? styles.green : pct > 0.25 ? styles.yellow : styles.red

  return (
    <div>
      <div className={styles.container}>
        <span className={styles.label}>HP</span>
        <div className={styles.track}>
          <div
            className={`${styles.bar} ${colorClass}`}
            style={{ width: `${pct * 100}%` }}
          />
        </div>
      </div>
      {showNumbers && (
        <div className={styles.numbers}>
          {current}/{max}
        </div>
      )}
    </div>
  )
}
