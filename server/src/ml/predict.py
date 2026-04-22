import sys
import json
import joblib
import pandas as pd
import numpy as np
import os

def predict():
    try:
        # Load model and columns relative to this script
        base_path = os.path.dirname(os.path.abspath(__file__))
        model = joblib.load(os.path.join(base_path, 'models/disease_model.pkl'))
        all_columns = joblib.load(os.path.join(base_path, 'models/symptom_columns.pkl'))

        # Get input symptoms from command line argument (JSON string)
        if len(sys.argv) < 2:
            print(json.dumps({"error": "No symptoms provided"}))
            return

        input_symptoms = json.loads(sys.argv[1])
        
        # Prepare input vector
        input_vector = pd.DataFrame([[0] * len(all_columns)], columns=all_columns)
        for sym in input_symptoms:
            if sym in all_columns:
                input_vector[sym] = 1

        # Predict
        prediction = model.predict(input_vector)[0]
        probabilities = model.predict_proba(input_vector)[0]
        max_prob = float(np.max(probabilities))
        
        # Get feature importance for "Explainability"
        # Since it's a decision tree, we can see which path was taken, 
        # but for simplicity, we'll return the symptoms that match the result's typical profile
        
        result = {
            "disease": prediction,
            "confidence": round(max_prob * 100, 2),
            "risk_score": round(max_prob * 100, 2), # Simplified
            "recommendations": get_recommendations(prediction)
        }
        
        print(json.dumps(result))

    except Exception as e:
        print(json.dumps({"error": str(e)}))

def get_recommendations(disease):
    recommendations = {
        'Fungal infection': "Maintain good hygiene, keep skin dry, and use antifungal creams as prescribed.",
        'Allergy': "Identify and avoid allergens, use antihistamines, and consult an allergist if symptoms persist.",
        'GERD': "Avoid spicy and acidic foods, eat smaller meals, and don't lie down immediately after eating.",
        'Diabetes': "Monitor blood sugar levels, maintain a healthy diet, exercise regularly, and consult an endocrinologist.",
        'Hypertension': "Reduce salt intake, exercise regularly, manage stress, and monitor blood pressure consistently.",
        'Migraine': "Identify triggers (like light or noise), stay hydrated, and rest in a dark, quiet room during episodes.",
        'Pneumonia': "Get plenty of rest, stay hydrated, take prescribed antibiotics or antivirals, and monitor breathing.",
        'Common Cold': "Rest well, stay hydrated, use saline nasal drops, and take over-the-counter cold medications.",
        'Gastroenteritis': "Stay hydrated with oral rehydration salts, eat bland foods (BRAT diet), and avoid dairy and caffeine."
    }
    return recommendations.get(disease, "Consult a healthcare professional for a detailed evaluation.")

if __name__ == "__main__":
    predict()
