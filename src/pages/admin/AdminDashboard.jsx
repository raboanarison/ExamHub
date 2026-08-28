import "./AdminDashboard.css";

import {
    FaUserGraduate,
    FaBook,
    FaClipboardList,
    FaChartBar,
    FaUserPlus,
    FaBookOpen,
    FaCalendarCheck,
    FaTrophy,
    FaMoon,
    FaSun
} from "react-icons/fa";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {

    const navigate = useNavigate();

    const [darkMode, setDarkMode] = useState(false);

    const [studentsCount, setStudentsCount] = useState(0);
    const [coursesCount, setCoursesCount] = useState(0);
    const [examsCount, setExamsCount] = useState(0);
    const [questionsCount, setQuestionsCount] = useState(0);

    useEffect(() => {

        const savedTheme = localStorage.getItem("theme");

        if (savedTheme === "dark") {
            setDarkMode(true);
            document.body.classList.add("dark-mode");
        }

        const students =
            JSON.parse(localStorage.getItem("students")) || [];

        const courses =
            JSON.parse(localStorage.getItem("courses")) || [];

        const exams =
            JSON.parse(localStorage.getItem("exams")) || [];

        const questions =
            JSON.parse(localStorage.getItem("questions")) || [];

        setStudentsCount(students.length);
        setCoursesCount(courses.length);
        setExamsCount(exams.length);
        setQuestionsCount(questions.length);

    }, []);

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add("dark-mode");
            localStorage.setItem("theme", "dark");
        } else {
            document.body.classList.remove("dark-mode");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    const courses =
        JSON.parse(localStorage.getItem("courses")) || [];
    return (
        <div className="admin-dashboard">

            <div className="hero-card">

                <div className="bubble b1"></div>
                <div className="bubble b2"></div>
                <div className="bubble b3"></div>
                <div className="bubble b4"></div>
                <div className="bubble b5"></div>
                <div className="bubble b6"></div>
                <div className="bubble b7"></div>
                <div className="bubble b8"></div>

                <h1 className="typing-title">
                    <span>B</span>
                    <span>i</span>
                    <span>e</span>
                    <span>n</span>
                    <span>v</span>
                    <span>e</span>
                    <span>n</span>
                    <span>u</span>
                    <span>e</span>
                    <span>&nbsp;</span>
                    <span>A</span>
                    <span>d</span>
                    <span>m</span>
                    <span>i</span>
                    <span>n</span>
                    <span>i</span>
                    <span>s</span>
                    <span>t</span>
                    <span>r</span>
                    <span>a</span>
                    <span>t</span>
                    <span>e</span>
                    <span>u</span>
                    <span>r</span>
                </h1>

                <p>
                    Gérez les étudiants, cours et examens depuis une seule plateforme.
                </p>

                <button
                    className="theme-btn"
                    onClick={() => setDarkMode(!darkMode)}
                >
                    {darkMode ? <FaSun /> : <FaMoon />}
                    {darkMode ? " Mode Clair" : " Mode Sombre"}
                </button>

            </div>

            <div className="stats-grid">

                <div className="stat-card">
                    <FaUserGraduate className="stat-icon" />
                    <h2>{studentsCount}</h2>
                    <p>Étudiants</p>
                </div>

                <div className="stat-card">
                    <FaBook className="stat-icon" />
                    <h2>{coursesCount}</h2>
                    <p>Cours</p>
                </div>

                <div className="stat-card">
                    <FaClipboardList className="stat-icon" />
                    <h2>{examsCount}</h2>
                    <p>Examens</p>
                </div>

                <div className="stat-card">
                    <FaChartBar className="stat-icon" />
                    <h2>{questionsCount}</h2>
                    <p>Questions</p>
                </div>

            </div>

            <div className="dashboard-grid">

                <div className="activity-card">

                    <h2>Activités récentes</h2>

                    <ul>

                        <li>
                            <FaUserPlus className="activity-icon" />
                            Gestion des étudiants
                        </li>

                        <li>
                            <FaBookOpen className="activity-icon" />
                            Gestion des cours
                        </li>

                        <li>
                            <FaCalendarCheck className="activity-icon" />
                            Gestion des examens
                        </li>

                        <li>
                            <FaTrophy className="activity-icon" />
                            Gestion des questions
                        </li>

                    </ul>

                </div>

                <div className="quick-card">

                    <h2>Actions rapides</h2>

                    <button onClick={() => navigate("/admin/students/create")}>
                        Ajouter étudiant
                    </button>

                    <button onClick={() => navigate("/admin/courses/create")}>
                        Créer cours
                    </button>

                    <button onClick={() => navigate("/admin/exams/create")}>
                        Créer examen
                    </button>

                </div>

            </div>

            <div className="courses-card">

                <h2>Cours récents</h2>

                <table>

                    <thead>
                        <tr>
                            <th>Cours</th>
                            <th>Statut</th>
                            <th>Participants</th>
                        </tr>
                    </thead>

                    <tbody>

                        {courses.map((course) => (

                            <tr key={course.id}>

                                <td>{course.title}</td>

                                <td>
                                    <span className="status active">
                                        En cours
                                    </span>
                                </td>

                                <td>0</td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
}