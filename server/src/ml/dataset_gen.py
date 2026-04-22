import pandas as pd
import numpy as np
import os

# Define Symptoms (Subset of Kaggle Dataset)
symptoms = [
    'itching', 'skin_rash', 'fatigue', 'cough', 'high_fever', 'headache', 'nausea', 
    'loss_of_appetite', 'vomiting', 'joint_pain', 'stomach_pain', 'breathlessness', 
    'sweating', 'chest_pain', 'diarrhoea', 'chills', 'muscle_pain', 'malaise', 
    'phlegm', 'throat_irritation', 'redness_of_eyes', 'sinus_pressure', 'runny_nose', 
    'congestion', 'fast_heart_rate', 'dizziness', 'abdominal_pain', 'mild_fever'
]

# Define Diseases and their primary symptoms
disease_mapping = {
    'Fungal infection': ['itching', 'skin_rash', 'nodal_skin_eruptions'],
    'Allergy': ['continuous_sneezing', 'shivering', 'chills', 'watering_from_eyes'],
    'GERD': ['stomach_pain', 'acidity', 'ulcers_on_tongue', 'vomiting', 'cough', 'chest_pain'],
    'Diabetes': ['fatigue', 'weight_loss', 'restlessness', 'lethargy', 'irregular_sugar_level', 'excessive_hunger', 'increased_appetite', 'polyuria'],
    'Hypertension': ['headache', 'chest_pain', 'dizziness', 'loss_of_balance', 'lack_of_concentration'],
    'Migraine': ['acidity', 'indigestion', 'headache', 'blurred_and_distorted_vision', 'excessive_hunger', 'stiff_neck', 'depression', 'irritability', 'visual_disturbances'],
    'Pneumonia': ['fatigue', 'cough', 'high_fever', 'breathlessness', 'sweating', 'chest_pain', 'malaise', 'phlegm', 'fast_heart_rate', 'rusty_sputum'],
    'Common Cold': ['continuous_sneezing', 'chills', 'fatigue', 'cough', 'high_fever', 'headache', 'swelled_lymph_nodes', 'malaise', 'phlegm', 'throat_irritation', 'redness_of_eyes', 'sinus_pressure', 'runny_nose', 'congestion', 'chest_pain', 'loss_of_smell', 'muscle_pain'],
    'Gastroenteritis': ['vomiting', 'sunken_eyes', 'dehydration', 'diarrhoea'],
}

# Update full symptom list based on mapping
all_symptoms = sorted(list(set([s for syms in disease_mapping.values() for s in syms])))

def generate_data(num_samples=1000):
    data = []
    diseases = list(disease_mapping.keys())
    
    for _ in range(num_samples):
        disease = np.random.choice(diseases)
        primary_syms = disease_mapping[disease]
        
        # Create row
        row = {s: 0 for s in all_symptoms}
        
        # Add primary symptoms (with some noise)
        for s in primary_syms:
            if np.random.random() > 0.1: # 90% chance to have primary symptom
                row[s] = 1
        
        # Add random symptoms (noise)
        for s in all_symptoms:
            if s not in primary_syms and np.random.random() < 0.05: # 5% chance for noise symptom
                row[s] = 1
                
        row['prognosis'] = disease
        data.append(row)
        
    return pd.DataFrame(data)

if __name__ == "__main__":
    df = generate_data(2000)
    base_path = os.path.dirname(os.path.abspath(__file__))
    data_dir = os.path.join(base_path, 'data')
    os.makedirs(data_dir, exist_ok=True)
    df.to_csv(os.path.join(data_dir, 'disease_data.csv'), index=False)
    print(f"Generated dataset with {len(df)} samples and {len(all_symptoms)} symptoms.")
    print("Symptoms:", all_symptoms)
