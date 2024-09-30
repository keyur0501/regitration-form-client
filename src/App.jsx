import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import OtpVerification from "./pages/OtpVerification";

function App() {
  // State to store the phone number that will be passed to VerifyPhone
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <Router>
      <Routes>
        {/* Home route */}
        <Route path="/" element={<Home setPhoneNumber={setPhoneNumber} />} />

        {/* OTP Verification route */}
        <Route
          path="/verify-phone"
          element={<OtpVerification phoneNumber={phoneNumber} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
