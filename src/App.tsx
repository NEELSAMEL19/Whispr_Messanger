import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Loader from "./components/Basic/Loader/Loader";
import NotFoundPage from "./components/Basic/NotFound/NotFound";
import { useAppSelector } from "./redux/hooks";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";
import Chat from "./pages/Chat/Chat";

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
    <Navigate to="/chat" replace />
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
        path="/chat"
        element={
          <ProtectedRoute>
            <Chat />
          </ProtectedRoute>
        }
      />
      <Route path="/dashboard" element={<Navigate to="/chat" replace />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
