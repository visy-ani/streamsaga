"use client";

import { FC } from "react";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginPage: FC = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    if (res?.error) {
      alert("Invalid email or password");
    } else {
      router.push("/browse");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          required
          onChange={(event) => {
            setForm({ ...form, email: event.target.value });
          }}
        />
        <input
          type="text"
          placeholder="password"
          required
          onChange={(event) => {
            setForm({ ...form, password: event.target.value });
          }}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
