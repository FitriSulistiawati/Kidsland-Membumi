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

  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(pendaftar);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Data Pendaftar");
    XLSX.writeFile(wb, "Data_Pendaftar.xlsx");
  };

  return (
    <div style={{ padding: "120px 20px", maxWidth: "1000px", margin: "0 auto" }}>
      <h2>Pengaturan Sesi</h2>
      <div style={{ marginBottom: "20px" }}>
        <input value={sesi.nama_sesi} onChange={(e) => setSesi({...sesi, nama_sesi: e.target.value})} style={{ padding: "8px", width: "200px" }} />
        <button onClick={handleSimpan} style={{ padding: "8px 15px", marginLeft: "10px" }}>Simpan</button>
      </div>
      
      <h2>Data Pendaftar</h2>
      <div style={{ marginBottom: "20px" }}>
        <input placeholder="Cari nama..." onChange={(e) => setSearchQuery(e.target.value)} style={{ padding: "8px", width: "200px" }} />
        <button onClick={handleExport} style={{ padding: "8px 15px", marginLeft: "10px" }}>Export Excel</button>
      </div>

      <div style={{ overflowX: "auto", background: "#fff", padding: "10px", borderRadius: "8px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "700px" }}>
          <thead>
            <tr style={{ background: "#f4f4f4" }}>
              <th style={{ border: "1px solid #ddd", padding: "10px" }}>No</th>
              <th style={{ border: "1px solid #ddd", padding: "10px" }}>Nama Anak</th>
              <th style={{ border: "1px solid #ddd", padding: "10px" }}>Usia</th>
              <th style={{ border: "1px solid #ddd", padding: "10px" }}>Orang Tua</th>
              <th style={{ border: "1px solid #ddd", padding: "10px" }}>Minat</th>
              <th style={{ border: "1px solid #ddd", padding: "10px" }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {pendaftar.filter(p => p.nama_anak.toLowerCase().includes(searchQuery.toLowerCase())).map((item, i) => (
              <tr key={item.id}>
                <td style={{ border: "1px solid #ddd", padding: "10px", textAlign: "center" }}>{i + 1}</td>
                <td style={{ border: "1px solid #ddd", padding: "10px" }}>{item.nama_anak}</td>
                <td style={{ border: "1px solid #ddd", padding: "10px", textAlign: "center" }}>{item.usia}</td>
                <td style={{ border: "1px solid #ddd", padding: "10px" }}>{item.nama_orangtua}</td>
                <td style={{ border: "1px solid #ddd", padding: "10px" }}>{item.minat}</td>
                <td style={{ border: "1px solid #ddd", padding: "10px", textAlign: "center" }}>
                  <button onClick={() => handleHapus(item.id)} style={{ background: "#ff4d4d", color: "#fff", border: "none", padding: "5px 10px", borderRadius: "4px" }}>Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}