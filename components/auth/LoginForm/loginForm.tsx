"use client";

import { FC } from "react";
import useLoginForm from "@/hooks/useLoginForm";
import FormInput from "@/components/ui/FormInput/FormInput";


const LoginForm: FC = () => {
    const { form, handleInputChange, handleSubmit, loading, error, success } = useLoginForm();

    return (
        <div>
            <h1>Login page</h1>
            <form onSubmit={handleSubmit}>
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
                {loading && <p>Loading...</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginForm;