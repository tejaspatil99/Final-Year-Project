import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DiabetesForm = () => {
  const [formData, setFormData] = useState({
    pregnancies: '',
    glucose: '',
    bloodpressure: '',
    skinthickness: '',
    insulin: '',
    bmi: '',
    diabetespedigreefunction: '',
    age: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/predict-diabetes', formData);
      navigate('/result', {
        state: {
          prediction: response.data.prediction_text,
          disease: "Diabetes",
        },
      });
    } catch (error) {
      console.error('Prediction error:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Diabetes Prediction</h2>
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

export default DiabetesForm;
