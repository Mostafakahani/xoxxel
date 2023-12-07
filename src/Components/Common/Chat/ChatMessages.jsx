import React from 'react';
import { Box, Typography } from '@mui/material';
import { useChat } from './ChatContext';

const ChatMessages = ({ messages }) => {
    // const { messages } = useChat();

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                maxHeight: 500, // Set maximum height to 500
                overflowY: 'auto', // Enable vertical scrolling
            }}
        >
            {messages.map((message) => (
                <Box
                    key={message.id}
                    sx={{
                        display: 'flex',
                        justifyContent: message.from === 'admin' ? 'flex-end' : 'flex-start',
                        p: 1,
                    }}
                >
                    <Typography
                        sx={{
                            bgcolor: message.from === 'admin' ? '#5094FB' : '#DEDEE0',
                            color: message.from === 'admin' ? '#FFFFFF' : '#1D1E2D',
                            px: 2,
                            py: 1,
                            fontWeight: 100,
                            borderRadius:
                                message.from === 'admin'
                                    ? '13.516px 13.516px 0px 13.516px'
                                    : '13.516px 13.516px 13.516px 0px',
                            textAlign: 'right',
                            direction: 'ltr',
                        }}
                    >
                        {message.text}
                    </Typography>
                </Box>
            ))}
        </Box>
    );
};

export default ChatMessages;
