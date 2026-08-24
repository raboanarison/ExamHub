import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";

import StudentDashboard from "./pages/student/StudentDashboard";
import StudentExam from "./pages/student/StudentExam";
import StudentResult from "./pages/student/StudentResult";
import StudentResults from "./pages/student/StudentResults";
import ProtectedRoute from "./routes/ProtectedRoute";
import NotFound from "./pages/NotFound";
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

<Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;