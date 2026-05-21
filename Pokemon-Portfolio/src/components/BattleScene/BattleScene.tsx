import { useEffect, useRef } from 'react'
import type { BattleState, BattleAction } from '../../types/battle'
import EnemyPanel from '../EnemyPanel/EnemyPanel'
import PlayerPanel from '../PlayerPanel/PlayerPanel'
import BattleDialogue from '../BattleDialogue/BattleDialogue'
import MoveMenu from '../MoveMenu/MoveMenu'
import BattleIntro from '../BattleIntro/BattleIntro'
import ProjectMenu from '../ProjectMenu/ProjectMenu'
import AboutSubMenu from '../AboutSubMenu/AboutSubMenu'
import styles from './BattleScene.module.css'

interface Props {
  state: BattleState
  dispatch: React.Dispatch<BattleAction>
}

export default function BattleScene({ state, dispatch }: Props) {
  const sceneRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function scale() {
      if (!sceneRef.current) return
      const ratio = Math.min(window.innerWidth / 832, window.innerHeight / 384)
      sceneRef.current.style.transform = `scale(${ratio})`
      sceneRef.current.style.transformOrigin = 'center center'
    }
    scale()
    window.addEventListener('resize', scale)
    return () => window.removeEventListener('resize', scale)
  }, [])

  return (
    <div ref={sceneRef} className={styles.scene}>
      {/* Battle area */}
      <div className={styles.battleArea}>
        <EnemyPanel
          hp={state.enemyHp}
          hpMax={state.enemyHpMax}
          name="ZACHARY DOLL"
          level={21}
          phase={state.phase}
          dispatch={dispatch}
        />
        <PlayerPanel
          name="RECRUITER"
          level={99}
        />
        <div className={styles.enemySprite}>ZACHARY DOLL</div>
        <div className={styles.playerSprite}>YOU</div>
      </div>

      {/* UI bar */}
      <div className={styles.uiBar}>
        <div className={styles.uiLeft}>
          <BattleDialogue
            text={state.currentDialogue}
            complete={state.dialogueComplete}
            phase={state.phase}
            dispatch={dispatch}
          />
        </div>
        <div className={styles.uiRight}>
          <MoveMenu
            moves={state.moves}
            phase={state.phase}
            dispatch={dispatch}
          />
        </div>
      </div>

      {/* Intro overlay */}
      <BattleIntro phase={state.phase} dispatch={dispatch} />

      {/* Project party menu */}
      <ProjectMenu phase={state.phase} dispatch={dispatch} />

      {/* About sub-menu */}
      <AboutSubMenu phase={state.phase} dispatch={dispatch} />

      {/* Restart button */}
      <button
        className={styles.restartBtn}
        onClick={() => dispatch({ type: 'RESET' })}
        title="Restart battle"
        aria-label="Restart battle"
      >
        ↺
      </button>
    </div>
  )
}
