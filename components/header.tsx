"use client"

import { ThemeToggle } from "./theme-toggle"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-transparent">
      <div className="container flex h-14 items-center justify-end">
        <ThemeToggle />
      </div>
    </header>
  )
}
