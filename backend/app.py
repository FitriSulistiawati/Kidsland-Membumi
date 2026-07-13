from gemini_helper import generate_activity_recommendation
from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

from chatbot import get_response

app = Flask(__name__)
CORS(app)


@app.route("/")
def home():
    return "Chatbot Kidsland Membumi Aktif"


@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    print("DATA DITERIMA:", data)
    user_message = data.get("message", "")

    result = get_response(user_message)
    print("INTENT:", result.get("intent"))
    print("TFIDF:", result)

    if result.get("intent") == "REKOMENDASI":
        try:
            ai_answer = generate_activity_recommendation(
                user_message,
                result["jawaban"]
            )
            result["jawaban"] = ai_answer
        except Exception as e:
            print("GEMINI ERROR:", e)

    return jsonify(result)


@app.route("/pendaftaran", methods=["POST"])
def pendaftaran():
    data = request.get_json()

    nama_anak = data.get("nama_anak")
    usia = data.get("usia")
    nama_orangtua = data.get("nama_orangtua")
    no_hp = data.get("no_hp")
    minat = data.get("minat")

    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()

    # Ambil sesi yang statusnya buka
    cursor.execute("""
        SELECT id, kuota, status
        FROM sesi_kelas
        WHERE status = 'buka'
        ORDER BY tanggal_kelas ASC
        LIMIT 1
    """)

    sesi = cursor.fetchone()

    if sesi is None:
        conn.close()
        return jsonify({
            "message": "Maaf, tidak ada kelas yang dibuka minggu ini."
        }), 400

    sesi_id = sesi[0]
    kuota = sesi[1]
    status = sesi[2]

    # Jika admin menutup pendaftaran
    if status == "tutup":
        conn.close()
        return jsonify({
            "message": "Maaf, pendaftaran untuk minggu ini ditutup."
        }), 400

    # Hitung jumlah pendaftar
    cursor.execute("""
        SELECT COUNT(*)
        FROM pendaftaran
        WHERE sesi_id = ?
    """, (sesi_id,))

    jumlah_pendaftar = cursor.fetchone()[0]

    # Jika kuota penuh
    if jumlah_pendaftar >= kuota:
        cursor.execute("""
            UPDATE sesi_kelas
            SET status='tutup'
            WHERE id=?
        """, (sesi_id,))
        conn.commit()
        conn.close()

        return jsonify({
            "message": "Kuota kelas minggu ini sudah penuh."
        }), 400

    # Simpan pendaftaran
    cursor.execute("""
        INSERT INTO pendaftaran
        (
            sesi_id,
            nama_anak,
            usia,
            nama_orangtua,
            no_hp,
            minat
        )
        VALUES
        (?, ?, ?, ?, ?, ?)
    """,
    (
        sesi_id,
        nama_anak,
        usia,
        nama_orangtua,
        no_hp,
        minat
    ))

    conn.commit()

    # Hitung ulang setelah insert
    cursor.execute("""
        SELECT COUNT(*)
        FROM pendaftaran
        WHERE sesi_id=?
    """, (sesi_id,))

    jumlah_pendaftar = cursor.fetchone()[0]

    # Tutup otomatis jika kuota penuh
    if jumlah_pendaftar >= kuota:
        cursor.execute("""
            UPDATE sesi_kelas
            SET status='tutup'
            WHERE id=?
        """, (sesi_id,))
        conn.commit()

    conn.close()

    return jsonify({
        "message": "Pendaftaran berhasil."
    })


@app.route("/sesi", methods=["GET"])
def get_sesi():
    conn = sqlite3.connect("database.db")
    conn.row_factory = sqlite3.Row

    cursor = conn.cursor()
    cursor.execute("""
        SELECT *
        FROM sesi_kelas
        ORDER BY tanggal_kelas ASC
    """)

    data = cursor.fetchall()
    conn.close()

    return jsonify([dict(row) for row in data])


@app.route("/sesi/<int:id>", methods=["PUT", "OPTIONS"])
def update_sesi(id):
    if request.method == "OPTIONS":
        return jsonify({}), 200

    try:
        data = request.get_json(force=True)

        nama_sesi = data.get("nama_sesi", "")
        tanggal_kelas = data.get("tanggal_kelas", "")
        kuota = data.get("kuota", 20)
        status = data.get("status", "tutup")

        conn = sqlite3.connect("database.db")
        cursor = conn.cursor()

        cursor.execute("""
            UPDATE sesi_kelas
            SET
                nama_sesi = ?,
                tanggal_kelas = ?,
                kuota = ?,
                status = ?
            WHERE id = ?
        """, (
            nama_sesi,
            tanggal_kelas,
            kuota,
            status,
            id
        ))

        conn.commit()
        conn.close()

        return jsonify({
            "message": "Sesi berhasil diperbarui"
        }), 200

    except Exception as e:
        print(f"Error pada update_sesi: {e}")
        return jsonify({"error": str(e)}), 500


@app.route("/pendaftaran", methods=["GET"])
def get_pendaftaran():
    conn = sqlite3.connect("database.db")
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    cursor.execute("""
        SELECT
            pendaftaran.*,
            sesi_kelas.nama_sesi
        FROM pendaftaran
        LEFT JOIN sesi_kelas
        ON pendaftaran.sesi_id = sesi_kelas.id
        ORDER BY created_at DESC
    """)

    data = cursor.fetchall()
    conn.close()

    return jsonify([dict(row) for row in data])


@app.route("/pendaftaran/<int:id>", methods=["DELETE"])
def hapus_pendaftaran(id):
    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()

    cursor.execute("""
        DELETE FROM pendaftaran
        WHERE id=?
    """, (id,))

    conn.commit()
    conn.close()

    return jsonify({
        "message": "Data berhasil dihapus"
    })


@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()
    
    # PERHATIAN: Di lingkungan produksi, gunakan password hashing (seperti bcrypt), bukan plain text.
    cursor.execute("""
        SELECT id, nama FROM users 
        WHERE email = ? AND password = ?
    """, (email, password))
    
    user = cursor.fetchone()
    conn.close()

    if user:
        return jsonify({
            "message": "Login berhasil",
            "user": {"id": user[0], "nama": user[1]}
        }), 200
    else:
        return jsonify({"message": "Email atau password salah"}), 401


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )
    