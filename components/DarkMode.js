"use client"
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function DarkModeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  const toggleDarkMode = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  useEffect(() => {
    setMounted(true)
  })

  if (!mounted) {
    return null
  }

  return (
    <button className="btn_darkmode" onClick={toggleDarkMode}>
      {theme === 'dark'
        ? <span className="sr_only">라이트 모드</span>
        : <span className="sr_only">다크 모드</span>
      }
    </button>
  )
}