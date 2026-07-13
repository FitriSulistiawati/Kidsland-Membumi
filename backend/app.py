import os
import psycopg2
from psycopg2.extras import RealDictCursor
from flask import Flask, request, jsonify
from flask_cors import CORS
from chatbot import get_response
from gemini_helper import generate_activity_recommendation

app = Flask(__name__)
CORS(app)

# Fungsi koneksi PostgreSQL menggunakan DATABASE_URL dari Railway
def get_db_connection():
    return psycopg2.connect(os.environ.get("DATABASE_URL"), cursor_factory=RealDictCursor)

@app.route("/")
def home():
    return "Chatbot Kidsland Membumi Aktif (Postgres)"

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data.get("message", "")
    result = get_response(user_message)
    if result.get("intent") == "REKOMENDASI":
        try:
            result["jawaban"] = generate_activity_recommendation(user_message, result["jawaban"])
        except: pass
    return jsonify(result)

@app.route("/pendaftaran", methods=["POST"])
def pendaftaran():
    data = request.get_json()
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT id FROM sesi_kelas WHERE status = 'buka' LIMIT 1")
    sesi = cur.fetchone()
    if not sesi:
        cur.close(); conn.close()
        return jsonify({"message": "Pendaftaran ditutup"}), 400
    
    cur.execute("INSERT INTO pendaftaran (sesi_id, nama_anak, usia, nama_orangtua, no_hp, minat) VALUES (%s,%s,%s,%s,%s,%s)", 
                (sesi['id'], data['nama_anak'], data['usia'], data['nama_orangtua'], data['no_hp'], data['minat']))
    conn.commit()
    cur.close(); conn.close()
    return jsonify({"message": "Berhasil"})

@app.route("/sesi", methods=["GET"])
def get_sesi():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM sesi_kelas ORDER BY tanggal_kelas ASC")
    data = cur.fetchall()
    cur.close(); conn.close()
    return jsonify(data)

@app.route("/sesi/<int:id>", methods=["PUT"])
def update_sesi(id):
    data = request.get_json()
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("UPDATE sesi_kelas SET nama_sesi=%s, tanggal_kelas=%s, kuota=%s, status=%s WHERE id=%s", 
                (data['nama_sesi'], data['tanggal_kelas'], data['kuota'], data['status'], id))
    conn.commit()
    cur.close(); conn.close()
    return jsonify({"message": "Berhasil"})

@app.route("/pendaftaran", methods=["GET"])
def get_pendaftaran():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT p.*, s.nama_sesi FROM pendaftaran p LEFT JOIN sesi_kelas s ON p.sesi_id = s.id")
    data = cur.fetchall()
    cur.close(); conn.close()
    return jsonify(data)

@app.route("/pendaftaran/<int:id>", methods=["DELETE"])
def hapus(id):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("DELETE FROM pendaftaran WHERE id=%s", (id,))
    conn.commit()
    cur.close(); conn.close()
    return jsonify({"message": "Berhasil"})

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM users WHERE email=%s AND password=%s", (data['email'], data['password']))
    user = cur.fetchone()
    cur.close(); conn.close()
    return jsonify({"message": "Login berhasil"}) if user else (jsonify({"message": "Gagal"}), 401)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)