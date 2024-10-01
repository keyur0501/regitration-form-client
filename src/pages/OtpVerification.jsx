import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { verifyOtp, resendOtp } from "../apis/UserApi"; // Assuming the API functions are in this path

const OtpVerification = () => {
  const location = useLocation(); // Get the location object
  const navigate = useNavigate(); // For redirection
  const { phoneNumber, userId } = location.state; // Destructure the state

  const [otp, setOtp] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");
  const [isResendDisabled, setIsResendDisabled] = useState(true); // Disable resend button initially
  const [timer, setTimer] = useState(60); // 1-minute timer for resend

  // Timer for enabling the resend button after 1 minute
  useEffect(() => {
    let interval = null;
    if (isResendDisabled && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsResendDisabled(false); // Enable resend OTP button after 1 minute
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer, isResendDisabled]);

  // Handle OTP verification
  const handleVerification = async (e) => {
    e.preventDefault();
    try {
      console.log(userId, "userId");
      const response = await verifyOtp(userId, otp);
      if (response.status == 200) {
        setIsVerified(true);
        setError("");
        toast.success(response.data.message);

        // Redirect to thank you page
        navigate("/thank");
      } else {
        setError(response.data.message);
        toast.error(response.data.message);
      }
    } catch (err) {
      console.error("Verification error:", err);
      toast.error("An error occurred during verification. Please try again.");
    }
  };

  // Handle resend OTP
  const handleResendOtp = async () => {
    try {
      const response = await resendOtp(userId);
      if (response.data.success) {
        setOtp(""); // Clear OTP input field
        setTimer(60); // Reset timer
        setIsResendDisabled(true); // Disable resend button again
        setError("");
        toast.info(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.error("Resend OTP error:", err);
      toast.error("Error sending OTP. Please try again.");
    }
  };

  return (
    <div className="flex h-[80vh] justify-center w-full mt-16">
      {!isVerified ? (
        <form className="w-[90%] max-w-[480px]" onSubmit={handleVerification}>
          <fieldset className="flex flex-col p-4 border border-solid shadow-md rounded-lg">
            <h2 className="m-auto p-5 text-xl">Verify Your Phone Number</h2>
            <p className="mb-4">OTP has been sent to: {phoneNumber}</p>
            <div className="field">
              <label>
                Enter OTP <sup>*</sup>
              </label>
              <input
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                required
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <button type="submit" disabled={!otp} className="mt-3">
              Verify
            </button>
            <button
              type="button"
              onClick={handleResendOtp}
              disabled={isResendDisabled}
              className={`mt-3 ${isResendDisabled ? "cursor-not-allowed" : ""}`}
            >
              {isResendDisabled ? `Resend OTP in ${timer}s` : "Resend OTP"}
            </button>
          </fieldset>
        </form>
      ) : (
        <p className="text-green-500">Phone Number Verified Successfully!</p>
      )}
      <ToastContainer />
    </div>
  );
};

export default OtpVerification;
