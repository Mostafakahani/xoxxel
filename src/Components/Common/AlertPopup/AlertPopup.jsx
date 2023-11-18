import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function Alert({ message, setOpen }) {
    const [open, setOpenState] = React.useState(false);

    const handleClick = () => {
        setOpenState(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenState(false);
        setOpen("");
    };

    React.useEffect(() => {
        // Whenever the message changes, open the Snackbar
        if (message) {
            setOpenState(true);
        }
    }, [message]);

    return (
        <div>
            <Snackbar
                sx={{

                }}
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                message={message}
                action={
                    <React.Fragment>
                        <IconButton
                            size="small"
                            aria-label="close"
                            color="inherit"
                            onClick={handleClose}
                        >
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            />
        </div>
    );
}
