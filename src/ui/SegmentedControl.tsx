import { surface } from "./surface"

type Option<T extends string> = { value: T; label: string }

export function SegmentedControl<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: Option<T>[]
  value: T
  onChange: (value: T) => void
}) {
  return (
    <div role="radiogroup" aria-label={label} className={`${surface} flex gap-1.5 p-1.5`}>
      {options.map((option) => {
        const selected = option.value === value
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(option.value)}
            className={`h-14 flex-1 cursor-pointer rounded-2xl text-xl leading-none font-extrabold transition duration-200 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-white ${
              selected
                ? "bg-tomato text-sunny shadow-[inset_0_-3px_0_rgba(0,0,0,0.12)]"
                : "text-tomato"
            }`}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
