// Chat.js
import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import { ChatProvider, useChat } from './ChatContext';
import { useState } from 'react';

const Chat = () => {
  // const { setMessages } = useChat();
  const [messages, setMessages] = useState([

  ])

  useEffect(() => {
    setMessages([
      {
        id: 1,
        text: 'سلام!',
        from: 'user1',
      },
      {
        id: 2,
        text: 'سلام به شما!',
        from: 'user2',
      },
      {
        id: 3,
        text: 'چطور می‌توانم به شما کمک کنم؟',
        from: 'user1',
      },
      {
        id: 4,
        text: 'من به دنبال راهنمایی در مورد یک پروژه هستم.',
        from: 'user2',
      },
    ]);
  }, []);

  return (
    // <ChatProvider initialMessages={[]}>
    <Grid container sx={{ display: 'flex', flexDirection: 'column' }}>
      <ChatHeader />
      <ChatMessages messages={messages} />
      <ChatInput
      />
    </Grid>
    // </ChatProvider>
  );
};

export default Chat;
