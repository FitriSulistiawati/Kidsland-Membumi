import re
import pandas as pd
import nltk

from nltk.corpus import stopwords
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# ==================================
# Download Stopwords
# ==================================

nltk.download('stopwords')

stop_words = set(stopwords.words('indonesian'))

# ==================================
# Load Dataset
# ==================================

import os

BASE_DIR = os.path.dirname(
    os.path.abspath(__file__)
)

csv_path = os.path.join(
    BASE_DIR,
    "Dataset_Kidsland_Skripsi_Final.csv"
)

df = pd.read_csv(
    csv_path,
    sep=';'
)

print("Dataset berhasil dimuat")
print("Jumlah data:", len(df))

# ==================================
# Cleaning
# ==================================

def cleaning(text):

    text = str(text)

    text = re.sub(r'[^\w\s]', ' ', text)
    text = re.sub(r'\d+', ' ', text)
    text = re.sub(r'\s+', ' ', text)

    return text.strip()

# ==================================
# Case Folding
# ==================================

def case_folding(text):

    return text.lower()

# ==================================
# Normalisasi
# ==================================

normalisasi = {

    "yg": "yang",
    "utk": "untuk",
    "dr": "dari",
    "dgn": "dengan",
    "pd": "pada",
    "krn": "karena",
    "sdh": "sudah",
    "blm": "belum",
    "jg": "juga",
    "aja": "saja",

    "brp": "berapa",
    "gmn": "bagaimana",
    "knp": "kenapa",
    "bgmn": "bagaimana",

    "dmn": "dimana",
    "dmna": "dimana",

    "jdwl": "jadwal",
    "jadwl": "jadwal",

    "kls": "kelas",
    "kelass": "kelas",

    "ank": "anak",
    "ankk": "anak",

    "ortu": "orang tua",
    "orangtua": "orang tua",

    "umr": "umur",

    "byr": "bayar",
    "byaya": "biaya",
    "biayaa": "biaya",
    "hrg": "harga",

    "kidslnd": "kidsland",
    "kidslandd": "kidsland",

    "yaa": "ya",
    "iyaa": "iya",

    "tdk": "tidak",
    "gk": "tidak",
    "ga": "tidak",
    "nggak": "tidak",

    "programnya": "program",
    "kelasnya": "kelas",
    "biayanya": "biaya",
    "jadwalnya": "jadwal",
}

def normalize_text(text):

    words = text.split()

    hasil = []

    for word in words:

        hasil.append(
            normalisasi.get(word, word)
        )

    return " ".join(hasil)

# ==================================
# Stopword Removal
# ==================================

def stopword_removal(text):

    tokens = text.split()

    hasil = []

    for word in tokens:

        if word not in stop_words:

            hasil.append(word)

    return " ".join(hasil)

# ==================================
# Preprocessing
# ==================================

def preprocess(text):

    text = cleaning(text)

    text = case_folding(text)

    text = normalize_text(text)

    text = stopword_removal(text)

    return text

# ==================================
# Preprocessing Dataset
# ==================================

df["processed"] = df["pertanyaan"].apply(
    preprocess
)

# ==================================
# TF-IDF
# ==================================

vectorizer = TfidfVectorizer(
    ngram_range=(1,2),
    min_df=2
)

tfidf_matrix = vectorizer.fit_transform(
    df["processed"]
)

print("TF-IDF berhasil dibuat")
print("Jumlah fitur :", tfidf_matrix.shape[1])

# ==================================
# Chatbot Response
# ==================================

ADMIN_WHATSAPP_LINK = "https://wa.me/6285117568551"
REDIRECT_INTENTS = {"PRIVAT"}
AI_INTENTS = {"REKOMENDASI"}
WA_KEYWORDS = {
    "privat",
    "kelas privat",
    "private",
    "booking privat",
    "daftar privat",
    "reservasi privat"
}


def is_whatsapp_topic(text):

    return any(keyword in text for keyword in WA_KEYWORDS)


def get_response(user_input):

    processed_input = preprocess(user_input)

    user_vector = vectorizer.transform(
        [processed_input]
    )

    similarity = cosine_similarity(
        user_vector,
        tfidf_matrix
    )

    best_match = similarity.argmax()

    best_score = similarity.max()

    print("Pertanyaan:", user_input)
    print("Processed:", processed_input)
    print("Best Score:", best_score)
    print("Best Match:", df.iloc[best_match]["pertanyaan"])
    print("Jawaban:", df.iloc[best_match]["jawaban"])
    print("Intent:", df.iloc[best_match]["intent"])

    if best_score < 0.30:

        if is_whatsapp_topic(processed_input):
            return {
                "jawaban": "Untuk informasi atau pemesanan kelas privat,silakan hubungi admin WhatsApp kami.",
                "wa": True,
                "link": ADMIN_WHATSAPP_LINK
            }

        return {
            "jawaban": "Maaf kak, pertanyaan tersebut belum tersedia di database Kidsland Membumi.",
            "wa": False
        }

    data = df.iloc[best_match]

    intent = data["intent"]

    if intent in REDIRECT_INTENTS or is_whatsapp_topic(processed_input):

        return {
            "jawaban": data["jawaban"],
            "intent": intent,
            "wa": True,
            "link": ADMIN_WHATSAPP_LINK
        }

    return {
        "jawaban": data["jawaban"],
        "intent": intent,
        "wa": False
    }

# ==================================
# Testing
# ==================================

if __name__ == "__main__":

    while True:

        user = input("\nAnda : ")

        if user.lower() == "exit":
            break

        response = get_response(user)

        print("Bot :", response)