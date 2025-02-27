import { useState } from "react";
import axios from "axios";
import { Button, Input } from "antd"; // Import Ant Design components
import { SendOutlined } from "@ant-design/icons"; // Import Send icon
import "antd/dist/reset.css"; // Import Ant Design CSS
import userAvatar from "./assets/user.jpg";
import botAvatar from "./assets/chatbott.png";
import chatIcon from "./assets/chatbott.svg"; // Imposrt SVG icon

const Chat = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;
    setLoading(true);

    try {
      const userMessage = { sender: "user", text: message };
      setChatHistory([...chatHistory, userMessage]);

      const response = await axios.post("http://localhost:5001/chat", {
        message,
      });
      const botReply = { sender: "bot", text: response.data.reply };
      setChatHistory([...chatHistory, userMessage, botReply]);
    } catch (error) {
      setChatHistory([
        ...chatHistory,
        { sender: "bot", text: "Error fetching response." },
      ]);
    }

    setMessage("");
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      {/* Navbar Header */}
      <div style={styles.navbar}>
        <span style={styles.logo}>Pitchwave</span>
      </div>

      {/* Chat Box */}
      <div style={styles.chatBox}>
        <div style={styles.chatTitle}>
          <img src={chatIcon} alt="Chat Icon" style={styles.chatIcon} />
          <span style={styles.chatText}>ChatAI</span>
        </div>

        <div style={styles.messageContainer}>
          {chatHistory.map((msg, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent:
                  msg.sender === "user" ? "flex-end" : "flex-start",
                marginBottom: "5px",
              }}
            >
              {msg.sender === "bot" && (
                <img src={botAvatar} alt="Bot" style={styles.avatar} />
              )}
              <span
                style={{
                  ...styles.messageBubble,
                  backgroundColor:
                    msg.sender === "user" ? "#6cb4ff" : "#f0f0f0",
                  color: msg.sender === "user" ? "#fff" : "#000",
                }}
              >
                {msg.text}
              </span>
              {msg.sender === "user" && (
                <img src={userAvatar} alt="User" style={styles.avatar} />
              )}
            </div>
          ))}
          {loading && <p style={styles.loading}>Thinking...</p>}
        </div>

        <div style={styles.inputContainer}>
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            style={styles.input}
            onPressEnter={handleSend} // Allows Enter key to send message
          />
          {/* Ant Design Button with Icon */}
          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={handleSend}
            style={styles.button}
            disabled={!message.trim()} // Disable when input is empty
          >
            Send
          </Button>
        </div>
      </div>

      {/* Footer */}
      <div style={styles.footer}>© 2024 Pitchwave. All rights reserved.</div>
    </div>
  );
};

const styles = {
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#FFFFFF", // Dark background
    padding: "20px",
  },

  navbar: {
    width: "100%",
    height: "60px",
    backgroundColor: "#1F2937",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "0 20px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    position: "fixed",
    top: "0",
    left: "0",
    zIndex: "1000",
  },

  logo: {
    color: "#fff",
    fontSize: "20px",
    fontWeight: "bold",
  },

  footer: {
    width: "100%",
    height: "50px",
    backgroundColor: "#1F2937",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "fixed",
    bottom: "0",
    left: "0",
  },

  chatBox: {
    width: "50%",
    maxWidth: "900px",
    backgroundColor: "#FFFFFF",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
    padding: "20px",
    color: "#000",
    marginTop: "80px", // Pushes chat below navbar
    marginBottom: "60px", // Avoids overlap with footer
  },

  chatTitle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    fontWeight: "bold",
    padding: "8px 0",
    marginBottom: "8px",
    borderBottom: "1px solid #ddd",
  },

  chatIcon: {
    width: "20px", // Smaller size
    height: "20px",
    marginRight: "6px", // Less spacing
  },

  chatText: {
    fontSize: "16px",
  },

  messageContainer: {
    height: "500px",
    overflowY: "auto",
    padding: "10px",
    marginBottom: "10px",
  },

  messageBubble: {
    display: "inline-block",
    padding: "12px",
    borderRadius: "15px",
    maxWidth: "70%",
    wordWrap: "break-word",
    margin: "5px 0",
  },

  avatar: {
    width: "35px",
    height: "35px",
    borderRadius: "50%",
    margin: "0 10px",
  },

  loading: {
    textAlign: "center",
    color: "#666",
    fontStyle: "italic",
  },

  inputContainer: {
    display: "flex",
    gap: "10px",
    backgroundColor: "#eee",
    padding: "10px",
    borderRadius: "5px",
  },

  input: {
    flex: 1,
    padding: "12px",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    backgroundColor: "#fff",
    color: "#000",
  },

  button: {
    width: "120px", // Set button width
    height: "50px", // Match input height
    fontSize: "16px",
    marginLeft: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

export default Chat;
