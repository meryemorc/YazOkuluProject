import React, { useState } from "react";
import axios from "../api/axios";

const ChatDrawer = ({ open, onClose }) => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
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
        backgroundColor: "#1e1e2f",
        color: "white",
        padding: 20,
        transition: "right 0.3s ease-in-out",
        zIndex: 999,
        boxShadow: "-3px 0 10px rgba(0,0,0,0.3)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Üst başlık */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h4 className="text-purple-400 text-lg font-semibold">🤖 SummerSchoolAsistan</h4>
        <button onClick={onClose} className="text-white text-2xl hover:text-red-400">✖</button>
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
                background: item.sender === "user" ? "#5791C3" : "#2d2d45",
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
      <div style={{ display: "flex", gap: 8 }}>
        <input
          type="text"
          className="form-control"
          placeholder="Bir soru yaz..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="btn btn-sm btn-success"
        >
          Gönder
        </button>
      </div>
    </div>
  );
};

export default ChatDrawer;
