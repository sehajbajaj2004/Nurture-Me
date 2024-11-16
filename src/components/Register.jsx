import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const history = useNavigate(); // Correctly setting up useNavigate hook for routing

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    async function submit(e) {
        e.preventDefault(); // Prevent the default form submission

        try {
            // Sending a POST request to the backend with form data
            const res = await axios.post("http://localhost:8080/Register", {
                username,
                email,
                phone,
                password
            });

            console.log(res.data); // Debugging the response data

            // Handle response from backend
            if (res.data === "exist") {
                // If user exists, navigate to /Forum and pass the username as state
                history("/Forum", { state: { id: username } });
            } else if (res.data === "nonexist") {
                // If user does not exist, show an alert
                alert("User not found!");
            }
        } catch (e) {
            alert("Something went wrong.");
            console.error(e);
        }
    }

    return (
        <section>
            <div className="section-registration">
                <div className="reg-image">
                    <img src="" alt="" />
                </div>
                <div className="reg-form">
                    <form onSubmit={submit}>
                        <div>
                            <label htmlFor="username" className='font-medium'>Username </label>
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                id="username"
                                required
                                autoComplete="off"
                                value={username} // Bind value to state
                                onChange={(e) => setUsername(e.target.value)} // Update state on change
                            />
                        </div>

                        <div>
                            <label htmlFor="email">Email </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter Email id"
                                id="email"
                                required
                                autoComplete="off"
                                value={email} // Bind value to state
                                onChange={(e) => setEmail(e.target.value)} // Update state on change
                            />
                        </div>

                        <div>
                            <label htmlFor="phone">Phone Number (+91): </label>
                            <input
                                type="text"
                                name="phone"
                                placeholder="Phone Number"
                                id="phone"
                                required
                                autoComplete="off"
                                value={phone} // Bind value to state
                                onChange={(e) => setPhone(e.target.value)} // Update state on change
                            />
                        </div>

                        <div>
                            <label htmlFor="password">Create Password </label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter Password"
                                id="password"
                                required
                                autoComplete="off"
                                value={password} // Bind value to state
                                onChange={(e) => setPassword(e.target.value)} // Update state on change
                            />
                        </div>

                        <br />
                        <button type="submit">Register Now</button> {/* Submit button */}
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Register;
