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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:3000/api/exams",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json"
          },
          body: JSON.stringify(exam)
        }
      );

      if (!response.ok) {
        throw new Error(
          "Erreur lors de la création"
        );
      }

      navigate("/admin/exams");

    } catch (error) {
      console.error(error);
      alert("Impossible de créer l'examen");
    }
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