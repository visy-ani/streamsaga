"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/services/authService";
import { validateLoginForm } from "@/validators/formValidator";

interface FormState {
  email: string;
  password: string;
}

const useLoginForm = () => {
  const [form, setForm] = useState<FormState>({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validatonError = validateLoginForm(form);
    if (validatonError) {
      setError(validatonError);
      return;
    }
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const result = await loginUser(form);
      if (!result.success) {
        setError(result.message);
        return;
      }
      
      setSuccess("User logged in Successfully");
      router.push("/browse");
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "An error occurred. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  return { form, handleInputChange, handleSubmit, loading, error, success };
};

export default useLoginForm;
