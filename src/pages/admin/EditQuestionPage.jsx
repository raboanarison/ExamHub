import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./CreateQuestionPage.css";

export default function EditQuestionPage() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [question, setQuestion] = useState("");
  const [examId, setExamId] = useState("");
  const [exams, setExams] = useState([]);

  useEffect(() => {

    const savedExams =
      JSON.parse(localStorage.getItem("exams")) || [];

    setExams(savedExams);

    const questions =
      JSON.parse(localStorage.getItem("questions")) || [];

    const foundQuestion =
      questions.find(
        q => q.id === Number(id)
      );

    if (foundQuestion) {
      setQuestion(foundQuestion.text);
      setExamId(foundQuestion.examId || "");
    }

  }, [id]);

  const handleSubmit = (e) => {

    e.preventDefault();

    const questions =
      JSON.parse(localStorage.getItem("questions")) || [];

    const updatedQuestions =
      questions.map(q =>
        q.id === Number(id)
          ? {
              ...q,
              text: question,
              examId: Number(examId)
            }
          : q
      );

    localStorage.setItem(
      "questions",
      JSON.stringify(updatedQuestions)
    );

    navigate("/admin/questions");
  };

  return (
    <div className="create-question-page">

      <h1>Modifier question</h1>

      <form onSubmit={handleSubmit}>

        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />

        <select
          value={examId}
          onChange={(e) => setExamId(e.target.value)}
          required
        >
          <option value="">
            Choisir un examen
          </option>

          {exams.map((exam) => (
            <option
              key={exam.id}
              value={exam.id}
            >
              {exam.title}
            </option>
          ))}
        </select>

        <button type="submit">
          Modifier
        </button>

      </form>

    </div>
  );
}