import axios from "axios";

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
