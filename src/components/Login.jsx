import React from "react"
import { useState, useEffect } from "react"
import { assets } from "../assets/assets"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const [state, setState] = useState("login")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      navigate("/app")
    }
    else if (!localStorage.getItem("user")) {
      setState("signup")
    }
  }, [navigate])

  function onSubmitHandler(e) {
    e.preventDefault()
    setError("")

    if (state === "signup") {
      if (!validateEmail(email)) {
        setError("Please enter a valid email address.")
        return
      }

      if (password.length < 6) {
        setError("Password must be at least 6 characters long.")
        return
      }

      const userData = { username, email, password }
      localStorage.setItem("user", JSON.stringify(userData))
      localStorage.setItem("isLoggedIn", "true")
      navigate("/app")
    } else if (state === "login") {
      const storedUser = localStorage.getItem("user")
      if (!storedUser) {
        setError("User not found. Please sign up first.")
        return
      }
      const user = JSON.parse(storedUser)
      if (user.username === username && user.password === password) {
        localStorage.setItem("isLoggedIn", "true")
        navigate("/app")
      } else {
        setError("Invalid username or password.")
      }
    }
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  return (
    <div className="absolute inset-0 z-10 flex justify-center items-center bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] overflow-hidden">
      <div className="absolute w-full h-full overflow-hidden -z-10">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full bg-white/10 animate-float`}
            style={{
              width: `${Math.random() * 20 + 10}px`,
              height: `${Math.random() * 20 + 10}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 10 + 10}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-1000%) rotate(720deg);
            opacity: 0;
          }
        }
        .animate-float {
          animation: float linear infinite;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.5s;
        }
      `}</style>

      <form
        onSubmit={onSubmitHandler}
        className="relative bg-slate-800/80 backdrop-blur-md p-10 rounded-xl w-full max-w-md text-slate-200 border border-white/10 transform animate-[fadeIn_0.5s_ease-out] shadow-2xl"
      >
        <h1 className="text-center text-2xl text-white font-semibold mb-2">
          {state === "login" ? "Welcome Back" : "Create Account"}
        </h1>
        <p className="text-center text-sm text-slate-300/70 mb-6">
          {state === "login"
            ? "Enter your credentials to access your account"
            : "Join us and start creating amazing AI images"}
        </p>

        {state === "signup" && (
          <div className="flex items-center gap-2 px-6 py-3 border border-white/20 rounded-full mt-5 bg-white/5 focus-within:border-purple-500 focus-within:shadow-[0_0_0_2px_rgba(139,92,246,0.3)] transition-all duration-300">
            <img src={assets.profile_icon || "/placeholder.svg"} alt="profile icon" width={20} />
            <input
              type="text"
              placeholder="Username"
              required
              className="bg-transparent outline-none border-none text-sm w-full text-slate-200 placeholder:text-slate-400/50"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>
        )}

        {state === "signup" && (
          <div className="flex items-center gap-2 px-6 py-3 border border-white/20 rounded-full mt-4 bg-white/5 focus-within:border-purple-500 focus-within:shadow-[0_0_0_2px_rgba(139,92,246,0.3)] transition-all duration-300">
            <img src={assets.email_icon || "/placeholder.svg"} alt="email icon" width={20} />
            <input
              type="email"
              placeholder="Email"
              required
              className="bg-transparent outline-none border-none text-sm w-full text-slate-200 placeholder:text-slate-400/50"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
        )}

        {state === "login" && (
          <div className="flex items-center gap-2 px-6 py-3 border border-white/20 rounded-full mt-4 bg-white/5 focus-within:border-purple-500 focus-within:shadow-[0_0_0_2px_rgba(139,92,246,0.3)] transition-all duration-300">
            <img src={assets.profile_icon || "/placeholder.svg"} alt="username icon" width={20} />
            <input
              type="text"
              placeholder="Username"
              required
              className="bg-transparent outline-none border-none text-sm w-full text-slate-200 placeholder:text-slate-400/50"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>
        )}

        <div className="flex items-center gap-2 px-6 py-3 border border-white/20 rounded-full mt-4 bg-white/5 focus-within:border-purple-500 focus-within:shadow-[0_0_0_2px_rgba(139,92,246,0.3)] transition-all duration-300">
          <img src={assets.lock_icon || "/placeholder.svg"} alt="lock icon" width={20} />
          <input
            type="password"
            placeholder="Password"
            required
            className="bg-transparent outline-none border-none text-sm w-full text-slate-200 placeholder:text-slate-400/50"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        {error && <p className="text-red-400 text-center mt-4 text-sm animate-shake">{error}</p>}

        <button className="w-full py-3 mt-6 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium transition-all duration-300 hover:from-purple-700 hover:to-indigo-700 hover:-translate-y-0.5 hover:shadow-lg">
          {state === "login" ? "Login" : "Create Account"}
        </button>

        <p className="mt-5 text-center text-sm">
          {state === "login" ? "Don't have an account? " : "Already have an account? "}
          <span
            className="text-purple-400 cursor-pointer font-medium hover:text-purple-300 hover:underline transition-colors duration-200"
            onClick={() => setState(state === "login" ? "signup" : "login")}
          >
            {state === "login" ? "Sign up" : "Login"}
          </span>
        </p>
      </form>
    </div>
  )
}

export default Login
