import React from "react";
import "./QuestionSection.css";

const QuestionSection = ({
  question,
  index,
  total,
  selectedAnswers,
  setSelectedAnswers,
  onNext,
  onPrev,
}) => {
  const handleOptionSelect = (option) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [index]: option,
    }));
  };

  const handleClearChoice = () => {
    setSelectedAnswers((prev) => {
      const updated = { ...prev };
      delete updated[index];
      return updated;
    });
  };

  return (
    <>
      <div id="question-number">Question {index + 1}</div>
      <div className="question-box">{question.question}</div>
      <div className="options">
        {Object.entries(question.options).map(([optionKey, optionText]) => (
          <label
            key={optionKey}
            className={selectedAnswers[index] === optionKey ? "selected" : ""}
          >
            <input
              type="radio"
              name={`question-${index}`}
              value={optionKey}
              checked={
                selectedAnswers[index]
                  ? selectedAnswers[index] === optionKey
                  : false
              }
              onChange={() => handleOptionSelect(optionKey)}
            />
            <span>{optionText}</span>
          </label>
        ))}
      </div>
      <div className="clear-choice-container">
        {selectedAnswers[index] && (
          <button className="clear-my-choice" onClick={handleClearChoice}>
            Clear My Choice
          </button>
        )}
      </div>
      <div className="nav-buttons">
        <button
          className="btn btn-prev"
          onClick={onPrev}
          disabled={index === 0}
        >
          Previous
        </button>
        <button className="btn btn-next" onClick={onNext}>
          {index === total - 1 ? "Submit" : "Next"}
        </button>
      </div>
    </>
  );
};

export default QuestionSection;
