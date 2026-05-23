export type BattlePhase =
  | 'intro'
  | 'idle'
  | 'move_select'
  | 'about_submenu'
  | 'project_menu'
  | 'animating'
  | 'dialogue'
  | 'fainted'
  | 'bag_menu'
  | 'pokedex_entry'

export type MoveType =
  | 'NORMAL'
  | 'FIRE'
  | 'WATER'
  | 'GRASS'
  | 'ELECTRIC'
  | 'PSYCHIC'
  | 'FIGHTING'
  | 'GHOST'

export interface Move {
  id: string
  name: string
  type: MoveType
  pp: number
  ppMax: number
  damage: number
  used: boolean
  dialogueLines: string[]
  downloadUrl?: string
}

export interface BattleState {
  phase: BattlePhase
  currentDialogue: string
  dialogueQueue: string[]
  dialogueComplete: boolean
  enemyHp: number
  enemyHpMax: number
  playerHp: number
  playerHpMax: number
  moves: Move[]
  activeMove: string | null
}

export interface Project {
  id: string
  name: string
  level: number
  hp: number
  hpMax: number
  tagline: string
  dialogueLines: string[]
}

export type BattleAction =
  | { type: 'INTRO_COMPLETE' }
  | { type: 'OPEN_MOVE_MENU' }
  | { type: 'SELECT_MOVE'; moveId: string }
  | { type: 'SELECT_PROJECT'; projectId: string }
  | { type: 'CLOSE_PROJECT_MENU' }
  | { type: 'SELECT_SUBMOVE'; submoveId: string }
  | { type: 'CLOSE_ABOUT_SUBMENU' }
  | { type: 'CLOSE_BAG_MENU' }
  | { type: 'CLOSE_POKEDEX_ENTRY' }
  | { type: 'HP_DRAIN_COMPLETE' }
  | { type: 'TYPEWRITER_COMPLETE' }
  | { type: 'ADVANCE_DIALOGUE' }
  | { type: 'RESET' }
