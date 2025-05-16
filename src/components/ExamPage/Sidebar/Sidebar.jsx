import React from "react";
import "./Sidebar.css";
import Camera from "./Camera";

const Sidebar = ({
  questions,
  currentQuestion,
  onQuestionClick,
  selectedAnswers,
}) => {
  return (
    <>
      <Camera />
    </>
  );
};

export default Sidebar;
