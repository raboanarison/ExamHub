import { Link } from "react-router-dom";
import { exams } from "../../data/exams";
import Navbar from "../../components/Navbar";
import "./StudentDashboard.css";
export default function StudentDashboard() {
  return (
    <div  className="dashboard">

      <Navbar />

      <h1  className="dashboard-title">
        Examens disponibles 
        </h1>

      {exams.map((exam) => (
        <div key={exam.id}
             className="exam-card" >
          <h3>{exam.title}</h3>

          <p>{exam.description}</p>

          <p>Durée : {exam.duration} min</p>

          <Link  className="exam-btn"
                 to={`/student/exams/${exam.id}`}>
            Passer l'examen
          </Link>
<hr />
          
        </div>
      ))}

    </div>
  );
}