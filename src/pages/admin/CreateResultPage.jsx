import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateResultPage.css";

export default function CreateResultPage() {

  const navigate = useNavigate();

  const [student, setStudent] = useState("");
  const [exam, setExam] = useState("");
  const [score, setScore] = useState("");

  const handleSubmit = (e) => {

    e.preventDefault();

    const results =
      JSON.parse(localStorage.getItem("results")) || [];

    const newResult = {
      id: Date.now(),
      student,
      exam,
      score
    };

    localStorage.setItem(
      "results",
      JSON.stringify([...results, newResult])
    );

    navigate("/admin/results");
  };

  return (
    <div className="create-result-page">

      <h1>Ajouter un résultat</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Nom étudiant"
          value={student}
          onChange={(e) => setStudent(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Nom examen"
          value={exam}
          onChange={(e) => setExam(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Note"
          value={score}
          onChange={(e) => setScore(e.target.value)}
          required
        />

        <button type="submit">
          Enregistrer
        </button>

      </form>

    </div>
  );
}