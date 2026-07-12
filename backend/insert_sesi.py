import sqlite3

conn = sqlite3.connect("database.db")
cursor = conn.cursor()

cursor.execute("""
INSERT INTO sesi_kelas
(nama_sesi,tanggal_kelas,kuota,pendaftaran_dibuka)
VALUES
(
'Kidsland Minggu Ke-3 Juli',
'2026-07-19',
20,
1
)
""")

conn.commit()
conn.close()

print("Sesi berhasil ditambahkan")