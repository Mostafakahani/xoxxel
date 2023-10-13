import { Button, Dialog, DialogContent, DialogContentText, DialogTitle, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";


const CreateType = ({ tableId }) => {
    const [open, setOpen] = useState(false);
    const [type, setType] = useState("");
    const [types, setTypes] = useState([]);

    const ErrorList = ['نام محصول نمیتواند خالی باشد.', 'قیمت محصول نمی تواند خالی باشد.', 'نمی تواند تکراری باشد.']
    // const [regionError, setRegionError] = useState(false)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleSubmit = () => {
        if (type !== "" && type !== "") {
            setTypes(prevRegions => [
                ...prevRegions,
                {
                    region: type,
                    tableId: tableId
                }
            ]);
            console.log(types)

            setType("");
        } else {
            console.log('Error: نام ریجن نمی‌تواند خالی باشد.');
        }

        setOpen(false);
    };

    const handleClosePanel = () => {
        setOpen(false);
        setType("");
        setTypes([]);
    }

    return (
        <Grid>
            <Button sx={{ fontSize: '12px',mr: { md: "5px", xs: '2px' }, py: '5px', px: '12px', border: '1px solid #B6B6B6', color: '#525252', borderRadius: "5px" }}
                onClick={() => {
                    handleClickOpen()
                    console.log(open)
                }}>
                ایجاد نوع
            </Button>
            <Dialog
                fullWidth
                maxWidth={'sm'}
                open={open}
                onClose={() => {
                    setOpen(false)
                    setType("")
                }}
            >
                <DialogContent
                    sx={{ px: "50px", py: "30px" }}
                >
                    <Grid container>
                        <Typography align="left" sx={{ my: ' 15px' }}>ایجاد نوع</Typography>
                        <Grid xs={12} md={12}>
                            <TextField
                                // error={!priceError ? false : true}
                                // helperText={!priceError ? '' : ErrorList[1]}
                                onChange={(e) => setType(e.target.value)}
                                value={type}
                                label="نام نوع "
                                variant="outlined"
                                sx={{ width: { xs: '100%', sm: '100%', md: '100%' }, my: '10px' }}
                            />
                        </Grid>

                    </Grid>
                    <Grid container>
                        {
                            type !== "" && (
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

export default CreateType;