import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import "./StudentExam.css";

export default function StudentExam() {

  const [answers, setAnswers] = useState({});
  const [questions, setQuestions] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {

    const allQuestions =
      JSON.parse(localStorage.getItem("questions")) || [];

    const exams =
      JSON.parse(localStorage.getItem("exams")) || [];

    const currentExam =
      exams.find(
        exam => exam.id === Number(id)
      );

    if (!currentExam) return;

    const filteredQuestions =
      allQuestions.filter(
        question => question.exam === currentExam.title
      );

    setQuestions(filteredQuestions);

  }, [id]);

  const handleChoice = (questionId, value) => {

    setAnswers({
      ...answers,
      [questionId]: value
    });

  };

  const handleSubmit = () => {

    if (Object.keys(answers).length === 0) {
      alert("Veuillez répondre à au moins une question");
      return;
    }

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

      <h2>
        Nombre de questions : {questions.length}
      </h2>

      {questions.map((question) => (

        <div
          key={question.id}
          className="question-card"
        >

          <h3>{question.text}</h3>

          <div className="choice">
            <label>
              <input
                type="radio"
                name={`question-${question.id}`}
                value="oui"
                onChange={() =>
                  handleChoice(
                    question.id,
                    "oui"
                  )
                }
              />
              Oui
            </label>
          </div>

          <div className="choice">
            <label>
              <input
                type="radio"
                name={`question-${question.id}`}
                value="non"
                onChange={() =>
                  handleChoice(
                    question.id,
                    "non"
                  )
                }
              />
              Non
            </label>
          </div>

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