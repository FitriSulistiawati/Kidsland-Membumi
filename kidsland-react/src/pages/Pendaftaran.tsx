import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Pendaftaran.css";

export default function Pendaftaran() {
  const [namaAnak, setNamaAnak] = useState("");
  const [usia, setUsia] = useState("");
  const [namaOrangtua, setNamaOrangtua] = useState("");
  const [noHp, setNoHp] = useState("");
  const [minat, setMinat] = useState("");

  const [isBuka, setIsBuka] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkStatusSesi = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/sesi");
        const data = await response.json();
        
        // Cek apakah ada setidaknya satu sesi yang berstatus 'buka'
        const sesiAktif = data.find((sesi: any) => sesi.status === "buka");
        setIsBuka(!!sesiAktif);
      } catch (error) {
        console.error("Gagal mengambil status sesi", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkStatusSesi();
  }, []);

  const handleDaftar = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/pendaftaran", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nama_anak: namaAnak,
          usia: usia,
          nama_orangtua: namaOrangtua,
          no_hp: noHp,
          minat: minat
        })
      });

      const data = await response.json();
      alert(data.message);

      if (response.ok) {
        setNamaAnak("");
        setUsia("");
        setNamaOrangtua("");
        setNoHp("");
        setMinat("");
        
        // Memuat ulang status setelah mendaftar untuk mengecek apakah kuota langsung penuh
        const refreshResponse = await fetch("http://127.0.0.1:5000/sesi");
        const refreshData = await refreshResponse.json();
        const sesiAktif = refreshData.find((sesi: any) => sesi.status === "buka");
        setIsBuka(!!sesiAktif);
      }
    } catch (error) {
      alert("Gagal terhubung ke server");
      console.log(error);
    }
  }; 
  
  return (
    // Penambahan paddingTop memastikan form berada di bawah header fixed
    <div
  className="pendaftaran-container"
  style={{
    paddingTop: "140px",
    paddingBottom: "50px",
    minHeight: "100vh",
  }}
>
  <div className="pendaftaran-back-wrapper">
    <Link to="/" className="pendaftaran-back-btn">
      ← Kembali ke Beranda
    </Link>
  </div>

      <div className="pendaftaran-card">
        <h1>Pendaftaran Kidsland</h1>

        {isLoading ? (
          <p style={{ textAlign: "center", padding: "20px" }}>Memeriksa ketersediaan kelas...</p>
        ) : !isBuka ? (
          <div style={{ textAlign: "center", padding: "30px", background: "#fef2f2", border: "1px solid #ef4444", borderRadius: "8px", color: "#b91c1c", marginTop: "20px" }}>
            <h2>Maaf, tidak ada kelas untuk minggu ini.</h2>
            <p>Pendaftaran sedang ditutup atau kuota kelas sudah penuh.</p>
          </div>
        ) : (
          <>
            <div className="form-group">
              <label>Nama Anak</label>
              <input
                type="text"
                value={namaAnak}
                onChange={(e) => setNamaAnak(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Usia</label>
              <input
                type="number"
                value={usia}
                onChange={(e) => setUsia(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Nama Orang Tua</label>
              <input
                type="text"
                value={namaOrangtua}
                onChange={(e) => setNamaOrangtua(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>No HP</label>
              <input
                type="text"
                value={noHp}
                onChange={(e) => setNoHp(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Minat Anak</label>
              <input
                type="text"
                value={minat}
                onChange={(e) => setMinat(e.target.value)}
              />
            </div>

            <button className="btn-daftar" onClick={handleDaftar}>
              Daftar
            </button>
          </>
        )}
      </div>
    </div>
  );
}