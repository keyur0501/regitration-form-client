import React, { useState, useEffect } from "react";
import PropTypes from "prop-types"; // Import prop-types
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OtpVerification = ({ phoneNumber }) => {
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");

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
    <div className="flex flex-1 h-[100vh] justify-center mt-16">
      {!isVerified ? (
        <form onSubmit={handleVerification}>
          <fieldset className="flex flex-col w-[480px] p-4 border border-solid shadow-md rounded-lg">
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
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <button type="submit" disabled={!otp}>
              Verify
            </button>
            <button type="button" onClick={resendOtp} className="mt-3 ">
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
