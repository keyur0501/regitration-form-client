import React, { useState, useEffect } from "react";
import PropTypes from "prop-types"; // Import prop-types
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OtpVerification = ({ phoneNumber }) => {
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");

  const generateOtp = () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otp);
    console.log("Generated OTP:", otp); // In real applications, the OTP would be sent via SMS
    toast.info(`OTP sent to ${phoneNumber}: ${otp}`, {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  useEffect(() => {
    generateOtp();
  }, []);

  const handleVerification = (e) => {
    e.preventDefault();
    if (otp === generatedOtp) {
      setIsVerified(true);
      setError("");
      toast.success("Phone number verified successfully!", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      setError("Invalid OTP. Please try again.");
      toast.error("Invalid OTP entered!", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const resendOtp = () => {
    generateOtp();
    setError("");
    setOtp("");
    toast.info("A new OTP has been sent to your phone number.", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  return (
    <div className="flex flex-1 h-[100vh] justify-center items-center">
      {!isVerified ? (
        <form onSubmit={handleVerification}>
          <fieldset className="flex flex-col w-[480px] p-4 border border-solid border-black rounded-lg">
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
                className="p-2 border border-solid border-gray-300 rounded"
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <button
              type="submit"
              disabled={!otp}
              className="mt-4 p-2 bg-blue-500 text-white rounded"
            >
              Verify
            </button>
            <button
              type="button"
              onClick={resendOtp}
              className="mt-2 p-2 bg-gray-500 text-white rounded"
            >
              Resend OTP
            </button>
          </fieldset>
        </form>
      ) : (
        toast.success("Phone Number Verified Successfully!")
      )}
      <ToastContainer />
    </div>
  );
};

// PropTypes validation for the phoneNumber prop
OtpVerification.propTypes = {
  phoneNumber: PropTypes.string.isRequired,
};

export default OtpVerification;
