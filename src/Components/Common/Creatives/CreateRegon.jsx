import {
    Alert,
    AlertTitle,
    Button,
    CircularProgress,
    Dialog,
    DialogContent,
    Grid,
    TextField,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import UploadFile from "../UploadFile";
import axios from "axios";
import ServerURL from "../Layout/config";
import { useEffect } from "react";

const CreateRegon = () => {
    const [open, setOpen] = useState(false);
    const [region, setRegion] = useState("");
    const [regions, setRegions] = useState([]);
    const [requestError, setRequestError] = useState(null);
    const [selectedFileItem, setSelectedFileItem] = useState({});
    const [addingFeature, setAddingFeature] = useState(false);
    const [alert, setAlert] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const [fileOption, setFileOptions] = useState(null);

    const handleSubmit = async () => {
        setAddingFeature(true);

        if (selectedFileItem) {
            try {
                const formData = new FormData();
                Object.keys(selectedFileItem?.fileResDetails?.fields || {}).map((x) => {
                    formData.append(x, selectedFileItem?.fileResDetails?.fields[x]);
                });
                formData.append("file", selectedFileItem.file);

                const response = await axios.post(
                    `${selectedFileItem?.fileResDetails?.url ? selectedFileItem?.fileResDetails?.url : 'https://xoxxel.storage.iran.liara.space/'}`,
                    formData,
                    {
                        headers: { "Content-Type": "multipart/form-data" },
                    }
                );

                if (response.status === 204) {
                    const config = {
                        headers: {
                            Authorization: `${ServerURL.Bear}`
                        }
                    };
                    const deleteData = {
                        id: selectedFileItem?.fileResDetails?.dataStorage?.id
                    };
                    const response = await axios.post(`${ServerURL.url}/admin/storage/verify-upload`, deleteData, config);
                    console.log('res: ', response)

                    if (response.status === 201) {
                        const config = {
                            headers: {
                                Authorization: `${ServerURL.Bear}`
                            }
                        };
                        const deleteData = {
                            name: region,
                            id_storage: selectedFileItem?.fileResDetails?.dataStorage?.id
                        };
                        const response = await axios.post(`${ServerURL.url}/admin/country/create`, deleteData, config);
                    }
                } else {
                    window.alert('error');
                }

                if (response.status === 400) {
                    setRequestError("این دسته وجود دارد");
                } else {
                    setRegion("");
                    setOpen(false);
                    setRequestError(null);
                }
            } catch (error) {
                console.error("errr:  ", error);
                setRequestError("اطلاعات درست وارد کنید");
            } finally {
                setAddingFeature(false);
            }
        } else {
            setRequestError("یک فایل انتخاب کنید");
            setAlert(true);
            setAddingFeature(false);
        }
    };


    const handleClosePanel = () => {
        setOpen(false);
        setRegion("");
        setRegions([]);
        // setFileOptions(null);
    };

    return (
        <Grid>
            <Button
                sx={{
                    fontSize: "12px",
                    mr: { md: "5px", xs: "2px" },
                    py: "5px",
                    px: "12px",
                    border: "1px solid #B6B6B6",
                    color: "#525252",
                    borderRadius: "5px",
                }}
                onClick={() => {
                    handleClickOpen();
                }}
            >
                ایجاد ریجن
            </Button>
            <Dialog
                fullWidth
                maxWidth={"sm"}
                open={open}
                onClose={() => {
                    setOpen(false);
                    setRegion("");
                }}
            >
                <DialogContent sx={{ px: "50px", py: "30px" }}>
                    <Grid container>
                        <Typography align="left" sx={{ my: " 15px" }}>
                            ایجاد ریجن
                        </Typography>
                        <Grid xs={12} md={12}>
                            <Grid xs={12} md={6}>
                                <TextField
                                    error={!!requestError} // تغییر اینجا
                                    helperText={requestError}
                                    onChange={(e) => {
                                        setRegion(e.target.value);
                                        setRequestError("");
                                    }}
                                    value={region}
                                    label="نام ریجن "
                                    variant="outlined"
                                    sx={{
                                        width: { xs: "100%", sm: "100%", md: "100%" },
                                        my: "10px",
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Grid xs={12} md={12}>
                            <UploadFile
                                id={"file1"}
                                accept="image/png, image/jpg, image/jpeg"
                                label={"ایکون ( با اندازه برابر مثلا 200*200)"}
                                onChange={(e) => {
                                    setSelectedFileItem(e);
                                    // setFileOptions(e.file);
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Grid container>
                        {
                            alert ? (
                                <Alert severity={'info'} onClose={() => { }}>
                                    <AlertTitle>هشدار</AlertTitle>
                                    This is a warning alert — <strong>check it out!</strong>
                                </Alert>) : (
                                ''
                            )
                        }

                    </Grid>
                    <Grid container>
                        {region !== "" && (
                            <Grid xs={6} sm={3} md={3}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => {
                                        setAddingFeature(true); // نمایش لودینگ
                                        handleSubmit().finally(() => {
                                            setAddingFeature(false); // پنهان کردن لودینگ بعد از دریافت پاسخ
                                        });
                                    }}
                                    style={{ marginTop: "20px" }}
                                    disabled={addingFeature} // غیرفعال کردن دکمه در حالت لودینگ
                                >
                                    {addingFeature ? <CircularProgress size={24} /> : "افزودن ویژگی"}
                                </Button>
                            </Grid>

                        )}
                        <Grid xs={6} sm={3} md={3}>
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={handleClosePanel}
                                style={{
                                    border: "1px solid #989898",
                                    color: "#222",
                                    marginTop: "20px",
                                }}
                            >
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
