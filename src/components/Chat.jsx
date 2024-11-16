import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:8080");

function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    socket.on("message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => socket.off("message");
  }, []);

  const sendMessage = () => {
    if (newMessage.trim() === "") return;
    const msgObj = { id: socket.id, message: newMessage };
    socket.emit("message", msgObj);
    setMessages((prevMessages) => [...prevMessages, msgObj]);
    setNewMessage("");
  };

  return (
    <div className="p-6 border rounded shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Live Chat</h2>
      <div className="h-64 overflow-y-scroll border p-2 mb-4">
        {messages.map((msg, index) => (
          <p key={index} className="bg-gray-100 p-2 my-2 rounded">
            {msg.message} <span className="text-xs text-gray-500">({msg.id})</span>
          </p>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type your message..."
        className="border w-full p-2"
      />
      <button
        onClick={sendMessage}
        className="mt-2 bg-green-500 text-white px-4 py-2"
      >
        Send
      </button>
    </div>
  );
}

export default Chat;
