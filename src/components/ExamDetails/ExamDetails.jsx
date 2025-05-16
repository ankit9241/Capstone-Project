import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./ExamDetails.css";
import questions from "../../data/questions";

const ExamDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const courseName = location.state?.courseName || "";
  const openTime = location.state?.openTime
    ? new Date(location.state.openTime)
    : null;
  const closeTime = location.state?.closeTime
    ? new Date(location.state.closeTime)
    : null;
  const now = new Date();

  useEffect(() => {
    // Request camera access on page load
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        // Immediately stop the stream if not needed now
        stream.getTracks().forEach((track) => track.stop());
      })
      .catch((err) => {
        console.error("Camera access denied:", err);
      });
  }, []);

  const handleStartExam = () => {
    localStorage.setItem("questions", JSON.stringify(questions));
    navigate("/exam", { state: { courseName } });
  };

  const examNotStarted = openTime && now < openTime;
  const examClosed = closeTime && now > closeTime;

  return (
    <div className="exam-details-container">
      <div className="exam-info-card">
        <h2>Exam Information</h2>
        <div className="exam-details">
          <div className="detail-item">
            <span className="detail-label">Exam Duration:</span>
            <span className="detail-value">2 Hours</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Total Questions:</span>
            <span className="detail-value">20</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Passing Marks:</span>
            <span className="detail-value">40%</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Exam Type:</span>
            <span className="detail-value">Multiple Choice Questions</span>
          </div>
        </div>
        <div className="instructions">
          <h3>Read the Instructions carefully:</h3>
          <ul>
            <li>
              <strong>Face Recognition:</strong> Verify your identity before
              starting the exam.
            </li>
            <li>
              <strong>Eye Movement & Camera Monitoring:</strong> Avoid looking
              away from the screen or having others in the room.
            </li>
            <li>
              <strong>Full-Screen Mode:</strong> Do not switch tabs or exit
              full-screen mode during the exam.
            </li>
            <li>
              <strong>AI Proctoring:</strong> Continuous monitoring for
              suspicious behavior.
            </li>
            <li>
              <strong>No External Devices:</strong> Do not use any external
              devices or materials during the exam.
            </li>
            <li>
              <strong>Audio/Video Recording:</strong> Your audio and video will
              be recorded throughout the exam.
            </li>
            <li>
              <strong>Quiet Environment:</strong> Ensure you are in a
              distraction-free, quiet area.
            </li>
          </ul>
        </div>
        {examNotStarted && (
          <div className="exam-status-message">Exam has not started yet.</div>
        )}
        {examClosed && (
          <div className="exam-status-message">Exam deadline has passed.</div>
        )}
        {!examNotStarted && !examClosed && (
          <button className="start-exam-btn" onClick={handleStartExam}>
            Start Exam
          </button>
        )}
      </div>
    </div>
  );
};

export default ExamDetails;
