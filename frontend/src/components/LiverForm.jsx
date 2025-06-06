import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LiverForm = () => {
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    total_bilirubin: '',
    direct_bilirubin: '',
    alkaline_phosphotase: '',
    alamine_aminotransferase: '',
    aspartate_aminotransferase: '',
    total_proteins: '',
    albumin: '',
    albumin_globulin_ratio: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/predict-liver', formData);
      navigate('/result', {
        state: {
          prediction: response.data.prediction_text,
          disease: 'Liver Disease',
        },
      });
    } catch (error) {
      console.error('Prediction error:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-2xl">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Liver Disease Prediction</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { label: 'Age', name: 'age', placeholder: 'Enter age' },
          { label: 'Gender (1 = Male, 0 = Female)', name: 'gender', placeholder: '0 or 1' },
          { label: 'Total Bilirubin', name: 'total_bilirubin', placeholder: 'e.g. 1.2' },
          { label: 'Direct Bilirubin', name: 'direct_bilirubin', placeholder: 'e.g. 0.3' },
          { label: 'Alkaline Phosphotase', name: 'alkaline_phosphotase', placeholder: 'e.g. 187' },
          { label: 'Alamine Aminotransferase', name: 'alamine_aminotransferase', placeholder: 'e.g. 16' },
          { label: 'Aspartate Aminotransferase', name: 'aspartate_aminotransferase', placeholder: 'e.g. 25' },
          { label: 'Total Proteins', name: 'total_proteins', placeholder: 'e.g. 6.8' },
          { label: 'Albumin', name: 'albumin', placeholder: 'e.g. 3.1' },
          { label: 'Albumin Globulin Ratio', name: 'albumin_globulin_ratio', placeholder: 'e.g. 1.1' },
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

export default LiverForm;
