import React from 'react';
import { Outlet } from 'react-router-dom';
// import Navbar from './Navbar';
import Navbar from './Navbar.js';

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default RootLayout;
