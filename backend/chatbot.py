import os
import re
from functools import lru_cache

import nltk
import pandas as pd
from nltk.corpus import stopwords
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATASET_PATH = os.path.join(BASE_DIR, "Dataset_Kidsland_Skripsi_Final_Fiks.csv")

ADMIN_WHATSAPP_LINK = "https://wa.me/6285117568551"
REDIRECT_INTENTS = {"PRIVAT"}
WA_KEYWORDS = {
    "privat",
    "kelas privat",
    "private",
    "booking privat",
    "daftar privat",
    "reservasi privat",
}

def _ensure_stopwords():
    try:
        return set(stopwords.words("indonesian"))
    except LookupError:
        try:
            nltk.download("stopwords", quiet=True)
        except Exception:
            pass
        return set(stopwords.words("indonesian"))

STOP_WORDS = _ensure_stopwords()

def _load_dataset():
    if not os.path.exists(DATASET_PATH):
        raise FileNotFoundError(f"Dataset tidak ditemukan: {DATASET_PATH}")

    with open(DATASET_PATH, "r", encoding="utf-8-sig") as handle:
        lines = [line.rstrip("\r\n") for line in handle if line.strip()]

    if not lines:
        raise ValueError("Dataset kosong")

    header = [col.strip().strip('"').lower() for col in lines[0].strip().strip('"').split("\t") if col.strip()]
    rows = []

    for raw_line in lines[1:]:
        line = raw_line.strip().strip('"')
        parts = [part.strip().strip('"') for part in line.split("\t")]

        if len(parts) < len(header):
            parts.extend([""] * (len(header) - len(parts)))
        elif len(parts) > len(header):
            parts = parts[: len(header) - 1] + ["\t".join(parts[len(header) - 1 :])]

        rows.append({header[idx]: parts[idx] if idx < len(parts) else "" for idx in range(len(header))})

    df = pd.DataFrame(rows)

    print("Kolom dataset:")
    print(df.columns.tolist())
    print(df.head())
    
    if df.empty:
        return df

    rename_map = {}
    for col in df.columns:
        low = str(col).lower().strip()
        if "pertanyaan" in low:
            rename_map[col] = "pertanyaan"
        elif "jawaban" in low:
            rename_map[col] = "jawaban"
        elif "intent" in low:
            rename_map[col] = "intent"

    if rename_map:
        df = df.rename(columns=rename_map)

    for col in ["pertanyaan", "jawaban", "intent"]:
        if col not in df.columns:
            df[col] = ""

    if "id" not in df.columns:
        df["id"] = range(1, len(df) + 1)

    return df

@lru_cache(maxsize=1)
def get_dataset():
    return _load_dataset()

def cleaning(text):
    text = str(text or "")
    text = re.sub(r"[^\w\s]", " ", text)
    text = re.sub(r"\d+", " ", text)
    text = re.sub(r"\s+", " ", text)
    return text.strip()

def case_folding(text):
    return text.lower()

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
        hasil.append(normalisasi.get(word, word))
    return " ".join(hasil)

def stopword_removal(text):
    tokens = text.split()
    hasil = []
    for word in tokens:
        if word not in STOP_WORDS:
            hasil.append(word)
    return " ".join(hasil)

def preprocess(text):
    text = cleaning(text)
    text = case_folding(text)
    text = normalize_text(text)
    text = stopword_removal(text)
    return text

@lru_cache(maxsize=1)
def build_index():
    df = get_dataset()
    if df.empty:
        return df, None, None

    data = df[["pertanyaan", "jawaban", "intent"]].copy()
    data["processed"] = data["pertanyaan"].fillna("").astype(str).apply(preprocess)

    vectorizer = TfidfVectorizer(ngram_range=(1, 2), min_df=2)
    tfidf_matrix = vectorizer.fit_transform(data["processed"])
    return data, vectorizer, tfidf_matrix

def is_whatsapp_topic(text):
    return any(keyword in text for keyword in WA_KEYWORDS)

def get_response(user_input):
    data, vectorizer, tfidf_matrix = build_index()

    if data.empty or vectorizer is None or tfidf_matrix is None:
        return {"jawaban": "Maaf kak, dataset belum tersedia.", "wa": False}

    processed_input = preprocess(user_input or "")
    user_vector = vectorizer.transform([processed_input])
    similarity = cosine_similarity(user_vector, tfidf_matrix)
    best_match = int(similarity.argmax())
    best_score = float(similarity.max())

    if best_score < 0.30:
        if is_whatsapp_topic(processed_input):
            return {
                "jawaban": "Untuk informasi atau pemesanan kelas privat, silakan hubungi admin WhatsApp kami.",
                "wa": True,
                "link": ADMIN_WHATSAPP_LINK,
            }
        return {
            "jawaban": "Maaf kak, pertanyaan tersebut belum tersedia di database Kidsland Membumi.",
            "wa": False,
        }

    row = data.iloc[best_match]
    intent = str(row["intent"]).upper().strip()

    if intent in REDIRECT_INTENTS or is_whatsapp_topic(processed_input):
        return {
            "jawaban": row["jawaban"],
            "intent": intent,
            "wa": True,
            "link": ADMIN_WHATSAPP_LINK,
        }

    return {
        "jawaban": row["jawaban"],
        "intent": intent,
        "wa": False,
    }