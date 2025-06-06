import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
      const response = await axios.post('http://localhost:5000/predict-diabetes', formData);
      navigate('/result', {
        state: {
          prediction: response.data.prediction_text,
          disease: 'Diabetes',
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-2xl">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Diabetes Prediction</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { label: 'Pregnancies', name: 'pregnancies', placeholder: 'Number of pregnancies' },
          { label: 'Glucose', name: 'glucose', placeholder: 'Plasma glucose level' },
          { label: 'Blood Pressure', name: 'bloodpressure', placeholder: 'Diastolic blood pressure' },
          { label: 'Skin Thickness', name: 'skinthickness', placeholder: 'Skinfold thickness' },
          { label: 'Insulin', name: 'insulin', placeholder: '2-Hour serum insulin' },
          { label: 'BMI', name: 'bmi', placeholder: 'Body Mass Index' },
          { label: 'Diabetes Pedigree Function', name: 'diabetespedigreefunction', placeholder: 'DPF' },
          { label: 'Age', name: 'age', placeholder: 'Age in years' },
        ].map(({ label, name, placeholder }) => (
          <div className="flex flex-col" key={name}>
            <label htmlFor={name} className="mb-2 text-sm font-medium text-gray-700">
              {label}
            </label>
            <input
              type="number"
              id={name}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              placeholder={placeholder}
              required
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}
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

export default DiabetesForm;
