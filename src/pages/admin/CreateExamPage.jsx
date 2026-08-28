import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateExamPage.css";

export default function CreateExamPage() {
  const navigate = useNavigate();

  const [exam, setExam] = useState({
    title: "",
    duration: ""
  });

  const handleChange = (e) => {
    setExam({
      ...exam,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const exams =
      JSON.parse(localStorage.getItem("exams")) || [];

    const newExam = {
      id: Date.now(),
      ...exam
    };

    const updatedExams = [...exams, newExam];

    localStorage.setItem(
      "exams",
      JSON.stringify(updatedExams)
    );

    navigate("/admin/exams");
  };

  return (
    <div className="create-exam-page">

      <h1>Ajouter un examen</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="title"
          placeholder="Nom examen"
          value={exam.title}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="duration"
          placeholder="Durée (minutes)"
          value={exam.duration}
          onChange={handleChange}
          required
        />

        <button type="submit">
          Enregistrer
        </button>

      </form>

    </div>
  );
}