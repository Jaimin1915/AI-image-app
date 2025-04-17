import React from "react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const AuthGuard = ({ children }) => {
  const navigate = useNavigate()

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"

    if (!isLoggedIn) {
      navigate("/")
    }
  }, [navigate])

  return <>{children}</>
}

export default AuthGuard
