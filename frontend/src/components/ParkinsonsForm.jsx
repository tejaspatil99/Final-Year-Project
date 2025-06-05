import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ParkinsonsForm = () => {
  const [formData, setFormData] = useState({
    "MDVP:Fo(Hz)": '',
    "MDVP:Fhi(Hz)": '',
    "MDVP:Flo(Hz)": '',
    "MDVP:Jitter(%)": '',
    "MDVP:Jitter(Abs)": '',
    "MDVP:RAP": '',
    "MDVP:PPQ": '',
    "Jitter:DDP": '',
    "MDVP:Shimmer": '',
    "MDVP:Shimmer(dB)": '',
    "Shimmer:APQ3": '',
    "Shimmer:APQ5": '',
    "MDVP:APQ": '',
    "Shimmer:DDA": '',
    "NHR": '',
    "HNR": '',
    "RPDE": '',
    "DFA": '',
    "spread1": '',
    "spread2": '',
    "D2": '',
    "PPE": '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/predict-parkinsons', formData);
      navigate('/result', { state: { prediction: response.data.prediction_text } });
    } catch (error) {
      console.error('Prediction error:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Parkinson's Disease Prediction</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <input
            key={key}
            type="number"
            name={key}
            placeholder={key}
            value={formData[key]}
            onChange={handleChange}
            required
          />
        ))}
        <button type="submit">Predict</button>
      </form>
    </div>
  );
};

export default ParkinsonsForm;
