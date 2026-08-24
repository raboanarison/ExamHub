import { Link } from "react-router-dom";
import { exams } from "../../data/exams";
import Navbar from "../../components/Navbar";

export default function StudentDashboard() {
  return (
    <div>

      <Navbar />

      <h1>Examens disponibles</h1>

      {exams.map((exam) => (
        <div key={exam.id}>
          <h3>{exam.title}</h3>

          <p>{exam.description}</p>

          <p>Durée : {exam.duration} min</p>

          <Link to={`/student/exams/${exam.id}`}>
            Passer l'examen
          </Link>

          <hr />
        </div>
      ))}

    </div>
  );
}