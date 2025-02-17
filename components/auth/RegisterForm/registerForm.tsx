"use client";

import { FC } from "react";
import useSignupForm from "@/hooks/useSignupForm";
import FormInput from "@/components/ui/FormInput/FormInput";

const RegisterForm: FC = () => {
    const { form, handleInputChange, handleSubmit, loading, error, success } = useSignupForm();

    return (
        <div>
            <h1>Signup Form</h1>
            <form onSubmit={handleSubmit}>
                <FormInput
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleInputChange}
                />
                <FormInput
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleInputChange}
                />
                <FormInput
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleInputChange}
                />

                {error && <p>{error}</p>}
                {success && <p>{success}</p>}

                <button type="submit" disabled={loading}>
                    {loading ? "Loading..." : "Signup"}
                </button>
                </form>
        </div>
    );
}

export default RegisterForm;