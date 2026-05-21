import { useBattleReducer } from './hooks/useBattleReducer'
import BattleScene from './components/BattleScene/BattleScene'
import './App.css'

function App() {
  const [state, dispatch] = useBattleReducer()
  return (
    <div className="app">
      <BattleScene state={state} dispatch={dispatch} />
    </div>
  )
}

export default App
