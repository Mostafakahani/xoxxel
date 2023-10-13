import { Box, Button, Dialog, DialogContent, DialogContentText, DialogTitle, Grid, MenuItem, Select, SvgIcon, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import UploadFile from "../UploadFile";


const CreateRegon = ({ tableId }) => {
    const [open, setOpen] = useState(false);
    const [region, setRegion] = useState("");
    const [regions, setRegions] = useState([]);

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
            <Button sx={{ mr: { md: "5px", xs: '2px' }, py: '5px', px: '12px', border: '1px solid #B6B6B6', color: '#525252', borderRadius: "5px" }}
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
                            <Typography>نام ریجن</Typography>
                            <Select
                                value={region}
                                onChange={(e) => setRegion(e.target.value)}
                                fullWidth
                                displayEmpty
                                inputProps={{ "aria-label": "Region" }}
                                sx={{ width: { md: '200px', xs: '100%' }, display: 'flex !important', my: '10px' }}
                            >
                                {menuItems.map((x) => (
                                    <MenuItem key={x.id} value={x.value}>
                                        <Grid sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Box component={'img'} src={x.icon} width={'30'} height={'auto'} sx={{ mr: "10px" }} />
                                            <Typography>{x.value}</Typography>
                                        </Grid>
                                    </MenuItem>
                                ))}
                            </Select>
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