"use client";

import React, { FC } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SignupPage: FC = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("User Registered Successfully!");
      router.push("/login");
    } else {
      const data = await res.json();
      alert(data.message || "Something went wrong");
    }
  };

  return (
    <div>
      <h1>Signup Page</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          required
          onChange={(e) => {
            setForm({ ...form, name: e.target.value });
          }}
        />
        <input
          type="email"
          placeholder="Email"
          required
          onChange={(e) => {
            setForm({ ...form, email: e.target.value });
          }}
        />
        <input
          type="password"
          placeholder="Password"
          required
          onChange={(e) => {
            setForm({ ...form, password: e.target.value });
          }}
        />
        <button type="submit" >Sign Up</button>
      </form>
    </div>
  );
};

export default SignupPage;
