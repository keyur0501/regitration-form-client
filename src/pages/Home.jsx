import React from "react";
import { useState } from "react";
import { validateEmail } from "../utils/utils.js";
import { toast, ToastContainer } from "react-toastify";
import { createUser } from "../apis/UserApi";
import { useNavigate } from "react-router-dom";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("hello");
    // Prepare user data
    const userData = {
      firstName,
      lastName,
      email,
      phone: phoneNumber,
      loanAmount,
    };
    console.log(userData);
    await createUser(userData);
    navigate("/otp-verify");

    clearForm();
  };

  return (
    <div className="flex flex-1 h-[100vh] justify-center mt-16">
      <form onSubmit={handleSubmit}>
        <fieldset className="flex flex-col w-[480px] p-4 border border-solid shadow-md rounded-lg">
          <h2 className="m-auto p-5 text-xl">Registration Form</h2>
          <div className="field">
            <label>
              First name <sup>*</sup>
            </label>
            <input
              name="fistName"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              placeholder="First name"
            />
          </div>
          <div className="field">
            <label>Last name</label>
            <input
              name="lastName"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
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
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Email address"
            />
          </div>
          <div className="field">
            <label>
              Phone number <sup>*</sup>
            </label>
            <input
              name="phone"
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
              placeholder="Phone number"
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
              defaultValue=""
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
