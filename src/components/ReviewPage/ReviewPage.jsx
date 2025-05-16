import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ReviewPage.css";

const ReviewPage = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [submittedAnswers, setSubmittedAnswers] = useState([]);
  const [timeTaken, setTimeTaken] = useState("");

  useEffect(() => {
    const storedQuestions = JSON.parse(localStorage.getItem("questions")) || [];
    const storedAnswers =
      JSON.parse(localStorage.getItem("submittedAnswers")) || [];
    const storedTime = localStorage.getItem("timeTaken") || "0";

    setQuestions(storedQuestions);
    setSubmittedAnswers(storedAnswers);

    const seconds = parseInt(storedTime, 10);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    setTimeTaken(`${minutes} min ${remainingSeconds} sec`);
  }, []);

  const getSelectedAnswer = (questionId) => {
    const answerObj = submittedAnswers.find(
      (ans) => ans.questionId === questionId
    );
    return answerObj?.selectedAnswer || null;
  };

  const attemptedCount = submittedAnswers.filter(
    (ans) => ans.selectedAnswer !== null && ans.selectedAnswer !== undefined
  ).length;

  return (
    <div className="review-page">
      <div className="review-content">
        <h1>Exam Review</h1>
        <div className="review-header">
          <div className="exam-status">
            <span className="status-icon">📋</span>
            Review of your submitted answers
          </div>
          <div className="time-taken">
            ⏱️ Time Taken: {timeTaken || "Not recorded"}
          </div>
          <div className="total-questions">
            ✅ Attempted: {attemptedCount} / {questions.length}
          </div>
        </div>

        <div className="answer-section-container">
          <div className="answers-grid">
            {questions.map((question, index) => {
              const selectedOptionKey = getSelectedAnswer(question.id);
              const selectedOptionText = selectedOptionKey
                ? question.options[selectedOptionKey]
                : null;

              const isAnswered = selectedOptionText !== null;

              return (
                <div
                  key={index}
                  className={`answer-card ${
                    isAnswered ? "answered" : "not-answered"
                  }`}
                >
                  <div className="question-number">Q {index + 1}</div>
                  <div className="question-text">{question.question}</div>
                  <div className="answer-section">
                    <div className="answer-label">Your Answer:</div>
                    {isAnswered ? (
                      <div className="selected-answer">
                        {selectedOptionText}
                      </div>
                    ) : (
                      <div className="not-answered-text">Not Answered</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <button className="back-button" onClick={() => navigate("/")}>
            ⬅ Back to Course
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;
