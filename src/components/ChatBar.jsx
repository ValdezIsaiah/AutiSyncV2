import React from 'react';
import { useChat } from './ChatContext';

const ChatBar = () => {
  const {
    showChatBar,
    roomNumber,
    chatMessages,
    messageInput,
    setMessageInput,
    handleSendMessage
  } = useChat();

  if (!showChatBar) return null;

  return (
    <aside className="bg-blue-100 shadow-lg w-64 h-[calc(100vh-56px)] fixed top-[56px] left-0 z-40 p-4 flex flex-col">
      {/* Chat Header */}
      <div className="mb-2">
        <h3 className="text-xl font-bold text-blue-800">Chat Room</h3>
        <p className="text-sm text-gray-700">🟢 Room: <strong>{roomNumber}</strong></p>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto mb-2 space-y-2">
        {chatMessages.map((msg) => (
          <div
            key={msg.id}
            className={`p-2 rounded text-sm max-w-[90%] ${
              msg.sender === 'you' ? 'bg-blue-200 self-end text-right' : 'bg-white self-start text-left'
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input & Send */}
      <div className="mt-auto">
        <textarea
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder="Type a message..."
          className="w-full p-2 border rounded resize-none h-16 text-sm"
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-600 text-white w-full py-2 mt-1 rounded hover:bg-blue-700 text-sm"
        >
          Send
        </button>
      </div>
    </aside>
  );
};

export default ChatBar;