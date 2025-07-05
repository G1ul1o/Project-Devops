import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import ast
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from xgboost import XGBClassifier
from sklearn.metrics import confusion_matrix, accuracy_score,f1_score
import mlflow
import mlflow.sklearn
from sklearn.datasets import load_digits
import dagshub
import joblib


dagshub.init(repo_owner='G1ul1o', repo_name='Project-Devops', mlflow=True)
experiment_name = "Project_Devops_Mlops"
mlflow.set_experiment(experiment_name)



# Chargement
df = pd.read_csv('050625_LoL_champion_data.csv', index_col="Unnamed: 0")

# Extraction des colonnes utiles
df = df[["herotype", "stats","mobility"]].reset_index(drop=True)

# Conversion de la colonne 'stats' (qui est un string représentant un dict)
stats_df = df["stats"].apply(lambda x: pd.Series(ast.literal_eval(x)))
stats_df = stats_df.fillna(0)

# Encodage du herotype


le = LabelEncoder()
stats_df["range"] = le.fit_transform(stats_df["range"])

le = LabelEncoder()
df["herotype_encoded"] = le.fit_transform(df["herotype"])

# Fusionner les stats avec le herotype encodé
data_with_label = stats_df.copy()
data_with_label["herotype"] = df["herotype_encoded"]
data_with_label["mobility"] = df["mobility"]

cols_to_drop = ['ar', 'swift', 'ofa', 'nb', 'aram', 'urf', 'usb']
data_with_label.drop(columns=cols_to_drop,inplace=True)
data_with_essential_stats = data_with_label[["hp_base","mp_base","arm_base","mr_base","dam_base","range","mobility","herotype"]]
'''# Matrice de corrélation
cm = data_with_essential_stats.corr()

# Affichage
plt.figure(figsize=(10, 8))
sns.heatmap(cm, annot=True, fmt=".2f", cmap="coolwarm", square=True)
plt.title("Matrice de corrélation (avec herotype)")
plt.tight_layout()
plt.savefig("correlation_matrix_with_herotype.png")
plt.show()'''


y = data_with_essential_stats["herotype"]
data_with_essential_stats.drop(columns=["herotype"],inplace=True)
X_train, X_valid, y_train, y_valid = train_test_split(
    data_with_essential_stats, y, train_size=0.8, test_size=0.2, random_state=0)

def train_and_log_model(n_estimators, random_state,max_depth,learning_rate,subsample,colsample_bytree):
    
    with mlflow.start_run():
        # Train the model
        model = XGBClassifier(n_estimators=n_estimators, 
                              random_state=random_state,
                              max_depth=max_depth,
                              learning_rate=learning_rate,
                              subsample=subsample,
                              colsample_bytree=colsample_bytree)
        model.fit(X_train, y_train)

        # Evaluate
        predictions = model.predict(X_valid)
        accuracy = accuracy_score(y_valid, predictions)
        f1score = f1_score(y_valid,predictions, average='weighted')

        # Log params & metrics
        mlflow.log_param("n_estimators", n_estimators)
        mlflow.log_param("random_state", random_state)
        mlflow.log_param("max_depth", max_depth)
        mlflow.log_param("learning_rate", learning_rate)
        mlflow.log_param("subsample", subsample)
        mlflow.log_param("colsample_bytree", colsample_bytree)
        mlflow.log_metric("accuracy", accuracy)
        mlflow.log_metric("f1_score", f1score)

        # Save & log the model manually
        local_model_path = "XGBClassifier.pkl"
        joblib.dump(model, local_model_path)
        mlflow.log_artifact(local_model_path, artifact_path="model")

        local_model_path = "LabelEncoderHeroType.pkl"
        joblib.dump(le, local_model_path)
        mlflow.log_artifact(local_model_path, artifact_path="model")
        

        print(f"✔️ Modèle loggué avec accuracy={accuracy:.4f}")

train_and_log_model(n_estimators=100, random_state=42,max_depth=3,learning_rate=0.01,subsample=0.7,colsample_bytree=0.7)
train_and_log_model(n_estimators=300, random_state=42,max_depth=5,learning_rate=0.1,subsample=0.8,colsample_bytree=0.8)
train_and_log_model(n_estimators=500, random_state=42,max_depth=7,learning_rate=0.2,subsample=1,colsample_bytree=1)