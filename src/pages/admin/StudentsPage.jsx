import "./StudentsPage.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
    FaPlus,
    FaEdit,
    FaTrash,
    FaSearch,
    FaUserGraduate
} from "react-icons/fa";

export default function StudentsPage() {
    const navigate = useNavigate();

    const [search, setSearch] = useState("");

    const [students, setStudents] = useState([]);

    useEffect(() => {
        const savedStudents = localStorage.getItem("students");

        if (savedStudents) {
            setStudents(JSON.parse(savedStudents));
        } else {
            const defaultStudents = [
                {
                    id: 1,
                    nom: "Amin Nomena",
                    email: "amin@gmail.com",
                    filiere: "Informatique"
                },
                {
                    id: 2,
                    nom: "Fanilo",
                    email: "fanilo@gmail.com",
                    filiere: "Développement Web"
                },
                {
                    id: 3,
                    nom: "Michaia",
                    email: "michaia@gmail.com",
                    filiere: "Réseaux"
                }
            ];

            localStorage.setItem(
                "students",
                JSON.stringify(defaultStudents)
            );

            setStudents(defaultStudents);
        }
    }, []);

    const deleteStudent = (id) => {
        const updatedStudents = students.filter(
            (student) => student.id !== id
        );

        setStudents(updatedStudents);

        localStorage.setItem(
            "students",
            JSON.stringify(updatedStudents)
        );
    };

    const filteredStudents = students.filter(
        (student) =>
            student.nom.toLowerCase().includes(search.toLowerCase()) ||
            student.email.toLowerCase().includes(search.toLowerCase()) ||
            student.filiere.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="students-page">

            <div className="students-header">
                <div>
                    <h1>Gestion des étudiants</h1>

                    <p>
                        Gérez les étudiants inscrits sur la plateforme.
                    </p>
                </div>

                <button
                    className="add-btn"
                    onClick={() => navigate("/admin/students/create")}
                >
                    <FaPlus />
                    Ajouter étudiant
                </button>
            </div>

            <div className="search-box">
                <FaSearch />

                <input
                    type="text"
                    placeholder="Rechercher un étudiant..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="students-table-card">
                <table>

                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Étudiant</th>
                            <th>Email</th>
                            <th>Filière</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>

                        {filteredStudents.map((student) => (
                            <tr key={student.id}>

                                <td>{student.id}</td>

                                <td className="student-name">
                                    <FaUserGraduate className="student-icon" />
                                    {student.nom}
                                </td>

                                <td>{student.email}</td>

                                <td>{student.filiere}</td>

                                <td className="actions">

                                    <button
                                        className="edit-btn"
                                        onClick={() =>
                                            navigate(`/admin/students/edit/${student.id}`)
                                        }
                                    >
                                        <FaEdit />
                                    </button>

                                    <button
                                        className="delete-btn"
                                        onClick={() => deleteStudent(student.id)}
                                    >
                                        <FaTrash />
                                    </button>

                                </td>

                            </tr>
                        ))}

                    </tbody>

                </table>
            </div>

        </div>
    );
}