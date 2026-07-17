import { useEffect, useRef, useState } from "react";

type Message = {
  sender: "bot" | "user";
  text: string;
  waLink?: string;
};

const CHATBOT_API_URL =
  import.meta.env.VITE_CHATBOT_API_URL ||
  (import.meta.env.DEV ? "http://127.0.0.1:5000/chat" : "https://kidsland-membumi-production.up.railway.app/chat");
const WHATSAPP_FALLBACK_LINK = import.meta.env.VITE_WHATSAPP_ADMIN_LINK || "https://wa.me/6285117568551";

export default function Chatbot() {

  const [open, setOpen] = useState(false);

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Halo 👋, ada yang dapat kami bantu?"
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages, open]);

  useEffect(() => {
    const handleOpenChatbot = () => setOpen(true);
    window.addEventListener("openChatbot", handleOpenChatbot);
    return () => window.removeEventListener("openChatbot", handleOpenChatbot);
  }, []);

  const sendMessage = async () => {

    if (!message.trim()) return;

    const userMessage = message;

    setMessages(prev => [
      ...prev,
      {
        sender: "user",
        text: userMessage
      }
    ]);

    setMessage("");

    try {

  console.log("API URL:", CHATBOT_API_URL);
  console.log("Pesan:", userMessage);

      const response = await fetch(
        CHATBOT_API_URL,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            message: userMessage
          })
        }
      );

      const data = await response.json();

      const botText = data.wa
        ? `${data.jawaban}\n\nUntuk info lebih lanjut silakan hubungi admin di bawah ini.`
        : data.jawaban;

      setMessages(prev => [
        ...prev,
        {
          sender: "bot",
          text: botText,
          waLink: data.wa ? (data.link || WHATSAPP_FALLBACK_LINK) : undefined
        }
      ]);

    } catch {

      setMessages(prev => [
        ...prev,
        {
          sender: "bot",
          text: "Gagal terhubung ke server chatbot."
        }
      ]);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #5e9f4c, #82c163)",
          border: "none",
          color: "#ffffff",
          fontSize: "1.4rem",
          boxShadow: "0 18px 30px rgba(46, 125, 50, 0.25)",
          cursor: "pointer",
          transition: "transform 0.2s ease"
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = "none";
        }}
      >
        💬
      </button>

      {open && (
        <div
          style={{
            position: "fixed",
            bottom: "90px",
            right: "20px",
            width: "395px",
            background: "linear-gradient(180deg, #f8fbf7, #e8f2e5)",
            border: "1px solid #d7e5d1",
            borderRadius: "24px",
            boxShadow: "0 22px 48px rgba(33, 72, 23, 0.18)",
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "14px"
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <p style={{ margin: 0, fontSize: "1rem", fontWeight: 700, color: "#1f4630" }}>Chat BotMembumi</p>
              <p style={{ margin: 0, fontSize: "0.82rem", color: "#4f6d56" }}>Tanya tentang program Kidsland dan layanan.</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{
                width: "34px",
                height: "34px",
                borderRadius: "50%",
                border: "none",
                background: "#e4f0e0",
                color: "#3b6444",
                cursor: "pointer",
                fontWeight: 700
              }}
            >
              ✕
            </button>
          </div>
          <div
            style={{
              height: "340px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              paddingRight: "6px"
            }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: msg.sender === "user" ? "flex-end" : "flex-start"
                }}
              >
                <div
                  style={{
                    maxWidth: "80%",
                    background: msg.sender === "user" ? "#5f984d" : "rgba(255, 255, 255, 0.96)",
                    color: msg.sender === "user" ? "#ffffff" : "#1f2937",
                    padding: "14px 16px",
                    borderRadius: "22px",
                    border: msg.sender === "user" ? "1px solid #4a7e43" : "1px solid #e2e8f0",
                    boxShadow: msg.sender === "user" ? "0 10px 24px rgba(95, 152, 77, 0.18)" : "0 10px 22px rgba(15, 23, 42, 0.06)",
                    whiteSpace: "pre-wrap"
                  }}
                >
                  <p style={{ margin: 0, lineHeight: 1.6 }}>{msg.text}</p>
                  {msg.waLink && (
                    <button
                      onClick={() => window.open(msg.waLink, "_blank")}
                      style={{
                        marginTop: "10px",
                        width: "100%",
                        background: "#4f9a49",
                        border: "none",
                        borderRadius: "14px",
                        color: "#ffffff",
                        padding: "12px 14px",
                        fontWeight: 700,
                        cursor: "pointer"
                      }}
                    >
                      Hubungi Admin
                    </button>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tulis pertanyaan..."
              style={{
                flex: 1,
                borderRadius: "14px",
                border: "1px solid #d1d5db",
                padding: "10px 12px",
                outline: "none",
                fontSize: "0.95rem"
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
            />

            <button
              onClick={sendMessage}
              style={{
                background: "#4f9a49",
                border: "none",
                color: "#ffffff",
                padding: "10px 16px",
                borderRadius: "14px",
                cursor: "pointer",
                fontWeight: 600
              }}
            >
              Kirim
            </button>
          </div>
        </div>
      )}
    </>
  );
}