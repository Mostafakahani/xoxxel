import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import React from 'react'

function Card({ titleCard, imageSizeText, changeAlt, saveClick, editClick, imagePreview, }) {
    return (
        <Grid container item xs={12} sm={4} md={4} sx={{ boxShadow: '-1px 20px 50px -30px #00000078' }} p={3} rowSpacing={2}>
            <Grid item xs={12} display={'flex'} justifyContent={'center'}>
                <Box component={'img'} src={imagePreview} width={'100%'} height={'auto'} borderRadius={2} />
            </Grid>
            <Grid item xs={12} display={'flex'} justifyContent={'flex-end'}>
                <Typography variant='p' sx={{ color: '#121828', fontSize: 18 }}>{titleCard}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant='span' sx={{ color: '#898F9E' }}> {imageSizeText}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Grid item xs={12} display={'flex'} justifyContent={'flex-end'}>
                    <Typography variant='span' sx={{ color: '#303E4F' }}>Tag alt</Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField size='small' fullWidth onChange={(e) => changeAlt(e.target.value)} />
                </Grid>
            </Grid>
            <Grid container item xs={12} spacing={2}>
                <Grid item xs={6}>
                    <Button onClick={() => editClick()} fullWidth sx={{ backgroundColor: '#fff', border: '0.5px solid #364357', color: '#364357', '&:hover': { backgroundColor: '#364357', color: '#fff' } }}>ویرایش</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button onClick={() => saveClick()} fullWidth sx={{ backgroundColor: '#7E56DA', color: '#fff', '&:hover': { backgroundColor: '#7e56da8f', color: '#6826ffcf' } }}>ذخیره</Button>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Card