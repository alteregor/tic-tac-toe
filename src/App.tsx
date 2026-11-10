import { useApp } from "./model"
import { GameScreen } from "./screens/GameScreen"
import { SetupScreen } from "./screens/SetupScreen"

function App() {
  const { settings, playing, gameId, start, toMenu } = useApp()

  if (!playing) return <SetupScreen initial={settings} onStart={start} />

  return <GameScreen key={gameId} settings={settings} onMenu={toMenu} />
}

export default App
