import { Box, Button, Dialog, DialogContent, DialogContentText, DialogTitle, Grid, MenuItem, Select, SvgIcon, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import UploadFile from "../UploadFile";


const CreateRegon = ({ tableId }) => {
    const [open, setOpen] = useState(false);
    const [region, setRegion] = useState("");
    const [regions, setRegions] = useState([]);
    const [requestError, setRequestError] = useState(null); // برای نمایش پیام خطا در TextField

    const ErrorList = ['نام محصول نمیتواند خالی باشد.', 'قیمت محصول نمی تواند خالی باشد.', 'نمی تواند تکراری باشد.']
    const [regionError, setRegionError] = useState(false)

    const menuItems = [
        { id: 1, value: 'North America', icon: '/images/Flags.png' },
        { id: 2, value: 'Europe', icon: '/images/Flags.png' },
        { id: 3, value: 'Asia', icon: '/images/Flags.png' },
    ]

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleSubmit = () => {
        if (region !== "" && region !== "") {
            setRegions(prevRegions => [
                ...prevRegions,
                {
                    region: region,
                    tableId: tableId
                }
            ]);
            console.log(regions)

            setRegion("");
        } else {
            console.log('Error: نام ریجن نمی‌تواند خالی باشد.');
        }

        setOpen(false);
    };

    const handleClosePanel = () => {
        setOpen(false);
        setRegion("");
        setRegions([]);
    }

    return (
        <Grid>

            <Button sx={{ fontSize: '12px', mr: { md: "5px", xs: '2px' }, py: '5px', px: '12px', border: '1px solid #B6B6B6', color: '#525252', borderRadius: "5px" }}
                onClick={() => {
                    handleClickOpen()
                    console.log(open)
                }}>
                ایجاد ریجن
            </Button>
            <Dialog
                fullWidth
                maxWidth={'sm'}
                open={open}
                onClose={() => {
                    setOpen(false)
                    setRegion("")
                }}
            >
                <DialogContent
                    sx={{ px: "50px", py: "30px" }}
                >
                    <Grid container>
                        <Typography align="left" sx={{ my: ' 15px' }}>ایجاد ریجن</Typography>
                        <Grid xs={12} md={12}>
                            <Grid xs={12} md={6}>
                                <TextField
                                    error={requestError}
                                    helperText={requestError}
                                    onChange={(e) => { setRegion(e.target.value); setRequestError('') }}
                                    value={region}
                                    label="نام ریجن "
                                    variant="outlined"
                                    sx={{ width: { xs: '100%', sm: '100%', md: '100%' }, my: '10px' }}
                                />
                            </Grid>
                        </Grid>
                        <Grid xs={12} md={12}>
                            <UploadFile
                                id={"file1"}
                                accept="video/*"
                                label={"ایکون ( با اندازه برابر مثلا 200*200)"}
                                onChange={(e) => console.log(e)}
                            />
                        </Grid>
                    </Grid>
                    <Grid container>
                        {
                            region !== "" && (
                                <Grid xs={6} sm={3} md={3}>
                                    <Button variant="contained" color="primary" onClick={handleSubmit} style={{ marginTop: '20px' }}>
                                        افزودن ویژگی
                                    </Button>
                                </Grid>
                            )
                        }
                        <Grid xs={6} sm={3} md={3}>
                            <Button variant="outlined" color="primary" onClick={handleClosePanel} style={{ border: '1px solid #989898', color: '#222', marginTop: '20px' }}>
                                انصراف
                            </Button>
                        </Grid>
                    </Grid>



                </DialogContent>
            </Dialog>
        </Grid >
    );
};

export default CreateRegon;