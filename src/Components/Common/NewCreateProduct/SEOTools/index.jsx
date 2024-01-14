import { Grid, TextField, Typography } from '@mui/material'
import React from 'react'

function SeoTools({ changeTitleTag, chnageShortLink, changeMetaDescription }) {
    return (
        <Grid item container p={3} sx={{ border: '1px dashed #000', borderRadius: 3 }}>
            <Grid item xs={12} display={'flex'} justifyContent={'flex-end'}>
                <Typography variant='h4' sx={{ color: '#000' }}>Seo Tools</Typography>
            </Grid>
            <Grid item container xs={12} display={'flex'} justifyContent={'flex-end'} rowSpacing={2}>
                <Grid item container xs={12} sm={4} display={'flex'} justifyContent={'flex-end'}>
                    <Grid item xs={12} display={'flex'} justifyContent={'flex-end'}>
                        <Typography variant='p' sx={{ color: '#364357' }}>Short link</Typography>
                    </Grid>
                    <Grid item xs={12} sm={8} md={6}>
                        <TextField InputProps={{ inputProps: { style: { textAlign: 'left' }, }, }} onChange={(e) => chnageShortLink(e.target.value)} size='small' fullWidth />
                    </Grid>
                </Grid>
                <Grid item container xs={12} sm={4} display={'flex'} justifyContent={'flex-end'}>
                    <Grid item xs={12} display={'flex'} justifyContent={'flex-end'}>
                        <Typography variant='p' sx={{ color: '#364357' }}>Title tag</Typography>
                    </Grid>
                    <Grid item xs={12} sm={8} md={6}>
                        <TextField InputProps={{ inputProps: { style: { textAlign: 'left' }, }, }} onChange={(e) => changeTitleTag(e.target.value)} size='small' fullWidth />
                    </Grid>
                </Grid>
                <Grid item container xs={12} sm={12} display={'flex'} justifyContent={'flex-end'}>
                    <Grid item xs={12} display={'flex'} justifyContent={'flex-end'}>
                        <Typography variant='p' sx={{ color: '#364357' }}>Meta description</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField InputProps={{ inputProps: { style: { textAlign: 'left' }, }, }} onChange={(e) => changeMetaDescription(e.target.value)} multiline rows={5} size='small' fullWidth />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default SeoTools