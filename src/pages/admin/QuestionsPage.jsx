import "./QuestionsPage.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    FaPlus,
    FaEdit,
    FaTrash
} from "react-icons/fa";

export default function QuestionsPage() {

    const navigate = useNavigate();

    const [questions, setQuestions] = useState([]);
    const [exams, setExams] = useState([]);

    useEffect(() => {

        const savedQuestions =
            JSON.parse(localStorage.getItem("questions")) || [];

        const savedExams =
            JSON.parse(localStorage.getItem("exams")) || [];

        setQuestions(savedQuestions);
        setExams(savedExams);

    }, []);

    const deleteQuestion = (id) => {

        const updatedQuestions =
            questions.filter(
                q => q.id !== id
            );

        setQuestions(updatedQuestions);

        localStorage.setItem(
            "questions",
            JSON.stringify(updatedQuestions)
        );
    };

    const getExamTitle = (examId) => {

        const exam =
            exams.find(
                e => e.id === examId
            );

        return exam
            ? exam.title
            : "Aucun examen";
    };

    return (
        <div className="questions-page">

            <div className="page-header">

                <h1>Gestion des questions</h1>

                <button
                    className="add-btn"
                    onClick={() =>
                        navigate("/admin/questions/create")
                    }
                >
                    <FaPlus />
                    Ajouter question
                </button>

            </div>

            {questions.map((question, index) => (

                <div
                    className="question-card"
                    key={question.id}
                >

                    <h3>
                        Question {index + 1}
                    </h3>

                    <p>
                        {question.text}
                    </p>

                    <p className="exam-name">
                        Examen : {getExamTitle(question.examId)}
                    </p>

                    <div className="actions">

                        <button
                            className="edit-btn"
                            onClick={() =>
                                navigate(
                                    `/admin/questions/edit/${question.id}`
                                )
                            }
                        >
                            <FaEdit />
                        </button>

                        <button
                            className="delete-btn"
                            onClick={() =>
                                deleteQuestion(question.id)
                            }
                        >
                            <FaTrash />
                        </button>

                    </div>

                </div>

            ))}

        </div>
    );
}