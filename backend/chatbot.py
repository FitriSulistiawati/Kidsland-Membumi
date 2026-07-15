import os
import re
import pandas as pd
from functools import lru_cache
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATASET_PATH = os.path.join(BASE_DIR, "Kidsland_Dataset_Fiks.csv")
ADMIN_WHATSAPP_LINK = "https://wa.me/6285117568551"
WA_KEYWORDS = {"privat", "private", "booking", "reservasi", "daftar"}

# Daftar kata umum yang akan diabaikan agar sistem tidak salah menebak
STOPWORDS = {"yang", "untuk", "dari", "dengan", "pada", "karena", "saya", "kak", "min", "halo", "permisi", "apa", "bagaimana", "cocok", "kegiatan", "aktivitas", "ya"}

def _load_dataset():
    if not os.path.exists(DATASET_PATH): 
        return pd.DataFrame()
    try:
        df = pd.read_csv(DATASET_PATH, sep=";", encoding="utf-8-sig")
        df.columns = [str(c).strip().lower().replace('"', '') for c in df.columns]
        
        if 'kategori_pertanyaan' in df.columns:
            df = df.drop(columns=['kategori_pertanyaan'])
            
        cols_map = {}
        for c in df.columns:
            if "pertanyaan" in c: cols_map[c] = "pertanyaan"
            elif "jawaban" in c: cols_map[c] = "jawaban"
            elif "intent" in c: cols_map[c] = "intent"
            
        df = df.rename(columns=cols_map)
        df = df.loc[:, ~df.columns.duplicated()] 
        
        for col in ["pertanyaan", "jawaban", "intent"]:
            if col not in df.columns: df[col] = ""
            
        return df[["pertanyaan", "jawaban", "intent"]].dropna(subset=["pertanyaan"])
    except: 
        return pd.DataFrame()

def preprocess(text):
    if pd.isna(text): return ""
    text = str(text).lower()
    text = re.sub(r"[^\w\s]", " ", text)
    words = text.split()
    # Hapus kata-kata umum agar AI fokus pada inti (misal: "kardus", "menggambar", "air")
    words = [w for w in words if w not in STOPWORDS]
    return " ".join(words)

@lru_cache(maxsize=1)
def build_index():
    df = _load_dataset()
    if df.empty: 
        return df, None, None
    df["processed"] = df["pertanyaan"].apply(preprocess)
    # min_df=1 memastikan kata unik (seperti "menggambar") tidak dibuang
    vec = TfidfVectorizer(ngram_range=(1, 2), min_df=1)
    mat = vec.fit_transform(df["processed"])
    return df, vec, mat

def get_response(user_input):
    data, vectorizer, tfidf_matrix = build_index()
    if data.empty:
        return {"jawaban": "Maaf kak, dataset belum tersedia.", "wa": False}

    proc_in = preprocess(user_input)
    raw_in = str(user_input).lower().strip()
    
    if any(k in raw_in for k in WA_KEYWORDS):
        return {
            "jawaban": "Untuk informasi kelas privat, silakan hubungi admin WhatsApp kami.",
            "intent": "PRIVAT", "wa": True, "link": ADMIN_WHATSAPP_LINK
        }

    # Penilaian kecocokan menggunakan TF-IDF
    if vectorizer is not None and proc_in.strip() != "":
        user_vec = vectorizer.transform([proc_in])
        sim = cosine_similarity(user_vec, tfidf_matrix)
        best_score = sim.max()
        
        # UBAH ANGKA 0.3 MENJADI 0.6
        if best_score > 0.6: 
            best_match_idx = sim.argmax()
            row = data.iloc[best_match_idx]
            return {
                "jawaban": str(row["jawaban"]), 
                "intent": str(row["intent"]).upper(), 
                "wa": False
            }

    # Jika kemiripan di bawah 60% (0.6), buang ke AI
    return {
        "intent": "FALLBACK_AI",
        "jawaban": "Maaf kak, Kidsland belum memiliki rekomendasi untuk hal tersebut. Silakan hubungi admin kami untuk konsultasi lebih lanjut!",
        "wa": False,
    }