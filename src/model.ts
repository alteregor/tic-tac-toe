import { useEffect, useState } from "react"
import { useImmer } from "use-immer"

export type Side = "x" | "o"
type Cell = Side | null
type Cells = Cell[]
type Line = [number, number, number]
type Opponent = "human" | "computer"
export type FirstMove = "me" | "computer"
export type Settings = { opponent: Opponent; firstMove: FirstMove }
type Outcome = "playing" | "win" | "lose" | "draw"

type Status =
  | { type: "playing"; next: Side }
  | { type: "won"; winner: Side; line: Line }
  | { type: "draw" }

type GameState = { cells: Cells; status: Status; computerSide: Side | null }

const COMPUTER_DELAY_MS = 450
const COMPUTER_MISTAKE_RATE = 0.2

const LINES: Line[] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

const emptyCells = (): Cells => Array<Cell>(9).fill(null)

const otherSide = (side: Side): Side => (side === "x" ? "o" : "x")

function findWinLine(cells: Cells): Line | null {
  return (
    LINES.find(([a, b, c]) => cells[a] && cells[a] === cells[b] && cells[b] === cells[c]) ?? null
  )
}

function statusAfterMove(cells: Cells, mover: Side): Status {
  const line = findWinLine(cells)
  if (line) return { type: "won", winner: mover, line }
  if (cells.every((c) => c !== null)) return { type: "draw" }
  return { type: "playing", next: otherSide(mover) }
}

function minimax(cells: Cells, toMove: Side, me: Side, depth: number): number {
  const line = findWinLine(cells)
  if (line) return cells[line[0]] === me ? 10 - depth : depth - 10
  if (cells.every((c) => c !== null)) return 0

  const scores = cells.flatMap((c, i) => {
    if (c) return []
    cells[i] = toMove
    const score = minimax(cells, otherSide(toMove), me, depth + 1)
    cells[i] = null
    return [score]
  })
  return toMove === me ? Math.max(...scores) : Math.min(...scores)
}

const pick = <T>(items: T[]) => items[Math.floor(Math.random() * items.length)]

function computerMove(cells: Cells, side: Side, mistakeRate = COMPUTER_MISTAKE_RATE) {
  const free = cells.flatMap((c, i) => (c ? [] : [i]))
  if (Math.random() < mistakeRate) return pick(free)

  const scored = free.map((i) => {
    const next = [...cells]
    next[i] = side
    return { i, score: minimax(next, otherSide(side), side, 0) }
  })
  const best = Math.max(...scored.map((s) => s.score))
  return pick(scored.filter((s) => s.score === best)).i
}

function computerSideFor({ opponent, firstMove }: Settings): Side | null {
  if (opponent === "human") return null
  return firstMove === "computer" ? "x" : "o"
}

function initialGame(settings: Settings): GameState {
  return {
    cells: emptyCells(),
    status: { type: "playing", next: "x" },
    computerSide: computerSideFor(settings),
  }
}

function applyMove(draft: GameState, index: number) {
  if (draft.status.type !== "playing" || draft.cells[index]) return
  const mover = draft.status.next
  draft.cells[index] = mover
  draft.status = statusAfterMove(draft.cells, mover)
}

function outcomeOf({ status, computerSide }: GameState): Outcome {
  if (status.type === "playing") return "playing"
  if (status.type === "draw") return "draw"
  return status.winner === computerSide ? "lose" : "win"
}

export function useGame(settings: Settings) {
  const [state, setState] = useImmer(() => initialGame(settings))
  const { cells, status, computerSide } = state
  const computersTurn = status.type === "playing" && status.next === computerSide

  useEffect(() => {
    if (!computersTurn || !computerSide) return
    const index = computerMove(cells, computerSide)
    const timer = setTimeout(() => setState((draft) => applyMove(draft, index)), COMPUTER_DELAY_MS)
    return () => clearTimeout(timer)
  }, [computersTurn, computerSide, cells, setState])

  return {
    cells,
    status,
    computerSide,
    computersTurn,
    outcome: outcomeOf(state),
    winLine: status.type === "won" ? status.line : null,
    canPlay: (index: number) => status.type === "playing" && !computersTurn && !cells[index],
    play: (index: number) => setState((draft) => applyMove(draft, index)),
    restart: () => setState(initialGame(settings)),
  }
}

export function useSetupForm(initial: Settings) {
  const [settings, setSettings] = useImmer(initial)
  return {
    settings,
    setOpponent: (opponent: Opponent) =>
      setSettings((draft) => {
        draft.opponent = opponent
      }),
    setFirstMove: (firstMove: FirstMove) =>
      setSettings((draft) => {
        draft.firstMove = firstMove
      }),
  }
}

export function useApp() {
  const [settings, setSettings] = useState<Settings>({ opponent: "computer", firstMove: "me" })
  const [playing, setPlaying] = useState(false)
  const [gameId, setGameId] = useState(0)

  return {
    settings,
    playing,
    gameId,
    start: (next: Settings) => {
      setSettings(next)
      setGameId((id) => id + 1)
      setPlaying(true)
    },
    toMenu: () => setPlaying(false),
  }
}
