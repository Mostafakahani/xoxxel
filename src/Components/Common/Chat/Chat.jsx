import React, { useState, useEffect } from "react";

import { Grid } from "@mui/material";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

const Chat = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setMessages([
            {
                id: 1,
                text: "Hello!",
                from: "user1"
            },
            {
                id: 2,
                text: "Hi there!",
                from: "user2"
            }
        ])
    }, []);

    const handleSendMessage = (text) => {
        setMessages([...messages, { id: messages.length + 1, text, from: "user1" }]);
    };

    return (
        <Grid container sx={{ display: 'flex', flexDirection: 'column' }}>
            <ChatHeader />
            <ChatMessages messages={messages} />
            <ChatInput handleSendMessage={handleSendMessage} />
        </Grid>
    );
};

export default Chat;