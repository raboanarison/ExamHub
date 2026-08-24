import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { questionsByExam } from "../../data/questions";

export default function StudentResult() {
  const { id } = useParams();

  const questions = questionsByExam[id] || [];

  const answers = JSON.parse(
    localStorage.getItem(`exam-${id}-answers`)
  ) || {};

  let score = 0;

  const corrections = questions.map((question) => {
    const selectedChoiceId = answers[question.id];

    const selectedChoice = question.choices.find(
      (choice) => choice.id === Number(selectedChoiceId)
    );

    const correctChoice = question.choices.find(
      (choice) => choice.id === question.correctAnswer
    );

    const isCorrect =
      Number(selectedChoiceId) === question.correctAnswer;

    if (isCorrect) {
      score++;
    }

    return {
      question: question.statement,
      myAnswer: selectedChoice
        ? selectedChoice.label
        : "Aucune réponse",
      correctAnswer: correctChoice.label,
      correct: isCorrect
    };
  });

  const examNames = {
    1: "Java",
    2: "React",
    3: "Spring Boot"
  };

  const currentResult = {
    exam: examNames[id],
    score: `${score}/${questions.length}`
  };

  const previousResults =
    JSON.parse(localStorage.getItem("results")) || [];

  const existingIndex = previousResults.findIndex(
    (result) => result.exam === currentResult.exam
  );

  if (existingIndex >= 0) {
    previousResults[existingIndex] = currentResult;
  } else {
    previousResults.push(currentResult);
  }

  localStorage.setItem(
    "results",
    JSON.stringify(previousResults)
  );

  return (
    <div>
      <Navbar />

      <div style={{ padding: "30px" }}>
        <h1>Résultat de l'examen</h1>

        <h2>
          Note : {score}/{questions.length}
        </h2>

        {corrections.map((item, index) => (
          <div
            key={index}
            style={{
              background: "white",
              padding: "20px",
              marginTop: "20px",
              borderRadius: "10px"
            }}
          >
            <h3>{item.question}</h3>

            <p>
              Votre réponse : {item.myAnswer}
            </p>

            <p>
              Bonne réponse : {item.correctAnswer}
            </p>

            <p>
              {item.correct
                ? "✔ Correct"
                : "✘ Incorrect"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}