import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom"; // Import Link for navigation

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // New state for toggling password visibility

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let data;
      if (state === "Sign Up") {
        const response = await axios.post(backendUrl + "/api/user/register", {
          name,
          password,
          email,
        });
        data = response.data;
      } else {
        const response = await axios.post(backendUrl + "/api/user/login", {
          password,
          email,
        });
        data = response.data;
      }

      if (data.success) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
        <p className="text-2xl font-semibold">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </p>
        <p>
          Please {state === "Sign Up" ? "sign up" : "log in"} to book
          appointment
        </p>
        {state === "Sign Up" && (
          <div className="w-full ">
            <p>Full Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="border border-[#DADADA] rounded w-full p-2 mt-1"
              type="text"
              required
            />
          </div>
        )}
        <div className="w-full ">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="email"
            required
          />
        </div>
        <div className="w-full relative">
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type={showPassword ? "text" : "password"} // Toggle between text and password
            required
          />
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-2 top-1/2 transform -translate-y-0.8 cursor-pointer"
          >
            <img
              src={
                showPassword ? assets.hidePasswordIcon : assets.showPasswordIcon
              } // Use imported assets
              alt={showPassword ? "Hide password" : "Show password"}
              className="w-5 h-5"
            />
          </span>
        </div>
        {state === "Login" && (
          <div className="w-full text-right mt-1">
            <Link to="/forgot-password" className="text-primary underline cursor-pointer">
              Forgot Password?
            </Link>
          </div>
        )}
        <button
          type="submit"
          className="bg-primary text-white w-full py-2 my-2 rounded-md text-base"
        >
          {state === "Sign Up" ? "Create account" : "Login"}
        </button>
        {state === "Sign Up" ? (
          <p>
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-primary underline cursor-pointer"
            >
              Login here
            </span>
          </p>
        ) : (
          <p>
            Create a new account?{" "}
            <span
              onClick={() => setState("Sign Up")}
              className="text-primary underline cursor-pointer"
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;