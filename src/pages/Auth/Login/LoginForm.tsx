import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { loginSchema } from "./LoginValidation";
import type { LoginFormData } from "../../../types/auth";
import { getApiErrorMessage } from "../../../utils/errors";
import { login } from "../../../features/auth/authSlice";
import { useAppDispatch } from "../../../redux/hooks";

import { TextField } from "../../../components/Basic/TextField/TextField";
import { Button } from "../../../components/Basic/Button/Button";

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const validateField = (field: "email" | "password", value: string) => {
    const result = loginSchema.shape[field].safeParse(value);

    if (!result.success) {
      setErrors((prev) => ({
        ...prev,
        [field]: result.error.issues[0].message,
      }));

    } else {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));

    }
  };

  const handleChange =
    (field: "email" | "password") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));

      validateField(field, value);
    };

  const onSubmit = async () => {
    const result = loginSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};

      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as "email" | "password";

        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      });

      setErrors(fieldErrors);

      return;
    }

    setErrors({});
    setIsSubmitting(true);
    setFormError("");
    try {
      await dispatch(login(formData)).unwrap();
      const state = location.state as LoginLocationState | null;
      const redirectTo = state?.from;
      const safeRedirect = redirectTo?.pathname?.startsWith("/") && !redirectTo.pathname.startsWith("//")
        ? `${redirectTo.pathname}${redirectTo.search ?? ""}${redirectTo.hash ?? ""}`
        : "/dashboard";

      navigate(safeRedirect, { replace: true });
    } catch (error) {
      setFormError(getApiErrorMessage(error, "Unable to log in. Please try again."));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full min-[850px]:w-[70%] flex items-center justify-center h-full p-6 ">
      <div className="w-full max-w-md ">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
          className="flex flex-col gap-5"
        >
          <TextField
            label="Email"
            type="email"
            name="email"
            required
            maxLength={100}
            placeholder="Email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange("email")}
            color={errors.email ? "error" : "info"}
            error={errors.email || ""}
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            placeholder="Password"
            required
            maxLength={100}
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange("password")}
            color={errors.password ? "error" : "info"}
            error={errors.password || ""}
          />
          <Button
            type="submit"
            size="md"
            isLoading={isSubmitting}
            className="w-full"
          >
            Login
          </Button>
          {formError && <p className="text-center text-sm text-red-600">{formError}</p>}
          <p className="text-center text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              Create account here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

interface LoginLocationState {
  from?: {
    pathname: string;
    search?: string;
    hash?: string;
  };
}

export default LoginForm;
