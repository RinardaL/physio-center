import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>

      <Sidebar />

      <div
        style={{
          flex: 1,
          padding: "40px",
          marginLeft: "240px",
          minHeight: "100vh",
          overflowX: "hidden",
        }}
      >

     
        <button onClick={handleLogout}>
          Logout
        </button>

        <Outlet />

      </div>
    </div>
  );
}