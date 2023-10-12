import { Button, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import AccountLayout from "Components/Common/Layout/AccountLayout";
import UploadFile from "Components/Common/UploadFile";
import ProductOption from "Components/Common/ProductOption/ProductOption";
const CreateProduct = () => {
    return (
        <>
            <AccountLayout>
                <Grid container>
                    <Grid container xs={12} md={12}>
                        <Grid sm={9} md={12}>
                            <Typography>ایجاد محصول </Typography>
                        </Grid>
                        <Grid container sm={9} md={12} sx={{ my: '15px' }}>
                            <Grid xs={12} sm={7} md={3}>
                                <TextField
                                    // error={!nameError ? false : true}
                                    // helperText={!nameError ? '' : ErrorList[0]}
                                    // onChange={handleNameChange}
                                    // value={name}
                                    label="نام محصول"
                                    variant="outlined"
                                    sx={{ my: '5px' }}
                                />
                            </Grid>
                            <Grid xs={12} sm={4} md={3}>
                                <TextField
                                    // error={!priceError ? false : true}
                                    // helperText={!priceError ? '' : ErrorList[1]}
                                    // onChange={handlePriceChange}
                                    // value={price}
                                    label="قیمت محصول"
                                    variant="outlined"
                                    sx={{ my: '5px' }}
                                />
                            </Grid>
                            <Grid xs={12} sm={4} md={3}>
                                <TextField
                                    // error={!priceError ? false : true}
                                    // helperText={!priceError ? '' : ErrorList[1]}
                                    // onChange={handlePriceChange}
                                    // value={price}
                                    label="ستاره محصول"
                                    variant="outlined"
                                    sx={{ my: '5px' }}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid >

                <Grid container>
                    <UploadFile
                        id={"file1"}
                        accept="video/*"
                        label={"تصویر اصلی ( 297*147)"}
                        onChange={(e) => console.log(e)}
                    />
                    <UploadFile
                        id={"file1"}
                        accept="video/*"
                        label={"تصویر Trends ( 153*190)"}
                        onChange={(e) => console.log(e)}
                    />
                    <UploadFile
                        id={"file1"}
                        accept="video/*"
                        label={"تصویر اسلایدی یا مربعی ( 134*134)"}
                        onChange={(e) => console.log(e)}
                    />
                </Grid>

                <Grid container sx={{ my: '20px' }}>
                    <Grid xs={12} sm={4} md={3}>
                        <TextField
                            // error={!priceError ? false : true}
                            // helperText={!priceError ? '' : ErrorList[1]}
                            // onChange={handlePriceChange}
                            // value={price}
                            label="Label input"
                            variant="outlined"
                            sx={{ my: '5px' }}
                        />
                    </Grid>
                    <Grid xs={12} sm={4} md={3}>
                        <TextField
                            // error={!priceError ? false : true}
                            // helperText={!priceError ? '' : ErrorList[1]}
                            // onChange={handlePriceChange}
                            // value={price}
                            label="Place holder"
                            variant="outlined"
                            sx={{ my: '5px' }}
                        />
                    </Grid>

                </Grid>
                <Grid container sx={{ my: '20px' }}>
                    <Grid xs={12} sm={4} md={12}>
                        <TextField
                            fullWidth
                            // error={!priceError ? false : true}
                            // helperText={!priceError ? '' : ErrorList[1]}
                            // onChange={handlePriceChange}
                            // value={price}
                            label='متن زیر Input'
                            variant="outlined"
                            sx={{ my: '5px' }}
                        />
                    </Grid>
                </Grid>

                <Grid sx={{ borderRadius: '10px', border: '2px dashed #5A5A5A', p: '20px', my: '15px' }}>
                    <ProductOption tableId={'tableId'} />
                </Grid>
                
                <Grid sx={{ my: '25px' }}>
                    <Button sx={{ color: '#1C49F1' }}>ذخیره تغییرات</Button>
                    <Button sx={{ color: '#B12640' }}>انصراف</Button>
                </Grid>
            </AccountLayout >
        </>
    )
}
export default CreateProduct;