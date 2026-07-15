import pandas as pd
import joblib
import re
from sklearn.feature_extraction.text import TfidfVectorizer

# Load dataset
df = pd.read_csv('Kidsland_Dataset_Fiks.csv', sep=';')

# Gunakan fungsi cleaning yang sama dengan di preprocessing.py
def cleaning(text):
    text = str(text)
    text = re.sub(r'[^\w\s]', ' ', text)
    text = re.sub(r'\d+', ' ', text)
    text = re.sub(r'\s+', ' ', text)
    return text.strip().lower()

# Preprocess data
df['clean_text'] = df['pertanyaan'].apply(cleaning)

# Inisialisasi TF-IDF
vectorizer = TfidfVectorizer(ngram_range=(1, 2), min_df=2)
tfidf_matrix = vectorizer.fit_transform(df['clean_text'])

# Simpan ke file .pkl
joblib.dump(vectorizer, 'tfidf_model.pkl')
joblib.dump(tfidf_matrix, 'tfidf_matrix.pkl')

print("Model dan Matrix berhasil disimpan!")