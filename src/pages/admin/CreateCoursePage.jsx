import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateStudentPage.css";

export default function CreateCoursePage() {
  const navigate = useNavigate();

  const [course, setCourse] = useState({
    title: "",
    teacher: ""
  });

  const handleChange = (e) => {
    setCourse({
      ...course,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const courses =
      JSON.parse(localStorage.getItem("courses")) || [];

    const newCourse = {
      id: Date.now(),
      title: course.title,
      teacher: course.teacher
    };

    courses.push(newCourse);

    localStorage.setItem(
      "courses",
      JSON.stringify(courses)
    );

    alert("Cours ajouté avec succès");

    navigate("/admin/courses");
  };

  return (
    <div className="create-student-page">

      <h1>Ajouter un cours</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="title"
          placeholder="Nom du cours"
          value={course.title}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="teacher"
          placeholder="Nom du professeur"
          value={course.teacher}
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