import { Link } from "react-router-dom";
import "./AdminSidebar.css";

export default function AdminSidebar() {
    return (
        <nav className="admin-navbar">

            <div className="logo">
                ExamHub
            </div>

            <div className="nav-links">
                <Link to="/admin">Accueil</Link>
                <Link to="/admin/students">Étudiants</Link>
                <Link to="/admin/courses">Cours</Link>
                <Link to="/admin/exams">Examens</Link>
                <Link to="/admin/questions">Questions</Link>
                <Link to="/admin/results">Résultats</Link>
            </div>

            <div className="admin-info">
                <span>Administrateur</span>

                <button>
                    Déconnexion
                </button>
            </div>

        </nav>
    );
}