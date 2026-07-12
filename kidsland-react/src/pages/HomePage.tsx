import { useEffect, useState } from "react";
import heroSlide1 from "../assets/hero section 1.jpeg";
import heroSlide2 from "../assets/hero section 2.jpeg";
import heroSlide3 from "../assets/hero section 3.jpeg";
import heroSlide4 from "../assets/hero section 4.jpeg";
import heroSlide5 from "../assets/hero section 5.jpeg";
import aktivitasAnak from "../assets/foto 3.jpeg";
import teamMember2 from "../assets/foto 4.jpeg";
import ifa from "../assets/ifa.jpeg";
import nanda from "../assets/nanda.jpeg";
import umi from "../assets/umi.jpeg";
import ateu from "../assets/ateu.jpeg";
import fitri from "../assets/fitri.jpeg";
import dea from "../assets/dea.jpeg";
import eca from "../assets/eca.jpeg";
import latifah from "../assets/latifah.jpeg";
import foto1 from "../assets/foto 1.jpeg";
import foto2 from "../assets/foto 2.jpeg";
import foto7 from "../assets/foto 7.jpeg";
import foto6 from "../assets/foto 6.jpeg";
import aktivitasKreatif from "../assets/aktivitas kreatif.jpeg";
import koki1 from "../assets/koki1.jpeg";
import koki2 from "../assets/koki2.jpeg";
import tandur from "../assets/tandur.jpeg";
import adimas from "../assets/adimas.jpeg";
import burger from "../assets/burger.jpeg";
import donat from "../assets/donat.jpeg";
import story from "../assets/story.jpeg";
import { SectionHeader } from "../components";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";

const heroSlides = [
  heroSlide1,
  heroSlide2,
  heroSlide3,
  heroSlide4,
  heroSlide5,
];

const programCards = [
  {
    icon: "☁️",
    title: "Kelas Awan",
    subtitle: "Usia 3–6 tahun",
    description:
      "Program awal yang menghadirkan eksplorasi lembut dan kegiatan sensorik bernuansa alam.",
    image: aktivitasAnak,
    checklist: ["Sensory Play", "Motorik Halus & Kasar", "Pengenalan Alam Ringan"],
    cta: "Lihat Kelas →",
  },
  {
    icon: "🌍",
    title: "Kelas Bumi",
    subtitle: "Usia 7–10 tahun",
    description:
      "Program eksplorasi yang lebih aktif untuk mengenal lingkungan, tanaman, dan rimpang secara mendalam.",
    image: tandur,
    checklist: ["Eksplorasi Alam", "Pengenalan Rimpang", "Kerja Tim Kreatif"],
    cta: "Lihat Kelas →",
  },
  {
    icon: "🤝",
    title: "Kelas Privat BeToBe",
    subtitle: "Program privat keluarga",
    description:
      "Sesi khusus yang dapat dikustomisasi untuk keluarga, dengan fokus kemitraan orang tua dan anak.",
    image: teamMember2,
    checklist: ["Fleksibel & Personal", "Pendampingan Fasilitator", "Metode Play-Based"],
    cta: "Lihat Kelas →",
  },
];

const steps = [
  {
    label: "①",
    title: "Lihat Kategori",
    description: "pilih program sesuai usia dan minat si kecil",
  },
  {
    label: "②",
    title: "Chat Kebutuhan",
    description: "hubungi kami via WhatsApp untuk informasi lebih lanjut",
  },
  {
    label: "③",
    title: "Daftar & Hadir",
    description: "booking sesi dan nikmati pengalaman bersama alam",
  },
];

const testimonials = [
  {
    quote:
      "Suasana kelasnya menyenangkan, anak saya jadi lebih antusias dan percaya diri.",
    name: "Ibu Rina",
    role: "ibu dari Dafa, 5 tahun",
  },
  {
    quote:
      "Materi alam dan kreativitasnya pas banget untuk kebutuhan anak usia 7 tahun.",
    name: "Pak Budi",
    role: "ayah dari Nayla, 7 tahun",
  },
  {
    quote:
      "Fasilitasnya ramah anak, dan anak saya betah belajar sambil bermain.",
    name: "Ibu Sari",
    role: "ibu dari Rafi, 4 tahun",
  },
];

const overlayMissionCards = [
  {
    icon: "🌿",
    title: "Menghadirkan kegiatan offline rutin",
    description:
      "Menghubungkan anak dengan alam dan sesama dalam pengalaman belajar yang konsisten.",
  },
  {
    icon: "🧠",
    title: "Mendorong motorik, sensorik, dan kreativitas",
    description:
      "Menggunakan play-based learning untuk stimulasi tubuh dan imajinasi anak.",
  },
  {
    icon: "👪",
    title: "Melibatkan orang tua sebagai bagian aktif",
    description:
      "Membuat orang tua menjadi bagian penting dalam setiap proses tumbuh kembang anak.",
  },
  {
    icon: "🌳",
    title: "Menawarkan lingkungan yang aman dan ramah anak",
    description:
      "Lingkungan kami dirancang dekat alam dengan keamanan dan kenyamanan anak.",
  },
];

