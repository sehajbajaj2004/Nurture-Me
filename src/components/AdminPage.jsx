import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:8080");

function AdminPage() {
  const [activeChats, setActiveChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("active_chats", (chats) => {
      setActiveChats(chats);
    });

    return () => socket.off("active_chats");
  }, []);

  const handleChatClick = (chatId) => {
    setSelectedChat(chatId);

    // Simulating fetching chat messages
    socket.emit("fetch_messages", chatId);
    socket.on("chat_messages", (msgs) => {
      setMessages(msgs);
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-4">Active Live Chats</h2>
          <ul className="list-disc pl-6">
            {activeChats.map((chat, index) => (
              <li
                key={index}
                className="cursor-pointer text-blue-500 underline"
                onClick={() => handleChatClick(chat)}
              >
                Chat ID: {chat}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Messages for Chat: {selectedChat || "Select a Chat"}
          </h2>
          {selectedChat ? (
            <ul className="list-disc pl-6">
              {messages.map((msg, index) => (
                <li key={index}>{msg.message}</li>
              ))}
            </ul>
          ) : (
            <p>Select a chat to view messages.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
