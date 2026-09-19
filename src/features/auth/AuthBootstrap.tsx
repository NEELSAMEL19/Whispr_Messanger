import { useEffect, type ReactNode } from "react";
import { clearAuth, loadCurrentUser } from "./authSlice";
import { useAppDispatch } from "../../redux/hooks";

const AuthBootstrap = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadCurrentUser());

    const handleUnauthorized = () => {
      dispatch(clearAuth());
    };

    window.addEventListener("auth:unauthorized", handleUnauthorized);

    return () => {
      window.removeEventListener("auth:unauthorized", handleUnauthorized);
    };
  }, [dispatch]);

  return children;
};

export default AuthBootstrap;
