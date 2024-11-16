import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate(); // Correctly using the useNavigate hook

    // State variables for form fields
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    // Form submission handler
    const submit = async (e) => {
        e.preventDefault(); // Prevent the default form submission

        try {
            // Sending a POST request to the backend
            const res = await axios.post("http://localhost:8080/Register", {
                username,
                email,
                phone,
                password,
            });

            if (res.data === "exist") {
                // User exists: Navigate to the forum page with the username in state
                navigate("/Forum", { state: { id: username } });
            } else if (res.data === "nonexist") {
                // New user: Show success message or navigate to a different page
                alert("Registration successful!");
                navigate("/Login");
            }
        } catch (error) {
            alert("Something went wrong. Please try again.");
            console.error("Error during registration:", error);
        }
    };

    return (
        <section>
            <div className="section-registration">
                <h2>Register</h2>
                <form onSubmit={submit}>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="phone">Phone Number</label>
                        <input
                            type="text"
                            id="phone"
                            placeholder="Enter your phone number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit">Register</button>
                </form>
            </div>
        </section>
    );
};

export default Register;
