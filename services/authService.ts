import axios from "axios";
import { signIn } from "next-auth/react";

interface SignupData {
  name: string;
  email: string;
  password: string;
}

export const signupUser = async (signupData: SignupData) => {
  try {
    const response = await axios.post("/api/auth/signup", signupData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return{
        success: false,
        message: error?.response?.data?.message || "Signup failed. Please try again."
    }
    } else {
      return {
        success: false,
        message: "An unexpected error occurred. Please try again."
      }
    }
  }
};


//Login
interface LoginData {
  email: string;
  password: string;
}

export const loginUser = async (loginData: LoginData) => {
  try {
    const result = await signIn("credentials", {
      redirect: false,
      email: loginData.email,
      password: loginData.password,
    });

    if (result?.error) {
      return {
        success: false,
        message: result.error || "Login failed. Please try again.",
      };
    }
    
    return {
      success: true,
      message: "Login successful.",
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An error occurred. Please try again.";
    return {
      success: false,
      message: errorMessage || "An unexpected error occurred. Please try again.",
    };
  }
};

