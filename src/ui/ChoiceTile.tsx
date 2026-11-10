import type { ReactNode } from "react"
import { pressable, surface } from "./surface"

type Props = {
  selected: boolean
  onSelect: () => void
  label?: string
  ariaLabel?: string
  children: ReactNode
}

export function ChoiceTile({ selected, onSelect, label, ariaLabel, children }: Props) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      aria-label={ariaLabel ?? label}
      onClick={onSelect}
      className={`${surface} ${pressable} flex aspect-[1.15] flex-col items-center justify-center gap-2 text-tomato ${
        selected ? "ring-[5px] ring-white" : "opacity-60 saturate-[0.85]"
      }`}
    >
      {children}
      {label && <span className="text-[1.6rem] leading-none font-extrabold">{label}</span>}
    </button>
  )
}

export function ChoiceGroup({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div role="radiogroup" aria-label={label} className="grid grid-cols-2 gap-4">
      {children}
    </div>
  )
}
