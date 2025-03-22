import React from 'react';

import { Moon, Sun } from "lucide-react"

const ThemeToggle = ({ isDarkMode, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-red-100 dark:bg-red-400 hover:bg-gray-200 dark:hover:bg-red-800 transition-colors duration-200"
      aria-label="Toggle theme"
    >
      {isDarkMode ? (
        <Sun className="h-5 w-5 text-gray-800 text-red-600" />
      ) : (
        <Moon className="h-5 w-5 text-gray-800 dark:text-gray-100" />
      )}
    </button>
  )
}

export default ThemeToggle
