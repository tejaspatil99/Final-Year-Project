import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract prediction result and disease type from location state
  const { prediction, disease } = location.state || {};

  const handleBack = () => {
    navigate("/disease"); // Navigate back to disease selection
  };

  if (!prediction) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <h2 className="text-3xl font-bold mb-4">No Prediction Available</h2>
        <button
          className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          onClick={handleBack}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <h1 className="text-4xl font-bold mb-6">Prediction Result for {disease}</h1>
      <div className="p-8 rounded-lg shadow-lg bg-white text-center">
        <p className="text-2xl font-semibold text-gray-800 mb-6">You may have {prediction} disease</p>
        <button
          className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          onClick={handleBack}
        >
          Predict Another Disease
        </button>
      </div>
    </div>
  );
};

export default Result;
