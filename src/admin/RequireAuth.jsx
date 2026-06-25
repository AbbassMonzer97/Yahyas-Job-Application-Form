import { Navigate } from "react-router-dom";
import { useAuth } from "../lib/AuthContext";

export default function RequireAuth({ children }) {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#e9ebe0]">
        <p className="text-sm font-medium text-brand-green">Loading…</p>
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
