import "./ExamsPage.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaClipboardList,
  FaEdit,
  FaTrash,
  FaPlus
} from "react-icons/fa";

export default function ExamsPage() {

  const navigate = useNavigate();

  const [exams, setExams] = useState([]);

  useEffect(() => {

    const savedExams =
      localStorage.getItem("exams");

    if (savedExams) {

      setExams(
        JSON.parse(savedExams)
      );

    } else {

      const defaultExams = [
        {
          id: 1,
          title: "Java",
          duration: 60
        },
        {
          id: 2,
          title: "React",
          duration: 45
        },
        {
          id: 3,
          title: "Spring Boot",
          duration: 90
        }
      ];

      localStorage.setItem(
        "exams",
        JSON.stringify(defaultExams)
      );

      setExams(defaultExams);
    }

  }, []);

  const deleteExam = (id) => {

    const updatedExams =
      exams.filter(
        exam => exam.id !== id
      );

    setExams(updatedExams);

    localStorage.setItem(
      "exams",
      JSON.stringify(updatedExams)
    );
  };

  return (
    <div className="exams-page">

      <div className="page-header">

        <h1>Gestion des examens</h1>

        <button
          className="add-btn"
          onClick={() =>
            navigate("/admin/exams/create")
          }
        >
          <FaPlus />
          Ajouter examen
        </button>

      </div>

      <table>

        <thead>
          <tr>
            <th>ID</th>
            <th>Examen</th>
            <th>Durée</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {exams.map((exam) => (

            <tr key={exam.id}>

              <td>{exam.id}</td>

              <td>
                <FaClipboardList />
                {" "}
                {exam.title}
              </td>

              <td>
                {exam.duration} min
              </td>

              <td className="actions">

                <button
                  className="edit-btn"
                  onClick={() =>
                    navigate(
                      `/admin/exams/edit/${exam.id}`
                    )
                  }
                >
                  <FaEdit />
                </button>

                <button
                  className="delete-btn"
                  onClick={() =>
                    deleteExam(exam.id)
                  }
                >
                  <FaTrash />
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}