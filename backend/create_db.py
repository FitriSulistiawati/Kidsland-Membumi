import sqlite3

conn = sqlite3.connect("database.db")
cursor = conn.cursor()

# users
cursor.execute("""
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nama TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
)
""")

# sesi kelas
cursor.execute("""
CREATE TABLE IF NOT EXISTS sesi_kelas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nama_sesi TEXT,
    tanggal_kelas TEXT,
    kuota INTEGER DEFAULT 20,
    status TEXT DEFAULT 'buka'
)
""")

# pendaftaran
cursor.execute("""
CREATE TABLE IF NOT EXISTS pendaftaran (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sesi_id INTEGER,
    nama_anak TEXT,
    usia INTEGER,
    nama_orangtua TEXT,
    no_hp TEXT,
    minat TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(sesi_id) REFERENCES sesi_kelas(id)
)
""")

conn.commit()
conn.close()

print("Database berhasil dibuat")