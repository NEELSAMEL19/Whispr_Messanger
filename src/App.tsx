import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Loader from "./components/Basic/Loader/Loader";
import NotFoundPage from "./components/Basic/NotFound/NotFound";
import { useAppSelector } from "./redux/hooks";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";

const Dashboard = () => {
  return <div className="min-h-screen" />;
};

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const status = useAppSelector((state) => state.auth.status);
  const location = useLocation();

  if (status === "loading") {
    return <Loader />;
  }

  return status === "authenticated" ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const status = useAppSelector((state) => state.auth.status);

  if (status === "loading") {
    return <Loader />;
  }

  return status === "authenticated" ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <>{children}</>
  );
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
