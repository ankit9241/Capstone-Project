import React from "react";
import ReviewPage from "../components/ReviewPage/ReviewPage";
import NavbarExam from "../components/ExamPage/NavbarExam/NavbarExam";
import Footer from "../components/HomePage/Footer/Footer";

function ExamDetails() {
  return (
    <>
      <NavbarExam />
      <ReviewPage />
      <Footer />
    </>
  );
}

export default ExamDetails;
