from fastapi import FastAPI, HTTPException
import joblib
import pandas as pd
from pydantic import BaseModel
from sklearn.preprocessing import LabelEncoder
from fastapi.middleware.cors import CORSMiddleware
from loguru import logger

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # ou ["*"] pour tout autoriser (déconseillé en prod)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Charger le modèle avec joblib
model = joblib.load("../XGBClassifier.pkl")
label_encoder = joblib.load("../LabelEncoderHeroType.pkl")

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

@app.post("/predict")
def predict(features: ChampionFeatures):
    print(features)
    try:
        
        encoded_range = 0 if features.range.lower() == "melee" else 1
        print(encoded_range)
        input_df = pd.DataFrame([{
                "hp_base": features.hp_base,
                "mp_base": features.mp_base, 
                "arm_base": features.arm_base,
                "mr_base": features.mr_base,
                "dam_base": features.dam_base,
                "range": encoded_range,
                "mobility": features.mobility
            }])
        
        logger.info(f"\ninput_def\n,{input_df}")

        y_pred_encoded = model.predict(input_df)[0]
        logger.info(f"\ny_pred_encoded\n,{y_pred_encoded}")
        y_pred_label = label_encoder.inverse_transform([y_pred_encoded])[0]
        print(y_pred_label)
        return {
            "prediction_encoded": int(y_pred_encoded),
            "prediction": y_pred_label
        }
    
    except Exception as e:
        print(e)
        raise HTTPException(status_code=400, detail=str(e))