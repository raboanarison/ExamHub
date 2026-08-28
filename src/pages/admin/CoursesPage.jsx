import "./CoursesPage.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
    FaBook,
    FaPlus,
    FaEdit,
    FaTrash,
    FaSearch
} from "react-icons/fa";

export default function CoursesPage() {
    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const savedCourses = localStorage.getItem("courses");

        if (savedCourses) {
            setCourses(JSON.parse(savedCourses));
        } else {
            const defaultCourses = [
                {
                    id: 1,
                    title: "Java",
                    teacher: "M. Rakoto"
                },
                {
                    id: 2,
                    title: "React",
                    teacher: "M. Jean"
                },
                {
                    id: 3,
                    title: "Spring Boot",
                    teacher: "Mme Sarah"
                }
            ];

            localStorage.setItem(
                "courses",
                JSON.stringify(defaultCourses)
            );

            setCourses(defaultCourses);
        }
    }, []);

    const deleteCourse = (id) => {
        const updatedCourses = courses.filter(
            (course) => course.id !== id
        );

        setCourses(updatedCourses);

        localStorage.setItem(
            "courses",
            JSON.stringify(updatedCourses)
        );
    };

    const filteredCourses = courses.filter(
        (course) =>
            course.title.toLowerCase().includes(search.toLowerCase()) ||
            course.teacher.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="courses-page">

            <div className="page-header">
                <h1>Gestion des cours</h1>

                <button
                    className="add-btn"
                    onClick={() => navigate("/admin/courses/create")}
                >
                    <FaPlus />
                    Ajouter cours
                </button>
            </div>

            <div className="search-box">
                <FaSearch />

                <input
                    type="text"
                    placeholder="Rechercher un cours..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Cours</th>
                        <th>Professeur</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>

                    {filteredCourses.map((course) => (
                        <tr key={course.id}>

                            <td>{course.id}</td>

                            <td>
                                <FaBook /> {course.title}
                            </td>

                            <td>{course.teacher}</td>

                            <td className="actions">

                                <button
                                    className="edit-btn"
                                    onClick={() =>
                                        navigate(`/admin/courses/edit/${course.id}`)
                                    }
                                >
                                    <FaEdit />
                                </button>

                                <button
                                    className="delete-btn"
                                    onClick={() => deleteCourse(course.id)}
                                >
                                    <FaTrash />
                                </button>

                            </td>

                        </tr>
                    ))}

                </tbody>
            </table>

        </div>
    );
}