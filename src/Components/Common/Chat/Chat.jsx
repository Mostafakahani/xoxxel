// Chat.js
import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import { ChatProvider, useChat } from './ChatContext';
import { useState } from 'react';
import ServerURL from '../Layout/config';
import GetToken from 'GetToken';
import axios from 'axios';

const Chat = ({ id }) => {
  // const { setMessages } = useChat();
  const [onUpdate, setOnUpdate] = useState(0)
  const [messages, setMessages] = useState([])
  const [sendMessage, setSendMessage] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updateCount, setUpdateCount] = useState(0);

  const handleUpdate = (value) => {
    setUpdateCount((prevCount) => prevCount + value);
  };
  useEffect(() => {
    const fetchData = async () => {
      const config = {
        headers: {
          Authorization: `${ServerURL.developerMode === true ? ServerURL.Bear : GetToken("user")}`,
        },
      };
      try {
        const response = await axios.get(
          `${ServerURL.url}/admin/tiket/get-tiket/${id}`,
          config
        );
        const dataResponse = response.data;
        setData(dataResponse);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }

    };

    fetchData();
  }, [id, updateCount]);


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

  if (loading) {
    return <div>Loading...</div>;
  }

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
          <ChatInput onUpdate={handleUpdate} id={id} />

        </Grid>
      </Grid>
    </>
    // </ChatProvider>
  );
};

export default Chat;
