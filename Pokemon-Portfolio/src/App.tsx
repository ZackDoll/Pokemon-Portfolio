import { useEffect } from 'react'
import { useBattleReducer } from './hooks/useBattleReducer'
import BattleScene from './components/BattleScene/BattleScene'
import './App.css'

const PRELOAD_ASSETS = [
  '/pokemon-assets/move_inspect.png',
  '/pokemon-assets/bag_back_blue.png',
  '/pokemon-assets/red_bag_arrow.png',
  '/pokemon-assets/pokedex_entry.png',
  '/pokemon-assets/profile.png',
  '/pokemon-assets/arrow_selector.png',
  '/pokemon-assets/tm_case.png',
  '/pokemon-assets/HM_icon.png',
  '/pokemon-assets/zack-base-stance-updated.png',
  '/pokemon-assets/zack-cast-charge.png',
  '/pokemon-assets/zack-cast-fire.png',
  '/pokemon-assets/may-base-stance.png',
]

function App() {
  const [state, dispatch] = useBattleReducer()

  useEffect(() => {
    PRELOAD_ASSETS.forEach((src) => {
      const img = new Image()
      img.src = src
    })
  }, [])

  return (
    <div className="app">
      <BattleScene state={state} dispatch={dispatch} />
    </div>
  )
}

export default App
