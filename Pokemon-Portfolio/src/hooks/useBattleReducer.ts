import { useReducer } from 'react'
import type { BattleState, BattleAction } from '../types/battle'
import { INITIAL_STATE } from '../data/battleData'

function battleReducer(state: BattleState, action: BattleAction): BattleState {
  switch (action.type) {
    case 'INTRO_COMPLETE':
      return {
        ...state,
        phase: 'idle',
        currentDialogue: 'What will\nTRAINER do?',
        dialogueComplete: false,
      }

    case 'OPEN_MOVE_MENU':
      if (state.phase !== 'idle') return state
      return { ...state, phase: 'move_select', currentDialogue: '' }

    case 'SELECT_MOVE': {
      if (state.phase !== 'move_select') return state
      const move = state.moves.find((m) => m.id === action.moveId)
      if (!move) return state

      const updatedMoves = state.moves.map((m) =>
        m.id === action.moveId ? { ...m, used: true, pp: 0 } : m
      )
      const newHp = Math.max(0, state.enemyHp - move.damage)

      return {
        ...state,
        phase: 'animating',
        activeMove: action.moveId,
        enemyHp: newHp,
        moves: updatedMoves,
        dialogueQueue: move.dialogueLines.slice(1),
        currentDialogue: move.dialogueLines[0] ?? '',
        dialogueComplete: false,
      }
    }

    case 'HP_DRAIN_COMPLETE': {
      if (state.phase !== 'animating') return state
      const [next, ...rest] = state.dialogueQueue
      return {
        ...state,
        phase: 'dialogue',
        currentDialogue: next ?? '',
        dialogueQueue: rest,
        dialogueComplete: false,
      }
    }

    case 'TYPEWRITER_COMPLETE':
      return { ...state, dialogueComplete: true }

    case 'ADVANCE_DIALOGUE': {
      if (!state.dialogueComplete) return state

      if (state.dialogueQueue.length > 0) {
        const [next, ...rest] = state.dialogueQueue
        return {
          ...state,
          currentDialogue: next,
          dialogueQueue: rest,
          dialogueComplete: false,
        }
      }

      // All dialogue shown — check if battle is over
      if (state.enemyHp <= 0) {
        return {
          ...state,
          phase: 'fainted',
          currentDialogue: 'ZACHARY DOLL fainted!',
          dialogueComplete: false,
        }
      }

      return {
        ...state,
        phase: 'idle',
        activeMove: null,
        currentDialogue: 'What will\nTRAINER do?',
        dialogueComplete: false,
      }
    }

    case 'RESET':
      return { ...INITIAL_STATE }

    default:
      return state
  }
}

export function useBattleReducer() {
  return useReducer(battleReducer, INITIAL_STATE)
}
