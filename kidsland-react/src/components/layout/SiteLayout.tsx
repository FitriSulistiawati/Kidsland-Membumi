import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import logoImage from "../../assets/images__1_-removebg-preview.png";
import "./SiteLayout.css";

const navItems = [
  { href: "/", label: "Beranda" },
  { href: "#about", label: "About" },
  { href: "#program", label: "Program" },
  { href: "/login", label: "Login Admin" },
];

export default function SiteLayout() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="site-layout">
      <header className={`site-header site-header--home ${scrolled ? "site-header--scrolled" : ""}`}>
        <div className="site-header__inner page-shell">
          <a
            href="/"
            aria-label="Kidsland Membumi Beranda"
            className="site-header__logo-link"
          >
            <img
              src={logoImage}
              alt="Kidsland Membumi"
              className="site-header__logo"
            />
          </a>

          <nav className="site-nav">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="site-nav__link">
                {item.label}
              </a>
            ))}

            <div className="site-nav__icons">
              <a href="https://www.instagram.com/kidslandmembumi" target="_blank" rel="noopener noreferrer" className="site-nav__icon" aria-label="Instagram">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                  <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5Zm8.1 2.2a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8ZM12 7.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Zm0 1.5a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
                </svg>
              </a>
              <a href="https://youtu.be/UdnAn0fJruo?si=LrYczVOZsbU4T0pc" target="_blank" rel="noopener noreferrer" className="site-nav__icon" aria-label="YouTube">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                  <path d="M23.5 6.2a2.8 2.8 0 0 0-1.96-1.98C19.6 4 12 4 12 4s-7.6 0-9.54.22A2.8 2.8 0 0 0 .5 6.2 29.8 29.8 0 0 0 0 12a29.8 29.8 0 0 0 .5 5.8 2.8 2.8 0 0 0 1.96 1.98C4.4 20 12 20 12 20s7.6 0 9.54-.22a2.8 2.8 0 0 0 1.96-1.98A29.8 29.8 0 0 0 24 12a29.8 29.8 0 0 0-.5-5.8Zm-14.1 9.2V8.6l6.3 3.4-6.3 3.4Z" />
                </svg>
              </a>
              <a href="https://wa.me/6285117568551"
                target="_blank"
                rel="noopener noreferrer"
                className="site-nav__icon"
                aria-label="WhatsApp"
              >
                <svg
                viewBox="0 0 24 24"
                  width="20"
                height="20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 1.92.54 3.72 1.48 5.25L2 22l4.91-1.44A9.96 9.96 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2Zm0 18.18c-1.52 0-3-.4-4.3-1.15l-.31-.18-2.91.85.86-2.83-.2-.33A8.13 8.13 0 1 1 12 20.18Zm4.46-6.11c-.24-.12-1.41-.7-1.63-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1-.37-1.9-1.19-.7-.62-1.17-1.39-1.31-1.63-.14-.24-.01-.37.1-.49.1-.1.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.79-.2-.47-.4-.41-.54-.42h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.68 2.56 4.07 3.59.57.24 1.01.38 1.36.48.57.18 1.08.16 1.49.1.46-.07 1.41-.58 1.61-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" />
                </svg>
              </a>
            </div>
          </nav>
        </div>
      </header>

      <main className="site-main">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="site-footer__inner page-shell">
          <div className="site-footer__brand-group">
            <img src={logoImage} alt="Kidsland Membumi" style={{height: '48px'}} />
            <p className="site-footer__brand">Tumbuh Bersama Alam</p>
          </div>

          <div className="site-footer__links-group">
            <p className="site-footer__heading">Navigasi</p>
            <ul className="site-footer__list">
              <li><a href="/" className="site-footer__link">Beranda</a></li>
              <li><a href="#about" className="site-footer__link">About</a></li>
              <li><a href="#program" className="site-footer__link">Program</a></li>
              <li><a href="#contact" className="site-footer__link">Kontak</a></li>
            </ul>
          </div>

          <div className="site-footer__contact-group">
            <p className="site-footer__heading">Ikuti Kami</p>
            <div style={{display:'flex', gap:'0.5rem'}}>
              <a href="https://www.instagram.com/kidslandmembumi" target="_blank" rel="noopener noreferrer" className="site-footer__link" aria-label="Instagram">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                  <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5Zm8.1 2.2a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8ZM12 7.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Zm0 1.5a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
                </svg>
              </a>
              <a href="https://youtu.be/UdnAn0fJruo?si=LrYczVOZsbU4T0pc" target="_blank" rel="noopener noreferrer" className="site-footer__link" aria-label="YouTube">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                  <path d="M23.5 6.2a2.8 2.8 0 0 0-1.96-1.98C19.6 4 12 4 12 4s-7.6 0-9.54.22A2.8 2.8 0 0 0 .5 6.2 29.8 29.8 0 0 0 0 12a29.8 29.8 0 0 0 .5 5.8 2.8 2.8 0 0 0 1.96 1.98C4.4 20 12 20 12 20s7.6 0 9.54-.22a2.8 2.8 0 0 0 1.96-1.98A29.8 29.8 0 0 0 24 12a29.8 29.8 0 0 0-.5-5.8Zm-14.1 9.2V8.6l6.3 3.4-6.3 3.4Z" />
                </svg>
              </a>
              <a href="https://wa.me/6285117568551" target="_blank" rel="noopener noreferrer" className="site-footer__link" aria-label="WhatsApp">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                  <path d="M12 2.04C6.5 2.04 2 6.55 2 12.06c0 2.09.64 4.02 1.74 5.63L2 22l4.5-1.16a9.97 9.97 0 0 0 5.5 1.4c5.5 0 10-4.51 10-10.02S17.5 2.04 12 2.04Zm5.22 12.52c-.24.66-1.4 1.26-1.92 1.34-.48.08-1.04.11-2.08-.13-2.13-.43-4.4-2.02-5.72-4.1-.68-1.1-.18-1.78.45-2.28.35-.27.78-.46 1.15-.69.32-.2.68-.05.88.27.3.48.95 1.58 1.03 1.7.1.16.17.35.03.55-.12.18-.28.38-.4.57-.14.22-.3.47-.14.74.34.58 1.24 1.94 2.7 3.14 1.42 1.17 2.6 1.53 2.92 1.7.4.22.64.19.88-.12.2-.24.88-1.03 1.1-1.38.12-.18.03-.35-.14-.57-.16-.22-.64-.97-.7-1.07-.08-.16-.15-.18-.28-.3-.14-.13-.3-.28-.44-.42-.15-.16-.3-.34-.13-.55.17-.2.74-.87 1-1.18.18-.2.36-.18.62-.12.27.06 1.7.8 1.99.94.3.15.5.24.57.38.08.13.08.74-.16 1.4Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="site-footer__bottom page-shell">
          <p className="site-footer__copyright">© 2025 Kidsland Membumi. Semua hak dilindungi.</p>
          <div className="site-footer__policy-links">
            <a href="#" className="site-footer__link">Privacy Policy</a>
            <a href="#" className="site-footer__link">Syarat &amp; Ketentuan</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
