import { createContext, useContext, useState } from "react";

const ChatContext = createContext();

export function ChatProvider({ children }) {
  const [showChatBar, setShowChatBar] = useState(false);
  const [roomNumber, setRoomNumber] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');

  const handleSendMessage = () => {
    if (messageInput.trim() !== '') {
      const newMessage = {
        id: Date.now(),
        text: messageInput,
        sender: 'you',
      };
      setChatMessages([...chatMessages, newMessage]);
      setMessageInput('');
      setTimeout(() => {
        const reply = {
          id: Date.now() + 1,
          text: 'Hi there! 👋',
          sender: 'friend',
        };
        setChatMessages((prev) => [...prev, reply]);
      }, 1500);
    }
  };

  return (
    <ChatContext.Provider value={{
      showChatBar, setShowChatBar,
      roomNumber, setRoomNumber,
      chatMessages, setChatMessages,
      messageInput, setMessageInput,
      handleSendMessage
    }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  return useContext(ChatContext);
}