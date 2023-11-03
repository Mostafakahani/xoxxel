import { Button, CircularProgress, Dialog, DialogContent, DialogContentText, DialogTitle, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import ServerURL from "../Layout/config";
import axios from "axios";


const CreateType = ({ tableId }) => {
    const [open, setOpen] = useState(false);
    const [type, setType] = useState("");
    const [requestError, setRequestError] = useState(null);
    const [addingFeature, setAddingFeature] = useState(false);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleSubmit = async () => {
        if (type !== "") {
            setAddingFeature(true);
            try {
                const config = {
                    headers: {
                        Authorization: `${ServerURL.Bear}`
                    }
                };
                const data = {
                    title: type
                };

                const response = await axios.post(`${ServerURL.url}/admin/type-product/create`, data, config);

                if (response.status === 400) {
                    setRequestError("این دسته وجود دارد");
                    setAddingFeature(false);

                } else {
                    setType("");
                    setOpen(false);
                    setRequestError(null);
                    setAddingFeature(false);

                }

            } catch (error) {
                // console.log(error.response.data.message)
                if (error.response.data.message[0] === "title must be longer than or equal to 3 characters") {
                    setRequestError("نام نوع انتخابی نمیتواند کمتر از 3 کاراکتر باشد");
                    setAddingFeature(false);
                }
                if (error.response.data.message === "There is a type product name") {
                    setRequestError("نام نوع انتخابی از قبل وجود دارد");
                    setAddingFeature(false);
                }
                if (error.code === "ERR_NETWORK") {
                    setRequestError("خطا در ارسال درخواست به سرور");
                    setAddingFeature(true);
                }
                console.error(error);
                setAddingFeature(false);

            } finally {
                setAddingFeature(false);
            }
        } else {
            setRequestError("مشکلی در ارتباط با سرور وجود دارد");
            setAddingFeature(false);

        }
    };
    const handleClosePanel = () => {
        setOpen(false);
        setType("");
        setAddingFeature(false);
        setRequestError("");
    }

    return (
        <Grid>
            <Button sx={{ fontSize: '12px', mr: { md: "5px", xs: '2px' }, py: '5px', px: '12px', border: '1px solid #B6B6B6', color: '#525252', borderRadius: "5px" }}
                onClick={() => {
                    handleClickOpen()
                }}>
                ایجاد نوع
            </Button>
            <Dialog
                fullWidth
                maxWidth={'sm'}
                open={open}
                onClose={() => {
                    handleClosePanel()
                }}
            >
                <DialogContent
                // sx={{ px: "50px", py: "30px" }}
                >
                    <Grid container>
                        <Typography align="left" sx={{ my: ' 15px' }}>ایجاد نوع</Typography>
                        <Grid xs={12} md={12}>
                            <TextField
                                error={requestError}
                                helperText={requestError}
                                onChange={(e) => { setType(e.target.value); setRequestError('') }}
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
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => {
                                            setAddingFeature(true);
                                            handleSubmit().finally(() => {
                                                setAddingFeature(false);
                                            });
                                        }}
                                        sx={{ fontSize: { xs: '14px' }, marginTop: "20px" }}
                                        disabled={addingFeature}
                                    >
                                        {addingFeature ? <CircularProgress size={24} /> : "افزودن ویژگی"}
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