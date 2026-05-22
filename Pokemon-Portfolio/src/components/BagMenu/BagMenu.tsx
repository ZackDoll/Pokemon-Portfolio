import { useEffect, useCallback } from 'react'
import type { BattlePhase, BattleAction } from '../../types/battle'
import styles from './BagMenu.module.css'

interface Props {
  phase: BattlePhase
  dispatch: React.Dispatch<BattleAction>
}

export default function BagMenu({ phase, dispatch }: Props) {
  const isVisible = phase === 'bag_menu'

  const close = useCallback(
    () => dispatch({ type: 'CLOSE_BAG_MENU' }),
    [dispatch]
  )

  useEffect(() => {
    if (!isVisible) return
    function onKey(e: KeyboardEvent) {
      if (e.code === 'Escape' || e.code === 'KeyX') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isVisible, close])

  if (!isVisible) return null

  return (
    <div className={styles.overlay} onClick={close}>
      <img src="/pokemon-assets/bag_back_blue.png" className={styles.bgImg} alt="" draggable={false} />
    </div>
  )
}
