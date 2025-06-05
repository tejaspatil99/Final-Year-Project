import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BreastCancerForm = () => {
  const [formData, setFormData] = useState({
    mean_radius: '',
    mean_texture: '',
    mean_perimeter: '',
    mean_area: '',
    mean_smoothness: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/predict-breast-cancer', formData);
      navigate('/result', { state: { prediction: response.data.prediction_text } });
    } catch (error) {
      console.error('Prediction error:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Breast Cancer Prediction</h2>
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

export default BreastCancerForm;
