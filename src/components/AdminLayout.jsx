import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

export default function AdminLayout() {
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