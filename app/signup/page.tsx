"use client";

import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface FormState {
  name: string;
  email: string;
  password: string;
}

const SignupPage: FC = () => {
  const [form, setForm] = useState<FormState>({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  // Form validation
  const validateForm = () => {
    if (!form.name || !form.email || !form.password) {
      return "Please fill in all fields.";
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
    setSuccess(null);

    try {
      const res = await axios.post('/api/auth/signup', form);

      setLoading(false);

      if (res.status === 200) {
        setSuccess("User registered successfully!");
        router.push("/login");
      }
    } catch (err) {
      setLoading(false);
      setError("An error occurred. Please try again." + err);
    }
  };

  return (
    <div>
      <h1>Signup Page</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            required
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>
        {error && <div style={{ color: "red" }}>{error}</div>}
        {success && <div style={{ color: "green" }}>{success}</div>}
        <button type="submit" disabled={loading}>
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
