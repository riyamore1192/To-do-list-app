import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) navigate('/todos');
    }, []);

    const handleRegister = async (e) => {
        e.preventDefault();
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
        <form onSubmit={handleRegister}>
            <h2>Register</h2>
             <input
                type="name"
                placeholder="name"
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
            />
            <input
                type="email"
                placeholder="Email"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
            />
            <input
                type="password"
                placeholder="Password"
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
            />
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;
