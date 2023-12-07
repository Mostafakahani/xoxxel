import { Box, Button, Grid, IconButton, SvgIcon, TextField, useMediaQuery } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from "@emotion/react";
import { useChat } from "./ChatContext";
import { useState } from "react";

const ChatInput = ({ onSendMessage }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [inputText, setInputText] = useState('');

    const handleSendMessage = () => {
        if (inputText.trim() !== '') {
            onSendMessage(inputText); // Call the function to send the message
            setInputText('');
        }
    };
    return (
        <>
            <Grid
                container
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'row', sm: 'row' },
                    justifyContent: 'space-between',
                    backgroundColor: '#EAF2FF',
                    borderRadius: '8px',
                    px: { xs: 2, sm: 3 },
                    px: { xs: 2, sm: 2 },
                }}
            >
                <Grid container sx={{ display: 'flex', flexDirection: { xs: "row", sm: "row" }, justifyContent: "space-between", backgroundColor: '#EAF2FF', borderRadius: '8px', px: { xs: 2, sm: 3 }, px: { xs: 2, sm: 2 } }}>
                    <Grid container item xs={6} sm={6} alignItems={'center'} spacing={2}>
                        <Grid item>
                            {!isMobile && (
                                <Button onClick={handleSendMessage} variant="contained" color="info" startIcon={
                                    <SvgIcon>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="22" viewBox="0 0 21 22" fill="none">
                                            <path d="M16.3062 14.2114L17.8081 9.7057C19.1201 5.76961 19.7761 3.80157 18.7373 2.76271C17.6984 1.72385 15.7304 2.37986 11.7943 3.69189L7.28863 5.19378C4.11183 6.25272 2.52343 6.78218 2.07205 7.55861C1.64265 8.29723 1.64265 9.20948 2.07205 9.9481C2.52343 10.7245 4.11183 11.254 7.28863 12.3129C7.68234 12.4442 8.12526 12.3505 8.42007 12.0584L13.2375 7.28558C13.5085 7.01707 13.9459 7.01911 14.2144 7.29013C14.4829 7.56115 14.4809 7.99853 14.2099 8.26705L9.47023 12.9628C9.14528 13.2847 9.04242 13.7774 9.18707 14.2114C10.246 17.3882 10.7755 18.9766 11.5519 19.4279C12.2905 19.8574 13.2028 19.8574 13.9414 19.4279C14.7178 18.9766 15.2473 17.3882 16.3062 14.2114Z" fill="white" />
                                        </svg>
                                    </SvgIcon>
                                }>
                                    Send
                                </Button>
                            )}

                            {isMobile && (
                                <Box sx={{ backgroundColor: '#5094FB', borderRadius: '5px' }} onClick={handleSendMessage}>
                                    <IconButton variant="contained" size="small">
                                        <SvgIcon>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="22" viewBox="0 0 21 22" fill="none">
                                                <path d="M16.3062 14.2114L17.8081 9.7057C19.1201 5.76961 19.7761 3.80157 18.7373 2.76271C17.6984 1.72385 15.7304 2.37986 11.7943 3.69189L7.28863 5.19378C4.11183 6.25272 2.52343 6.78218 2.07205 7.55861C1.64265 8.29723 1.64265 9.20948 2.07205 9.9481C2.52343 10.7245 4.11183 11.254 7.28863 12.3129C7.68234 12.4442 8.12526 12.3505 8.42007 12.0584L13.2375 7.28558C13.5085 7.01707 13.9459 7.01911 14.2144 7.29013C14.4829 7.56115 14.4809 7.99853 14.2099 8.26705L9.47023 12.9628C9.14528 13.2847 9.04242 13.7774 9.18707 14.2114C10.246 17.3882 10.7755 18.9766 11.5519 19.4279C12.2905 19.8574 13.2028 19.8574 13.9414 19.4279C14.7178 18.9766 15.2473 17.3882 16.3062 14.2114Z" fill="white" />
                                            </svg>
                                        </SvgIcon>
                                    </IconButton>
                                </Box>
                            )}
                        </Grid>
                        <Grid item>
                            <IconButton size="small">
                                <SvgIcon>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                                        <path d="M13.1885 11.3952L10.3579 14.2513C10.0026 14.6098 9.82491 14.7891 9.6954 14.9594C8.80108 16.1353 8.80108 17.7708 9.6954 18.9468C9.82491 19.1171 10.0026 19.2963 10.3579 19.6548C10.7132 20.0133 10.8908 20.1926 11.0596 20.3232C12.2251 21.2256 13.846 21.2256 15.0115 20.3232C15.1802 20.1926 15.3579 20.0133 15.7132 19.6548L19.3854 15.9496C20.8094 14.5128 21.5214 13.7944 21.9104 13.0241C22.6965 11.4673 22.6965 9.62483 21.9104 8.06802C21.5214 7.29773 20.8094 6.57934 19.3854 5.14257C17.9615 3.70579 17.2495 2.98741 16.4861 2.59492C14.9431 1.80169 13.1171 1.80169 11.5741 2.59492C10.8107 2.98741 10.0987 3.70579 8.67476 5.14257L4.94515 8.90572C4.14545 9.71261 3.7456 10.1161 3.47158 10.5128C2.17614 12.3882 2.17614 14.8794 3.47158 16.7548C3.7456 17.1515 4.14545 17.5549 4.94515 18.3618" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" />
                                    </svg>
                                </SvgIcon>
                            </IconButton>
                        </Grid>
                    </Grid>
                    <Grid container item xs={6} sm={6} sx={{ justifyContent: 'flex-end' }}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            sx={{ direction: 'rtl', border: 'none', "& fieldset": { border: 'none' } }}
                            inputProps={{
                                sx: {
                                    '&::placeholder': {
                                        color: '#5094FB',
                                        opacity: '.8'
                                    },
                                },
                            }}
                            placeholder="Add your message"
                            // value={text}
                            onChange={(e) => setInputText(e.target.value)}
                        />

                    </Grid>

                </Grid >
            </Grid >
        </>
    )
}
export default ChatInput;