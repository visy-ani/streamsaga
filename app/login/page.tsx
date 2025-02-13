"use client";

import { FC, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

interface FormState {
  email: string;
  password: string;
}

const LoginPage: FC = () => {
  const [form, setForm] = useState<FormState>({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Form validation
  const validateForm = () => {
    if (!form.email || !form.password) {
      return "Please fill in both fields.";
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      return "Please enter a valid email address.";
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError(null);

    const res = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError("Invalid email or password");
    } else {
      router.push("/browse");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            placeholder="Email"
            required
            value={form.email}
            onChange={(event) =>
              setForm({ ...form, email: event.target.value })
            }
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            required
            value={form.password}
            onChange={(event) =>
              setForm({ ...form, password: event.target.value })
            }
          />
        </div>
        {error && <div style={{ color: "red" }}>{error}</div>}
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
