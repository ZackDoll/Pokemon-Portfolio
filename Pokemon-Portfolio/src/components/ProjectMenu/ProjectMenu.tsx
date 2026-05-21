import { useState, useEffect, useCallback } from 'react'
import type { BattlePhase, BattleAction } from '../../types/battle'
import { PROJECTS } from '../../data/battleData'
import styles from './ProjectMenu.module.css'

interface Props {
  phase: BattlePhase
  dispatch: React.Dispatch<BattleAction>
}

function hpColor(hp: number, hpMax: number): string {
  const pct = hp / hpMax
  if (pct > 0.5) return 'var(--pokemon-hp-green)'
  if (pct > 0.2) return 'var(--pokemon-hp-yellow)'
  return 'var(--pokemon-hp-red)'
}

export default function ProjectMenu({ phase, dispatch }: Props) {
  const [focusIndex, setFocusIndex] = useState(0)
  const isVisible = phase === 'project_menu'

  const selectProject = useCallback(
    (id: string) => dispatch({ type: 'SELECT_PROJECT', projectId: id }),
    [dispatch]
  )

  const close = useCallback(
    () => dispatch({ type: 'CLOSE_PROJECT_MENU' }),
    [dispatch]
  )

  useEffect(() => {
    if (!isVisible) { setFocusIndex(0); return }
    function onKey(e: KeyboardEvent) {
      if (e.code === 'Escape' || e.code === 'KeyX') { close(); return }
      if (e.code === 'ArrowDown') {
        setFocusIndex((i) => {
          if (i === 0) return 1
          return Math.min(i + 1, PROJECTS.length - 1)
        })
        return
      }
      if (e.code === 'ArrowUp') {
        setFocusIndex((i) => Math.max(i - 1, 0))
        return
      }
      if (e.code === 'ArrowRight' && focusIndex === 0) {
        setFocusIndex(1)
        return
      }
      if (e.code === 'ArrowLeft' && focusIndex > 0) {
        setFocusIndex(0)
        return
      }
      if (e.code === 'Enter' || e.code === 'KeyZ') {
        const p = PROJECTS[focusIndex]
        if (p) selectProject(p.id)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isVisible, focusIndex, selectProject, close])

  if (!isVisible) return null

  const mainProject = PROJECTS[0]
  const sideProjects = PROJECTS.slice(1, 6)
  const focused = PROJECTS[focusIndex]

  return (
    <div className={styles.overlay}>
      {/* Main slot (index 0) */}
      <button
        className={`${styles.mainSlot} ${focusIndex === 0 ? styles.focused : ''}`}
        onClick={() => selectProject(mainProject.id)}
        onMouseEnter={() => setFocusIndex(0)}
      >
        <span className={styles.mainName}>{mainProject.name}</span>
        <span className={styles.mainLevel}>{mainProject.level}</span>
        <div
          className={styles.mainHpFill}
          style={{
            width: `${(mainProject.hp / mainProject.hpMax) * 100}%`,
            background: hpColor(mainProject.hp, mainProject.hpMax),
          }}
        />
      </button>

      {/* Side slots (indices 1–5) */}
      {sideProjects.map((project, i) => (
        <button
          key={project.id}
          className={`${styles.slot} ${focusIndex === i + 1 ? styles.focused : ''}`}
          style={{ top: 20 + i * 62 + 'px' }}
          onClick={() => selectProject(project.id)}
          onMouseEnter={() => setFocusIndex(i + 1)}
        >
          <span className={styles.slotName}>{project.name}</span>
          <span className={styles.slotLevel}>{project.level}</span>
          <div
            className={styles.slotHpFill}
            style={{
              width: `${(project.hp / project.hpMax) * 100}%`,
              background: hpColor(project.hp, project.hpMax),
            }}
          />
        </button>
      ))}

      {/* Info bar — shows focused project tagline */}
      <div className={styles.infoBar}>
        {focused?.tagline ?? ''}
      </div>

      {/* Cancel */}
      <button className={styles.cancelBtn} onClick={close}>
        CANCEL
      </button>
    </div>
  )
}
