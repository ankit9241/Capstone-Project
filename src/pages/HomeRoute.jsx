import React from "react";
import CourseList from "../components/HomePage/CourseList/CourseList";
import Footer from "../components/HomePage/Footer/Footer";
import NavbarHome from "../components/NavbarHome/NavbarHome";

function HomePage() {
  return (
    <>
      <NavbarHome />
      <CourseList />
      <Footer />
    </>
  );
}

export default HomePage;
