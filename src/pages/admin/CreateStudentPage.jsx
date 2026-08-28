import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateStudentPage.css";

export default function CreateStudentPage() {
  const navigate = useNavigate();

  const [student, setStudent] = useState({
    nom: "",
    email: "",
    filiere: ""
  });

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

    const newStudent = {
      id: Date.now(),
      nom: student.nom,
      email: student.email,
      filiere: student.filiere
    };

    students.push(newStudent);

    localStorage.setItem(
      "students",
      JSON.stringify(students)
    );

    alert("Étudiant ajouté avec succès");

    navigate("/admin/students");
  };

  return (
    <div className="create-student-page">

      <h1>Ajouter un étudiant</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="nom"
          placeholder="Nom complet"
          value={student.nom}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={student.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="filiere"
          placeholder="Filière"
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