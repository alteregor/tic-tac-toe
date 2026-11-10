import { type Settings, type Side, useGame } from "../model"
import { BoardCell, BoardGrid } from "../ui/Board"
import { Button, TextButton } from "../ui/Button"
import { Screen } from "../ui/Screen"
import { StatusText } from "../ui/StatusText"
import { Mark } from "../ui/marks"

const markColor: Record<Side, string> = { x: "text-tomato", o: "text-tangerine" }

export function GameScreen({ settings, onMenu }: { settings: Settings; onMenu: () => void }) {
  const { cells, status, computerSide, computersTurn, outcome, winLine, canPlay, play, restart } =
    useGame(settings)

  return (
    <Screen tone={outcome === "playing" ? "default" : outcome}>
      <div className="my-auto flex flex-col gap-6">
        <StatusText>
          {status.type === "playing" && (
            <>
              {computersTurn ? "Computer's move:" : computerSide ? "Your move:" : "Next move:"}
              <Mark side={status.next} className="size-9" />
            </>
          )}
          {status.type === "won" && (
            <>
              {outcome === "lose" ? "Computer wins!" : computerSide ? "You win!" : "Winner:"}
              {!computerSide && <Mark side={status.winner} className="size-9" />}
            </>
          )}
          {status.type === "draw" && "It's a draw!"}
        </StatusText>

        <BoardGrid winLine={winLine}>
          {cells.map((cell, i) => (
            <BoardCell
              key={i}
              label={`Row ${Math.floor(i / 3) + 1}, column ${(i % 3) + 1}${cell ? `: ${cell.toUpperCase()}` : ""}`}
              disabled={!canPlay(i)}
              dimmed={winLine !== null && !winLine.includes(i)}
              onClick={() => play(i)}
            >
              {cell && <Mark side={cell} className={`size-full ${markColor[cell]}`} />}
            </BoardCell>
          ))}
        </BoardGrid>
      </div>

      <div className="flex flex-col gap-2">
        <Button onClick={restart}>Restart</Button>
        <TextButton onClick={onMenu}>← Menu</TextButton>
      </div>
    </Screen>
  )
}
