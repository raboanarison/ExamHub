import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { useState, useEffect } from "react";

export default function AdminLayout() {

    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("theme") === "dark"
    );

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add("dark-mode");
            localStorage.setItem("theme", "dark");
        } else {
            document.body.classList.remove("dark-mode");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    return (
        <>
            <AdminSidebar />

            <main
                style={{
                    padding: "30px",
                    marginTop: "80px"
                }}
            >
                <Outlet />
            </main>
        </>
    );
}