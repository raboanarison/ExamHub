import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import AdminDashboard
from "./pages/admin/AdminDashboard";

import StudentDashboard from "./pages/student/StudentDashboard";
import StudentExam from "./pages/student/StudentExam";
import StudentResult from "./pages/student/StudentResult";
import StudentResults from "./pages/student/StudentResults";
import ProtectedRoute from "./routes/ProtectedRoute";
import NotFound from "./pages/NotFound";
import StudentsPage from "./pages/admin/StudentsPage";
import CoursesPage from "./pages/admin/CoursesPage";
import ExamsPage from "./pages/admin/ExamsPage";
import QuestionsPage from "./pages/admin/QuestionsPage";
import ResultsPage from "./pages/admin/ResultsPage";
import AdminLayout from "./components/AdminLayout";
function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/login"
          element={<Login />}
        />

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

<Route path="/admin" element={<AdminLayout />}>

  <Route
    index
    element={<AdminDashboard />}
  />

  <Route
    path="students"
    element={<StudentsPage />}
  />

  <Route
    path="courses"
    element={<CoursesPage />}
  />

  <Route
    path="exams"
    element={<ExamsPage />}
  />

  <Route
    path="questions"
    element={<QuestionsPage />}
  />

  <Route
    path="results"
    element={<ResultsPage />}
  />

</Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;