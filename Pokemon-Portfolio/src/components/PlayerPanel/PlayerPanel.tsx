import styles from './PlayerPanel.module.css'

interface Props {
  name: string
  level: number
}

export default function PlayerPanel({ name, level }: Props) {
  return (
    <div className={styles.panel}>
      <span className={styles.name}>{name}</span>
      <span className={styles.level}>Lv{level}</span>
    </div>
  )
}
