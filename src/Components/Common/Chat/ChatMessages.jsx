import React, { useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';

const ChatMessages = ({ messages, idStorage }) => {
    const chatBoxRef = useRef();

    useEffect(() => {
        // Scroll to the bottom of the chat box when messages change
        chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }, [messages, idStorage]);
    const x = idStorage?.map((x) => x?.name).filter((item) => item !== null || item === ',');
    return (
        <Box
            ref={chatBoxRef}
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
                        {/* {idStorage} */}

                        {message.text === null & message.id_storage !== null ? <Link href={idStorage}>Link</Link> : message.text}
                        <br />
                    </Typography>
                </Box>
            ))}
        </Box>
    );
};

export default ChatMessages;
