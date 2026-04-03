import { useState } from "react";

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi 👋 कैसे मदद कर सकता हूँ?", sender: "bot" }
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg = { text: input, sender: "user" };
    const botReply = getBotReply(input);

    setMessages(prev => [...prev, userMsg, botReply]);
    setInput("");
  };

  const getBotReply = (msg) => {
    msg = msg.toLowerCase();

    if (msg.includes("course"))
      return { text: "Courses देखने के लिए Explore page पर जाओ 👍", sender: "bot" };

    if (msg.includes("quiz"))
      return { text: "Quiz course detail page में available है 📝", sender: "bot" };

    if (msg.includes("login"))
      return { text: "Login करने के लिए ऊपर Login button use करो 🔐", sender: "bot" };

    return { text: "समझ नहीं आया 😅 फिर से पूछो", sender: "bot" };
  };

  return (
    <>
      {/* Floating Button */}
      <div
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          background: "#7c3aed",
          color: "#fff",
          width: "55px",
          height: "55px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          fontSize: "24px",
          zIndex: 1000
        }}
      >
        💬
      </div>

      {/* Chat Window */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: "90px",
            right: "20px",
            width: "300px",
            height: "400px",
            background: "#fff",
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            zIndex: 1000
          }}
        >
          {/* Header */}
          <div style={{
            background: "#7c3aed",
            color: "#fff",
            padding: "10px",
            fontWeight: "700"
          }}>
            Chat Support
          </div>

          {/* Messages */}
          <div style={{
            flex: 1,
            padding: "10px",
            overflowY: "auto"
          }}>
            {messages.map((m, i) => (
              <div key={i} style={{
                textAlign: m.sender === "user" ? "right" : "left",
                marginBottom: "8px"
              }}>
                <span style={{
                  background: m.sender === "user" ? "#7c3aed" : "#f1f5f9",
                  color: m.sender === "user" ? "#fff" : "#000",
                  padding: "6px 10px",
                  borderRadius: "10px",
                  display: "inline-block"
                }}>
                  {m.text}
                </span>
              </div>
            ))}
          </div>

          {/* Input */}
          <div style={{ display: "flex", borderTop: "1px solid #ddd" }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type..."
              style={{ flex: 1, padding: "8px", border: "none", outline: "none" }}
            />
            <button onClick={sendMessage} style={{
              background: "#7c3aed",
              color: "#fff",
              border: "none",
              padding: "8px 12px",
              cursor: "pointer"
            }}>
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;