import React from "react";
import Examdetails from "../components/ExamDetails/ExamDetails";
import NavbarHome from "../components/NavbarHome/NavbarHome";
import Footer from "../components/HomePage/Footer/Footer";

function ExamDetails() {
  return (
    <>
      <NavbarHome />
      <Examdetails />
      <Footer />
    </>
  );
}

export default ExamDetails;
