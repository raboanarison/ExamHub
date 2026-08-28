import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./CreateStudentPage.css";

export default function EditCoursePage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [course, setCourse] = useState({
    title: "",
    teacher: ""
  });

  useEffect(() => {
    const courses =
      JSON.parse(localStorage.getItem("courses")) || [];

    const currentCourse = courses.find(
      (c) => c.id === Number(id)
    );

    if (currentCourse) {
      setCourse(currentCourse);
    }
  }, [id]);

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

    const updatedCourses = courses.map((c) =>
      c.id === Number(id)
        ? course
        : c
    );

    localStorage.setItem(
      "courses",
      JSON.stringify(updatedCourses)
    );

    alert("Cours modifié avec succès");

    navigate("/admin/courses");
  };

  return (
    <div className="create-student-page">

      <h1>Modifier un cours</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="title"
          value={course.title}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="teacher"
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