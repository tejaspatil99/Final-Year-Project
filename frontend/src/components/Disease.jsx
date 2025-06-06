import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Disease = () => {
  const [selectedDisease, setSelectedDisease] = useState("");
  const navigate = useNavigate();

  const handleSelect = (event) => {
    setSelectedDisease(event.target.value);
  };

  const handleSubmit = () => {
    if (selectedDisease) {
      // Navigate to the prediction form for the selected disease
      navigate(`/predict-${selectedDisease}`);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-24 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Select Disease for Prediction</h2>

      <div className="mb-6">
        <select
          value={selectedDisease}
          onChange={handleSelect}
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
        >
          <option value="">Select Disease</option>
          <option value="diabetes">Diabetes</option>
          <option value="heart">Heart Disease</option>
          <option value="breast-cancer">Breast Cancer</option>
          <option value="liver">Liver Disease</option>
          {/* Add more diseases as required */}
        </select>
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        disabled={!selectedDisease}
      >
        {selectedDisease ? "Proceed to Prediction" : "Please Select a Disease"}
      </button>
    </div>
  );
};

export default Disease;
