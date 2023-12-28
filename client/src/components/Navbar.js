import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'; // Import your custom CSS file

export default function Navbar({ isLogin, setIsLogin }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLogin(false);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-wrapper deep-purple-bg">
        <Link to="/home2" className="logo">
          IMP Group Notes
        </Link>
        <ul className="nav-links">
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/create">Create Notes</Link>
          </li>
          {isLogin ? (
            <li>
              <Link to="/" onClick={handleLogout}>
                Logout
              </Link>
            </li>
          ) : (
            <>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
              <li>
                <Link to="/signin">Signin</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
