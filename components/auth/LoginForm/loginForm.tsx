"use client";

import { FC } from "react";
import { FaGoogle, FaGithub, FaFacebook } from "react-icons/fa";
import useLoginForm from "@/hooks/useLoginForm";
import FormInput from "@/components/ui/FormInput/FormInput";
import styles from "./LoginForm.module.css";

const LoginForm: FC = () => {
  const { form, handleInputChange, handleSubmit, loading, error, success } = useLoginForm();

  const handleSocialLogin = (provider: string) => {
    console.log(`Logging in with ${provider}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>Welcome Back</h1>
        
        {/* Social login buttons */}
        <div className={styles.socialButtonsContainer}>
          <button 
            type="button"
            onClick={() => handleSocialLogin('Google')} 
            className={`${styles.socialButton} ${styles.googleButton}`}
          >
            <FaGoogle /> Login with Google
          </button>
          <button 
            type="button"
            onClick={() => handleSocialLogin('GitHub')} 
            className={`${styles.socialButton} ${styles.githubButton}`}
          >
            <FaGithub /> Login with GitHub
          </button>
          <button 
            type="button"
            onClick={() => handleSocialLogin('Facebook')} 
            className={`${styles.socialButton} ${styles.facebookButton}`}
          >
            <FaFacebook /> Login with Facebook
          </button>
        </div>
        
        <div className={styles.divider}>
          <span>or login with email</span>
        </div>
        
        {/* Login form using your existing hook */}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <FormInput
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleInputChange}
              className={styles.input}
              required
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
              required
            />
          </div>

          <div className={styles.formOptions}>
            <div className={styles.rememberMe}>
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                onChange={handleInputChange}
              />
              <label htmlFor="rememberMe">Remember me</label>
            </div>
            <a href="/forgot-password" className={styles.forgotPassword}>Forgot password?</a>
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
            ) : "Log In"}
          </button>
        </form>
        
        <div className={styles.registerLink}>
          Don&apos;t have an account? <a href="/register">Sign up</a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;