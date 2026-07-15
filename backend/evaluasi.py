import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix
)

from sklearn.metrics.pairwise import cosine_similarity

# ==========================
# Load Dataset
# ==========================

df = pd.read_csv(
    "Kidsland_Dataset_Fiks.csv",
    sep=';'
)

X = df["pertanyaan"]
y = df["intent"]

# ==========================
# Split Data
# ==========================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

# ==========================
# TF-IDF
# ==========================

vectorizer = TfidfVectorizer(
    ngram_range=(1,2),
    min_df=2
)

X_train_tfidf = vectorizer.fit_transform(
    X_train
)

X_test_tfidf = vectorizer.transform(
    X_test
)

# ==========================
# Prediksi dengan
# Cosine Similarity
# ==========================

y_pred = []

for i in range(X_test_tfidf.shape[0]):

    similarity = cosine_similarity(
        X_test_tfidf[i],
        X_train_tfidf
    )

    best_index = similarity.argmax()

    prediksi = y_train.iloc[best_index]

    y_pred.append(prediksi)

# ==========================
# Evaluasi
# ==========================

acc = accuracy_score(
    y_test,
    y_pred
)

print("\n=== HASIL EVALUASI ===")

print(
    "Akurasi :",
    round(acc,4)
)

print("\nClassification Report:\n")

print(
    classification_report(
        y_test,
        y_pred
    )
)

print("\nConfusion Matrix:\n")

cm = confusion_matrix(
    y_test,
    y_pred
)

print(cm)

