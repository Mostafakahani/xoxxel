import React, { useState } from 'react'
import AccountLayout from "Components/Common/Layout/AccountLayout";
import StandardImageList from 'Components/Common/Images';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import Card from './Card';
function CreateProduct() {
    const [idStorage, setIdStorage] = useState();
    return (
        <>
            <AccountLayout>
                <Grid container spacing={2}>
                    <Grid container item>
                        <Typography>ویرایش محصول</Typography>
                    </Grid>
                    <Grid item container xs={12} sm={4}>
                        <TextField size='small' fullWidth />
                    </Grid>
                    <Grid item container>
                        <Card saveClick={() => console.log('saveClick')} editClick={() => console.log('editClick')} titleCard={'Slider'} imageSizeText={'تصویر اصلی (297*147)'} imagePreview={'/images/1-1.png'} changeAlt={(e) => console.log(e)} />
                    </Grid>
                    {/* <StandardImageList
                        label={"تصویر Trends (153*190)"}
                        idStorage={setIdStorage}
                        onChange={(e) => {
                            setIdStorage(e);
                            console.log(e);
                        }} /> */}
                </Grid>
            </AccountLayout>
        </>
    )
}

export default CreateProduct