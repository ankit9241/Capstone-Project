import React from "react";
import LoginPage from "../components/LoginPage/LoginPage";
import Footer from "../components/HomePage/Footer/Footer";

const LoginRoute = () => {
  return (
    <>
      {" "}
      <div className="login-page-wrapper">
        <LoginPage />
      </div>
      <Footer />
    </>
  );
};

export default LoginRoute;
