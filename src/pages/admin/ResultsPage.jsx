import "./ResultsPage.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaPlus,
  FaEdit,
  FaTrash
} from "react-icons/fa";

export default function ResultsPage() {

  const navigate = useNavigate();

  const [results, setResults] = useState([]);

  useEffect(() => {

    const savedResults =
      localStorage.getItem("results");

    if(savedResults){

      setResults(
        JSON.parse(savedResults)
      );

    }else{

      const defaultResults = [
        {
          id:1,
          student:"Amin",
          exam:"Java",
          score:16
        },
        {
          id:2,
          student:"Fanilo",
          exam:"React",
          score:18
        }
      ];

      localStorage.setItem(
        "results",
        JSON.stringify(defaultResults)
      );

      setResults(defaultResults);
    }

  }, []);

  const deleteResult = (id) => {

    const updatedResults =
      results.filter(
        result => result.id !== id
      );

    setResults(updatedResults);

    localStorage.setItem(
      "results",
      JSON.stringify(updatedResults)
    );
  };

  return (
    <div className="results-page">

      <div className="page-header">

        <h1>Résultats</h1>

        <button
          className="add-btn"
          onClick={() =>
            navigate("/admin/results/create")
          }
        >
          <FaPlus />
          Ajouter résultat
        </button>

      </div>

      <table>

        <thead>
          <tr>
            <th>Étudiant</th>
            <th>Examen</th>
            <th>Note</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {results.map((result) => (

            <tr key={result.id}>

              <td>{result.student}</td>

              <td>{result.exam}</td>

              <td>{result.score}/20</td>

              <td className="actions">

                <button
                  className="edit-btn"
                  onClick={() =>
                    navigate(
                      `/admin/results/edit/${result.id}`
                    )
                  }
                >
                  <FaEdit />
                </button>

                <button
                  className="delete-btn"
                  onClick={() =>
                    deleteResult(result.id)
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