const overlayTimeline = [
  {
    year: "2025",
    title: "Awal Program Kidsland Membumi",
    description:
      "Bukan lahir dari ruang rapat formal namun dari ide dan mimpi yang besar, siapa sangka langkah awal yang sederhana justru membuka pintu dan memberi warna baru dalam dunia kecil mereka.",
  },
  {
    year: "2026",
    title: "Perkuat Komunitas dan Kelas Baru",
    description:
      "Memperluas program, dan merawat langkah kecil menjadi komitmen nyata demi masa depan anak-anak yang lebih cerah.",
  },
];

const overlayFacilitators = [
  {
    avatar: ateu,
    name: "Nurlina Rahmawati, S.P.",
    role: "Founder",
    bio: "Mengkoordinasi sistem pendaftaran, program dan aktivitas.",
  },
  {
    avatar: umi,
    name: "Dewi Ratri Puspitasari, S.Pd, M.Pd.",
    role: "Co-Founder",
    bio: "Membimbing eksplorasi sensorik dan pelajaran riil di dalam dan di luar ruang.",
  },
  {
    avatar: nanda,
    name: "Nanda Azzahra, S.Tr.I.Kom.",
    role: "Fasilitator Perkembangan",
    bio: "Mendampingi proses motorik, sosial, dan emosional anak.",
  },
  {
    avatar: dea,
    name: "Dea Ariana Herawati",
    role: "Fasilitator Sensorik",
    bio: "Mengenalkan pengalaman indera melalui habitat dan tanaman.",
  },
  {
    avatar: fitri,
    name: "Fitri Sulistiawati",
    role: "Fasilitator Seni",
    bio: "Mendorong kreativitas dan ekspresi dalam kegiatan anak.",
  },
  {
    avatar: ifa,
    name: "Sanifa Lihawa, S.Kom",
    role: "Fasilitator Luar Ruang",
    bio: "Membimbing anak dalam eksplorasi alam dan permainan fisik.",
  },
  {
    avatar: eca,
    name: "Greeceka Sekar Andiar",
    role: "Fasilitator Play-Based",
    bio: "Menjadikan belajar lewat permainan jadi pengalaman bermakna.",
  },
  {
    avatar: latifah,
    name: "Latifah Tasliyatun Nadiyah",
    role: "Fasilitator Keluarga",
    bio: "Menyelaraskan sesi agar orang tua dan anak berkembang bersama.",
  },
  {
    avatar: adimas,
    name: "Dimas Sakti",
    role: "Fasilitator Dokumentasi",
    bio: "Mendokumentasikan momen dan proses belajar anak",
  }
];

