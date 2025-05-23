import React, { useState } from "react";
import axios from "../api/axios";

const ChatDrawer = ({ open, onClose, chat, setChat }) => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const updatedChat = [...chat, { sender: "user", text: message }];
    setChat(updatedChat);
    setMessage("");
    setLoading(true);

    try {
      const response = await axios.post("/api/chatbot", { message });
      const reply = response.data.response;
      setChat([...updatedChat, { sender: "bot", text: reply }]);
    } catch (error) {
      setChat([
        ...updatedChat,
        { sender: "bot", text: "❌ Cevap alınamadı. Lütfen tekrar deneyin." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: open ? 0 : "-100%",
        width: "30vw",
        height: "100vh",
        backgroundColor: "#F7FDFB",
        color: "#143D60",
        padding: 20,
        transition: "right 0.3s ease-in-out",
        zIndex: 999,
        boxShadow: "-3px 0 10px rgba(0,0,0,0.2)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Üst başlık */}
      <div className="flex justify-between items-center">
        <h4 className="text-[#2D9596] text-lg font-semibold">🤖 SummerSchoolAsistan</h4>
        <button onClick={onClose} className="text-2xl hover:text-red-600">✖</button>
      </div>

      {/* Mesajlar */}
      <div style={{ flex: 1, overflowY: "auto", margin: "20px 0" }}>
        {chat.map((item, index) => (
          <div
            key={index}
            style={{
              textAlign: item.sender === "user" ? "right" : "left",
              marginBottom: 12,
            }}
          >
            <span
              style={{
                background: item.sender === "user" ? "#2D9596" : "#90D1CA",
                color: "#fff",
                padding: "10px 14px",
                borderRadius: 12,
                display: "inline-block",
                maxWidth: "80%",
                whiteSpace: "pre-wrap",
              }}
            >
              {item.text}
            </span>
          </div>
        ))}
      </div>

      {/* Giriş alanı */}
      <div className="flex gap-2">
        <input
          type="text"
          className="flex-grow px-4 py-2 rounded border border-[#90D1CA] focus:outline-none"
          placeholder="Bir soru yaz..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className={`px-4 py-2 rounded font-semibold text-white ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#077A7D] hover:bg-[#066467]"
          }`}
        >
          Gönder
        </button>
      </div>
    </div>
  );
};

export default ChatDrawer;
