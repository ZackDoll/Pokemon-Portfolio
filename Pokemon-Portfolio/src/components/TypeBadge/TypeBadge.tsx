import type { MoveType } from '../../types/battle'
import styles from './TypeBadge.module.css'

const TYPE_COLORS: Record<MoveType, string> = {
  NORMAL:   '#A8A878',
  FIRE:     '#F08030',
  WATER:    '#6890F0',
  GRASS:    '#78C850',
  ELECTRIC: '#F8D030',
  PSYCHIC:  '#F85888',
  FIGHTING: '#C03028',
  GHOST:    '#705898',
}

interface Props {
  type: MoveType
}

export default function TypeBadge({ type }: Props) {
  return (
    <span
      className={styles.badge}
      style={{ backgroundColor: TYPE_COLORS[type] }}
    >
      {type}
    </span>
  )
}
