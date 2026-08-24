import { useState } from "react";
import { questions } from "../../data/questions";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

export default function StudentExam() {

  const [answers, setAnswers] = useState({});

  const navigate = useNavigate();

  const handleChoice = (questionId, choiceId) => {
    setAnswers({
      ...answers,
      [questionId]: choiceId
    });
  };

  const handleSubmit = () => {

    const confirmSubmit = window.confirm(
      "Voulez-vous vraiment soumettre cet examen ?"
    );

    if (!confirmSubmit) return;

    console.log(answers);

    navigate("/student/exams/1/result");
  };

  return (
    <div>
        <Navbar /> 
      <h1>Passage examen</h1>

      {questions.map((question) => (
        <div key={question.id}>

          <h3>{question.statement}</h3>

          {question.choices.map((choice) => (

            <div key={choice.id}>
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

                {choice.label}

              </label>
            </div>

          ))}

        </div>
      ))}

      <br />

      <button onClick={handleSubmit}>
        Soumettre
      </button>

    </div>
  );
}