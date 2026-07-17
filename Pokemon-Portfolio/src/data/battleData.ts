import type { Move, Project, BattleState } from '../types/battle'

export const PROJECTS: Project[] = [
  {
    id: 'project1',
    name: 'PROJECT ONE',
    level: 24,
    hp: 45,
    hpMax: 45,
    tagline: 'Full-stack web application',
    dialogueLines: [
      'ZACHARY DOLL used\nPROJECTS!',
      'Project 1: [Name here].',
      '[Description of what it does\nand what you learned.]',
      'github.com/zack/project1',
    ],
  },
  {
    id: 'project2',
    name: 'PROJECT TWO',
    level: 22,
    hp: 38,
    hpMax: 45,
    tagline: 'React + TypeScript app',
    dialogueLines: [
      'ZACHARY DOLL used\nPROJECTS!',
      'Project 2: [Name here].',
      '[Description of what it does\nand what you learned.]',
      'github.com/zack/project2',
    ],
  },
  {
    id: 'project3',
    name: 'PROJECT THREE',
    level: 19,
    hp: 20,
    hpMax: 45,
    tagline: 'REST API with Node.js',
    dialogueLines: [
      'ZACHARY DOLL used\nPROJECTS!',
      'Project 3: [Name here].',
      '[Description of what it does\nand what you learned.]',
      'github.com/zack/project3',
    ],
  },
  {
    id: 'project4',
    name: 'PROJECT FOUR',
    level: 17,
    hp: 45,
    hpMax: 45,
    tagline: 'Mobile app with React Native',
    dialogueLines: [
      'ZACHARY DOLL used\nPROJECTS!',
      'Project 4: [Name here].',
      '[Description of what it does\nand what you learned.]',
      'github.com/zack/project4',
    ],
  },
  {
    id: 'project5',
    name: 'PROJECT FIVE',
    level: 15,
    hp: 30,
    hpMax: 45,
    tagline: 'Python data pipeline',
    dialogueLines: [
      'ZACHARY DOLL used\nPROJECTS!',
      'Project 5: [Name here].',
      '[Description of what it does\nand what you learned.]',
      'github.com/zack/project5',
    ],
  },
  {
    id: 'project6',
    name: 'PROJECT SIX',
    level: 12,
    hp: 12,
    hpMax: 45,
    tagline: 'CLI tool built in Go',
    dialogueLines: [
      'ZACHARY DOLL used\nPROJECTS!',
      'Project 6: [Name here].',
      '[Description of what it does\nand what you learned.]',
      'github.com/zack/project6',
    ],
  },
]


export const TM_SKILLS = [
  { id: 'hm01', number: 'HM01', name: 'REACT',      category: 'FRAMEWORK', isHM: true,  description: 'A powerful UI library\nfor building fast,\ncomponent-driven apps.' },
  { id: 'hm02', number: 'HM02', name: 'TYPESCRIPT', category: 'LANGUAGE',  isHM: true,  description: 'Typed superset of JS.\nCatches bugs at compile\ntime before they ship.' },
  { id: 'hm03', number: 'HM03', name: 'NODE.JS',    category: 'RUNTIME',   isHM: true,  description: 'Server-side JS runtime.\nBuilds APIs and backend\nservices efficiently.' },
  { id: 'tm01', number: 'TM01', name: 'POSTGRESQL', category: 'DATABASE',  isHM: false, description: 'Relational database.\nComplex queries and\ndata integrity.' },
  { id: 'tm02', number: 'TM02', name: 'DOCKER',     category: 'TOOL',      isHM: false, description: 'Containerizes apps for\nconsistent dev and\nproduction environments.' },
  { id: 'tm03', number: 'TM03', name: 'AWS',        category: 'CLOUD',     isHM: false, description: 'Cloud infrastructure.\nDeploy, scale, and\nmonitor applications.' },
]

export const INITIAL_MOVES: Move[] = [
  {
    id: 'about',
    name: 'ABOUT ME',
    type: 'NORMAL',
    pp: 1,
    ppMax: 1,
    damage: 20,
    used: false,
    dialogueLines: [],
  },
  {
    id: 'experience',
    name: 'EXPERIENCE',
    type: 'NORMAL',
    pp: 1,
    ppMax: 1,
    damage: 25,
    used: false,
    dialogueLines: [
      'ZACHARY DOLL used\nEXPERIENCE!',
      '[Job title] at [Company]\n[Year – Year]',
      '[Add more roles\nas needed.]',
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
    dialogueLines: [],
  },
  {
    id: 'resume',
    name: 'RESUME',
    type: 'NORMAL',
    pp: 1,
    ppMax: 1,
    damage: 20,
    used: false,
    downloadUrl: '/pokemon-assets/Zachary_Doll_resume_Apr_2026.pdf',
    dialogueLines: [
      'ZACHARY DOLL shared\ntheir RESUME!',
      'A download was triggered!',
    ],
  },
]

export const ENEMY_POKEMON = {
  name: 'ZACHARY DOLL',
  level: 21,
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
