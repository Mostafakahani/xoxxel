import React, { useState } from 'react'
import AccountLayout from "Components/Common/Layout/AccountLayout";
import StandardImageList from 'Components/Common/Images';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import Card from '../../../../../src/Components/Common/NewCreateProduct/Card';
import LablesInputs from 'Components/Common/NewCreateProduct/LabelInputs';
import SeoTools from 'Components/Common/NewCreateProduct/SEOTools';
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
                    <Grid item container columnSpacing={5} rowSpacing={2}>
                        <LablesInputs label={'Label input'} changeInput={(e) => console.log(e)} />
                        <LablesInputs label={'Placeholder'} changeInput={(e) => console.log(e)} />
                        <LablesInputs label={'Input'} changeInput={(e) => console.log(e)} />
                    </Grid>
                    <Grid item container>
                        <SeoTools changeTitleTag={(e) => console.log(e)} chnageShortLink={(e) => console.log(e)} changeMetaDescription={(e) => console.log(e)} />
                    </Grid>

                </Grid>
            </AccountLayout>
        </>
    )
}

export default CreateProduct