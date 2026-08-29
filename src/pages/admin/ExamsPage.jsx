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

  const loadExams = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/exams"
      );

      const data = await response.json();

      setExams(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadExams();
  }, []);

  const deleteExam = async (id) => {
    try {
      await fetch(
        `http://localhost:3000/api/exams/${id}`,
        {
          method: "DELETE"
        }
      );

      loadExams();
    } catch (error) {
      console.error(error);
    }
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