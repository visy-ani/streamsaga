'use client';

import React, { FC } from 'react'
import { useRouter } from 'next/navigation'

const HomePage: FC = () => {
  const router = useRouter();

  const handleSignup = () => {
    router.push("/signup")
  }

  const handleLogin = () => {
    router.push("/login")
  }
  
  return (
    <div>
      <button onClick={handleSignup}>Sign Up</button>
      <button onClick={handleLogin}>Sign Up</button>
    </div>
    
  )
}

export default HomePage;