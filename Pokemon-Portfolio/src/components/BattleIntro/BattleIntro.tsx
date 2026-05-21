import type { BattlePhase, BattleAction } from '../../types/battle'
import styles from './BattleIntro.module.css'

interface Props {
  phase: BattlePhase
  dispatch: React.Dispatch<BattleAction>
}

export default function BattleIntro({ phase, dispatch }: Props) {
  if (phase !== 'intro') return null

  function onStripeEnd(e: React.AnimationEvent) {
    // Fire after the stripe (last animation at ~1.1s total) finishes
    if (e.animationName === 'stripeSlide') {
      dispatch({ type: 'INTRO_COMPLETE' })
    }
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.barTop} />
      <div className={styles.barBottom} />
      <div className={styles.flash} />
      <div className={styles.terrain} />
      <div className={styles.stripe} onAnimationEnd={onStripeEnd} />
    </div>
  )
}
