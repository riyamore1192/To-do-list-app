import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { logOut_todo } from '../Redux/action.js';
import "./Navbar.css"

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
    <nav>
      {!token && (
        <>
          <NavLink className={({ isActive }) => isActive ? 'link-todo active' : 'link-todo'}
            to="/register">Register</NavLink>
          <NavLink
            className={({ isActive }) => isActive ? 'link-todo active' : 'link-todo'}
            to="/login" >Login</NavLink>
          <NavLink className={({ isActive }) => isActive ? 'link-todo active' : 'link-todo'}
            to="/todos" >Todo</NavLink>
          <NavLink
            className={({ isActive }) => isActive ? 'link-todo active' : 'link-todo'}
            to="/displaydata" >My Todos</NavLink>

          <button className='todo-btn' onClick={handleLogout} >Logout</button>
        </>

      )}

      {token && (
        <>
          <NavLink className={({ isActive }) => isActive ? 'link-todo active' : 'link-todo'}
            to="/todos" >Todo</NavLink>
          <NavLink className={({ isActive }) => isActive ? 'link-todo active' : 'link-todo'}
            to="/displaydata" >My Todos</NavLink>
          <button className='todo-btn' onClick={handleLogout} >Logout</button>
        </>
      )}
    </nav>
  );
};


export default Navbar;