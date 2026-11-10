import type { ReactNode } from "react"

export function StatusText({ children }: { children: ReactNode }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex h-12 items-center justify-center gap-3 text-3xl leading-none font-extrabold text-sunny"
    >
      {children}
    </div>
  )
}
