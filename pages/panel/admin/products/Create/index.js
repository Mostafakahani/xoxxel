import React, { useState } from 'react'
import AccountLayout from "Components/Common/Layout/AccountLayout";
import StandardImageList from 'Components/Common/Images';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import Card from '../../../../../src/Components/Common/NewCreateProduct/Card';
import LablesInputs from 'Components/Common/NewCreateProduct/LabelInputs';
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
                                        <TextField size='small' fullWidth />
                                    </Grid>
                                </Grid>
                                <Grid item container xs={12} sm={4} display={'flex'} justifyContent={'flex-end'}>
                                    <Grid item xs={12} display={'flex'} justifyContent={'flex-end'}>
                                        <Typography variant='p' sx={{ color: '#364357' }}>Title tag</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={8} md={6}>
                                        <TextField size='small' fullWidth />
                                    </Grid>
                                </Grid>
                                <Grid item container xs={12} sm={12} display={'flex'} justifyContent={'flex-end'}>
                                    <Grid item xs={12} display={'flex'} justifyContent={'flex-end'}>
                                        <Typography variant='p' sx={{ color: '#364357' }}>Meta description</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField multiline rows={5} size='small' fullWidth />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                    </Grid>

                </Grid>
            </AccountLayout>
        </>
    )
}

export default CreateProduct