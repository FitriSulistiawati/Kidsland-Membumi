import { useEffect, useState } from "react";
import * as XLSX from "xlsx";

export default function Admin() {
  const [sesi, setSesi] = useState({
    id: 1,
    nama_sesi: "",
    tanggal_kelas: "",
    kuota: 20,
    status: "buka"
  });

  const [pendaftar, setPendaftar] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:5000/sesi")
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          setSesi(data[0]);
        }
      });

    fetch("http://127.0.0.1:5000/pendaftaran")
      .then((res) => res.json())
      .then((data) => {
        setPendaftar(data);
      });
  }, []);

  const handleSimpan = async () => {
    try {
      // Validasi apakah sesi id ada
      if (!sesi || !sesi.id) {
        alert("Data sesi belum dimuat dari server! Pastikan database sesi_kelas tidak kosong.");
        return;
      }

      const response = await fetch(`http://127.0.0.1:5000/sesi/${sesi.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sesi)
      });

      if (!response.ok) {
        throw new Error(`Server merespons dengan status: ${response.status}`);
      }

      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error("Error saat menyimpan:", error);
      alert("Terjadi kesalahan. Silakan cek layar Console (F12) untuk detailnya.");
    }
  };

  const handleHapus = async (id: number) => {
    if (!window.confirm("Yakin ingin menghapus data pendaftar ini?")) return;

    const response = await fetch(`http://127.0.0.1:5000/pendaftaran/${id}`, {
      method: "DELETE"
    });

    if (response.ok) {
      setPendaftar(pendaftar.filter((item) => item.id !== id));
      alert("Data pendaftar berhasil dihapus.");
    } else {
      alert("Gagal menghapus data.");
    }
  };

  const handleExportExcel = () => {
    const dataToExport = filteredPendaftar.map((item, index) => ({
      No: index + 1,
      "Nama Anak": item.nama_anak,
      Usia: item.usia,
      "Nama Orang Tua": item.nama_orangtua,
      "No HP": item.no_hp,
      Minat: item.minat,
      Sesi: item.nama_sesi
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Pendaftar");
    XLSX.writeFile(workbook, "Data_Pendaftar_Kelas.xlsx");
  };

  const filteredPendaftar = pendaftar.filter(
    (item) =>
      (item.nama_anak || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.nama_orangtua || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      style={{
        width: "900px",
        margin: "120px auto 100px", // Margin atas disesuaikan agar tidak tertutup header
        background: "#fff",
        padding: "30px",
        borderRadius: "15px",
        boxShadow: "0 4px 12px rgba(0,0,0,.2)"
      }}
    >
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
        <input
          type="text"
          placeholder="Cari nama anak / orang tua..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ padding: "8px", width: "300px" }}
        />
        <button onClick={handleExportExcel} style={{ background: "green", color: "white", padding: "8px 15px", border: "none", cursor: "pointer", borderRadius: "5px" }}>
          Export ke Excel
        </button>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid black", padding: "10px" }}>No</th>
            <th style={{ border: "1px solid black", padding: "10px" }}>Nama Anak</th>
            <th style={{ border: "1px solid black", padding: "10px" }}>Usia</th>
            <th style={{ border: "1px solid black", padding: "10px" }}>Orang Tua</th>
            <th style={{ border: "1px solid black", padding: "10px" }}>No HP</th>
            <th style={{ border: "1px solid black", padding: "10px" }}>Minat</th>
            <th style={{ border: "1px solid black", padding: "10px" }}>Sesi</th>
            <th style={{ border: "1px solid black", padding: "10px", color: "red" }}>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {filteredPendaftar.map((item: any, index) => (
            <tr key={item.id}>
              <td style={{ border: "1px solid black", padding: "10px" }}>{index + 1}</td>
              <td style={{ border: "1px solid black", padding: "10px" }}>{item.nama_anak}</td>
              <td style={{ border: "1px solid black", padding: "10px" }}>{item.usia}</td>
              <td style={{ border: "1px solid black", padding: "10px" }}>{item.nama_orangtua}</td>
              <td style={{ border: "1px solid black", padding: "10px" }}>{item.no_hp}</td>
              <td style={{ border: "1px solid black", padding: "10px" }}>{item.minat}</td>
              <td style={{ border: "1px solid black", padding: "10px" }}>{item.nama_sesi}</td>
              <td style={{ border: "1px solid black", padding: "10px", textAlign: "center" }}>
                <button 
                  onClick={() => handleHapus(item.id)}
                  style={{ background: "red", color: "white", border: "none", padding: "5px 10px", cursor: "pointer", borderRadius: "4px" }}
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}