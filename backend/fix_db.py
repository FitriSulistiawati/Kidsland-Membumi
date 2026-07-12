import sqlite3

conn = sqlite3.connect("database.db")
cursor = conn.cursor()

try:
    cursor.execute("ALTER TABLE sesi_kelas ADD COLUMN status TEXT DEFAULT 'buka'")
    conn.commit()
    print("Berhasil: Kolom 'status' telah ditambahkan ke tabel sesi_kelas.")
except sqlite3.OperationalError as e:
    print(f"Keterangan: {e}")

conn.close()