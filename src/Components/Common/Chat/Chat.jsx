// Chat.js
import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import { ChatProvider, useChat } from './ChatContext';
import { useState } from 'react';

const Chat = ({ data, getData }) => {
  // const { setMessages } = useChat();
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (data.formattedInfo && data.formattedInfo.length > 0) {
      setMessages(
        data.formattedInfo.map((x) => ({
          id: x.id,
          text: x.title,
          from: x.sender,
        }))
      );
      setIsLoading(false);
    }
  }, [data.formattedInfo]);


  const handleSendMessage = (messageText) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { id: prevMessages.length + 1, text: messageText, from: 'admin' },
    ]);

    // ارسال متن به تابع getData از پراپ
    getData(messageText);
  };
  return (
    // <ChatProvider initialMessages={[]}>
    <>
      <Grid sx={{ backgroundColor: '#fff', p: 3, borderRadius: "10px" }}>
        <Grid container sx={{ display: 'flex', flexDirection: 'column' }}>
          <ChatHeader />
          <Grid sx={{ height: '500px' }}>
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              <ChatMessages messages={messages} />
            )}
          </Grid>
          <ChatInput onSendMessage={handleSendMessage} />

        </Grid>
      </Grid>
    </>
    // </ChatProvider>
  );
};

export default Chat;
