import axios from "axios";

// Base URL for the API
const API_URL = "http://localhost:5000/api/users"; // Update with your actual API endpoint

// Create a new user
export const createUser = async (userData) => {
  const response = await axios.post(`${API_URL}/create-user`, userData);
  return response; // Return the response from the server
};

// Verify OTP for the user
export const verifyOtp = async (userId, otp) => {
  const response = await axios.post(`${API_URL}/verify-otp`, { userId, otp });
  return response; // Return the response from the server
};

export const resendOtp = async(userId, otp)=>{
  const response = await axios.post(`${API_URL}/resend-otp`, {userId, otp});
  return response
}
