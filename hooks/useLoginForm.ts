"use client";

import { useState} from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/services/authService";
import { validateLoginForm } from "@/validators/formValidator";
import { signIn } from "next-auth/react";

interface FormState {
  email: string;
  password: string;
  remember: boolean;
}

const useLoginForm = () => {
  const [form, setForm] = useState<FormState>({
    email: "",
    password: "",
    remember: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: type === "checkbox" ? checked : value, 
    }));
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

  const handleSocialLogin = async (provider: string) => {
    signIn(provider, { callbackUrl: "/browse" });
  };

  return {
    form,
    handleInputChange,
    handleSubmit,
    handleSocialLogin,
    loading,
    error,
    success,
  };
};

export default useLoginForm;
