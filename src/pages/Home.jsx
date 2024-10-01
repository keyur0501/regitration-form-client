import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { createUser } from "../apis/userApi";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();

  const clearForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhoneNumber("");
    setLoanAmount("");
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate email
    if (!validateEmail(email)) {
      toast.error("Invalid email address", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    // Prepare user data
    const userData = {
      firstName,
      lastName,
      email,
      phone: phoneNumber,
      loanAmount,
    };

    try {
      const response = await createUser(userData);

      if (response.status === 201) {
        console.log(response.data)
        navigate("/otp-verify", {
          state: { phoneNumber, userId: response.data.data._id },
        });
        toast.success(
          "User created successfully! Redirecting to OTP Verification"
        );
        clearForm(); // Clear form on success
      } else if (response.status === 403) {
        toast.error(
          response.message || "Email or Phone Number is Already Registered!"
        );
      } else {
        toast.error(
          response.message || "Failed to create user. Please try again."
        );
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("User creation error:", error);
    }
  };

  return (
    <div className="flex h-[80vh] justify-center w-full mt-16">
      <form className="w-[90%] max-w-[480px]" onSubmit={handleSubmit}>
        <fieldset className="flex flex-col p-4 border border-solid shadow-md rounded-lg">
          <h2 className="m-auto p-5 text-xl">Registration Form</h2>
          <div className="field">
            <label>
              First name <sup>*</sup>
            </label>
            <input
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name"
              required
            />
          </div>
          <div className="field">
            <label>Last name</label>
            <input
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last name"
            />
          </div>
          <div className="field">
            <label>
              Email address <sup>*</sup>
            </label>
            <input
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              required
            />
          </div>
          <div className="field">
            <label>
              Phone number <sup>*</sup>
            </label>
            <input
              name="phone"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Phone number"
              required
            />
          </div>
          <div className="field">
            <label>
              Home loan amount looking for: <sup>*</sup>
            </label>
            <select
              name="loanAmount"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              required
            >
              <option value="" disabled>
                -- Select Loan Amount --
              </option>
              <option value="Less than 25 lakhs">Less than 25 lakhs</option>
              <option value="25 to 50 lakhs">25 to 50 lakhs</option>
              <option value="50 to 75 lakhs">50 to 75 lakhs</option>
              <option value="75 lakhs to 1 crore">75 lakhs to 1 crore</option>
              <option value="More than 1 crore">More than 1 crore</option>
            </select>
          </div>
          <button type="submit">Create account</button>
        </fieldset>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Home;
