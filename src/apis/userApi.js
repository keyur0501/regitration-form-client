import axios from "axios";

// Base URL for the API
const API_URL = "http://localhost:5000/api/users"; // Update with your actual API endpoint

// Create a new user
export const createUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/create-user`, userData);
    return response.data; // Return the response from the server
  } catch (error) {
    console.error("Error creating user:", error);
    throw error; // Re-throw the error for handling in the component
  }
};

// Verify OTP for the user
export const verifyOtp = async (userId, otp) => {
  try {
    const response = await axios.post(`${API_URL}/verify-otp`, { userId, otp });
    return response.data; // Return the response from the server
  } catch (error) {
    console.error("Error verifying OTP:", error);
    throw error; // Re-throw the error for handling in the component
  }
};
