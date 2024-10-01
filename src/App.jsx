import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Home from "./pages/Home";
import OtpVerification from "./pages/OtpVerification";
import Header from "./components/Header";

function App() {
  // State to store the phone number that will be passed to VerifyPhone
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <BrowserRouter>
      <Header />

      <Routes>
        {/* Home route */}
        <Route path="/" element={<Home setPhoneNumber={setPhoneNumber} />} />

        {/* OTP Verification route */}
        <Route
          path="/otp-verify"
          element={<OtpVerification phoneNumber={phoneNumber} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
