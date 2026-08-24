import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav>
      <Link to="/student">Examens</Link>

      {" | "}

      <Link to="/student/results">
        Mes résultats
      </Link>

      {" | "}

      <button onClick={logout}>
        Déconnexion
      </button>
    </nav>
  );
}