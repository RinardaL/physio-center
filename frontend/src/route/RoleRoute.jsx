import { Navigate, Outlet } from "react-router-dom";

export default function RoleRoute({ allowedRole }) {
  const token = localStorage.getItem("token");
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch (e) {
    user = null;
  }

  if (!token || !user) return <Navigate to="/login" replace />;

  return user.role === allowedRole ? <Outlet /> : <Navigate to="/" replace />;
}
