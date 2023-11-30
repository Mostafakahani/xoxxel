import { Avatar, Box, Typography } from '@mui/material';

const ChatMessages = () => {

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

            <Box sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                p: 1,
            }}>
                <Typography sx={{
                    bgcolor: '#5094FB',
                    color: '#FFFFFF',
                    px: 2,
                    py: 1,
                    fontWeight: 100,
                    borderRadius: '13.516px 13.516px 0px 13.516px',
                    textAlign: 'right',
                    direction: 'ltr'

                }}>
                    Sample message left
                </Typography>
                <Avatar sx={{ ml: 2 }} alt="Profile" src="/images/avatar.png" />
            </Box>

            <Box sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                p: 1
            }}>
                <Avatar sx={{ mr: 2 }} alt="Profile" src="/images/avatar.png" />
                <Typography sx={{
                    bgcolor: '#DEDEE0',
                    color: '#1D1E2D',
                    px: 2,
                    py: 1,
                    fontWeight: 100,
                    borderRadius: ' 13.516px 13.516px 13.516px 0px',
                    textAlign: 'right',
                    direction: 'ltr'

                }}>
                    Sample message right
                </Typography>
            </Box>

        </Box>
    );
};

export default ChatMessages;