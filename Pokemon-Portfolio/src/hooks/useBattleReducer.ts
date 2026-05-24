import { useReducer } from 'react'
import type { BattleState, BattleAction } from '../types/battle'
import { INITIAL_STATE, PROJECTS, ABOUT_SUBMOVES } from '../data/battleData'

function battleReducer(state: BattleState, action: BattleAction): BattleState {
  switch (action.type) {
    case 'INTRO_COMPLETE':
      return {
        ...state,
        phase: 'dialogue',
        currentDialogue: 'A wild ZACHARY DOLL appeared!',
        dialogueComplete: false,
      }

    case 'SELECT_MOVE': {
      if (state.phase !== 'move_select') return state
      const move = state.moves.find((m) => m.id === action.moveId)
      if (!move) return state

      // Some moves open sub-menus instead of attacking directly
      if (move.id === 'about') {
        return { ...state, phase: 'about_submenu' }
      }
      if (move.id === 'experience') {
        return { ...state, phase: 'bag_menu' }
      }
      if (move.id === 'projects') {
        return { ...state, phase: 'project_menu' }
      }

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

    case 'SELECT_PROJECT': {
      if (state.phase !== 'project_menu') return state
      const project = PROJECTS.find((p) => p.id === action.projectId)
      if (!project) return state
      const projectsMove = state.moves.find((m) => m.id === 'projects')
      if (!projectsMove) return state

      // If already used, just replay dialogue without draining HP again
      if (projectsMove.used) {
        return {
          ...state,
          phase: 'dialogue',
          currentDialogue: project.dialogueLines[0] ?? '',
          dialogueQueue: project.dialogueLines.slice(1),
          dialogueComplete: false,
        }
      }

      const updatedMoves = state.moves.map((m) =>
        m.id === 'projects' ? { ...m, used: true, pp: 0 } : m
      )
      const newHp = Math.max(0, state.enemyHp - projectsMove.damage)
      return {
        ...state,
        phase: 'animating',
        activeMove: 'projects',
        enemyHp: newHp,
        moves: updatedMoves,
        dialogueQueue: project.dialogueLines.slice(1),
        currentDialogue: project.dialogueLines[0] ?? '',
        dialogueComplete: false,
      }
    }

    case 'CLOSE_PROJECT_MENU':
      return {
        ...state,
        phase: 'move_select',
        currentDialogue: 'What will\nRECRUITER do?',
        dialogueComplete: false,
      }

    case 'SELECT_SUBMOVE': {
      if (state.phase !== 'about_submenu') return state
      const submove = ABOUT_SUBMOVES.find((m) => m.id === action.submoveId)
      if (!submove) return state
      const aboutMove = state.moves.find((m) => m.id === 'about')
      if (!aboutMove) return state

      if (action.submoveId === 'skills') {
        if (aboutMove.used) {
          return { ...state, phase: 'tm_case' }
        }
        const updatedMoves = state.moves.map((m) =>
          m.id === 'about' ? { ...m, used: true, pp: 0 } : m
        )
        const newHp = Math.max(0, state.enemyHp - aboutMove.damage)
        return { ...state, phase: 'tm_case', activeMove: 'about', enemyHp: newHp, moves: updatedMoves }
      }

      if (action.submoveId === 'intro') {
        if (aboutMove.used) {
          return { ...state, phase: 'pokedex_entry' }
        }
        const updatedMoves = state.moves.map((m) =>
          m.id === 'about' ? { ...m, used: true, pp: 0 } : m
        )
        const newHp = Math.max(0, state.enemyHp - aboutMove.damage)
        return { ...state, phase: 'pokedex_entry', activeMove: 'about', enemyHp: newHp, moves: updatedMoves }
      }

      if (aboutMove.used) {
        return {
          ...state,
          phase: 'dialogue',
          currentDialogue: submove.dialogueLines[0] ?? '',
          dialogueQueue: submove.dialogueLines.slice(1),
          dialogueComplete: false,
        }
      }

      const updatedMoves = state.moves.map((m) =>
        m.id === 'about' ? { ...m, used: true, pp: 0 } : m
      )
      const newHp = Math.max(0, state.enemyHp - aboutMove.damage)
      return {
        ...state,
        phase: 'animating',
        activeMove: 'about',
        enemyHp: newHp,
        moves: updatedMoves,
        dialogueQueue: submove.dialogueLines.slice(1),
        currentDialogue: submove.dialogueLines[0] ?? '',
        dialogueComplete: false,
      }
    }

    case 'CLOSE_ABOUT_SUBMENU':
      return {
        ...state,
        phase: 'move_select',
        currentDialogue: 'What will\nRECRUITER do?',
        dialogueComplete: false,
      }

    case 'CLOSE_BAG_MENU':
      return {
        ...state,
        phase: 'move_select',
        currentDialogue: 'What will\nRECRUITER do?',
        dialogueComplete: false,
      }

    case 'CLOSE_TM_CASE':
      if (state.enemyHp <= 0) {
        return { ...state, phase: 'fainted', currentDialogue: 'ZACHARY DOLL fainted!', dialogueComplete: false }
      }
      return { ...state, phase: 'move_select', activeMove: null, currentDialogue: 'What will\nRECRUITER do?', dialogueComplete: false }

    case 'CLOSE_POKEDEX_ENTRY':
      if (state.enemyHp <= 0) {
        return { ...state, phase: 'fainted', currentDialogue: 'ZACHARY DOLL fainted!', dialogueComplete: false }
      }
      return { ...state, phase: 'move_select', activeMove: null, currentDialogue: 'What will\nRECRUITER do?', dialogueComplete: false }

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
        phase: 'move_select',
        activeMove: null,
        currentDialogue: 'What will\nRECRUITER do?',
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
