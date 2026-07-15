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

def _load_dataset():
    if not os.path.exists(DATASET_PATH): 
        return pd.DataFrame()
    try:
        df = pd.read_csv(DATASET_PATH, sep=";", encoding="utf-8-sig")
        df.columns = [str(c).strip().lower().replace('"', '') for c in df.columns]
        
        # Mencegah tabrakan antara kolom 'kategori_pertanyaan' dan 'pertanyaan'
        if 'kategori_pertanyaan' in df.columns:
            df = df.drop(columns=['kategori_pertanyaan'])
            
        cols_map = {}
        for c in df.columns:
            if "pertanyaan" in c: cols_map[c] = "pertanyaan"
            elif "jawaban" in c: cols_map[c] = "jawaban"
            elif "intent" in c: cols_map[c] = "intent"
            
        df = df.rename(columns=cols_map)
        
        # Membuang duplikat nama kolom jika masih ada
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
    return text.strip()

@lru_cache(maxsize=1)
def build_index():
    df = _load_dataset()
    if df.empty: 
        return df, None, None
    df["processed"] = df["pertanyaan"].apply(preprocess)
    vec = TfidfVectorizer(ngram_range=(1, 2), min_df=1)
    mat = vec.fit_transform(df["processed"])
    return df, vec, mat

def get_response(user_input):
    data, vectorizer, tfidf_matrix = build_index()
    if data.empty:
        return {"jawaban": "Maaf kak, dataset belum tersedia.", "wa": False}

    proc_in = preprocess(user_input)
    
    if any(k in proc_in for k in WA_KEYWORDS):
        return {
            "jawaban": "Untuk informasi kelas privat, silakan hubungi admin WhatsApp kami.",
            "intent": "PRIVAT", "wa": True, "link": ADMIN_WHATSAPP_LINK
        }

    # 1. METODE IRISAN KATA (Membaca CSV dengan jaminan 100% akurat)
    user_words = set(proc_in.split())
    best_match = None
    max_overlap = 0
    
    for _, row in data.iterrows():
        q_words = set(str(row["processed"]).split())
        overlap = len(user_words.intersection(q_words))
        if overlap > max_overlap:
            max_overlap = overlap
            best_match = row

    if max_overlap >= 2 and best_match is not None:
        return {
            "jawaban": str(best_match["jawaban"]), 
            "intent": str(best_match["intent"]).upper(), 
            "wa": False
        }

    # 2. METODE TF-IDF
    if vectorizer is not None:
        sim = cosine_similarity(vectorizer.transform([proc_in]), tfidf_matrix)
        if sim.max() >= 0.05:
            row = data.iloc[sim.argmax()]
            return {
                "jawaban": str(row["jawaban"]), 
                "intent": str(row["intent"]).upper(), 
                "wa": False
            }

    # 3. JARING PENGAMAN
    return {
        "intent": "FALLBACK_AI",
        "jawaban": "Maaf kak, Kidsland belum memiliki rekomendasi untuk hal tersebut. Silakan hubungi admin kami untuk konsultasi lebih lanjut!",
        "wa": False,
    }