import React from "react"
import { Moon, Sun } from "lucide-react"

const ThemeToggle = ({ isDarkMode, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-full ${
        isDarkMode ? "bg-gray-700 hover:bg-gray-600 text-yellow-300" : "bg-gray-200 hover:bg-gray-300 text-gray-700"
      } transition-all duration-300 transform hover:rotate-12`}
      aria-label="Toggle theme"
    >
      {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  )
}

export default ThemeToggle
