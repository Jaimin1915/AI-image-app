import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // State for form mode: "login" or "signup"
  const [state, setState] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // If no user is stored, default to signup mode
  useEffect(() => {
    if (!localStorage.getItem("user")) {
      setState("signup");
    }
  }, []);

  function onSubmitHandler(e) {
    e.preventDefault();
    setError("");

    if (state === "signup") {
      // Store user data in localStorage on first-time signup
      const userData = { name, email, password };
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("isLoggedIn", "true");
      // Redirect to App page
      navigate("/app");
    } else if (state === "login") {
      // Validate user credentials from localStorage
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        setError("User not found. Please sign up first.");
        return;
      }
      const user = JSON.parse(storedUser);
      if (user.email === email && user.password === password) {
        localStorage.setItem("isLoggedIn", "true");
        navigate("/app");
      } else {
        setError("Invalid email or password.");
      }
    }
  }

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <form
        onSubmit={onSubmitHandler}
        className="relative bg-white p-10 rounded-xl text-slate-500"
      >
        <h1 className="text-center text-2xl text-neutral-700 font-medium">
          {state === "login" ? "Login" : "Sign Up"}
        </h1>
        {state === "login" ? (
          <p className="text-sm">Welcome back! Please login to continue.</p>
        ) : (
          <p className="text-sm">Welcome! Please create an account to continue.</p>
        )}

        {state === "signup" && (
          <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-5">
            <img src={assets.profile_icon} alt="profile icon" width={30} />
            <input
              type="text"
              placeholder="Full Name"
              required
              className="outline-none text-sm"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
        )}
        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
          <img src={assets.email_icon} alt="email icon" width={20} />
          <input
            type="email"
            placeholder="Email"
            required
            className="outline-none text-sm"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
          <img src={assets.lock_icon} alt="lock icon" width={20} />
          <input
            type="password"
            placeholder="Password"
            required
            className="outline-none text-sm"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        <button className="bg-blue-600 w-full text-white py-2 rounded-full mt-4">
          {state === "login" ? "Login" : "Create Account"}
        </button>
        {state === "login" ? (
          <p className="mt-5 text-center">
            Don't have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => setState("signup")}
            >
              Sign up
            </span>
          </p>
        ) : (
          <p className="mt-5 text-center">
            Already have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => setState("login")}
            >
              Login
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
