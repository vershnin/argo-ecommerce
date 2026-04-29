import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";

// ── Requires any authenticated user ───────────────────────────
export function ProtectedRoute() {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    // Preserve the attempted URL so LoginPage can redirect back after login
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return <Outlet />;
}

// ── Requires ADMIN role ────────────────────────────────────────
export function AdminRoute() {
  const { isAuthenticated, isAdmin } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // Authenticated but not admin → send back to home, not login
  if (!isAdmin()) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
