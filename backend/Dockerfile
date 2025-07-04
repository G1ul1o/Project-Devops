FROM python:3.10-slim

WORKDIR /app

COPY model/XGBClassifier.pkl /app/XGBClassifier.pkl

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]