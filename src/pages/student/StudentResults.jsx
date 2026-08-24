import Navbar from "../../components/Navbar";
import "./StudentResults.css";

export default function StudentResults() {
  const results =
    JSON.parse(localStorage.getItem("results")) || [];

  return (
    <div>
      <Navbar />

      <div className="results-container">
        <h1>Mes résultats</h1>

        <table>
          <thead>
            <tr>
              <th>Examen</th>
              <th>Note</th>
            </tr>
          </thead>

          <tbody>
            {results.length > 0 ? (
              results.map((result, index) => (
                <tr key={index}>
                  <td>{result.exam}</td>
                  <td>{result.score}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">
                  Aucun résultat disponible
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}