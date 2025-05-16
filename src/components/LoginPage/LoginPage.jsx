import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [isSignupActive, setIsSignupActive] = useState(false);
  const [showPassword, setShowPassword] = useState({
    loginPassword: false,
    signupPassword: false,
    confirmPassword: false,
  });
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatchError, setPasswordsMatchError] = useState(false);

  // New state for login form inputs and errors
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginErrors, setLoginErrors] = useState({ email: "", password: "" });

  // New state for signup form inputs and errors
  const [signupEmail, setSignupEmail] = useState("");
  const [signupErrors, setSignupErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    let errors = { email: "", password: "", confirmPassword: "" };
    let hasError = false;

    if (!signupEmail.trim()) {
      errors.email = "Please enter your email";
      hasError = true;
    }
    if (!signupPassword.trim()) {
      errors.password = "Please enter your password";
      hasError = true;
    }
    if (!confirmPassword.trim()) {
      errors.confirmPassword = "Please confirm your password";
      hasError = true;
    }
    if (signupPassword !== confirmPassword) {
      setPasswordsMatchError(true);
      hasError = true;
    } else {
      setPasswordsMatchError(false);
    }

    setSignupErrors(errors);

    if (!hasError) {
      navigate("/"); // Redirect to homepage
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (signupPassword === e.target.value) {
      setPasswordsMatchError(false);
    }
  };

  // New login form submit handler with validation
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    let errors = { email: "", password: "" };
    let hasError = false;

    if (!loginEmail.trim()) {
      errors.email = "Please enter your email";
      hasError = true;
    }
    if (!loginPassword.trim()) {
      errors.password = "Please enter your password";
      hasError = true;
    }

    setLoginErrors(errors);

    if (!hasError) {
      navigate("/"); // Redirect to homepage
    }
  };

  return (
    <div className="login_bg">
      <div className={`form_container ${isSignupActive ? "active" : ""}`}>
        {/* Login Form */}
        <div className="form login_form">
          <form onSubmit={handleLoginSubmit} noValidate>
            <h2>Login</h2>
            <div className="input_box">
              <input
                type="email"
                placeholder="Enter your email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
              <i className="uil uil-envelope-alt email"></i>
              {loginErrors.email && (
                <span className="premium-warning">{loginErrors.email}</span>
              )}
            </div>
            <div className="input_box">
              <input
                type={showPassword.loginPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
              <i className="uil uil-lock password"></i>
              <i
                className={`uil ${
                  showPassword.loginPassword ? "uil-eye" : "uil-eye-slash"
                } pw_hide`}
                onClick={() => togglePasswordVisibility("loginPassword")}
              ></i>
              {loginErrors.password && (
                <span className="premium-warning">{loginErrors.password}</span>
              )}
            </div>
            <div className="option_field">
              <span className="checkbox">
                <input type="checkbox" id="check" />
                <label htmlFor="check">Remember me</label>
              </span>
              <a href="#" className="forgot_pw">
                Forgot password?
              </a>
            </div>
            <button className="button" type="submit">
              Login Now
            </button>
            <div className="login_signup">
              Don't have an account?{" "}
              <a
                href="#"
                id="signup"
                onClick={(e) => {
                  e.preventDefault();
                  setIsSignupActive(true);
                }}
              >
                Signup
              </a>
            </div>
          </form>
        </div>

        {/* Signup Form */}
        <div className="form signup_form">
          <form id="signup-form" onSubmit={handleSignupSubmit} noValidate>
            <h2>Signup</h2>
            <div className="input_box">
              <input
                type="email"
                placeholder="Enter your email"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
              />
              <i className="uil uil-envelope-alt email"></i>
              {signupErrors.email && (
                <span className="premium-warning">{signupErrors.email}</span>
              )}
            </div>
            <div className="input_box">
              <input
                type={showPassword.signupPassword ? "text" : "password"}
                placeholder="Create password"
                id="signup-password"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
              />
              <i className="uil uil-lock password"></i>
              <i
                className={`uil ${
                  showPassword.signupPassword ? "uil-eye" : "uil-eye-slash"
                } pw_hide`}
                onClick={() => togglePasswordVisibility("signupPassword")}
              ></i>
              {signupErrors.password && (
                <span className="premium-warning">{signupErrors.password}</span>
              )}
            </div>
            <div className="input_box">
              <input
                type={showPassword.confirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                id="confirm-password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
              <i className="uil uil-lock password"></i>
              <i
                className={`uil ${
                  showPassword.confirmPassword ? "uil-eye" : "uil-eye-slash"
                } pw_hide`}
                onClick={() => togglePasswordVisibility("confirmPassword")}
              ></i>
              {signupErrors.confirmPassword && (
                <span className="premium-warning">
                  {signupErrors.confirmPassword}
                </span>
              )}
              {passwordsMatchError && (
                <span className="error-msg" id="password-error">
                  Passwords do not match. Please try again.
                </span>
              )}
            </div>
            <button className="button" type="submit">
              Signup Now
            </button>
            <div className="login_signup">
              Already have an account?{" "}
              <a
                href="#"
                id="login"
                onClick={(e) => {
                  e.preventDefault();
                  setIsSignupActive(false);
                }}
              >
                Login
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
