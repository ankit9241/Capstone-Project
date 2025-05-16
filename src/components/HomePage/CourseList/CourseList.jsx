import React from "react";
import SubjectCard from "../SubjectCard/SubjectCard";
import "./CourseList.css";
import cardImage from "../../../assets/cardimage.jpeg";

const courses = [
  {
    id: 1,
    name: "BO CDA 102: Mathematics-II",
    image: cardImage,
  },
  {
    id: 2,
    name: "BO CDA 104: Programming & Data Structures with Python",
    image: cardImage,
  },
  {
    id: 3,
    name: "BO CDA 105: Foundation of Data Analytics",
    image: cardImage,
  },
  {
    id: 4,
    name: "BO CDA 106: Numerical Methods for Data Science",
    image: cardImage,
  },
];

const CourseList = () => {
  return (
    <>
      <h1 className="my-courses">My Courses:</h1>
      <div className="course-container">
        <h3 className="course-overview">Course Overview</h3>
        <div className="courses-container">
          {courses.map((course) => (
            <SubjectCard
              key={course.id}
              name={course.name}
              image={course.image}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default CourseList;
