"use client";

import { FC} from "react";
import { FaGoogle, FaGithub, FaFacebook } from "react-icons/fa";
import useLoginForm from "@/hooks/useLoginForm";
import FormInput from "@/components/ui/FormInput/FormInput";
import styles from "./LoginForm.module.css";
import Link from "next/link";

const LoginForm: FC = () => {
  const { form, handleInputChange, handleSubmit, handleSocialLogin, loading, error, success } = useLoginForm();

  return (
    <div className={styles.container}>
      <div className={styles.backgroundOverlay}></div>
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>Login</h1>
        
        {error && <div className={styles.errorMessage}>{error}</div>}
        {success && <div className={styles.successMessage}>{success}</div>}
        
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
                id="remember"
                name="remember"
                onChange={handleInputChange}
              />
              <label htmlFor="remember">Remember me</label>
            </div>
            <a href="/forgot-password" className={styles.forgotPassword}>Forgot password?</a>
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            className={styles.submitButton}
          >
            {loading ? (
              <span className={styles.loadingSpinner}>
                <span className={styles.spinnerDot}></span>
              </span>
            ) : "Sign In"}
          </button>
        </form>
        
        <div className={styles.divider}>
          <span>or continue with</span>
        </div>
        
        {/* Social login buttons */}
        <div className={styles.socialButtonsContainer}>
          <button 
            type="button"
            onClick={() => handleSocialLogin('google')} 
            className={`${styles.socialButton} ${styles.googleButton}`}
          >
            <FaGoogle /> <span>Google</span>
          </button>
          <button 
            type="button"
            onClick={() => handleSocialLogin('github')} 
            className={`${styles.socialButton} ${styles.githubButton}`}
          >
            <FaGithub /> <span>GitHub</span>
          </button>
          <button 
            type="button"
            onClick={() => handleSocialLogin('facebook')} 
            className={`${styles.socialButton} ${styles.facebookButton}`}
          >
            <FaFacebook /> <span>Facebook</span>
          </button>
        </div>
        
        <div className={styles.registerLink}>
          New to Stream Saga? <Link href="/auth/signup">Sign up now</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;