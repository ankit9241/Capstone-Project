import React from "react";
import CourseList from "../../components/MyCourses/CourseList/CourseList.jsx";
import "./HomePage.css";

const HomePage = () => {
  return (
    <>
      <h2 className="homepage-title">My Courses:</h2>
      <div className="homepage-content">
        <CourseList />
      </div>
    </>
  );
};

export default HomePage;
