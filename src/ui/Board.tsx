import type { ReactNode } from "react"
import { pressable, surface } from "./surface"

export function BoardGrid({
  children,
  winLine,
}: {
  children: ReactNode
  winLine?: readonly number[] | null
}) {
  return (
    <div className="relative">
      <div className="grid grid-cols-3 gap-3">{children}</div>
      {winLine && <WinLine line={winLine} />}
    </div>
  )
}

type CellProps = {
  children?: ReactNode
  dimmed?: boolean
  disabled?: boolean
  label: string
  onClick?: () => void
}

export function BoardCell({ children, dimmed, disabled, label, onClick }: CellProps) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={`${surface} ${pressable} grid aspect-square place-items-center transition-opacity duration-500 ${
        dimmed ? "opacity-55" : ""
      }`}
    >
      {children && (
        <span className="grid size-[68%] animate-pop place-items-center">{children}</span>
      )}
    </button>
  )
}

const center = (i: number) => (i + 0.5) * (100 / 3)

function WinLine({ line }: { line: readonly number[] }) {
  const [a, , c] = line
  const x1 = center(a % 3)
  const y1 = center(Math.floor(a / 3))
  const x2 = center(c % 3)
  const y2 = center(Math.floor(c / 3))
  const ext = 12
  const len = Math.hypot(x2 - x1, y2 - y1)
  const dx = ((x2 - x1) / len) * ext
  const dy = ((y2 - y1) / len) * ext

  return (
    <svg
      viewBox="0 0 100 100"
      className="pointer-events-none absolute -inset-1.5 size-[calc(100%+0.75rem)] overflow-visible"
      aria-hidden
    >
      <defs>
        <filter id="win-glow" filterUnits="userSpaceOnUse" x="-10" y="-10" width="120" height="120">
          <feGaussianBlur stdDeviation="1.6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <line
        x1={x1 - dx}
        y1={y1 - dy}
        x2={x2 + dx}
        y2={y2 + dy}
        pathLength={1}
        stroke="white"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeDasharray="1"
        filter="url(#win-glow)"
        className="animate-draw-line"
      />
    </svg>
  )
}
