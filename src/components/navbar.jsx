import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar">

      <h2>Exam Hub</h2>

      <div className="navbar-links">
        <Link to="/student">
          Examens
        </Link>

        <Link to="/student/results">
          Mes résultats
        </Link>
      </div>

      <button
        className="logout-btn"
        onClick={handleLogout}
      >
        Déconnexion
      </button>

    </nav>
  );
}