from fastapi import FastAPI, HTTPException
import joblib
import pandas as pd
from pydantic import BaseModel
from sklearn.preprocessing import LabelEncoder

app = FastAPI()

# Charger le modèle avec joblib
model = joblib.load("XGBCl.pklassifier")
label_encoder = joblib.load("LabelEncoderHeroType.pkl")

range_encoder = LabelEncoder()
range_encoder.classes_ = ['melee', 'ranged']

class ChampionFeatures(BaseModel):
    hp_base: float
    mp_base: float
    dam_base: float
    arm_base: float
    mr_base: float
    range: str  # 'melee' ou 'ranged'
    mobility: float  # on suppose qu'elle est envoyée ou par défaut 0

@app.get("/predict")
def predict(features: ChampionFeatures):
    try:
        encoded_range = 0 if data.range.lower() == "melee" else 1

        input_df = pd.DataFrame([{
                "hp_base": features.hp_base,
                "mp_base": features.mp_base,
                "dam_base": features.dam_base,
                "arm_base": features.arm_base,
                "mr_base": features.mr_base,
                "range": encoded_range,
                "mobility": features.mobility
            }])
        
        y_pred_encoded = model.predict(input_df)[0]
        y_pred_label = label_encoder.inverse_transform([y_pred_encoded])[0]

        return {
            "prediction_encoded": int(y_pred_encoded),
            "prediction": y_pred_label
        }
    
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))