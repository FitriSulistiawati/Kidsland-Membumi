import aktivitasAnak from "../assets/foto 3.jpeg";
import teamMember1 from "../assets/team-member-1.jpg";
import teamMember2 from "../assets/foto 4.jpeg";
import teamMember4 from "../assets/team-member-4.jpg";

export type HomeStat = {
  value: string;
  label: string;
};

export type HomeHighlight = {
  title: string;
  description: string;
};

export type HomeTestimonial = {
  quote: string;
  name: string;
};

export const homeStats: HomeStat[] = [
  { value: "100+", label: "ide aktivitas ramah anak" },
  { value: "3", label: "kategori utama layanan" },
  { value: "1", label: "fokus: tumbuh bersama keluarga" },
];

export const homeHighlights: HomeHighlight[] = [
  {
    title: "Mainan edukatif",
    description:
      "Bantu anak belajar bentuk, warna, angka, dan motorik halus lewat permainan yang menyenangkan.",
  },
  {
    title: "Kelas anak",
    description:
      "Aktivitas terarah untuk melatih kreativitas, fokus, dan rasa percaya diri sejak dini.",
  },
  {
    title: "Aktivitas belajar di rumah",
    description:
      "Ide praktis yang mudah diterapkan orang tua untuk menemani tumbuh kembang anak setiap hari.",
  },
];

export const homeTestimonials: HomeTestimonial[] = [
  {
    quote:
      "Materinya lucu, rapi, dan anak saya jadi lebih semangat belajar di rumah.",
    name: "Ayu, ibu dari anak 4 tahun",
  },
  {
    quote:
      "Komunikasinya enak dan produknya benar-benar membantu anak lebih aktif bereksplorasi.",
    name: "Rina, orang tua murid kelas play-based",
  },
];

export const homeStrengthPoints: string[] = [
  "Bahasa santai, tetap profesional",
  "Navigasi singkat dan mobile-friendly",
  "Konten yang mudah dipindai orang tua sibuk",
  "CTA WhatsApp selalu terlihat",
];

export type FeaturedProgram = {
  category: string;
  title: string;
  ageRange: string;
  benefit: string;
  ctaLabel: string;
};

export const featuredPrograms: FeaturedProgram[] = [
  {
    category: "Kelas Anak",
    title: "Awan ☁️",
    ageRange: "Usia 3–6 tahun",
    benefit:
      "Motorik halus & kasar, sensorik, aktivitas kreatif dan pengenalan bentuk.",
    ctaLabel: "Lihat Kelas",
  },
  {
    category: "Kelas Anak",
    title: "Bumi 🌍",
    ageRange: "Usia 6–10 tahun",
    benefit:
      "Berlatih bekerja sama, aktivitas kreatif, pengenalan alam dan pengenalan rimpang.",
    ctaLabel: "Lihat Kelas",
  },
  {
    category: "Kelas Anak",
    title: "Privat 👩‍🏫",
    ageRange: "Usia 3–10 tahun",
    benefit:
      "Menyesuaikan dengan usia anak. Kegiatan privat dapat diikuti dengan booking terlebih dahulu.",
    ctaLabel: "Booking Privat",
  },
];

export type EnrollmentStep = {
  number: number;
  title: string;
  description: string;
};

export const enrollmentSteps: EnrollmentStep[] = [
  {
    number: 1,
    title: "Lihat Kategori",
    description: "Jelajahi ketiga kategori program kami yang tersedia.",
  },
  {
    number: 2,
    title: "Chat Kebutuhan",
    description: "Ceritakan usia dan minat anak Anda kepada kami, melalui pop up chatbot di pojok kanan bawah.",
  },
  {
    number: 3,
    title: "Dapatkan Rekomendasi",
    description:
      "Kami siapkan pilihan program yang paling cocok untuk anak Anda.",
  },
];

export type TrustMetric = {
  value: string;
  label: string;
};

export const trustMetrics: TrustMetric[] = [
  { value: "100+", label: "Keluarga Aktif" },
  { value: "800+", label: "Anak yang Terlayani" },
  { value: "4.8★", label: "Dari Orang Tua" },
];

export type HomeFaq = {
  question: string;
  answer: string;
};

export const homeFaqs: HomeFaq[] = [
  {
    question: "Program ini untuk usia berapa?",
    answer:
      "Program kami dirancang untuk anak usia 3–10 tahun. Setiap kategori memiliki rekomendasi usia spesifik yang bisa Anda lihat saat memilih program.",
  },
  {
    question: "Dimana lokasi Kidsland Membumi berada?",
    answer:
      "Kidsland Membumi berlokasi di Jl. Raya Bojonggenteng No.3 Bojonggenteng Kab.Sukabumi",
  },
  {
    question: "Jadwal kelas kapan saja?",
    answer:
      "Kelas dijadwalkan setiap hari Sabtu atau Minggu dan hari libur pilihan. Informasi terkini mengenai jadwal dapat diakses melalui story akun Instagram kami @kidslandmembumi.",
  },
  {
    question: "Berapa biaya dan bagaimana sistem pembayaran program ini?",
    answer:
      "Biaya kegiatan Kidsland Membumi berkisar Rp.35.000-Rp.40.000 per sesi tergantung aktivitas yang dilaksanakan. Kami menerima transfer via bank atau e-wallet.",
  },
];

export type GalleryImage = {
  src: string;
  alt: string;
  title?: string;
};

export const homeGallery: GalleryImage[] = [
  {
    src: teamMember1,
    alt: "Aktivitas belajar anak di Kidsland",
    title: "Sosialisasi Anak",
  },
  {
    src: teamMember2,
    alt: "Anak bermain sambil belajar",
    title: "Play-Based Learning",
  },
  {
    src: aktivitasAnak,
    alt: "Aktivitas anak di Kidsland",
    title: "Aktivitas Kreatif",
  },
  {
    src: teamMember4,
    alt: "Fasilitas belajar Kidsland Membumi",
    title: "Fasilitas Kami",
  },
];
