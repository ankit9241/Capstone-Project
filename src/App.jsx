import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import HomeRoute from "./pages/HomeRoute";
import ExamRoute from "./pages/ExamRoute";
import ExamDetailsRoute from "./pages/ExamDetailsRoute";
import ReviewRoute from "./pages/ReviewRoute";
import SubjectRoute from "./pages/SubjectRoute";
import LoginRoute from "./pages/LoginRoute";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

// const NavbarWrapper = () => {
//   const location = useLocation();
//   const isExamPage =
//     location.pathname.includes("/exam") ||
//     location.pathname.includes("/review");

//   return isExamPage ? <NavbarExam /> : <NavbarHome />;
// };

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginRoute />} />
        <Route path="/home" element={<HomeRoute />} />
        <Route path="/exam-details" element={<ExamDetailsRoute />} />
        <Route path="/exam" element={<ExamRoute />} />
        <Route path="/review" element={<ReviewRoute />} />
        <Route path="/home/:subjectName" element={<SubjectRoute />} />
        <Route path="/login" element={<LoginRoute />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
