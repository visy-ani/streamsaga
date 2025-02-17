"use client";

import { FC } from "react";
import useSignupForm from "@/hooks/useSignupForm";
import FormInput from "@/components/ui/FormInput/FormInput";
import { FaGoogle, FaGithub, FaFacebook } from "react-icons/fa";
import styles from "./RegisterForm.module.css";
import Link from "next/link";

const RegisterForm: FC = () => {
  const { form, handleInputChange, handleSubmit, loading, error, success } = useSignupForm();

  const handleSocialSignup = (provider: string) => {
    console.log(`Signing up with ${provider}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>Create an Account</h1>
        
        {/* Social login buttons */}
        <div className={styles.socialButtonsContainer}>
          <button 
            type="button"
            onClick={() => handleSocialSignup('Google')} 
            className={`${styles.socialButton} ${styles.googleButton}`}
          >
            <FaGoogle /> Continue with Google
          </button>
          <button 
            type="button"
            onClick={() => handleSocialSignup('GitHub')} 
            className={`${styles.socialButton} ${styles.githubButton}`}
          >
            <FaGithub /> Continue with GitHub
          </button>
          <button 
            type="button"
            onClick={() => handleSocialSignup('Facebook')} 
            className={`${styles.socialButton} ${styles.facebookButton}`}
          >
            <FaFacebook /> Continue with Facebook
          </button>
        </div>
        
        <div className={styles.divider}>
          <span>or register with email</span>
        </div>
        
        {/* Registration form */}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <FormInput
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleInputChange}
              className={styles.input}
              required={true}
            />
          </div>
          
          <div className={styles.inputGroup}>
            <FormInput
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleInputChange}
              className={styles.input}
              required={true}
            />
          </div>
          
          <div className={styles.inputGroup}>
            <FormInput
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleInputChange}
              className={styles.input}
              required={true}
            />
            <p className={styles.passwordHint}>
              Must be at least 8 characters with one uppercase, one lowercase, and one number
            </p>
          </div>

          {error && <div className={styles.errorMessage}>{error}</div>}
          {success && <div className={styles.successMessage}>{success}</div>}

          <button 
            type="submit" 
            disabled={loading} 
            className={styles.submitButton}
          >
            {loading ? (
              <span className={styles.loadingSpinner}>
                <span className={styles.spinnerDot}></span>
              </span>
            ) : "Create Account"}
          </button>
        </form>
        
        <p className={styles.termsText}>
          By signing up, you agree to our <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>
        </p>
        
        <div className={styles.loginLink}>
          Already have an account? <Link href="/auth/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;