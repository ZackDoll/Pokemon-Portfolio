export type BattlePhase =
  | 'intro'
  | 'idle'
  | 'move_select'
  | 'animating'
  | 'dialogue'
  | 'fainted'

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

export type BattleAction =
  | { type: 'INTRO_COMPLETE' }
  | { type: 'OPEN_MOVE_MENU' }
  | { type: 'SELECT_MOVE'; moveId: string }
  | { type: 'HP_DRAIN_COMPLETE' }
  | { type: 'TYPEWRITER_COMPLETE' }
  | { type: 'ADVANCE_DIALOGUE' }
  | { type: 'RESET' }
