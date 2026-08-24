import Navbar from "../../components/Navbar";

const results = [
  {
    exam: "Java",
    score: "16/20"
  },
  {
    exam: "React",
    score: "18/20"
  }
];

export default function StudentResults() {
  return (
    <div>
      <Navbar />

      <h1>Mes résultats</h1>

      {results.map((result, index) => (
        <div key={index}>
          <h3>{result.exam}</h3>
          <p>Note : {result.score}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}