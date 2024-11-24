import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../socket"; // Import the WebSocket instance

const Login = () => {
  const navigate = useNavigate();

  // State variables for username and password inputs
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    try {
      // Send login request to the server
      const res = await axios.post("http://localhost:8080/Login", {
        username,
        password,
      });

      if (res.data === "success") {
        // Emit the logged-in username to the WebSocket server
        console.log(`User logged in: ${username}`);
        socket.emit("user_login", username);

        // Redirect the user to the Forum page with their username
        navigate("/Forum", { state: { id: username } });
      } else {
        // Show alert if login fails
        alert("Invalid username or password. Please try again.");
      }
    } catch (error) {
      // Handle errors gracefully
      alert("Something went wrong. Please try again.");
      console.error("Error during login:", error);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen">
      <div className="outer flex flex-col items-center justify-center">
        <div className="section-login flex-col md:p-8 mb-40">
          <h2 className="text-5xl font-bold text-center text-gray-700 mb-20">
            Login
          </h2>
          <form className="space-y-4" onSubmit={submit}>
            {/* Username Input */}
            <div className="flex flex-col">
              <label
                htmlFor="username"
                className="text-sm font-medium text-gray-600"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="mt-1 w-[450px] px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>

            {/* Password Input */}
            <div className="flex flex-col">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-600"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
