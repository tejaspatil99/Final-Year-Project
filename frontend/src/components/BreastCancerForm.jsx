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
      navigate('/result', {
        state: {
          prediction: response.data.prediction_text,
          disease: 'Breast Cancer',
        },
      });
    } catch (error) {
      console.error('Prediction error:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-2xl">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Breast Cancer Prediction</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { label: 'Mean Radius', name: 'mean_radius', placeholder: 'Enter mean radius' },
          { label: 'Mean Texture', name: 'mean_texture', placeholder: 'Enter mean texture' },
          { label: 'Mean Perimeter', name: 'mean_perimeter', placeholder: 'Enter mean perimeter' },
          { label: 'Mean Area', name: 'mean_area', placeholder: 'Enter mean area' },
          { label: 'Mean Smoothness', name: 'mean_smoothness', placeholder: 'Enter mean smoothness' },
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

export default BreastCancerForm;