export default function HomePage() {
  const navigate = useNavigate();

  const [activeSlide, setActiveSlide] = useState(0);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<
    typeof programCards[number] | null
  >(null);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>(
      ".home-section-fade"
    );

    const revealSections = () => {
      sections.forEach((section) => {
        if (section.classList.contains("home-section-fade--visible")) return;
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          section.classList.add("home-section-fade--visible");
        }
      });
    };

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("home-section-fade--visible");
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.02,
        rootMargin: "0px 0px -120px 0px",
      }
    );

    sections.forEach((section) => observer.observe(section));
    revealSections();
    window.addEventListener("scroll", revealSections, { passive: true });
    window.addEventListener("resize", revealSections);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", revealSections);
      window.removeEventListener("resize", revealSections);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = overlayOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [overlayOpen]);

  useEffect(() => {
    if (!overlayOpen) return;

    const overlayRoot = document.querySelector(".home-overlay");
    const cards = document.querySelectorAll<HTMLElement>(
      ".home-overlay__feed-card"
    );

    if (!overlayRoot || cards.length === 0) return;

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("home-overlay__feed-card--visible");
            obs.unobserve(entry.target);
          }
        });
      },
      {
        root: overlayRoot,
        threshold: 0.25,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [overlayOpen]);

  const openOverlay = () => {
    setOverlayOpen(true);
  };

  const closeOverlay = () => {
    // trigger exit animation via state change
    setOverlayOpen(false);
    window.setTimeout(() => {
      document.getElementById("home")?.scrollIntoView({ behavior: "smooth" });
    }, 320);
  };

  // Program overlay state and handlers
  const [programOverlayOpen, setProgramOverlayOpen] = useState(false);
  const openProgramOverlay = () => setProgramOverlayOpen(true);
  const closeProgramOverlay = () => setProgramOverlayOpen(false);

  const openProgramPopup = (program: typeof programCards[number]) => {
    setSelectedProgram(program);
  };

  const handleRegisterClick = () => {
  window.location.href = "/pendaftaran";
};

  // --- BotMembumi chat state & logic ---
  type ChatMessage = { id: number; from: "user" | "bot"; text: string; time: string };
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [chatTyping, setChatTyping] = useState(false);

  const faqBot = [
    { keywords: ["biaya", "harga", "bayar"], answer: "💰 Biaya kegiatan Kidsland Membumi berkisar Rp35.000–Rp40.000 per sesi." },
    { keywords: ["lokasi", "alamat"], answer: "📍 Kidsland Membumi berlokasi di Jl. Raya Bojonggenteng No. 3, Kabupaten Sukabumi." },
    { keywords: ["usia", "umur"], answer: "👶 Program kami untuk anak usia 3–10 tahun: ☁️ Kelas Awan: 3–6, 🌍 Kelas Bumi: 7–10, 🌱 BeToBe privat." },
    { keywords: ["jadwal", "kapan"], answer: "📅 Kegiatan setiap akhir pekan (Sabtu & Minggu)." },
    { keywords: ["program", "kegiatan"], answer: "🌿 Kami punya 3 program: Kelas Awan, Kelas Bumi, BeToBe privat." },
  ];

  const nowTime = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const sendChat = (text: string) => {
    if (!text.trim()) return;
    const userMsg: ChatMessage = { id: Date.now(), from: "user", text: text.trim(), time: nowTime() };
    setChatMessages((s) => [...s, userMsg]);
    setChatInput("");
    setChatTyping(true);

    setTimeout(() => {
      // simple keyword match
      const lc = text.toLowerCase();
      const found = faqBot.find((f) => f.keywords.some((k) => lc.includes(k)));
      const reply = found ? found.answer : "Maaf, BotMembumi belum bisa menjawab itu. Silakan hubungi kami via WhatsApp.";
      const botMsg: ChatMessage = { id: Date.now() + 1, from: "bot", text: reply, time: nowTime() };
      setChatTyping(false);
      setChatMessages((s) => [...s, botMsg]);
    }, 900);
  };

  // Overlay animations & reveal observer
  useEffect(() => {
    const initObserver = (rootEl: HTMLElement | null) => {
      if (!rootEl) return null;
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      }, { threshold: 0.12, root: rootEl });

      rootEl.querySelectorAll<HTMLElement>(".reveal").forEach((el) => observer.observe(el));
      return observer;
    };

    const overlayEl = document.getElementById("kenali-overlay");
    if (overlayOpen) {
      document.body.style.overflow = "hidden";
      if (overlayEl) {
        overlayEl.style.display = "block";
        overlayEl.style.animation = "overlayEnter 0.5s ease-out forwards";
        setTimeout(() => initObserver(overlayEl), 120);
      }
    } else {
      if (overlayEl) {
        overlayEl.style.animation = "overlayExit 0.3s ease-in forwards";
        setTimeout(() => {
          overlayEl.style.display = "none";
          document.body.style.overflow = "";
          overlayEl.querySelectorAll<HTMLElement>(".reveal.visible").forEach(el => el.classList.remove("visible"));
        }, 320);
      }
    }

    const progEl = document.getElementById("program-overlay");
    if (programOverlayOpen) {
      document.body.style.overflow = "hidden";
      if (progEl) {
        progEl.style.display = "block";
        progEl.style.animation = "overlayEnter 0.5s ease-out forwards";
        setTimeout(() => initObserver(progEl), 120);
      }
    } else {
      if (progEl) {
        progEl.style.animation = "overlayExit 0.3s ease-in forwards";
        setTimeout(() => {
          progEl.style.display = "none";
          document.body.style.overflow = "";
          progEl.querySelectorAll<HTMLElement>(".reveal.visible").forEach(el => el.classList.remove("visible"));
        }, 320);
      }
    }

    return () => {
      // nothing to cleanup specific here
    };
  }, [overlayOpen, programOverlayOpen]);

  const closeProgramPopup = () => {
    setSelectedProgram(null);
  };

  const scrollOverlayTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };


  return (
    <main className="home-page">
      <section id="home" className="home-hero">
        <div className="home-hero__bg" aria-hidden="true">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`home-hero__slide ${
                index === activeSlide ? "home-hero__slide--active" : ""
              }`}
            >
              <img src={slide} alt={`Background slide ${index + 1}`} />
            </div>
          ))}

          <div className="home-hero__overlay home-hero__overlay--dark" />
        </div>

        <div className="home-hero__content">
          <h1 className="home-hero__title">
            <span className="home-hero__title-line home-hero__title-line--green">
              Bersama Kidsland Membumi
            </span>
            <span className="home-hero__title-line home-hero__title-line--orange">
              Belajar, Bermain dan Bertumbuh Bersama Alam
            </span>
          </h1>

          <p className="home-hero__description">
            Ruang tumbuh untuk anak usia 3-10 tahun melalui permainan edukatif,
            kelas kreatif, dan eksplorasi alam agar perkembangan anak menjadi
            lebih baik.
          </p>

          <div className="home-hero__actions">
            <a href="#program" className="home-btn home-btn--primary">
              Lihat Program
            </a>
          <button
            className="home-btn home-btn--secondary"
            onClick={() => navigate("/pendaftaran")}
          >
            Daftar Sekarang
          </button>
          </div>
        </div>

        <div className="home-hero__indicators">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`home-hero__indicator ${
                index === activeSlide ? "home-hero__indicator--active" : ""
              }`}
              onClick={() => setActiveSlide(index)}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      <section id="botmembumi" className="page-shell section-stack bot-section home-section-fade delay-500">
        <div className="bot-inner">
          <div className="bot-left">
            <span className="bot-pill">🤖 BotMembumi</span>
            <h2 className="bot-title"><span>Punya pertanyaan?</span><span className="bot-accent">Tanya BotMembumi.</span></h2>
            <p className="bot-desc">BotMembumi siap menjawab pertanyaan seputar program, biaya, lokasi, jadwal, dan usia peserta — kapan saja, secara otomatis.</p>
            <div className="bot-features">
              <div>✅ Jawab pertanyaan seputar program & biaya</div>
              <div>✅ Info lokasi, jadwal & usia peserta</div>
              <div>✅ Respons instan, tersedia 24 jam</div>
            </div>
          </div>

          <div className="bot-right">
            <div className="chat-wrapper">
              <div className="chat-header">
                <div className="chat-avatar">🤖</div>
                <div>
                  <div className="chat-name">BotMembumi</div>
                  <div className="chat-status">● Online</div>
                </div>
              </div>

              <div className="chat-body" style={{height: 220, overflowY: 'auto'}}>
                {chatMessages.map((m) => (
                  <div key={m.id} className={`chat-bubble ${m.from === 'user' ? 'chat-bubble--user' : 'chat-bubble--bot'}`}>
                    <div className="chat-bubble__text">{m.text}</div>
                    <div className="chat-bubble__time">{m.time}</div>
                  </div>
                ))}
                {chatTyping && (
                  <div className="chat-bubble chat-bubble--bot typing">
                    <div className="dots"><span></span><span></span><span></span></div>
                  </div>
                )}
              </div>

              <div className="chat-input">
                <div className="quick-chips">
                  {['💰 Biaya?','📍 Lokasi?','👶 Usia?','📅 Jadwal?','🌿 Program?'].map((c)=> (
                    <button key={c} className="chip" onClick={() => sendChat(c.replace('?', ''))}>{c}</button>
                  ))}
                </div>

                <div className="chat-send">
                  <input 
                    value={chatInput} 
                    onChange={(e) => setChatInput(e.target.value)} 
                    onKeyDown={(e) => { if(e.key === 'Enter'){ sendChat(chatInput); } }} 
                    placeholder="✨ Ketik pertanyaanmu di sini..." 
                  />
                  <button className="send-btn" onClick={() => sendChat(chatInput)}>➤</button>
                </div>

                <p className="chat-note">🌱 BotMembumi menjawab otomatis. Butuh bantuan lebih? → WhatsApp kami</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="page-shell section-stack about-section home-section-fade delay-200">
        <div className="about-section__grid">
          <div className="about-section__visual about-section__visual--split about-photos">
            <div className="about-photo">
              <div className="about-photo__wrap">
                <img src={aktivitasAnak} alt="Anak bermain di alam" />
              </div>
            </div>
            <div className="about-photo">
              <div className="about-photo__wrap">
                <img src={teamMember2} alt="Anak bermain sambil belajar" />
              </div>
            </div>
          </div>
          <div className="about-section__content">
            <div className="section-label">
              <span className="section-label__text">• TENTANG KAMI</span>
              <span className="section-label__line" />
            </div>
            <h2 className="about-section__title">
              Menjadi jembatan antara alam dan tumbuh kembang anak.
            </h2>
            <p className="about-section__description">
              Kidsland Membumi adalah kegiatan offline rutin yang mempertemukan anak dan orang tua dalam pengalaman belajar berbasis alam. Berlokasi di Jl. Raya Bojonggenteng No. 3, Kabupaten Sukabumi, kami hadir setiap akhir pekan dengan program yang menyenangkan dan bermakna.
            </p>

            <blockquote className="about-blockquote">
              Kidsland Membumi menghadirkan ruang bermain alam yang merangsang perkembangan motorik, sensorik, kreativitas, dan pengenalan rimpang serta alam sekitar untuk anak usia 3–10 tahun.
            </blockquote>

            <p className="about-section__description">
              Dengan pendekatan play-based learning yang melibatkan orang tua secara aktif, setiap sesi Kidsland Membumi dirancang agar anak bekerja sama, bereksplorasi, dan bertumbuh dalam suasana yang aman dan menyenangkan.
            </p>

            <div className="about-feature-grid">
              <div className="about-feature-card">
                <div className="about-feature-card__icon">🌿</div>
                <div>
                  <h3>Berbasis Alam</h3>
                  <p>Eksplorasi alam nyata: tanaman, hewan, cuaca, dan rimpang</p>
                </div>
              </div>

              <div className="about-feature-card">
                <div className="about-feature-card__icon">👨‍👩‍👧</div>
                <div>
                  <h3>Libatkan Orang Tua</h3>
                  <p>Setiap sesi dirancang untuk diikuti bersama keluarga</p>
                </div>
              </div>
            </div>

            <button
              id="btn-kenali"
              type="button"
              className="home-btn home-btn--primary about-section__cta"
              onClick={openOverlay}
            >
              Kenali Kami Lebih Jauh →
            </button>
          </div>
        </div>
      </section>

      <div id="kenali-overlay" className={
        `home-overlay ${overlayOpen ? "home-overlay--open" : ""}`
      } aria-hidden={!overlayOpen}>
        <button
          id="btn-kembali"
          type="button"
          className="home-overlay__close"
          onClick={closeOverlay}
        >
          ← Kembali ke Beranda
        </button>

        <div className="home-overlay__slides">
          <section id="overlay-slide-1" className="home-overlay__slide home-overlay__slide--hero">
            <div className={`home-overlay__hero-inner ${overlayOpen ? "home-overlay__hero-inner--visible" : ""}`}>
              <span className="home-overlay__badge">— KENALI KIDSLAND MEMBUMI —</span>
              <h2 className="home-overlay__hero-title reveal">
                <span>Kenali lebih jauh,</span>
                <span>melalui cerita dan pengalaman nyata.</span>
              </h2>
              <p className="home-overlay__hero-copy reveal">
                Temukan siapa kami, apa yang kami lakukan, dan bagaimana setiap sesi Kidsland Membumi membantu anak-anak belajar, bermain, dan bertumbuh bersama alam.
              </p>
              <div className="home-overlay__feed-preview">
                <article className="home-overlay__feed-card reveal">
                  <p className="home-overlay__feed-label">Update Kelas</p>
                  <h3>Kelas Awan & Kelas Bumi hadir setiap akhir pekan</h3>
                </article>
                <article className="home-overlay__feed-card reveal">
                  <p className="home-overlay__feed-label">Cerita Orang Tua</p>
                  <h3>Anak semakin percaya diri setelah mengikuti Kidsland Membumi.</h3>
                </article>
                <article className="home-overlay__feed-card reveal">
                  <p className="home-overlay__feed-label">Highlight</p>
                  <h3>Program privat BeToBe untuk keluarga atau instansi sudah tersedia.</h3>
                </article>
              </div>
              <button
                type="button"
                className="home-overlay__scroll-btn"
                onClick={() => scrollOverlayTo("overlay-slide-2")}
              >
                Lanjut ↓
              </button>
            </div>
          </section>

          <section id="overlay-slide-2" className="home-overlay__slide home-overlay__slide--about">
            <div className="home-overlay__section-header">
              <span className="home-overlay__small-label">• TENTANG KAMI</span>
              <h2>Membangun Ruang Tumbuh untuk Setiap Anak.</h2>
            </div>
            <div className="home-overlay__section-grid">
              <div className="home-overlay__image-card reveal">
                <img src={teamMember2} alt="Anak belajar dalam suasana alam" />
              </div>
              <div className="home-overlay__section-copy">
                <p className="reveal">
                  Kidsland Membumi hadir untuk menjadi lingkungan yang mendukung
                  rasa ingin tahu, kepercayaan diri, dan kebiasaan positif anak.
                </p>
                <p className="reveal">
                  Dengan pendekatan berbasis alam, anak belajar sambil bermain dan
                  berinteraksi dalam kegiatan yang mendidik.
                </p>
                <blockquote className="reveal">
                  "Kami percaya setiap anak berhak tumbuh dalam ruang yang
                  hangat, aman, dan penuh stimulasi positif."
                </blockquote>
                <button
                  type="button"
                  className="home-overlay__scroll-btn"
                  onClick={() => scrollOverlayTo("overlay-slide-3")}
                >
                  Lanjut ↓
                </button>
              </div>
            </div>
          </section>

          <section id="overlay-slide-3" className="home-overlay__slide home-overlay__slide--vision">
            <div className="home-overlay__section-grid home-overlay__section-grid--two">
              <div className="home-overlay__vision-block">
                <span className="home-overlay__pill">VISI KAMI</span>
                <h2>
                  Menjadi ruang tumbuh yang <span>ramah alam</span>
                </h2>
                <blockquote>
                  "Menciptakan pengalaman belajar yang membuat anak berkembang
                  secara utuh dan penuh rasa percaya diri."
                </blockquote>
              </div>
              <div className="home-overlay__mission-block">
                <span className="home-overlay__pill">MISI KAMI</span>
                <div className="home-overlay__mission-grid">
                  {overlayMissionCards.map((item) => (
                    <article key={item.title} className="home-overlay__mission-card reveal">
                      <div className="home-overlay__mission-icon">{item.icon}</div>
                      <div>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                      </div>
                    </article>
                  ))}
                </div>
                <button
                  type="button"
                  className="home-overlay__scroll-btn"
                  onClick={() => scrollOverlayTo("overlay-slide-4")}
                >
                  Lanjut ↓
                </button>
              </div>
            </div>
          </section>

          <section id="overlay-slide-4" className="home-overlay__slide home-overlay__slide--history">
            <div className="home-overlay__section-centre">
              <h2>Sejarah Kidsland Membumi</h2>
                  <div className="home-overlay__timeline">
                {overlayTimeline.map((item, index) => (
                  <div key={item.year} className={`home-overlay__timeline-item home-overlay__timeline-item--${index % 2 === 0 ? "left" : "right"} reveal`}>
                    <span className="home-overlay__timeline-year">{item.year}</span>
                    <strong>{item.title}</strong>
                    <p>{item.description}</p>
                  </div>
                ))}
              </div>
              <button
                type="button"
                className="home-overlay__scroll-btn"
                onClick={() => scrollOverlayTo("overlay-slide-5")}
              >
                Lanjut ↓
              </button>
            </div>
          </section>

          <section id="overlay-slide-5" className="home-overlay__slide home-overlay__slide--facilitators">
            <div className="home-overlay__section-centre">
              <h2>Fasilitator Kidsland Membumi</h2>
                <div className="home-overlay__facilitator-grid">
                {overlayFacilitators.map((facilitator) => (
                  <article key={facilitator.name} className="home-overlay__facilitator-card reveal">
                    <img src={facilitator.avatar} alt={facilitator.name} />
                    <h3>{facilitator.name}</h3>
                    <p className="home-overlay__facilitator-role">{facilitator.role}</p>
                    <p>{facilitator.bio}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
      {/* Program overlay (fullscreen) */}
      <div id="program-overlay" className={`home-overlay ${programOverlayOpen ? "home-overlay--open" : ""}`} aria-hidden={!programOverlayOpen}>
        <button id="btn-program-close" type="button" className="home-overlay__close" onClick={closeProgramOverlay}>← Kembali ke Beranda</button>
        <div className="home-overlay__slides">
          <section id="program-intro" className="home-overlay__slide program-intro">
            <div className="program-intro__inner">
              <span className="program-intro__badge reveal">— PROGRAM KAMI —</span>
              <h2 className="program-intro__title reveal"><span>3 Program untuk Setiap</span><span className="program-intro__accent">Tahapan Tumbuh Kembang.</span></h2>
              <p className="program-intro__sub reveal">Dipilih sesuai usia dan kebutuhan unik si kecil</p>
              <div className="program-intro__chips reveal">
                <button className="chip">☁️ Kelas Awan</button>
                <button className="chip">🌍 Kelas Bumi</button>
                <button className="chip">🌱 BeToBe Privat</button>
              </div>
            </div>
          </section>

          <section id="kelas-awan" className="home-overlay__slide reveal">
            <div className="program-section--awan">
              <span className="label-pill">☁️ KELAS AWAN</span>
              <h3 className="program-title">Kelas Awan — Usia 3–6 Tahun</h3>
              <p className="program-sub">Bermain, merasakan, dan mengenal alam untuk pertama kalinya</p>
              <div className="program-info-bar">
                <div>👶 Usia: 3–6 tahun</div>
                <div>👨‍👩‍👧 Format: Didampingi orang tua</div>
                <div>📅 Jadwal: Setiap akhir pekan</div>
              </div>
              <div className="program-gallery">
                <div className="program-gallery__item">
                  <img src={foto1} alt="Kelas Awan kegiatan eksplorasi" />
                </div>
                <div className="program-gallery__item">
                  <img src={aktivitasKreatif} alt="Anak bermain kreativitas di alam" />
                </div>
              </div>
              <div className="program-activities">
                <div>🌿 Sensory Play</div>
                <div>💪 Motorik Halus</div>
                <div>🐢 Mengenal Hewan</div>
                <div>🌱 Pengenalan Tanaman</div>
                <div>🎨 Aktivitas Kreatif</div>
                <div>🤸 Motorik Kasar</div>
              </div>
            </div>
          </section>

          <section id="kelas-bumi" className="home-overlay__slide reveal">
            <div className="program-section--bumi">
              <span className="label-pill">🌍 KELAS BUMI</span>
              <h3 className="program-title">Kelas Bumi — Usia 7–10 Tahun</h3>
              <p className="program-sub">Eksplorasi lebih dalam, berpikir lebih luas, bertumbuh lebih tinggi</p>
              <div className="program-info-bar">
                <div>🧒 Usia: 7–10 tahun</div>
                <div>🤝 Format: Kolaboratif & semi-mandiri</div>
                <div>📅 Jadwal: Setiap akhir pekan</div>
              </div>
              <div className="program-gallery">
                <div className="program-gallery__item">
                  <img src={foto2} alt="Kelas Bumi eksplorasi alam yang lebih luas" />
                </div>
                <div className="program-gallery__item">
                  <img src={foto6} alt="Kegiatan lapangan Kelas Bumi" />
                </div>
              </div>
            </div>
          </section>

          <section id="kelas-betobe" className="home-overlay__slide reveal">
            <div className="program-section--betobe">
              <div className="badge-exclusive">✨ PROGRAM EKSKLUSIF — Minimal 20 Anak per Sesi</div>
              <span className="label-pill">🌱 KELAS PRIVAT BeToBe</span>
              <h3 className="program-title">BeToBe</h3>
              <p className="program-sub">Be The Best Version — Program privat personal untuk tumbuh kembang anak yang optimal</p>
              <div className="program-info-bar">
                <div>👤 Format: Privat / min. 20 anak</div>
                <div>📋 Kurikulum: Disesuaikan</div>
                <div>📅 Jadwal: Fleksibel</div>
              </div>
              <div className="program-gallery">
                <div className="program-gallery__item">
                  <img src={foto7} alt="Sesi privat BeToBe bersama anak" />
                </div>
                <div className="program-gallery__item">
                  <img src={koki1} alt="Aktivitas privat BeToBe yang tenang dan personal" />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <section id="program" className="page-shell section-stack program-section home-section-fade delay-300">
        <SectionHeader
          eyebrow="Pilar Program"
          title="Lingkup Kegiatan Kami"
          className="section-header--left"
        />
        <p className="program-section__subtitle">
          Kidsland Membumi menghadirkan rangkaian kegiatan yang mendukung perkembangan anak melalui eksplorasi alam, permainan kreatif, dan pembelajaran yang menyenangkan.
        </p>
        <div className="program-card-grid">
          {programCards.map((card) => (
            <div key={card.title} className="program-card">
              <div className="program-card__image-wrapper">
                <img src={card.image} alt={card.title} className="program-card__image" />
              </div>
              <div className="program-card__content">
                <div className="program-card__label">{card.icon}</div>
                <h3>{card.title}</h3>
                <p className="program-card__subtitle">{card.subtitle}</p>
                <p>{card.description}</p>
                <ul className="program-card__list">
                  {card.checklist.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <button
                type="button"
                className="program-card__link"
                onClick={() => openProgramPopup(card)}
              >
                {card.cta}
              </button>
            </div>
          ))}
        </div>
        <div className="program-section__footer">
          <a href="#contact" onClick={(e) => { e.preventDefault(); openProgramOverlay(); }} className="program-section__all-btn">
            Lihat Semua Program →
          </a>
        </div>
      </section>

      {selectedProgram && (
        <div className="program-popup-overlay" role="dialog" aria-modal="true">
          <div className="program-popup">
            <button type="button" className="program-popup__close" onClick={closeProgramPopup}>
              ×
            </button>
            <div className="program-popup__header">
              <span>{selectedProgram.subtitle}</span>
              <h2>{selectedProgram.title}</h2>
            </div>
            <p>{selectedProgram.description}</p>
            <div className="program-popup__details">
              <h3>Yang akan anak rasakan</h3>
              <ul>
                {selectedProgram.checklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="program-popup__actions">
              <button
  type="button"
  className="home-btn home-btn--primary"
  onClick={() => navigate("/pendaftaran")}
>
  Daftar Kelas Ini
</button>
              <button type="button" className="home-btn home-btn--secondary" onClick={closeProgramPopup}>
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      <section className="page-shell section-stack steps-section home-section-fade delay-400">
        <SectionHeader
          eyebrow="Cara Mudah"
          title="Mulai dalam 3 langkah sederhana"
          className="section-header--left"
        />
        <div className="steps-grid">
          {steps.map((step) => (
            <div key={step.label} className="step-card">
              <div className="step-card__number">{step.label}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="page-shell section-stack gallery-section home-section-fade delay-500" style={{background: '#f0f5e4'}}>
        <div className="gallery-header">
          <span className="section-label">In Action</span>
          <h2 className="gallery-title">Tumbuh & Bermain, Bersama Alam.</h2>
          <p className="gallery-sub">Momen nyata dari setiap sesi Kidsland Membumi</p>
        </div>

        <div className="gallery-grid gallery-grid--pics">
          {[foto1, foto2, tandur, koki1, foto7, koki2].map((imgSrc, i) => (
            <div key={i} className="gallery-item">
              <img src={imgSrc} alt={`Gallery ${i + 1}`} />
            </div>
          ))}
      </div>

        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <a href="https://www.instagram.com/kidslandmembumi" target="_blank" rel="noopener noreferrer" className="home-btn home-btn--secondary">Lihat di Instagram →</a>
        </div>
      </section>

      <section className="page-shell section-stack testimonials-section home-section-fade delay-600">
        <SectionHeader
          eyebrow="Kata Mereka"
          title="Apa Kata Orang Tua"
          className="section-header--left"
        />
        <div className="testimonials-grid">
          {testimonials.map((item) => (
            <article key={item.name} className="testimonial-card">
              <div className="testimonial-card__stars">★★★★★</div>
              <p className="testimonial-card__quote">{item.quote}</p>
              <div className="testimonial-card__divider" />
              <p className="testimonial-card__author">
                {item.name} — {item.role}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="page-shell section-stack cta-banner home-section-fade delay-650">
        <div className="cta-inner">
          <h2 className="cta-title">Bergabung untuk Tumbuh Bersama.</h2>
          <p className="cta-sub">Kami mengundang orang tua dan anak usia 3–10 tahun untuk merasakan pengalaman belajar berbasis alam yang menyenangkan dan bermakna.</p>
          <div className="cta-actions">
            <a href="#contact" className="home-btn home-btn--primary" style={{ background: 'var(--yellow)', color: '#1a3a0a', borderRadius: '50px' }}>Daftar Sekarang</a>
            <a href="https://youtu.be/UdnAn0fJruo?si=LrYczVOZsbU4T0pc" target="_blank" rel="noopener noreferrer" className="home-btn home-btn--secondary" style={{ borderRadius: '50px', color: '#fff', borderColor: '#fff' }}>Tonton di YouTube →</a>
          </div>
        </div>
      </section>

      <section className="page-shell section-stack articles-section home-section-fade delay-675">
        <SectionHeader
          eyebrow="Instagram"
          title="Keseruan di Kidsland Membumi"
          className="section-header--left"
        />

        <p className="program-section__subtitle">
    Lihat berbagai momen seru anak-anak saat bermain, belajar, dan berkreasi bersama Kidsland Membumi.
  </p>

  <div className="articles-grid">

    {/* Donat */}
    <article className="article-card">

      <div
        className="article-pic"
        style={{
          backgroundImage:
            `url(${donat})`
        }}
      />

      <div className="article-body">

        <span className="article-pill">
          🍩 Cooking Class
        </span>

        <h3>
          Serunya Menghias Donat Bersama Kidsland Membumi
        </h3>

        <p className="article-meta">
          Lihat keseruan anak-anak saat menghias donat dengan kreativitas mereka.
        </p>

        <a
          className="article-cta"
          href="https://www.instagram.com/reel/DacEaWzxUYQ/?utm_source=ig_web_copy_link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Lihat Reel →
        </a>

      </div>

    </article>

    {/* Story */}
    <article className="article-card">

      <div
        className="article-pic"
        style={{
          backgroundImage:
            `url(${story})`
        }}
      />

      <div className="article-body">

        <span className="article-pill">
          🌿 Story Kidsland
        </span>

        <h3>
          Cerita dan Keceriaan Bersama Kidsland Membumi
        </h3>

        <p className="article-meta">
          Lihat bagaimana anak-anak belajar, bermain, dan menikmati setiap kegiatan.
        </p>

        <a
          className="article-cta"
          href="https://www.instagram.com/reel/DQeOsIsDy0C/?utm_source=ig_web_copy_link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Lihat Reel →
        </a>

      </div>

    </article>

    {/* Burger */}
    <article className="article-card">

      <div
        className="article-pic"
        style={{
          backgroundImage:
            `url(${burger})`
        }}
      />

      <div className="article-body">

        <span className="article-pill">
          🍔 Cooking Class
        </span>

        <h3>
          Cooking Class Membuat Burger yang Seru dan Edukatif
        </h3>

        <p className="article-meta">
          Anak-anak belajar membuat burger sendiri sambil melatih kreativitas dan kemandirian.
        </p>

        <a
          className="article-cta"
          href="https://www.instagram.com/p/DXb6txYkZTH/?utm_source=ig_web_copy_link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Lihat Postingan →
        </a>

      </div>

    </article>

        </div>

        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <a href="https://www.instagram.com/kidslandmembumi" target="_blank" rel="noopener noreferrer" className="home-btn home-btn--secondary">Lihat Semua di Instagram →</a>
        </div>
      </section>

      <section id="contact" className="page-shell section-stack contact-section home-section-fade delay-700">
        <div className="contact-grid">
          <div className="contact-info">
            <span className="section-label section-label--light">Hubungi Kami</span>
            <h2 className="contact-title">Mari Bergabung Bersama Kami.</h2>
            <div className="contact-details">
              <p>📍 Jl. Raya Bojonggenteng No.3, Kabupaten Sukabumi</p>
              <p>📧 kidslandmembumi@gmail.com</p>
              <p>📱 +62 851-1756-8551</p>
            </div>
            <div className="contact-socials">
              <a href="https://www.instagram.com/kidslandmembumi?igsh=ZjA1bzk2enJsd2Y0" target="_blank" rel="noopener noreferrer" className="contact-social" aria-label="Instagram">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                  <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5Zm8.1 2.2a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8ZM12 7.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Zm0 1.5a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
                </svg>
              </a>
              <a href="https://wa.me/6285117568551" target="_blank" rel="noopener noreferrer" className="contact-social" aria-label="WhatsApp">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                  <path d="M12 2.04C6.5 2.04 2 6.55 2 12.06c0 2.09.64 4.02 1.74 5.63L2 22l4.5-1.16a9.97 9.97 0 0 0 5.5 1.4c5.5 0 10-4.51 10-10.02S17.5 2.04 12 2.04Zm5.22 12.52c-.24.66-1.4 1.26-1.92 1.34-.48.08-1.04.11-2.08-.13-2.13-.43-4.4-2.02-5.72-4.1-.68-1.1-.18-1.78.45-2.28.35-.27.78-.46 1.15-.69.32-.2.68-.05.88.27.3.48.95 1.58 1.03 1.7.1.16.17.35.03.55-.12.18-.28.38-.4.57-.14.22-.3.47-.14.74.34.58 1.24 1.94 2.7 3.14 1.42 1.17 2.6 1.53 2.92 1.7.4.22.64.19.88-.12.2-.24.88-1.03 1.1-1.38.12-.18.03-.35-.14-.57-.16-.22-.64-.97-.7-1.07-.08-.16-.15-.18-.28-.3-.14-.13-.3-.28-.44-.42-.15-.16-.3-.34-.13-.55.17-.2.74-.87 1-1.18.18-.2.36-.18.62-.12.27.06 1.7.8 1.99.94.3.15.5.24.57.38.08.13.08.74-.16 1.4Z" />
                </svg>
              </a>
              <a href="https://youtu.be/UdnAn0fJruo?si=LrYczVOZsbU4T0pc" target="_blank" rel="noopener noreferrer" className="contact-social" aria-label="YouTube">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                  <path d="M23.5 6.2a2.8 2.8 0 0 0-1.96-1.98C19.6 4 12 4 12 4s-7.6 0-9.54.22A2.8 2.8 0 0 0 .5 6.2 29.8 29.8 0 0 0 0 12a29.8 29.8 0 0 0 .5 5.8 2.8 2.8 0 0 0 1.96 1.98C4.4 20 12 20 12 20s7.6 0 9.54-.22a2.8 2.8 0 0 0 1.96-1.98A29.8 29.8 0 0 0 24 12a29.8 29.8 0 0 0-.5-5.8Zm-14.1 9.2V8.6l6.3 3.4-6.3 3.4Z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="contact-form contact-form--cta">
            <p className="contact-cta__message">
              Menjadi bagian dari Kidsland Membumi 😊
            </p>
            <button
              type="button"
              className="contact-form__button"
              onClick={handleRegisterClick}
            >
              Daftar Sekarang
            </button>
          </div>
        </div>
      </section>

      <a
        href="https://wa.me/6285117568551"
        target="_blank"
        rel="noreferrer"
        className="whatsapp-fab"
      >
        💬
      </a>
    </main>
  );
}
