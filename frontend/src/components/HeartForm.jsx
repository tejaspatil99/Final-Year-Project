import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HeartForm = () => {
  const [Age, setAge] = useState("");
  const [Sex, setSex] = useState("");
  const [Chest_Pain, setChestPain] = useState("");
  const [Resting_Blood_Pressure, setRestingBloodPressure] = useState("");
  const [Cholestrol, setCholestrol] = useState("");
  const [Fasting_Blood_Pressure, setFastingBloodPressure] = useState("");
  const [Resting_Electrocardiographic_Results, setECGResults] = useState("");
  const [Heart_Rate_Achieved, setHeartRate] = useState("");
  const [Exercise_Induced_Angina, setAngina] = useState("");
  const [Oldpeak, setOldpeak] = useState("");
  const [Slope, setSlope] = useState("");
  const [Number_of_Vessels_Colored_by_Fluoroscopy, setVessels] = useState("");
  const [Thalassemia, setThalassemia] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      Age,
      Sex,
      Chest_Pain,
      Resting_Blood_Pressure,
      Cholestrol,
      Fasting_Blood_Pressure,
      Resting_Electrocardiographic_Results,
      Heart_Rate_Achieved,
      Exercise_Induced_Angina,
      Oldpeak,
      Slope,
      Number_of_Vessels_Colored_by_Fluoroscopy,
      Thalassemia,
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/predict-heart",
        formData
      );
      navigate("/result", {
        state: { prediction: response.data.prediction_text },
      });
    } catch (error) {
      console.error("Prediction error:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-2xl">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Heart Disease Prediction
      </h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="flex flex-col">
          <label
            htmlFor="Age"
            className="mb-2 text-sm font-medium text-gray-700"
          >
            Age
          </label>
          <input
            type="number"
            id="Age"
            value={Age}
            onChange={(e) => {
              const val = e.target.value;
              if (val === "" || (val >= 29 && val <= 77)) {
                setAge(val);
              }
            }}
            placeholder="Enter your age (29-77)"
            required
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="Sex"
            className="mb-2 text-sm font-medium text-gray-700"
          >
            Sex
          </label>
          <input
            type="number"
            id="Sex"
            value={Sex}
            onChange={(e) => {
              const val = e.target.value;
              if (val === "" || val === "0" || val === "1") {
                setSex(val);
              }
            }}
            placeholder="1 = male, 0 = female"
            required
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="Chest_Pain"
            className="mb-2 text-sm font-medium text-gray-700"
          >
            Chest Pain
          </label>
          <input
            type="number"
            id="Chest_Pain"
            value={Chest_Pain}
            onChange={(e) => {
              const val = e.target.value;
              if (val === "" || (val >= 0 && val <= 3)) {
                setChestPain(val);
              }
            }}
            placeholder="0-3 pain type"
            required
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="Resting_Blood_Pressure"
            className="mb-2 text-sm font-medium text-gray-700"
          >
            Resting Blood Pressure
          </label>
          <input
            type="number"
            id="Resting_Blood_Pressure"
            value={Resting_Blood_Pressure}
            onChange={(e) => setRestingBloodPressure(e.target.value)}
            placeholder="e.g. 120"
            required
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="Cholestrol"
            className="mb-2 text-sm font-medium text-gray-700"
          >
            Cholestrol
          </label>
          <input
            type="number"
            id="Cholestrol"
            value={Cholestrol}
            onChange={(e) => setCholestrol(e.target.value)}
            placeholder="e.g. 240"
            required
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="Fasting_Blood_Pressure"
            className="mb-2 text-sm font-medium text-gray-700"
          >
            Fasting Blood Pressure
          </label>
          <input
            type="number"
            id="Fasting_Blood_Pressure"
            value={Fasting_Blood_Pressure}
            onChange={(e) => setFastingBloodPressure(e.target.value)}
            placeholder="1 = true, 0 = false"
            required
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="Resting_Electrocardiographic_Results"
            className="mb-2 text-sm font-medium text-gray-700"
          >
            ECG Results
          </label>
          <input
            type="number"
            id="Resting_Electrocardiographic_Results"
            value={Resting_Electrocardiographic_Results}
            onChange={(e) => setECGResults(e.target.value)}
            placeholder="0 = normal, etc."
            required
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="Heart_Rate_Achieved"
            className="mb-2 text-sm font-medium text-gray-700"
          >
            Heart Rate Achieved
          </label>
          <input
            type="number"
            id="Heart_Rate_Achieved"
            value={Heart_Rate_Achieved}
            onChange={(e) => {
              const val = e.target.value;
              if (val === "0" || (val >= 71 && val <= 202)) {
                setHeartRate(val);
              }
            }}
            placeholder="Enter value between 71-202"
            required
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="Exercise_Induced_Angina"
            className="mb-2 text-sm font-medium text-gray-700"
          >
            Exercise Induced Angina
          </label>
          <input
            type="number"
            id="Exercise_Induced_Angina"
            value={Exercise_Induced_Angina}
            onChange={(e) => setAngina(e.target.value)}
            placeholder="1 = yes, 0 = no"
            required
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="Oldpeak"
            className="mb-2 text-sm font-medium text-gray-700"
          >
            Oldpeak
          </label>
          <input
            type="number"
            id="Oldpeak"
            value={Oldpeak}
            onChange={(e) => setOldpeak(e.target.value)}
            placeholder="ST depression value"
            required
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="Slope"
            className="mb-2 text-sm font-medium text-gray-700"
          >
            Slope
          </label>
          <input
            type="number"
            id="Slope"
            value={Slope}
            onChange={(e) => setSlope(e.target.value)}
            placeholder="0-2 slope type"
            required
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="Number_of_Vessels_Colored_by_Fluoroscopy"
            className="mb-2 text-sm font-medium text-gray-700"
          >
            Vessels Colored
          </label>
          <input
            type="number"
            id="Number_of_Vessels_Colored_by_Fluoroscopy"
            value={Number_of_Vessels_Colored_by_Fluoroscopy}
            onChange={(e) => setVessels(e.target.value)}
            placeholder="0–3"
            required
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="Thalassemia"
            className="mb-2 text-sm font-medium text-gray-700"
          >
            Thalassemia
          </label>
          <input
            type="number"
            id="Thalassemia"
            value={Thalassemia}
            onChange={(e) => setThalassemia(e.target.value)}
            placeholder="1 = normal, 2 = fixed defect, 3 = reversible defect"
            required
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Predict
          </button>
        </div>
      </form>
    </div>
  );
};

export default HeartForm;
