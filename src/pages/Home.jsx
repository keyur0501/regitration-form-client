import React from "react";
import { useState } from "react";
import { validateEmail } from "../utils/utils.js";
import { toast, ToastContainer } from "react-toastify";
import { createUser } from "../apis/userApi.js";

const Home = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState({
    value: "",
    isTouched: false,
  });
  const [phoneNumber, setPhoneNumber] = useState("");

  const getIsFormValid = () => {
    return (
      firstName &&
      validateEmail(email) &&
      password.value.length >= 8 &&
      phoneNumber.length >= 10
    );
  };

  const clearForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword({
      value: "",
      isTouched: false,
    });
    setPhoneNumber("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare user data
    const userData = {
      firstName,
      lastName,
      email,
      phone: phoneNumber,
      password: password.value,
    };

    try {
      // Call the createUser API
      const response = await createUser(userData);

      // Handle success response
      if (response.success) {
        toast.success(
          "Registration successful! Redirecting to OTP verification..."
        );
        // Optionally, redirect to OTP verification page here
      } else {
        // Handle error response
        toast.error(response.message, {});
      }
    } catch (err) {
      toast.error(`Error during registration, please try again. ${err} `, {});
    }

    clearForm();
  };

  return (
    <div className="flex flex-1 h-[100vh] justify-center items-center">
      <form onSubmit={handleSubmit}>
        <fieldset className="flex flex-col w-[480px] p-4 border border-solid border-black rounded-lg">
          <h2 className="m-auto p-5 text-xl">Registration Form</h2>
          <div className="field">
            <label>
              First name <sup>*</sup>
            </label>
            <input
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
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
              placeholder="Phone number"
            />
          </div>
          <div className="field">
            <label>
              Password <sup>*</sup>
            </label>
            <input
              value={password.value}
              type="password"
              onChange={(e) => {
                setPassword({ ...password, value: e.target.value });
              }}
              onBlur={() => {
                setPassword({ ...password, isTouched: true });
              }}
              placeholder="Password"
            />
          </div>

          <button type="submit" disabled={!getIsFormValid()}>
            Create account
          </button>
        </fieldset>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Home;
