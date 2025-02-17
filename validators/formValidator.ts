interface FormState {
    name: string;
    email: string; 
    password: string;
}

export const validateSignupForm = (form: FormState) => {
    if (!form.name || !form.email || !form.password) {
        return 'Please fill in all fields.';
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
        return 'Please enter a valid email address.';
    }
    if(form.password.length < 6) {
        return 'Password must be at least 6 characters long.';
    }
    return null;
};