from flask import Flask
from flask_cors import CORS
import openai
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

openai.api_key = os.environ.get('OPEN_AI_KEY')

model_paths = {
    "heart": 'mlModels/heart.pkl',
    "diabetes": 'mlModels/diabetes.pkl',
    "liver": 'mlModels/liver.pkl',
    "parkinsons": 'mlModels/parkinsons.pkl',
    "breast_cancer": 'mlModels/breast_cancer.pkl'
}
