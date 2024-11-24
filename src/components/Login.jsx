import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate(); // Correctly using the useNavigate hook

    // State variables for form fields
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // Form submission handler
    const submit = async (e) => {
        e.preventDefault(); // Prevent the default form submission

        try {
            // Sending a POST request to the backend
            const res = await axios.post("http://localhost:8080/Login", {
                username,
                password,
            });

            if (res.data === "success") {
                // Login successful: Navigate to the Forum page with the username in state
                navigate("/Forum", { state: { id: username } });
            } else {
                // Invalid credentials: Show error message
                alert("Invalid username or password. Please try again.");
            }
        } catch (error) {
            alert("Something went wrong. Please try again.");
            console.error("Error during login:", error);
        }
    };

    return (
        <section className="flex items-center justify-center min-h-screen">
            <div className="outer flex flex-col items-center justify-center">
                {/* Login Form */}
                <div className="section-login flex-col p-6 md:p-8 mb-10">
                    <h2 className="text-5xl font-bold text-center text-gray-700 mb-20">Login</h2>
                    <form className="space-y-4" onSubmit={submit}>
                        {/* Username */}
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

                        {/* Password */}
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
