from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import os
import pickle
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# ✅ Load OpenAI key from .env
openai.api_key = os.environ.get('OPEN_AI_KEY')

# ✅ Define model paths
model_paths = {
    "heart": 'mlModels/heart.pkl',
    "diabetes": 'mlModels/diabetes.pkl',
    "liver": 'mlModels/liver.pkl',
    "parkinsons": 'mlModels/parkinsons.pkl',
    "breast_cancer": 'mlModels/breast_cancer.pkl'
}
models = {}

# ✅ Load models from disk
for disease, path in model_paths.items():
    try:
        with open(os.path.join(os.path.dirname(__file__), path), 'rb') as f:
            models[disease] = pickle.load(f)
    except Exception as e:
        print(f"Error loading model for {disease}: {e}")
        models[disease] = None

# ✅ Unified prediction endpoint
@app.route('/predict-<disease>', methods=['POST'])
def predict_disease(disease):
    if disease not in models or models[disease] is None:
        return jsonify({'error': f"Model for {disease} not available."})

    try:
        data = request.json

        if disease == "heart":
            input_features = [
                float(data['age']), float(data['sex']), float(data['cp']),
                float(data['trestbps']), float(data['chol']), float(data['fbs']),
                float(data['restecg']), float(data['thalach']), float(data['exang']),
                float(data['oldpeak']), float(data['slope']), float(data['ca']), float(data['thal'])
            ]
        elif disease == "diabetes":
            input_features = [
                float(data['pregnancies']), float(data['glucose']), float(data['bloodpressure']),
                float(data['skinthickness']), float(data['insulin']), float(data['bmi']),
                float(data['diabetespedigreefunction']), float(data['age'])
            ]
        elif disease == "liver":
            input_features = [
                float(data['age']), float(data['gender']), float(data['total_bilirubin']),
                float(data['direct_bilirubin']), float(data['alkaline_phosphotase']),
                float(data['alamine_aminotransferase']), float(data['aspartate_aminotransferase']),
                float(data['total_proteins']), float(data['albumin']), float(data['albumin_globulin_ratio'])
            ]
        elif disease == "parkinsons":
            input_features = [float(data[k]) for k in [
                'MDVP:Fo(Hz)', 'MDVP:Fhi(Hz)', 'MDVP:Flo(Hz)', 'MDVP:Jitter(%)',
                'MDVP:Jitter(Abs)', 'MDVP:RAP', 'MDVP:PPQ', 'Jitter:DDP',
                'MDVP:Shimmer', 'MDVP:Shimmer(dB)', 'Shimmer:APQ3', 'Shimmer:APQ5',
                'MDVP:APQ', 'Shimmer:DDA', 'NHR', 'HNR', 'RPDE', 'DFA',
                'spread1', 'spread2', 'D2', 'PPE'
            ]]
        elif disease == "breast_cancer":
            input_features = [
                float(data['mean_radius']), float(data['mean_texture']),
                float(data['mean_perimeter']), float(data['mean_area']),
                float(data['mean_smoothness'])
            ]

        # ✅ Run prediction
        prediction = models[disease].predict([input_features])
        result = f"{disease.replace('_', ' ').capitalize()} Detected" if prediction[0] == 1 else f"No {disease.replace('_', ' ').capitalize()}"

        return jsonify({'prediction_text': result})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ✅ AI Chat Endpoint (OpenAI)
@app.route('/chat-ai', methods=['POST'])
def chat_ai():
    try:
        user_message = request.json.get('message', '')

        if not user_message:
            return jsonify({"error": "Message is required"}), 400

        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system",
                    "content": "You are a helpful AI that only answers questions related to diseases, symptoms, diagnosis, or health conditions."
                },
                {"role": "user", "content": user_message}
            ],
            max_tokens=150,
            temperature=0.5
        )

        reply = response['choices'][0]['message']['content']
        return jsonify({'reply': reply})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ✅ Run the Flask app
if __name__ == '__main__':
    app.run(debug=True, port=5000)
