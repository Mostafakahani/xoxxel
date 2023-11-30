// ChatContext.js
import React, { createContext, useContext, useState } from 'react';

const ChatContext = createContext();

export const ChatProvider = ({ children, initialMessages = [] }) => {
  const [messages, setMessages] = useState(initialMessages);

  const addMessage = (text, from) => {
    setMessages([...messages, { id: messages.length + 1, text, from }]);
  };

  return (
    <ChatContext.Provider value={{ messages, addMessage }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat باید درون یک ChatProvider استفاده شود');
  }
  return context;
};
