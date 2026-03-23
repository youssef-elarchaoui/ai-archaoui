import "./App.css";
import gptLogo from "./assets/chatgpt.svg";
import addBtn from "./assets/add-30.png";
import msgIcon from "./assets/message.svg";
import home from "./assets/home.svg";
import saved from "./assets/bookmark.svg";
import rocket from "./assets/rocket.svg";
import sendBtn from "./assets/send.svg";
import userIcon from "./assets/user-icon.png";
import gptImgLogo from "./assets/chatgptLogo.svg";
import { sendMsgToGroq } from "./groq";
import { useState, useRef, useEffect } from "react";

function App() {
  // ========== STATES ==========
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Bonjour, je suis Ai Archaoui. Comment puis-je vous aider aujourd'hui ?",
      isBot: true,
    },
  ]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [savedChats, setSavedChats] = useState(() => {
    const saved = localStorage.getItem("savedChats");
    return saved ? JSON.parse(saved) : [];
  });
  const [showSavedChats, setShowSavedChats] = useState(false);

  // ========== REFS ==========
  const chatsEndRef = useRef(null);

  // ========== AUTO SCROLL ==========
  const scrollToBottom = () => {
    chatsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  // ========== CLOSE SIDEBAR ON CLICK OUTSIDE ==========
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (window.innerWidth <= 768 && sidebarOpen) {
        if (!e.target.closest(".sideBar") && !e.target.closest(".menuToggle")) {
          setSidebarOpen(false);
        }
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [sidebarOpen]);

  // ========== PREVENT BODY SCROLL WHEN SIDEBAR OPEN ==========
  useEffect(() => {
    if (sidebarOpen && window.innerWidth <= 816) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [sidebarOpen]);

  // ========== SAVE CURRENT CHAT ==========
  const saveCurrentChat = () => {
    if (messages.length <= 1) {
      alert("Aucune conversation à enregistrer");
      return;
    }
    const newSavedChat = {
      id: Date.now(),
      name: messages[1]?.text.substring(0, 30) + "...",
      messages: messages,
      date: new Date().toLocaleString(),
    };
    const updatedSavedChats = [newSavedChat, ...savedChats];
    setSavedChats(updatedSavedChats);
    localStorage.setItem("savedChats", JSON.stringify(updatedSavedChats));
    alert("Conversation enregistrée avec succès !");
  };

  // ========== LOAD SAVED CHAT ==========
  const loadSavedChat = (chat) => {
    setMessages(chat.messages);
    setShowSavedChats(false);
    setSidebarOpen(false);
  };

  // ========== DELETE SAVED CHAT ==========
  const deleteSavedChat = (id) => {
    const updatedSavedChats = savedChats.filter((chat) => chat.id !== id);
    setSavedChats(updatedSavedChats);
    localStorage.setItem("savedChats", JSON.stringify(updatedSavedChats));
  };

  // ========== NEW CHAT ==========
  const newChat = () => {
    setMessages([
      {
        text: "Bonjour, je suis Ai Archaoui. Comment puis-je vous aider aujourd'hui ?",
        isBot: true,
      },
    ]);
    setInput("");
    setShowSavedChats(false);
    setSidebarOpen(false);
  };

  // ========== SEND MESSAGE ==========
  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    const userMsg = { text: userMessage, isBot: false };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const chatHistory = messages.concat(userMsg).map((msg) => ({
        role: msg.isBot ? "assistant" : "user",
        content: msg.text,
      }));

      const apiMessages = [
        {
          role: "system",
          content:
            "You are a helpful assistant named Ai Archaoui. Respond in the same language as the user.",
        },
        ...chatHistory,
      ];

      const res = await sendMsgToGroq(apiMessages);
      const botMsg = { text: res, isBot: true };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error("Error:", error);
      const errorMsg = {
        text: "❌ Désolé, une erreur s'est produite. Veuillez réessayer.",
        isBot: true,
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const queryExample = (text) => {
    setInput(text);
    setSidebarOpen(false);
  };

  // ========== JSX ==========
  return (
    <div className="App">
      <button
        className={`menuToggle ${sidebarOpen ? "open" : "closed"}`}
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <span className="sideS">{sidebarOpen ? "✕" : "☰"}</span>
      </button>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="sidebarOverlay"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`sideBar ${sidebarOpen ? "open" : ""}`}>
        <div className="upperSide">
          <div className="upperSideTop">
            <img src={gptLogo} alt="Logo" className="logo" />
            <span className="brand">Ai Archaoui</span>
          </div>

          <button className="midBtn" onClick={newChat}>
            <img src={addBtn} alt="New Chat" className="addBtn" />
            Nouveau Chat
          </button>

          <div className="upperSideBottom">
            <button
              className="query"
              onClick={() => queryExample("Qu'est-ce que la programmation?")}
            >
              <img src={msgIcon} alt="Message" />
              Qu'est-ce que la programmation ?
            </button>
            <button
              className="query"
              onClick={() => queryExample("Qu'est-ce que JavaScript?")}
            >
              <img src={msgIcon} alt="Message" />
              Qu'est-ce que JavaScript ?
            </button>
            <button
              className="query"
              onClick={() => queryExample("Comment utiliser React?")}
            >
              <img src={msgIcon} alt="Message" />
              Comment utiliser React ?
            </button>
          </div>
        </div>

        <div className="lowerSide">
          <div className="listItems" onClick={() => setShowSavedChats(false)}>
            <img src={home} alt="Home" className="listItemsImg" />
            Home
          </div>

          <div
            className="listItems"
            onClick={() => setShowSavedChats(!showSavedChats)}
          >
            <img src={saved} alt="Saved" className="listItemsImg" />
            Saved ({savedChats.length})
          </div>

          <div
            className="listItems"
            onClick={() => {
              if (window.confirm("Voulez-vous enregistrer la conversation actuelle ?")) {
                saveCurrentChat();
              }
            }}
          >
            <img src={rocket} alt="Save" className="listItemsImg" />
            Save Chat
          </div>

          <div
            className="listItems"
            onClick={() => {
              alert("🚀 Version Pro bientôt disponible ");
              setSidebarOpen(false);
            }}
          >
            <img src={rocket} alt="Rocket" className="listItemsImg" />
            Upgrade to Pro
          </div>
        </div>

        {/* Saved Chats Panel */}
        {showSavedChats && (
          <div className="savedChatsPanel">
            <div className="savedChatsHeader">
              <h3>📚 Conversations enregistrées</h3>
              <button
                onClick={() => setShowSavedChats(false)}
                className="closeBtn"
              >
                ✕
              </button>
            </div>
            {savedChats.length === 0 ? (
              <p className="noChats">Aucune conversation enregistrée</p>
            ) : (
              savedChats.map((chat) => (
                <div key={chat.id} className="savedChatItem">
                  <div
                    className="savedChatInfo"
                    onClick={() => loadSavedChat(chat)}
                  >
                    <p className="chatTitle">{chat.name}</p>
                    <p className="chatDate">{chat.date}</p>
                  </div>
                  <button
                    onClick={() => deleteSavedChat(chat.id)}
                    className="deleteChatBtn"
                  >
                    🗑️
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
      <div className="mobileHeader">
        <img src={gptLogo} alt="logo" />
        <span>Ai Archaoui</span>
      </div>
      {/* Main Chat Area */}
      <div className="main">
        <div className="chats">
          {messages.map((msg, i) => (
            <div className={msg.isBot ? "chat" : "chat user"} key={i}>
              {msg.isBot && <img src={gptImgLogo} alt="AI" />}
              <p className="txt">{msg.text}</p>
              {!msg.isBot && <img src={userIcon} alt="User" />}
            </div>
          ))}
          {loading && (
            <div className="chat">
              <img src={gptImgLogo} alt="AI" />
              <div className="loading">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          <div ref={chatsEndRef} />
        </div>

        <div className="chatFooter">
          <div className="inp">
            <input
              type="text"
              placeholder="Envoyer un message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading}
            />
            <button className="send" onClick={handleSend} disabled={loading}>
              <img src={sendBtn} alt="send" />
            </button>
          </div>
          <p>
            AI Archaoui peut faire des erreurs. Vérifiez les informations
            importantes.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
