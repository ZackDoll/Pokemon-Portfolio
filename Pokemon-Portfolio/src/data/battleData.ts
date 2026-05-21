import type { Move, BattleState } from '../types/battle'

export const INITIAL_MOVES: Move[] = [
  {
    id: 'about',
    name: 'ABOUT ME',
    type: 'NORMAL',
    pp: 1,
    ppMax: 1,
    damage: 20,
    used: false,
    dialogueLines: [
      'A wild ZACK appeared!',
      'Zack is a software developer\nwho loves building things.',
      'He is passionate about\nclean code and pixel art.',
      'Nice to meet you!',
    ],
  },
  {
    id: 'skills',
    name: 'SKILLS',
    type: 'ELECTRIC',
    pp: 1,
    ppMax: 1,
    damage: 25,
    used: false,
    dialogueLines: [
      'ZACK used SKILLS!',
      'React, TypeScript, Node.js,\nPython, PostgreSQL.',
      'Also fluent in:\nDocker, AWS, Git.',
      "It's super effective!",
    ],
  },
  {
    id: 'projects',
    name: 'PROJECTS',
    type: 'PSYCHIC',
    pp: 1,
    ppMax: 1,
    damage: 35,
    used: false,
    dialogueLines: [
      'ZACK used PROJECTS!',
      'Project 1: A full-stack web app\nfor managing [description].',
      'Project 2: [Description].\ngithub.com/zack/project2',
      "ZACK's portfolio took a\ncritical hit!",
    ],
  },
  {
    id: 'contact',
    name: 'CONTACT',
    type: 'WATER',
    pp: 1,
    ppMax: 1,
    damage: 20,
    used: false,
    dialogueLines: [
      'ZACK used CONTACT!',
      'Email:\nzack@example.com',
      'LinkedIn: linkedin.com/in/zack\nGitHub: github.com/zack',
      'ZACK wants to connect!',
    ],
  },
]

export const ENEMY_POKEMON = {
  name: 'ZACK',
  level: 26,
  hpMax: 100,
}

export const PLAYER_POKEMON = {
  name: 'TRAINER',
  level: 99,
  hp: 184,
  hpMax: 184,
}

export const INITIAL_STATE: BattleState = {
  phase: 'intro',
  currentDialogue: '',
  dialogueQueue: [],
  dialogueComplete: false,
  enemyHp: ENEMY_POKEMON.hpMax,
  enemyHpMax: ENEMY_POKEMON.hpMax,
  playerHp: PLAYER_POKEMON.hp,
  playerHpMax: PLAYER_POKEMON.hpMax,
  moves: INITIAL_MOVES,
  activeMove: null,
}
