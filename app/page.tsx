'use client';

import React, { FC } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/app/page.module.css';

const HomePage: FC = () => {
  const router = useRouter();

  const handleSignup = () => {
    router.push("/auth/signup");
  };

  const handleLogin = () => {
    router.push("/auth/login");
  };
  
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Welcome to <span className={styles.highlight}>Stream Saga</span></h1>
        <p className={styles.description}>
          Your gateway to amazing experiences. Join our community today and discover what you&apso;ve been missing.
        </p>
        
        <div className={styles.buttonContainer}>
          <button 
            className={`${styles.button} ${styles.signupButton}`} 
            onClick={handleSignup}
          >
            Sign Up
          </button>
          <button 
            className={`${styles.button} ${styles.loginButton}`} 
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;