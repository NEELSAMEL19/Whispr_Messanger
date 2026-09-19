import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { registerSchema } from "./RegisterValidation";
import type { RegisterFormData } from "../../../types/auth";
import { getApiErrorMessage } from "../../../utils/errors";
import { register } from "../../../features/auth/authSlice";
import { useAppDispatch } from "../../../redux/hooks";

import { TextField } from "../../../components/Basic/TextField/TextField";
import { Button } from "../../../components/Basic/Button/Button";

const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    phone?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const validateField = (
    field: "name" | "email" | "password" | "phone",
    value: string,
  ) => {
    const result = registerSchema.shape[field].safeParse(value);

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
    (field: "name" | "email" | "password" | "phone") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));

      validateField(field, value);
    };

  const onSubmit = async () => {
    const result = registerSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};

      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as "name" | "email" | "password" | "phone";

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
      await dispatch(register(result.data)).unwrap();
      navigate("/dashboard", { replace: true });
    } catch (error) {
      setFormError(getApiErrorMessage(error, "Unable to create account. Please try again."));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full min-[850px]:w-[70%] flex items-center justify-center h-full p-6 ">
      <div className="w-full max-w-md">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
          className="flex flex-col gap-5"
        >
          <TextField
            label="Name"
            type="text"
            name="name"
            required
            maxLength={100}
            placeholder="Name"
            autoComplete="name"
            value={formData.name}
            onChange={handleChange("name")}
            color={errors.name ? "error" : "info"}
            error={errors.name || ""}
          />
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
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange("password")}
            color={errors.password ? "error" : "info"}
            error={errors.password || ""}
          />
          <TextField
            label="Phone"
            type="tel"
            name="phone"
            required
            maxLength={30}
            placeholder="Phone number"
            autoComplete="tel"
            value={formData.phone}
            onChange={handleChange("phone")}
            color={errors.phone ? "error" : "info"}
            error={errors.phone || ""}
          />

          <Button
            type="submit"
            size="md"
            isLoading={isSubmitting}
            className="w-full"
          >
            Create account
          </Button>
          {formError && <p className="text-center text-sm text-red-600">{formError}</p>}
          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
