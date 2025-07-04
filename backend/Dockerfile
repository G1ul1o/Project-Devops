FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY frontend/src/app.py /app/main.py
COPY model/XGBClassifier.pkl /app/XGBClassifier.pkl

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]