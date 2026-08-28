import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./CreateResultPage.css";

export default function EditResultPage() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [result, setResult] = useState({
    student: "",
    exam: "",
    score: ""
  });

  useEffect(() => {

    const results =
      JSON.parse(localStorage.getItem("results")) || [];

    const foundResult =
      results.find(
        r => r.id === Number(id)
      );

    if(foundResult){
      setResult(foundResult);
    }

  }, [id]);

  const handleChange = (e) => {
    setResult({
      ...result,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    const results =
      JSON.parse(localStorage.getItem("results")) || [];

    const updatedResults =
      results.map(r =>
        r.id === Number(id)
          ? result
          : r
      );

    localStorage.setItem(
      "results",
      JSON.stringify(updatedResults)
    );

    navigate("/admin/results");
  };

  return (
    <div className="create-result-page">

      <h1>Modifier résultat</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="student"
          value={result.student}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="exam"
          value={result.exam}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="score"
          value={result.score}
          onChange={handleChange}
          required
        />

        <button type="submit">
          Modifier
        </button>

      </form>

    </div>
  );
}