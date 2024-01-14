import { Grid, TextField, Typography } from '@mui/material'
import React from 'react'

function LabelInputs({ label, changeInput }) {
    return (
        <Grid item container xs={12} sm={4}>
            <Grid item xs={12} display={'flex'} justifyContent={'flex-end'}>
                <Typography variant='p' sx={{ color: '#364357' }}>{label}</Typography>
            </Grid>
            <Grid item xs={12}>
                <TextField onChange={(e) => changeInput(e.target.value)} fullWidth size='small' />
            </Grid>
        </Grid>
    )
}

export default LabelInputs