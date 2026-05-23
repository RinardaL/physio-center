import { Navigate, Outlet } from "react-router-dom";

export default function RoleRoute({ allowedRole }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) return <Navigate to="/login" />;

  return user.role === allowedRole ? (
    <Outlet />
  ) : (
    <Navigate to="/home" />
  );
}