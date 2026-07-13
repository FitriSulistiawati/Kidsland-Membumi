import { useEffect, useState } from "react";
import * as XLSX from "xlsx";

const API_URL = "https://kidsland-membumi-production.up.railway.app";

interface Pendaftar {
  id: number;
  nama_anak: string;
  usia: number;
  nama_orangtua: string;
  no_hp: string;
  minat: string;
  nama_sesi: string;
}

export default function Admin() {
  const [sesi, setSesi] = useState({ id: 1, nama_sesi: "", tanggal_kelas: "", kuota: 20, status: "buka" });
  const [pendaftar, setPendaftar] = useState<Pendaftar[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = async () => {
    try {
      const [resSesi, resPendaftar] = await Promise.all([
        fetch(`${API_URL}/sesi`),
        fetch(`${API_URL}/pendaftaran`)
      ]);
      const dataSesi = await resSesi.json();
      const dataPendaftar = await resPendaftar.json();
      if (dataSesi.length > 0) setSesi(dataSesi[0]);
      setPendaftar(dataPendaftar);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleSimpan = async () => {
    const res = await fetch(`${API_URL}/sesi/${sesi.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sesi)
    });
    if (res.ok) { alert("Berhasil disimpan"); fetchData(); }
  };

  const handleHapus = async (id: number) => {
    if (!window.confirm("Yakin ingin menghapus data ini?")) return;
    const res = await fetch(`${API_URL}/pendaftaran/${id}`, { method: "DELETE" });
    if (res.ok) fetchData();
  };

  const filteredPendaftar = pendaftar.filter(p => 
    (p.nama_anak || "").toLowerCase().includes(searchQuery.toLowerCase()) || 
    (p.nama_orangtua || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(filteredPendaftar);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Data Pendaftar");
    XLSX.writeFile(wb, "Data_Pendaftar_Kelas.xlsx");
  };

  return (
    <div style={{ width: "900px", margin: "120px auto 100px", background: "#fff", padding: "30px", borderRadius: "15px", boxShadow: "0 4px 12px rgba(0,0,0,.2)" }}>
      <h2>Pengaturan Sesi Kelas</h2>
      <label>Nama Sesi</label><br />
      <input type="text" value={sesi.nama_sesi} onChange={(e) => setSesi({ ...sesi, nama_sesi: e.target.value })} style={{ padding: "5px", width: "300px" }} /><br /><br />
      <label>Tanggal Kelas</label><br />
      <input type="date" value={sesi.tanggal_kelas} onChange={(e) => setSesi({ ...sesi, tanggal_kelas: e.target.value })} style={{ padding: "5px" }} /><br /><br />
      <label>Kuota</label><br />
      <input type="number" value={sesi.kuota} onChange={(e) => setSesi({ ...sesi, kuota: Number(e.target.value) })} style={{ padding: "5px" }} /><br /><br />
      <label>Status</label><br />
      <select value={sesi.status} onChange={(e) => setSesi({ ...sesi, status: e.target.value })} style={{ padding: "5px" }}>
        <option value="buka">Buka</option>
        <option value="tutup">Tutup</option>
      </select><br /><br />
      <button onClick={handleSimpan} style={{ padding: "8px 15px", cursor: "pointer", background: "#10b981", color: "white", border: "none", borderRadius: "5px", fontWeight: "bold" }}>
        Simpan Perubahan
      </button>

      <hr style={{ margin: "40px 0" }} />

      <h2>Data Pendaftar</h2>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <input type="text" placeholder="Cari nama anak / orang tua..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ padding: "8px", width: "300px" }} />
        <button onClick={handleExport} style={{ background: "green", color: "white", padding: "8px 15px", border: "none", cursor: "pointer", borderRadius: "5px" }}>
          Export ke Excel
        </button>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ color: "green" }}>
              {["No", "Nama Anak", "Usia", "Orang Tua", "No HP", "Minat", "Sesi", "Aksi"].map((h) => (
                <th key={h} style={{ border: "1px solid black", padding: "10px" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredPendaftar.map((item, i) => (
              <tr key={item.id}>
                <td style={{ border: "1px solid black", padding: "10px" }}>{i + 1}</td>
                <td style={{ border: "1px solid black", padding: "10px" }}>{item.nama_anak}</td>
                <td style={{ border: "1px solid black", padding: "10px" }}>{item.usia}</td>
                <td style={{ border: "1px solid black", padding: "10px" }}>{item.nama_orangtua}</td>
                <td style={{ border: "1px solid black", padding: "10px" }}>{item.no_hp}</td>
                <td style={{ border: "1px solid black", padding: "10px" }}>{item.minat}</td>
                <td style={{ border: "1px solid black", padding: "10px" }}>{item.nama_sesi}</td>
                <td style={{ border: "1px solid black", padding: "10px", textAlign: "center" }}>
                  <button onClick={() => handleHapus(item.id)} style={{ background: "red", color: "white", border: "none", padding: "5px 10px", cursor: "pointer", borderRadius: "4px" }}>Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}