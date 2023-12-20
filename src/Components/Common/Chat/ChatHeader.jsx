import { Avatar, Button, CircularProgress, Grid, IconButton, Typography, useMediaQuery } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
// import { styled } from '@mui/system';
import { useTheme } from "@emotion/react";
import ServerURL from "../Layout/config";
import GetToken from "GetToken";
import axios from "axios";
import { useState } from "react";
import ChatIcon from '@mui/icons-material/Chat';
const ChatHeader = ({ id, data, onUpdate }) => {
    const theme = useTheme();
    const [loadingStatus, setLoadingStatus] = useState(false);
    const [status, setStatus] = useState(null);
    /////////////////////////////////////////////////////////////////// HandleOnlineStatus
    // const StyledBadge = styled(Badge)(({ theme }) => ({
    //     '& .MuiBadge-badge': {
    //         backgroundColor: '#44b700',
    //         color: '#44b700',
    //         boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    //         // right: '36px', //me added
    //         '&::after': {
    //             position: 'absolute',
    //             top: 0,
    //             left: 0,
    //             width: '100%',
    //             height: '100%',
    //             borderRadius: '50%',
    //             animation: 'ripple 1.2s infinite ease-in-out',
    //             border: '1px solid currentColor',
    //             content: '""',
    //         },
    //     },
    //     '@keyframes ripple': {
    //         '0%': {
    //             transform: 'scale(.8)',
    //             opacity: 1,
    //         },
    //         '100%': {
    //             transform: 'scale(2.4)',
    //             opacity: 0,
    //         },
    //     },
    // }));
    const isTabletUp = useMediaQuery(theme.breakpoints.up('sm'));
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    if (!data || !id) {
        return <div>Loading...</div>;
    }
    const handleCloseChat = async () => {
        setLoadingStatus(true);

        const ticketStatus = data.status === 'open' ? 'close' : 'open';

        if (ticketStatus) {
            const config = {
                headers: {
                    Authorization: `${ServerURL.developerMode === true ? ServerURL.Bear : GetToken("user")}`,
                },
            };
            const requestData = {
                id_tiket: parseInt(id),
                status: ticketStatus,
            };

            try {
                const response = await axios.post(
                    `${ServerURL.url}/admin/tiket/change-status-tiket`,
                    requestData,
                    config
                );

                const dataResponse = response.data;
                if (dataResponse.status === 'success') {
                    console.log('ok');
                    onUpdate(1);
                    setStatus(null);
                    setLoadingStatus(false); // This line updates the loading status after a successful response
                } else {
                    // Handle other cases if needed
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoadingStatus(false);
            }

        }
    };

    return (
        <>
            <Grid container sx={{ display: 'flex', flexDirection: { xs: "row", sm: "row" }, justifyContent: "space-between", }}>
                <Grid container item xs={6} sm={6} alignItems={'center'}>
                    <Grid item>
                        {isMobile ? (
                            <IconButton onClick={handleCloseChat} variant="contained" color={data.status === 'open' ? "error" : 'info'} disabled={loadingStatus}>
                                {loadingStatus ? <CircularProgress size={24} /> : data.status === 'open' ? <DeleteIcon /> : <ChatIcon />}
                            </IconButton>
                        ) : (
                            <Button onClick={handleCloseChat} variant="contained" color={data.status === 'open' ? 'error' : 'info'} disabled={loadingStatus} startIcon={loadingStatus ? <CircularProgress size={24} /> : data.status === 'open' ? <DeleteIcon /> : <ChatIcon />}>
                                {loadingStatus ? 'Loading...' : (data.status === 'open' ? 'Close chat' : 'Open chat')}
                            </Button>
                        )}
                    </Grid>
                </Grid>
                <Grid container item xs={6} sm={6} sx={{ justifyContent: 'flex-end' }}>
                    <Grid item sx={{ display: 'flex', alignItems: 'center', }}>
                        <Typography mr={1} sx={{ fontWeight: 600, fontSize: { xs: "11px", sm: '15px' } }}>
                            {data.sender}
                        </Typography>
                        {/* <StyledBadge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                            variant="dot"
                        > */}
                        <Avatar alt="Profile" src="/images/avatar.png" />
                        {/* </StyledBadge> */}
                    </Grid>
                </Grid>
                <Grid container my={2} sx={{ border: '1px solid #F5F5F6' }} />
            </Grid>
        </>
    );
};

export default ChatHeader;
