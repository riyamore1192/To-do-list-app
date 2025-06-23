import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) navigate('/todos');
    }, []);

    const handleRegister = async () => {
        // e.preventDefault();
        try {
            const res = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                alert('Registration successful! Please log in.');
                navigate('/login');
            } else {
                const data = await res.json();
                alert(data.message || 'Registration failed');
            }
        } catch (err) {
            alert('Something went wrong');
        }
    };

    return (
        <div className='main' onSubmit={handleRegister}>
            <h2>Register</h2>
             <hr/>
            <div className='Content'>
                <div className='INPUT'>
                    <label for="name">Full Name</label>
                    <input
                        type="name"
                        placeholder="full name"
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                    />
                </div>
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
                <button className='login-btn' onClick={() => handleRegister()} type="submit">Register</button>
            </div>

        </div>
    );
};

export default Register;
