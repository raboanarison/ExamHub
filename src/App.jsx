import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";

import AdminDashboard from "./pages/admin/AdminDashboard";
import StudentsPage from "./pages/admin/StudentsPage";
import CoursesPage from "./pages/admin/CoursesPage";
import ExamsPage from "./pages/admin/ExamsPage";
import QuestionsPage from "./pages/admin/QuestionsPage";
import ResultsPage from "./pages/admin/ResultsPage";

import CreateStudentPage from "./pages/admin/CreateStudentPage";
import EditStudentPage from "./pages/admin/EditStudentPage";

import CreateCoursePage from "./pages/admin/CreateCoursePage";
import EditCoursePage from "./pages/admin/EditCoursePage";

import CreateExamPage from "./pages/admin/CreateExamPage";
import EditExamPage from "./pages/admin/EditExamPage";

import CreateQuestionPage from "./pages/admin/CreateQuestionPage";
import EditQuestionPage from "./pages/admin/EditQuestionPage";

import CreateResultPage from "./pages/admin/CreateResultPage";
import EditResultPage from "./pages/admin/EditResultPage";

import StudentDashboard from "./pages/student/StudentDashboard";
import StudentExam from "./pages/student/StudentExam";
import StudentResult from "./pages/student/StudentResult";
import StudentResults from "./pages/student/StudentResults";

import ProtectedRoute from "./routes/ProtectedRoute";
import AdminLayout from "./components/AdminLayout";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* LOGIN */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* STUDENT */}
        <Route
          path="/student"
          element={
            <ProtectedRoute>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/exams/:id"
          element={
            <ProtectedRoute>
              <StudentExam />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/exams/:id/result"
          element={
            <ProtectedRoute>
              <StudentResult />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/results"
          element={
            <ProtectedRoute>
              <StudentResults />
            </ProtectedRoute>
          }
        />

        {/* ADMIN */}
        <Route
          path="/admin"
          element={<AdminLayout />}
        >

          <Route
            index
            element={<AdminDashboard />}
          />

          {/* STUDENTS */}
          <Route
            path="students"
            element={<StudentsPage />}
          />

          <Route
            path="students/create"
            element={<CreateStudentPage />}
          />

          <Route
            path="students/edit/:id"
            element={<EditStudentPage />}
          />

          {/* COURSES */}
          <Route
            path="courses"
            element={<CoursesPage />}
          />

          <Route
            path="courses/create"
            element={<CreateCoursePage />}
          />

          <Route
            path="courses/edit/:id"
            element={<EditCoursePage />}
          />

          {/* EXAMS */}
          <Route
            path="exams"
            element={<ExamsPage />}
          />

          <Route
            path="exams/create"
            element={<CreateExamPage />}
          />

          <Route
            path="exams/edit/:id"
            element={<EditExamPage />}
          />

          {/* QUESTIONS */}
          <Route
            path="questions"
            element={<QuestionsPage />}
          />

          <Route
            path="questions/create"
            element={<CreateQuestionPage />}
          />

          <Route
            path="questions/edit/:id"
            element={<EditQuestionPage />}
          />

          {/* RESULTS */}
          <Route
            path="results"
            element={<ResultsPage />}
          />

          <Route
            path="results/create"
            element={<CreateResultPage />}
          />

          <Route
            path="results/edit/:id"
            element={<EditResultPage />}
          />

        </Route>

        {/* 404 */}
        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;