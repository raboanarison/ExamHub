import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateExamPage.css";

export default function CreateExamPage() {
  const navigate = useNavigate();

  const [exam, setExam] = useState({
    title: "",
    description: "",
    course_id: "",
    starts_at: "",
    ends_at: ""
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
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            title: exam.title,
            description: exam.description,
            course_id: Number(exam.course_id),
            starts_at: exam.starts_at,
            ends_at: exam.ends_at
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      alert("Examen créé avec succès");
      navigate("/admin/exams");

    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div className="create-exam-page">

      <h1>Ajouter un examen</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="title"
          placeholder="Titre de l'examen"
          value={exam.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={exam.description}
          onChange={handleChange}
        />

        <input
          type="number"
          name="course_id"
          placeholder="ID du cours"
          value={exam.course_id}
          onChange={handleChange}
          required
        />

        <input
          type="datetime-local"
          name="starts_at"
          value={exam.starts_at}
          onChange={handleChange}
          required
        />

        <input
          type="datetime-local"
          name="ends_at"
          value={exam.ends_at}
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