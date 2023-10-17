import React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

const App = () => {
    const buttonData = [
        { id: 1, text: 'کوتاه 1' },
        { id: 2, text: 'کوتاه 2' },
        { id: 3, text: 'کوتاه 3' },
        { id: 4, text: 'بلند 1' },
        { id: 5, text: 'بلند 2' },
    ];

    return (
        <Grid container spacing={2} justifyContent="flex-end" alignItems="center">
            <Grid item xs={12} md={6}>
                <div style={{ textAlign: 'right' }}>
                    <p>نوشته در سمت راست</p>
                </div>
            </Grid>
            <Grid item xs={12} md={6}>
                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                    {buttonData.map((button) => (
                        <Button key={button.id} variant="contained" style={{ margin: '4px' }}>
                            {button.text}
                        </Button>
                    ))}
                </div>
            </Grid>
        </Grid>
    );
};

export default App;
