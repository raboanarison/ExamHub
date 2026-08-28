import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./CreateStudentPage.css";

export default function EditStudentPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [student, setStudent] = useState({
    nom: "",
    email: "",
    filiere: ""
  });

  useEffect(() => {
    const students =
      JSON.parse(localStorage.getItem("students")) || [];

    const currentStudent = students.find(
      (s) => s.id === Number(id)
    );

    if (currentStudent) {
      setStudent(currentStudent);
    }
  }, [id]);

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const students =
      JSON.parse(localStorage.getItem("students")) || [];

    const updatedStudents = students.map((s) =>
      s.id === Number(id)
        ? student
        : s
    );

    localStorage.setItem(
      "students",
      JSON.stringify(updatedStudents)
    );

    alert("Étudiant modifié avec succès");

    navigate("/admin/students");
  };

  return (
    <div className="create-student-page">

      <h1>Modifier un étudiant</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="nom"
          value={student.nom}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          value={student.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="filiere"
          value={student.filiere}
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