import React, { useState, useEffect } from 'react';
import "./Login.css"
// import { use } from 'react';
import { useNavigate } from 'react-router-dom';


const Login = () => {

    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) navigate('/todos');
    }, []);

    const handleLogin = async () => {
        // e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Login failed");
            }

            localStorage.setItem("token", data.token);
            alert("Login successful!");
            navigate("/todos");
        } catch (error) {
            alert(error.message); // will now say "User not found"
        }
    };

    return (
        <div className="main" onSubmit={handleLogin}>
            <h2>Login</h2>
            <hr/>
            <div className='Content'>
                <div className='INPUT'>
                    <label for="email">Email</label>
                    <input
                        type="email"
                        placeholder="Email"
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                    />
                </div>
                <div className='INPUT'>
                    <label for="password">Password</label>
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                    />
                </div>
                <button className='login-btn' onClick={() => handleLogin()} type="submit">Login</button>
            </div>
        </div>

    )
}

export default Login; 