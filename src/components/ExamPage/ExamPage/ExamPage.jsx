import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import QuestionSection from "../QuestionSection/QuestionSection";
import SubmitConfirmationModal from "../SubmitConfirmation/SubmitConfirmationModal";
import QuestionNavigation from "../QuestionNavigation/QuestionNavigation";
import questions from "../../../data/questions";
import "./ExamPage.css";

const ExamPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const videoRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState(3600);
  const [cameraError, setCameraError] = useState("");
  const [cameraAccessGranted, setCameraAccessGranted] = useState(false);

  useEffect(() => {
    localStorage.setItem("questions", JSON.stringify(questions));
  }, []);

  const courseName = location.state?.courseName || "";

  const extractSubjectCode = (name) => {
    const match = name.match(/BO CDA (\d+)/i);
    return match ? match[1] : "";
  };

  const subjectCode = extractSubjectCode(courseName);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setCameraAccessGranted(true);
      } catch (err) {
        setCameraError(
          "Camera access is required for this exam. Please return to the exam details page and allow camera access."
        );
        setCameraAccessGranted(false);
      }
    };

    startCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (!cameraAccessGranted) return;
    if (timeLeft === 0) {
      handleSubmit();
      return;
    }
    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, cameraAccessGranted]);

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      setShowModal(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    }
  };

  const handleQuestionClick = (index) => {
    setCurrentIndex(index);
  };

  const handleSubmit = () => {
    const submittedAnswersArray = Object.entries(selectedAnswers)
      .filter(
        ([, selectedOption]) =>
          selectedOption !== undefined && selectedOption !== null
      )
      .map(([index, selectedOption]) => ({
        questionId: questions[index].id,
        selectedAnswer: selectedOption,
      }));

    localStorage.setItem(
      "submittedAnswers",
      JSON.stringify(submittedAnswersArray)
    );
    const timeTaken = 3600 - timeLeft;
    localStorage.setItem("timeTaken", timeTaken.toString());
    navigate("/review");
  };

  const handleConfirmSubmit = () => {
    setShowModal(false);
    handleSubmit();
  };

  const handleCancelSubmit = () => {
    setShowModal(false);
  };

  const getAnsweredCount = () => {
    return Object.keys(selectedAnswers).length;
  };

  return (
    <>
      <Header timeLeft={timeLeft} subjectCode={subjectCode} />
      <div className="exam-page">
        {cameraError ? (
          <div className="camera-error">
            <p>{cameraError}</p>
            <button onClick={() => navigate("/exam-details")}>
              Return to Exam Details
            </button>
          </div>
        ) : (
          <>
            <QuestionNavigation
              questions={questions}
              currentIndex={currentIndex}
              setIndex={handleQuestionClick}
              selected={selectedAnswers}
              onFinalSubmitClick={() => setShowModal(true)}
            />
            <div className="exam-container">
              <div className="question-section-wrapper">
                <QuestionSection
                  question={questions[currentIndex]}
                  index={currentIndex}
                  total={questions.length}
                  selectedAnswers={selectedAnswers}
                  setSelectedAnswers={setSelectedAnswers}
                  onNext={handleNext}
                  onPrev={handlePrev}
                />
              </div>
              <div className="sidebar-wrapper">
                <Sidebar
                  questions={questions}
                  currentQuestion={currentIndex}
                  onQuestionClick={handleQuestionClick}
                  selectedAnswers={selectedAnswers}
                />
              </div>
            </div>
            {showModal && (
              <SubmitConfirmationModal
                open={showModal}
                onConfirm={handleConfirmSubmit}
                onCancel={handleCancelSubmit}
                answeredCount={getAnsweredCount()}
                totalQuestions={questions.length}
              />
            )}
          </>
        )}
      </div>
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-column">
            <h3>About IIT Patna</h3>
            <p>
              Established in 2008, IIT Patna is committed to academic
              excellence, innovation, and fostering future leaders in science
              and technology.
            </p>
          </div>

          <div className="footer-column">
            <h3>Contact Us</h3>
            <ul className="contact-list">
              <li>
                Email:{" "}
                <a href="mailto:exam-support@iitp.ac.in">
                  exam-support@iitp.ac.in
                </a>
              </li>
              <li>
                Phone: <a href="tel:+916123028067">+91 612 302 8067</a>
              </li>
              <li>Location: Bihta, Patna, Bihar – 801106</li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Support</h3>
            <ul>
              <li>
                <a href="/contact">Contact Us</a>
              </li>
              <li>
                <a href="/technical-support">Technical Support</a>
              </li>
              <li>
                <a href="/privacy-policy">Privacy Policy</a>
              </li>
              <li>
                <a href="/terms-of-use">Terms of Use</a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Connect with Us</h3>
            <ul className="social-media">
              <li>
                <a
                  href="https://www.facebook.com/iitpatnacepqip/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  <i className="fab fa-facebook-f"></i>
                  <span className="tooltip">Facebook</span>
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/iitpat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  <i className="fab fa-twitter"></i>
                  <span className="tooltip">Twitter</span>
                </a>
              </li>
              <li>
                <a
                  href="https://in.linkedin.com/school/indian-institute-of-technology-patna/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  <i className="fab fa-linkedin-in"></i>
                  <span className="tooltip">LinkedIn</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/iit_patna_official"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  <i className="fab fa-instagram"></i>
                  <span className="tooltip">Instagram</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} IIT Patna. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default ExamPage;
