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
      <span className={styles.dexNumber}>No{' '}521</span>
      <span className={styles.dexCategory}>DEVELOPER POKéMON</span>
      <div className={styles.fieldSection}>
        <div className={styles.fieldRow}>
          <span className={styles.fieldLabel}>EDU</span>
          <span className={styles.fieldValue}>CS AT UCLA</span>
        </div>
        <div className={styles.fieldRow}>
          <span className={styles.fieldLabel}>GPA</span>
          <span className={styles.fieldValue}>3.86</span>
        </div>
      </div>
      <div className={styles.contactSection}>
        <a href="mailto:zack.j.doll@gmail.com" className={styles.contactValue} onClick={e => e.stopPropagation()}>ZACK.J.DOLL@GMAIL.COM</a>
        <a href="https://github.com/ZackDoll" target="_blank" rel="noopener noreferrer" className={styles.contactValue} onClick={e => e.stopPropagation()}>GITHUB/ZACKDOLL</a>
        <a href="https://linkedin.com/in/zackdoll" target="_blank" rel="noopener noreferrer" className={styles.contactValue} onClick={e => e.stopPropagation()}>LINKEDIN/ZACKDOLL</a>
      </div>
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
          {'A restless species, prone to sudden shifts between full-stack development and machine learning. ' +
           'Its natural habitat spans React, TypeScript, Python, Node, and PHP, with a den fortified deep in database architecture. ' +
           'Reported by trainers to collect side projects at an unusual rate, motives unknown. ' +
           'Rumored sightings place this species on basketball courts and rock faces when not in captivity. ' +
           'Data on this species remains incomplete.'}
        </span>
      </div>
    </div>
  )
}
