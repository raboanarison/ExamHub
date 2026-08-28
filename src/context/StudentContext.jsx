import { createContext, useState } from "react";

export const StudentContext = createContext();

export function StudentProvider({ children }) {
    const [students, setStudents] = useState([
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
    ]);

    return (
        <StudentContext.Provider
            value={{ students, setStudents }}
        >
            {children}
        </StudentContext.Provider>
    );
}