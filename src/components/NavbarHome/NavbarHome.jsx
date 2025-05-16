import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import profile from "../../assets/profile.jpg";
import logo from "../../assets/logo.png";
import "./NavbarHome.css";

const NavbarHome = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Get user info from localStorage
  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {
    name: "Name",
    email: "name_24a12resXXX@iitp.ac.in",
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  return (
    <div className="navbar-home">
      <div className="nav-links">
        <img src={logo} alt="Logo" width="20%" className="logo" />
        <Link to="/" className="active">
          Home
        </Link>
        <Link to="/" className="active">
          Dashboard
        </Link>
        <Link to="/" className="active">
          My Courses
        </Link>
      </div>

      <div className="profile-section" onClick={toggleDropdown}>
        <div className="profile-info">
          <img src={profile} alt="Profile" className="profile-image" />
          <div className="user-details">
            <span className="user-name">{userInfo.name}</span>
            <span className="user-email">{userInfo.email}</span>
          </div>
          <i className={`fas fa-chevron-${isDropdownOpen ? "up" : "down"}`}></i>
        </div>

        {isDropdownOpen && (
          <div className="profile-dropdown">
            <div className="dropdown-item">
              <i className="fas fa-user"></i>
              <span>Profile</span>
            </div>
            <div className="dropdown-item">
              <i className="fas fa-cog"></i>
              <span>Settings</span>
            </div>
            <div className="dropdown-item" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt"></i>
              <span>Logout</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavbarHome;
