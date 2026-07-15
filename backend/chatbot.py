import os
import re
from functools import lru_cache

import nltk
import pandas as pd
from nltk.corpus import stopwords
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATASET_PATH = os.path.join(BASE_DIR, "Kidsland_Dataset_Fiks.csv")

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

    try:
        with open(DATASET_PATH, "r", encoding="utf-8-sig") as handle:
            lines = [line.rstrip("\r\n") for line in handle if line.strip()]

        if not lines:
            raise ValueError("Dataset kosong")

        rows = []
        for raw_line in lines:
            line = raw_line.strip()
            if line.startswith('"') and line.endswith('"'):
                line = line[1:-1]
            parts = [part.strip().strip('"') for part in line.split("\t")]
            rows.append(parts)

        header = [col.strip().strip('"').lower() for col in rows[0]]
        data_rows = []
        for parts in rows[1:]:
            if len(parts) < len(header):
                parts = parts + [""] * (len(header) - len(parts))
            elif len(parts) > len(header):
                parts = parts[: len(header) - 1] + ["\t".join(parts[len(header) - 1 :])]
            data_rows.append(parts)

        df = pd.DataFrame(data_rows, columns=header)
    except Exception:
        df = pd.DataFrame()

    if not df.empty:
        first_row = df.iloc[0].astype(str).str.strip().tolist()
        if first_row and first_row[0].startswith('"'):
            first_row = [value.strip().strip('"') for value in first_row]
        if len(first_row) >= len(header) and first_row == [value.strip().strip('"') for value in header]:
            df = df.iloc[1:].copy()

    print("Kolom dataset:")
    print(df.columns.tolist())
    print(df.head())

    if df.empty:
        return df

    cleaned_columns = []
    for col in df.columns:
        cleaned = str(col).strip().strip('"').strip().lower()
        if "pertanyaan" in cleaned:
            cleaned_columns.append("pertanyaan")
        elif "jawaban" in cleaned:
            cleaned_columns.append("jawaban")
        elif "intent" in cleaned:
            cleaned_columns.append("intent")
        else:
            cleaned_columns.append(cleaned)

    df.columns = cleaned_columns

    for col in ["pertanyaan", "jawaban", "intent"]:
        if col not in df.columns:
            df[col] = ""

    if df.columns.duplicated().any():
        df = df.loc[:, ~df.columns.duplicated()]

    if "pertanyaan" in df.columns and "jawaban" in df.columns:
        df = df[[col for col in ["id", "pertanyaan", "jawaban", "intent"] if col in df.columns]]

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
    if isinstance(text, pd.Series):
        text = text.iloc[0] if not text.empty else ""
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

    data = df[[col for col in ["pertanyaan", "jawaban", "intent"] if col in df.columns]].copy()
    data["processed"] = data["pertanyaan"].fillna("").astype(str).apply(preprocess)

    vectorizer = TfidfVectorizer(ngram_range=(1, 2), min_df=2)
    tfidf_matrix = vectorizer.fit_transform(data["processed"])
    return data, vectorizer, tfidf_matrix

def is_whatsapp_topic(text):
    return any(keyword in text for keyword in WA_KEYWORDS)


def keyword_fallback(user_input, data):
    text = preprocess(user_input or "")
    if not text:
        return None

    lowered = text.lower()

    if "biaya" in lowered or "harga" in lowered or "tarif" in lowered:
        return data[data["intent"].astype(str).str.upper() == "BIAYA"].iloc[0] if not data.empty else None
    if "lokasi" in lowered or "alamat" in lowered or "dimana" in lowered:
        return data[data["intent"].astype(str).str.upper() == "LOKASI"].iloc[0] if not data.empty else None
    if "usia" in lowered or "umur" in lowered or "anak" in lowered:
        return data[data["intent"].astype(str).str.upper() == "USIA"].iloc[0] if not data.empty else None
    if "jadwal" in lowered or "kapan" in lowered or "hari" in lowered:
        return data[data["intent"].astype(str).str.upper() == "JADWAL"].iloc[0] if not data.empty else None
    if "program" in lowered or "kelas" in lowered:
        return data[data["intent"].astype(str).str.upper() == "PROGRAM"].iloc[0] if not data.empty else None
    return None


def get_response(user_input):
    data, vectorizer, tfidf_matrix = build_index()

    if data.empty or vectorizer is None or tfidf_matrix is None:
        return {"jawaban": "Maaf kak, dataset belum tersedia.", "wa": False}

    processed_input = preprocess(user_input or "")
    user_vector = vectorizer.transform([processed_input])
    similarity = cosine_similarity(user_vector, tfidf_matrix)
    best_match = int(similarity.argmax())
    best_score = float(similarity.max())

    row = None
    if best_score >= 0.05:
        row = data.iloc[best_match]
    else:
        row = keyword_fallback(user_input, data)

    if row is None:
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