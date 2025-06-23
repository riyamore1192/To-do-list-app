import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logOut_todo } from '../Redux/action.js';

const Navbar = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("token"); // ✅ Clear token
    dispatch(logOut_todo());               // ✅ Reset Redux state
    navigate("/login");              // 🔁 Redirect to login or wherever
  };

  return (
    <nav style={{ padding: '10px', background: '#f0f0f0', marginBottom: '20px' }}>
      <Link to="/" style={{ marginRight: '10px' }}>Home</Link>

      {!token && (
        <>
          <Link to="/register" style={{ marginRight: '10px' }}>Register</Link>
          <Link to="/login" style={{ marginRight: '10px' }}>Login</Link>
        </>
      )}

      {token && (
        <>
          <Link to="/todos" style={{ marginRight: '10px' }}>Todo</Link>
          <Link to="/displaydata" style={{ marginRight: '10px' }}>My Todos</Link>
          <button onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</button>
        </>
      )}
    </nav>
  );
};

export default Navbar;
