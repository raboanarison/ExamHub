import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./CreateExamPage.css";

export default function EditExamPage() {
    const { id } = useParams();

    const navigate = useNavigate();

    const [exam, setExam] = useState({
        title: "",
        duration: ""
    });

    useEffect(() => {
        const exams =
            JSON.parse(localStorage.getItem("exams")) || [];

        const foundExam = exams.find(
            (e) => e.id === Number(id)
        );

        if (foundExam) {
            setExam(foundExam);
        }
    }, [id]);

    const handleChange = (e) => {
        setExam({
            ...exam,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const exams =
            JSON.parse(localStorage.getItem("exams")) || [];

        const updatedExams = exams.map((e) =>
            e.id === Number(id)
                ? exam
                : e
        );

        localStorage.setItem(
            "exams",
            JSON.stringify(updatedExams)
        );

        navigate("/admin/exams");
    };

    return (
        <div className="create-exam-page">

            <h1>Modifier examen</h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="title"
                    value={exam.title}
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    name="duration"
                    value={exam.duration}
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