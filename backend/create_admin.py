import sqlite3

conn = sqlite3.connect("database.db")
cursor = conn.cursor()

try:
    cursor.execute("""
        INSERT INTO users (nama, email, password)
        VALUES ('Admin Utama', 'admin@kidsland.com', 'admin123')
    """)
    conn.commit()
    print("Akun admin berhasil dibuat.")
except sqlite3.IntegrityError:
    print("Email sudah terdaftar.")

conn.close()