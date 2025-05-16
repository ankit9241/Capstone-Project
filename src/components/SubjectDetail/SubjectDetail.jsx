import { useNavigate, useParams } from "react-router-dom";
import "./SubjectDetail.css";

import { useState } from "react";

const initialAssignments = [
  {
    id: "1",
    title: "Assignment - 1",
    openTime: "2025-02-13T00:00:00",
    closeTime: "2025-02-16T23:45:00",
    attempted: false,
  },
  {
    id: "2",
    title: "Mid Semester Quiz",
    openTime: "2025-03-02T00:00:00",
    closeTime: "2025-03-02T23:00:00",
    attempted: false,
  },
  {
    id: "3",
    title: "Assignment 2",
    openTime: "2025-04-27T15:00:00",
    closeTime: "2025-06-29T23:59:00",
    attempted: false,
  },
];

const formatDate = (dateString) =>
  new Date(dateString).toLocaleString("en-IN", {
    dateStyle: "full",
    timeStyle: "short",
  });

function CourseAssignments() {
  const navigate = useNavigate();
  const { subjectName } = useParams(); // Added to get subjectName from route params
  const [assignments, setAssignments] = useState(initialAssignments);

  const handleTitleClick = (item) => {
    navigate("/exam-details", {
      state: {
        courseName: subjectName,
        openTime: item.openTime,
        closeTime: item.closeTime,
      },
    });
  };

  const toggleAttempted = (id) => {
    setAssignments((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, attempted: !item.attempted } : item
      )
    );
  };

  return (
    <div className="assignment-container">
      <h2 className="assignment-header">Assessment: Assignment/Exams/Quiz</h2>
      {assignments.map((item) => (
        <div className="assignment-card" key={item.id}>
          <div className="card-header">
            <div className="left-section">
              <div
                className="icon-box"
                onClick={() => toggleAttempted(item.id)}
                style={{ cursor: "pointer" }}
                title={item.attempted ? "Mark as not done" : "Mark as done"}
              >
                ✓
              </div>
              <div
                className="assignment-title"
                onClick={() => handleTitleClick(item)}
                style={{ cursor: "pointer" }}
              >
                {item.title}
              </div>
            </div>
            <button
              className={`mark-done-button ${item.attempted ? "done" : ""}`}
              onClick={() => toggleAttempted(item.id)}
            >
              {item.attempted ? "Done" : "Mark as done"}
            </button>
          </div>
          <div className="card-body">
            <p>
              <strong>Opened:</strong> {formatDate(item.openTime)}
            </p>
            <p>
              <strong>Closed:</strong> {formatDate(item.closeTime)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CourseAssignments;
