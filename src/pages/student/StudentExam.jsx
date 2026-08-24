import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { questionsByExam } from "../../data/questions";
import "./StudentExam.css";
export default function StudentExam() {
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();
const { id } = useParams();
const questions = questionsByExam[id] || [];
  const handleChoice = (questionId, choiceId) => {
    setAnswers({
      ...answers,
      [questionId]: choiceId
    });
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length === 0) {
      alert("Veuillez répondre à au moins une question");
      return;
    }

    const confirmSubmit = window.confirm(
      "Voulez-vous vraiment soumettre cet examen ?"
    );

    if (!confirmSubmit) return;

    console.log(answers);

localStorage.setItem(
  `exam-${id}-answers`,
  JSON.stringify(answers)
);

navigate(`/student/exams/${id}/result`);
  };

  return (
    <div className="exam-container">
      <Navbar />

      <h1 className="exam-title">
        Passage examen
      </h1>
<h2>Examen n° {id}</h2>
      <h2>
        Nombre de questions : {questions.length}
      </h2>

      {questions.map((question) => (
  <div
    key={question.id}
    className="question-card"
  >
    <h3>{question.statement}</h3>

    {question.choices.map((choice) => (
      <div
        key={choice.id}
        className="choice"
      >
        <label>
          <input
            type="radio"
            name={`question-${question.id}`}
            value={choice.id}
            onChange={() =>
              handleChoice(
                question.id,
                choice.id
              )
            }
          />

          {" "}
          {choice.label}
        </label>
      </div>
    ))}
  </div>
))}

      <button
        className="submit-btn"
        onClick={handleSubmit}
      >
        Soumettre
      </button>
    </div>
  );
}