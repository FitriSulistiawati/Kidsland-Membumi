import os
import re
import pandas as pd

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

csv_path = os.path.join(
    BASE_DIR,
    "Dataset_Kidsland_Skripsi_Final.csv"
)

print(csv_path)
print(os.path.exists(csv_path))

df = pd.read_csv(
    csv_path,
    sep=';',
    encoding='utf-8-sig',
    on_bad_lines='skip'
)
print(df.columns)

print(df.head())



# Cleaning Data

def cleaning(text):

    text = str(text)

    # Hapus tanda baca
    text = re.sub(r'[^\w\s]', '', text)

    # Hapus angka
    text = re.sub(r'\d+', '', text)

    # Hapus spasi berlebih
    text = re.sub(r'\s+', ' ', text)

    return text.strip()

df['cleaning'] = df['pertanyaan'].apply(cleaning)

print(df[['pertanyaan','cleaning']].head())

# Case Folding

def case_folding(text):

    return text.lower()

df['case_folding'] = df['cleaning'].apply(case_folding)

print(df[['cleaning','case_folding']].head())

# Normalisasi Kata

normalisasi = {

    # Umum
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
    "dll": "dan lain lain",

    # Pertanyaan
    "brp": "berapa",
    "gmn": "bagaimana",
    "gmn": "bagaimana",
    "knp": "kenapa",
    "apaa": "apa",
    "bgmn": "bagaimana",

    # Lokasi
    "dmn": "dimana",
    "dmna": "dimana",
    "lok": "lokasi",
    "alamatny": "alamatnya",
    "alamatnyaa": "alamatnya",

    # Jadwal
    "jdwl": "jadwal",
    "jadwl": "jadwal",
    "jdwal": "jadwal",

    # Kelas
    "kls": "kelas",
    "kels": "kelas",
    "kelass": "kelas",

    # Anak
    "ank": "anak",
    "ankk": "anak",
    "anaku": "anak",
    "anakku": "anak",

    # Orang Tua
    "ortu": "orang tua",
    "orgtua": "orang tua",
    "orangtua": "orang tua",

    # Usia
    "usi": "usia",
    "usiaa": "usia",
    "umr": "umur",

    # Pendaftaran
    "daftarr": "daftar",
    "daftarin": "daftar",
    "pendftaran": "pendaftaran",
    "pendaftarn": "pendaftaran",

    # Biaya
    "byr": "bayar",
    "byaya": "biaya",
    "biayaa": "biaya",
    "hrg": "harga",

    # Aktivitas
    "aktivtas": "aktivitas",
    "aktifitas": "aktivitas",
    "aktvitas": "aktivitas",
    "kegiatn": "kegiatan",
    "kegiatann": "kegiatan",

    # Kidsland
    "kidslnd": "kidsland",
    "kidslandd": "kidsland",
    "kidland": "kidsland",

    # Fasilitator
    "fasiliator": "fasilitator",
    "fasilitatr": "fasilitator",

    # Waktu
    "harii": "hari",
    "minguu": "minggu",
    "sabtuu": "sabtu",
    "mingguu": "minggu",

    # Chat
    "sy": "saya",
    "akuu": "aku",
    "sya": "saya",
    "sihh": "sih",
    "nihh": "nih",

    # Ya/Tidak
    "yaa": "ya",
    "iy": "iya",
    "iyaa": "iya",
    "tdk": "tidak",
    "gk": "tidak",
    "ga": "tidak",
    "nggak": "tidak",
    "engga": "tidak",

    #tambahan normalisasi kata
    "programnya": "program",
    "kelasnya": "kelas",
    "biayanya": "biaya",
    "jadwalnya": "jadwal"
}

def normalize_text(text):

    words = text.split()

    hasil = []

    for word in words:

        hasil.append(
            normalisasi.get(word, word)
        )

    return " ".join(hasil)

df['normalisasi'] = df['case_folding'].apply(normalize_text)

print(df[['case_folding','normalisasi']].head())

# Tokenisasi 

def tokenisasi(text):

    return text.split()

df['tokenisasi'] = df['normalisasi'].apply(tokenisasi)

print(df[['normalisasi','tokenisasi']].head())

# Stopword Removal

import nltk
from nltk.corpus import stopwords

nltk.download('stopwords')

stop_words = set(stopwords.words('indonesian'))

def stopword_removal(tokens):

    hasil = []

    for word in tokens:

        if word not in stop_words:

            hasil.append(word)

    return hasil

df['stopword_removal'] = df['tokenisasi'].apply(stopword_removal)

print(df[['tokenisasi','stopword_removal']].head())

# ==================================
# Mengubah List Menjadi Kalimat
# ==================================

df['hasil_preprocessing'] = df['stopword_removal'].apply(
    lambda x: ' '.join(x)
)

print(
    df[
        [
            'stopword_removal',
            'hasil_preprocessing'
        ]
    ].head()
)

for intent in df['intent'].unique():

    print("\n===== ", intent, " =====")

    print(
        df[
            df['intent'] == intent
        ][
            'hasil_preprocessing'
        ].head(2)
    )

from sklearn.feature_extraction.text import TfidfVectorizer

# ==================================
# TF-IDF
# ==================================

tfidf = TfidfVectorizer(
    ngram_range=(1,2),   # unigram + bigram
    min_df=2             # kata muncul minimal 2 kali
)

tfidf_matrix = tfidf.fit_transform(
    df['hasil_preprocessing']
)

print("\n=== HASIL TF-IDF ===")

print("Jumlah Dokumen :", tfidf_matrix.shape[0])
print("Jumlah Fitur   :", tfidf_matrix.shape[1])

# Menampilkan nama fitur
fitur = tfidf.get_feature_names_out()

print("\n10 Fitur Pertama:")
print(fitur[:10])

# Membuat DataFrame TF-IDF

tfidf_df = pd.DataFrame(
    tfidf_matrix.toarray(),
    columns=tfidf.get_feature_names_out()
)

print("\nData TF-IDF:")
print(tfidf_df.head())

print(
    df[
        ['intent', 'hasil_preprocessing']
    ].sample(20, random_state=42)
)

## Cosine Similarity

from sklearn.metrics.pairwise import cosine_similarity

similarity_matrix = cosine_similarity(
    tfidf_matrix,
    tfidf_matrix
)

print("\n=== COSINE SIMILARITY ===")
print("Ukuran Matriks :", similarity_matrix.shape)