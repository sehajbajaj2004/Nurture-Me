import React, { useState, useEffect } from "react";
import socket from "../socket";

const AdminPage = () => {
  const [activeChats, setActiveChats] = useState([]); // Active chats
  const [selectedChat, setSelectedChat] = useState(null); // Selected chat
  const [messages, setMessages] = useState([]); // Messages for the selected chat
  const [newMessage, setNewMessage] = useState(""); // For admin input

  useEffect(() => {
    // Listen for active chats
    socket.on("active_chats", (chats) => {
      setActiveChats(chats);
    });

    // Listen for real-time new messages
    socket.on("message_to_admin", (data) => {
      if (selectedChat && data.id === selectedChat.socketId) {
        setMessages((prevMessages) => [...prevMessages, data]);
      }
    });

    return () => {
      socket.off("active_chats");
      socket.off("message_to_admin");
    };
  }, [selectedChat]);

  useEffect(() => {
    if (selectedChat) {
      socket.emit("fetch_chat", selectedChat.socketId);

      socket.on("chat_history", ({ chatId, history }) => {
        if (chatId === selectedChat.socketId) {
          setMessages(history);
        }
      });

      return () => {
        socket.off("chat_history");
      };
    }
  }, [selectedChat]);

  const sendMessage = () => {
    if (newMessage.trim() === "" || !selectedChat) return;

    const msgObj = {
      id: selectedChat.socketId,
      message: newMessage,
      sender: "admin",
    };
    socket.emit("message", msgObj);
    setMessages((prevMessages) => [...prevMessages, msgObj]);
    setNewMessage("");
  };

  return (
    <div className="p-6 mt-28">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-4">Active Live Chats</h2>
          <ul className="list-disc pl-6">
            {activeChats.length > 0 ? (
              activeChats.map((chat, index) => (
                <li
                  key={index}
                  className="cursor-pointer text-blue-500 underline"
                  onClick={() => setSelectedChat(chat)}
                >
                  {chat.username} (Chat ID: {chat.socketId})
                </li>
              ))
            ) : (
              <p>No active chats</p>
            )}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">
            Messages for Chat: {selectedChat?.username || "Select a Chat"}
          </h2>
          {selectedChat ? (
            <>
              <div className="border p-2 mb-4 h-64 overflow-y-scroll">
                {messages.map((msg, index) => (
                  <p
                    key={index}
                    className={`p-2 my-2 rounded ${
                      msg.sender === "admin" ? "bg-blue-100" : "bg-gray-100"
                    }`}
                  >
                    {msg.message}{" "}
                    <span className="text-xs text-gray-500">
                      ({msg.sender})
                    </span>
                  </p>
                ))}
              </div>
              <input
                type="text"
                placeholder="Type your message..."
                className="border p-2 w-full mb-2"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendMessage();
                }}
              />
              <button
                onClick={sendMessage}
                className="mt-2 bg-blue-500 text-white px-4 py-2"
              >
                Send
              </button>
            </>
          ) : (
            <p>Select a chat to view messages.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
