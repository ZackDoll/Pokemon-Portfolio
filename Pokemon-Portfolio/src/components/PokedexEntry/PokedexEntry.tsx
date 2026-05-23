import { useEffect, useCallback, useState } from 'react'
import type { BattlePhase, BattleAction } from '../../types/battle'
import styles from './PokedexEntry.module.css'

interface Props {
  phase: BattlePhase
  dispatch: React.Dispatch<BattleAction>
}

export default function PokedexEntry({ phase, dispatch }: Props) {
  const isVisible = phase === 'pokedex_entry'
  const [photoError, setPhotoError] = useState(false)

  const close = useCallback(
    () => dispatch({ type: 'CLOSE_POKEDEX_ENTRY' }),
    [dispatch]
  )

  useEffect(() => {
    if (!isVisible) return
    function onKey(e: KeyboardEvent) {
      if (
        e.code === 'Escape' ||
        e.code === 'KeyX' ||
        e.code === 'Enter' ||
        e.code === 'KeyZ'
      ) {
        close()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isVisible, close])

  if (!isVisible) return null

  return (
    <div className={styles.overlay} onClick={close}>
      <img
        src="/pokemon-assets/pokedex_entry.png"
        className={styles.bgImg}
        alt=""
        draggable={false}
      />
      {!photoError && (
        <img
          src="/pokemon-assets/profile.png"
          className={styles.photo}
          alt=""
          draggable={false}
          onError={() => setPhotoError(true)}
        />
      )}
      <div className={styles.bioArea}>
        <span className={styles.bioText}>
          {'[Your bio text goes here.\nAdd a few sentences about yourself,\nyour background, and what you do.]'}
        </span>
      </div>
    </div>
  )
}
