FROM python:3.10-slim

WORKDIR /app

COPY backend/ /app/
COPY model/XGBClassifier.pkl /app/XGBClassifier.pkl
COPY model/LabelEncoderHeroType.pkl /app/LabelEncoderHeroType.pkl

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8000

CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8000"]