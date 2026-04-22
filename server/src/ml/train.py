import pandas as pd
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split
import joblib
import os

def train_model():
    base_path = os.path.dirname(os.path.abspath(__file__))
    data_file = os.path.join(base_path, 'data', 'disease_data.csv')
    
    if not os.path.exists(data_file):
        print(f"Dataset not found at {data_file}. Please run dataset_gen.py first.")
        return

    df = pd.read_csv(data_file)
    X = df.drop('prognosis', axis=1)
    y = df['prognosis']

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Use Decision Tree (simplest "Random Forest" concept for simulation and feature importance)
    model = DecisionTreeClassifier(random_state=42)
    model.fit(X_train, y_train)

    # Calculate accuracy
    accuracy = model.score(X_test, y_test)
    print(f"Model trained with accuracy: {accuracy:.2f}")

    # Save model and columns
    model_dir = os.path.join(base_path, 'models')
    os.makedirs(model_dir, exist_ok=True)
    joblib.dump(model, os.path.join(model_dir, 'disease_model.pkl'))
    joblib.dump(X.columns.tolist(), os.path.join(model_dir, 'symptom_columns.pkl'))
    print(f"Model and columns saved to {model_dir}/")

if __name__ == "__main__":
    train_model()
