import React from "react";
import { useNavigate } from "react-router-dom";

const ThankYou = () => {
  const navigate = useNavigate();

  // Function to handle the redirect to the home page
  const redirectToHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-1 h-[80vh] justify-center items-center">
      <div className="flex flex-col md:w-[400px] p-4 border border-solid shadow-md rounded-lg text-center">
        <h2 className="text-2xl mb-4">Thank You for Registering with Us!</h2>
        <p className="mb-6">We appreciate your interest. Your registration has been successful.</p>
        <div className="flex justify-center">

        <button
          onClick={redirectToHome}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Go to Home
        </button>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
