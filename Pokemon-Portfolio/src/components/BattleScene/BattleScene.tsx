import { useEffect, useRef, useState } from 'react'
import type { BattleState, BattleAction } from '../../types/battle'
import EnemyPanel from '../EnemyPanel/EnemyPanel'
import PlayerPanel from '../PlayerPanel/PlayerPanel'
import BattleDialogue from '../BattleDialogue/BattleDialogue'
import MoveMenu from '../MoveMenu/MoveMenu'
import BattleIntro from '../BattleIntro/BattleIntro'
import ProjectMenu from '../ProjectMenu/ProjectMenu'
import AboutSubMenu from '../AboutSubMenu/AboutSubMenu'
import BagMenu from '../BagMenu/BagMenu'
import PokedexEntry from '../PokedexEntry/PokedexEntry'
import TMCase from '../TMCase/TMCase'
import styles from './BattleScene.module.css'

interface Props {
  state: BattleState
  dispatch: React.Dispatch<BattleAction>
}

const CAST_MS = 500

type SpriteFrame = 'base' | 'charge' | 'fire'

const ENEMY_SPRITES: Record<SpriteFrame, string> = {
  base:   '/pokemon-assets/zack-base-stance-updated.png',
  charge: '/pokemon-assets/zack-cast-charge.png',
  fire:   '/pokemon-assets/zack-cast-fire.png',
}

export default function BattleScene({ state, dispatch }: Props) {
  const sceneRef = useRef<HTMLDivElement>(null)
  const [spriteFrame, setSpriteFrame] = useState<SpriteFrame>('base')
  const [resumeIconVisible, setResumeIconVisible] = useState(false)
  const t1Ref = useRef<ReturnType<typeof setTimeout> | null>(null)
  const t2Ref = useRef<ReturnType<typeof setTimeout> | null>(null)
  const activeMoveRef = useRef<string | null>(null)
  const isAnimatingRef = useRef(false)

  useEffect(() => {
    if (state.phase !== 'animating' || isAnimatingRef.current) return
    isAnimatingRef.current = true
    activeMoveRef.current = state.activeMove
    setSpriteFrame('charge')
    t1Ref.current = setTimeout(() => {
      setSpriteFrame('fire')
      if (activeMoveRef.current === 'resume') {
        setResumeIconVisible(true)
        setTimeout(() => {
          setResumeIconVisible(false)
          window.open('/pokemon-assets/Zachary_Doll_resume_Apr_2026.pdf', '_blank')
        }, 1500)
      }
      t2Ref.current = setTimeout(() => {
        setSpriteFrame('base')
        isAnimatingRef.current = false
      }, 1500)
    }, CAST_MS)
  }, [state.phase, state.activeMove])

  // Cleanup timers on unmount only
  useEffect(() => () => {
    if (t1Ref.current) clearTimeout(t1Ref.current)
    if (t2Ref.current) clearTimeout(t2Ref.current)
  }, [])

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
        <img
          src={ENEMY_SPRITES[spriteFrame]}
          className={styles.enemySprite}
          style={spriteFrame === 'base' ? { transform: 'scaleX(-1)' } : { transform: 'translateY(-10px)' }}
          alt=""
          draggable={false}
        />
        <img src="/pokemon-assets/may-base-stance.png" className={styles.playerSprite} alt="" draggable={false} />
        {resumeIconVisible && (
          <img src="/pokemon-assets/resume-icon.png" className={styles.resumeProjectile} alt="" draggable={false} />
        )}
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

      {/* Bag menu */}
      <BagMenu phase={state.phase} dispatch={dispatch} />

      {/* Pokédex entry */}
      <PokedexEntry phase={state.phase} dispatch={dispatch} />

      {/* TM Case */}
      <TMCase phase={state.phase} dispatch={dispatch} />

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
