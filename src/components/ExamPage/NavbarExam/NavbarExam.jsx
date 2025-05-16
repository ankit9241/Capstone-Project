import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.png";
import profile from "../../../assets/profile.jpg";
import "./NavbarExam.css";

const NavbarExam = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isExamPage = location.pathname === "/exam";
  const isReviewPage = location.pathname === "/review";

  // Get user info from localStorage
  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {
    name: "Name",
    email: "name_24a12resXXX@iitp.ac.in",
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="nav-links">
        <img src={logo} alt="Logo" width="20%" className="logo" />
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

export default NavbarExam;
