import sqlite3

conn = sqlite3.connect("database.db")
cursor = conn.cursor()

cursor.execute("SELECT COUNT(*) FROM sesi_kelas")
jumlah = cursor.fetchone()[0]

if jumlah == 0:
    cursor.execute("""
        INSERT INTO sesi_kelas (nama_sesi, tanggal_kelas, kuota, status)
        VALUES ('Kidsland Minggu Ke-3 Juli', '2026-07-19', 20, 'buka')
    """)
    conn.commit()
    print("Sesi pertama berhasil ditambahkan.")
else:
    print("Sesi sudah ada di database.")

conn.close()