import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import "./StudentDashboard.css";

export default function StudentDashboard() {

  const [exams, setExams] = useState([]);

  useEffect(() => {

    const savedExams =
      JSON.parse(localStorage.getItem("exams")) || [];

    setExams(savedExams);

  }, []);

  return (
    <div className="dashboard">

      <Navbar />

      <h1 className="dashboard-title">
        Examens disponibles
      </h1>

      {exams.length === 0 ? (

        <p>Aucun examen disponible.</p>

      ) : (

        exams.map((exam) => (

          <div
            key={exam.id}
            className="exam-card"
          >

            <h3>{exam.title}</h3>

            <p>
              Durée : {exam.duration} min
            </p>

            <Link
              className="exam-btn"
              to={`/student/exams/${exam.id}`}
            >
              Passer l'examen
            </Link>

            <hr />

          </div>

        ))

      )}

    </div>
  );
}