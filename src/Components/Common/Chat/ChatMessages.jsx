import { Box, Typography } from '@mui/material';

const ChatMessages = () => {

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

            <Box sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                p: 1
            }}>
                <Typography sx={{
                    bgcolor: 'primary.main',
                    color: 'white',
                    p: 1,
                    borderRadius: 1
                }}>
                    Sample message right
                </Typography>
            </Box>

            <Box sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                p: 1
            }}>
                <Typography sx={{
                    bgcolor: 'grey.300',
                    p: 1,
                    borderRadius: 1
                }}>
                    Sample message left
                </Typography>
            </Box>

        </Box>
    );
};

export default ChatMessages;