import { Avatar, Badge, Button, Grid, IconButton, Stack, SvgIcon, Typography, useMediaQuery } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import { useTheme } from "@emotion/react";

const ChatHeader = () => {
    const theme = useTheme();
    const isTabletUp = useMediaQuery(theme.breakpoints.up('sm'));
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            backgroundColor: '#44b700',
            color: '#44b700',
            boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
            // right: '36px', //me added
            '&::after': {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                animation: 'ripple 1.2s infinite ease-in-out',
                border: '1px solid currentColor',
                content: '""',
            },
        },
        '@keyframes ripple': {
            '0%': {
                transform: 'scale(.8)',
                opacity: 1,
            },
            '100%': {
                transform: 'scale(2.4)',
                opacity: 0,
            },
        },
    }));
    return (
        <>
            <Grid container sx={{ display: 'flex', flexDirection: { xs: "row", sm: "row" }, justifyContent: "space-between", }}>
                <Grid container item xs={6} sm={6} alignItems={'center'}>
                    <Grid item>
                        <IconButton size="small">
                            <MoreVertIcon />
                        </IconButton>
                        <IconButton size="small">
                            <SvgIcon>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 36" fill="none">
                                    <path d="M28.9071 28.3657L22.4937 21.9523C23.9078 20.3025 24.7282 18.1677 24.7282 15.8244C24.7282 10.6167 20.5072 6.39697 15.3007 6.39697C10.0943 6.39697 5.91406 10.618 5.91406 15.8244C5.91406 21.0308 10.1347 25.2519 15.3007 25.2519C17.6431 25.2519 19.7811 24.3926 21.4286 22.9789L27.842 29.3923C28.0233 29.5305 28.2091 29.603 28.3949 29.603C28.5808 29.603 28.7661 29.5322 28.9076 29.3906C29.1927 29.109 29.1927 28.6467 28.9071 28.3657ZM15.3415 23.8015C10.9043 23.8015 7.36445 20.2209 7.36445 15.8244C7.36445 11.428 10.9043 7.84735 15.3415 7.84735C19.7788 7.84735 23.3186 11.3872 23.3186 15.8244C23.3186 20.2617 19.738 23.8015 15.3415 23.8015Z" fill="#28303F" />
                                </svg>
                            </SvgIcon>
                        </IconButton>
                    </Grid>
                    <Grid item>
                        {!isMobile && (
                            <Button variant="contained" color="error" startIcon={<DeleteIcon />}>
                                Close chat
                            </Button>
                        )}
                        {isMobile && (
                            <IconButton variant="contained" color="error" >
                                <DeleteIcon />
                            </IconButton>
                        )}
                    </Grid>
                </Grid>
                <Grid container item xs={6} sm={6} sx={{ justifyContent: 'flex-end' }}>
                    <Grid item sx={{ display: 'flex', alignItems: 'center', }}>
                        <Typography mr={1} sx={{ fontWeight: 600, fontSize: {xs: "11px", sm: '15px'} }}>
                            Behroz Sedighi
                        </Typography>
                        <StyledBadge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                            variant="dot"
                        >
                            <Avatar alt="Profile" src="/images/avatar.png" />
                        </StyledBadge>
                    </Grid>
                </Grid>
                <Grid container my={2} sx={{ border: '1px solid #F5F5F6' }} />

            </Grid >
        </>
    )
}
export default ChatHeader;