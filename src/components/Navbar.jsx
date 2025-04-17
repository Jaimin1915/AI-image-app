import React from "react"
import { WandSparkles, LogOut } from "lucide-react"
import ThemeToggle from "./theme-toggle"
import { useNavigate } from "react-router-dom"

const Navbar = ({ isDarkMode, toggleTheme }) => {
  const navigate = useNavigate()

  const username = JSON.parse(localStorage.getItem("user") || '{"username":"User"}').username

  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", "false")
    navigate("/")
  }

  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-3">
        <div className="bg-purple-600 p-2 rounded-xl">
          <WandSparkles className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">AI Image Generator</h1>
          <p className="text-purple-300 text-sm">Welcome, {username}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        <button
          onClick={handleLogout}
          className="p-2 rounded-full bg-red-500 hover:bg-red-600 text-white transition-colors duration-200"
          aria-label="Logout"
        >
          <LogOut className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}

export default Navbar
