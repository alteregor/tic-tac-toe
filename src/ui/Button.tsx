import type { ButtonHTMLAttributes } from "react"
import { pressable, surface } from "./surface"

export function Button({ className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={`${surface} ${pressable} h-20 w-full text-[2rem] font-extrabold text-tomato ${className}`}
      {...props}
    />
  )
}

export function TextButton({ className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={`mx-auto cursor-pointer rounded-full px-4 py-1 text-xl font-bold text-sunny/80 transition active:text-sunny focus-visible:outline-3 focus-visible:outline-white ${className}`}
      {...props}
    />
  )
}
