import React from "react";
import { useNavigate } from "react-router-dom";
import "./SubjectCard.css";

const SubjectCard = ({ name, image }) => {
  const navigate = useNavigate();

  const handleStartExam = () => {
    navigate(`/home/${name}`);
  };

  return (
    <div className="subject-card">
      <div className="subject-image">
        <img src={image} alt="Subject" />
      </div>
      <div className="subject-info">
        <h2 className="subject-name">{name}</h2>
        <button className="explore-btn" onClick={handleStartExam}>
          Explore Course
        </button>
      </div>
    </div>
  );
};

export default SubjectCard;
