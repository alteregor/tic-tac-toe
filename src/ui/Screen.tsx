import type { ReactNode } from "react"

type ScreenTone = "default" | "win" | "lose" | "draw"

const toneBg: Record<ScreenTone, string> = {
  default: "bg-tomato",
  win: "bg-win",
  lose: "bg-lose",
  draw: "bg-draw",
}

export function Screen({ tone = "default", children }: { tone?: ScreenTone; children: ReactNode }) {
  return (
    <div className="grid min-h-dvh place-items-center sm:py-8">
      <main
        className={`flex min-h-dvh w-full max-w-[440px] flex-col gap-6 px-6 pt-10 pb-10 font-display transition-colors duration-700 sm:min-h-[860px] sm:rounded-[64px] sm:border-[10px] sm:border-white/10 sm:shadow-[0_30px_60px_-20px_rgba(90,40,140,0.45)] ${toneBg[tone]}`}
      >
        {children}
      </main>
    </div>
  )
}
