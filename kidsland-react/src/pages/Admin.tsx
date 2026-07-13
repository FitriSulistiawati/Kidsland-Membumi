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
    if (res.ok) { alert("Berhasil"); fetchData(); }
  };

  const handleHapus = async (id: number) => {
    if (!window.confirm("Hapus data?")) return;
    const res = await fetch(`${API_URL}/pendaftaran/${id}`, { method: "DELETE" });
    if (res.ok) fetchData();
  };

  const handleExport = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(pendaftar);
    XLSX.utils.book_append_sheet(wb, ws, "Data");
    XLSX.writeFile(wb, "Pendaftar.xlsx");
  };

  return (
    <div style={{ padding: "120px 20px" }}>
      <h2>Pengaturan Sesi</h2>
      <input value={sesi.nama_sesi} onChange={(e) => setSesi({...sesi, nama_sesi: e.target.value})} />
      <button onClick={handleSimpan}>Simpan</button>
      
      <h2>Data Pendaftar</h2>
      <input placeholder="Cari..." onChange={(e) => setSearchQuery(e.target.value)} />
      <button onClick={handleExport}>Export Excel</button>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr><th>No</th><th>Nama Anak</th><th>Aksi</th></tr>
          </thead>
          <tbody>
            {pendaftar.filter(p => p.nama_anak.toLowerCase().includes(searchQuery.toLowerCase())).map((item, i) => (
              <tr key={item.id}>
                <td>{i + 1}</td>
                <td>{item.nama_anak}</td>
                <td><button onClick={() => handleHapus(item.id)}>Hapus</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}