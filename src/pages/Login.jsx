import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Veuillez remplir tous les champs");
      return;
    }

    if (
      email === "admin@examhub.com" &&
      password === "admin123"
    ) {
      localStorage.setItem("token", "admin-token");
      localStorage.setItem("role", "admin");

      navigate("/admin");
      return;
    }

    if (
      email === "student@examhub.com" &&
      password === "student123"
    ) {
      localStorage.setItem("token", "student-token");
      localStorage.setItem("role", "student");

      navigate("/student");
      return;
    }

    setError("Email ou mot de passe incorrect");
  };

  return (
    <div>
      <h1>Connexion</h1>

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />
      <br />

      <button onClick={handleLogin}>
        Se connecter
      </button>
    </div>
  );
}