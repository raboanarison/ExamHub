import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateQuestionPage.css";

export default function CreateQuestionPage() {

    const navigate = useNavigate();

    const [question, setQuestion] = useState("");
    const [examId, setExamId] = useState("");
    const [exams, setExams] = useState([]);

    useEffect(() => {

        const savedExams =
            JSON.parse(localStorage.getItem("exams")) || [];

        setExams(savedExams);

    }, []);

    const handleSubmit = (e) => {

        e.preventDefault();

        const questions =
            JSON.parse(localStorage.getItem("questions")) || [];

        const newQuestion = {
            id: Date.now(),
            text: question,
            examId: Number(examId)
        };

        localStorage.setItem(
            "questions",
            JSON.stringify([...questions, newQuestion])
        );

        navigate("/admin/questions");
    };

    return (
        <div className="create-question-page">

            <h1>Ajouter une question</h1>

            <form onSubmit={handleSubmit}>

                <textarea
                    placeholder="Votre question"
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
                    Enregistrer
                </button>

            </form>

        </div>
    );
}