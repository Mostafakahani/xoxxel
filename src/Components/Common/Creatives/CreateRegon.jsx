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

const CreateRegion = () => {
    const [open, setOpen] = useState(false);
    const [region, setRegion] = useState("");
    const [requestError, setRequestError] = useState(null);
    const [selectedFileItem, setSelectedFileItem] = useState({});
    const [addingFeature, setAddingFeature] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleSubmit = async () => {
        setAddingFeature(true);
        const config = {
            headers: {
                Authorization: `${ServerURL.Bear}`
            }
        };
        if (selectedFileItem && selectedFileItem.file) { // بررسی وجود فایل معتبر
            try {
                // ایجاد فرم داده‌ای برای ارسال به سرور
                const formData = new FormData();
                Object.keys(selectedFileItem?.fileResDetails?.fields || {}).map((x) => {
                    formData.append(x, selectedFileItem?.fileResDetails?.fields[x]);
                });
                formData.append("file", selectedFileItem.file);

                // آپلود فایل به سرور
                const uploadResponse = await axios.post(
                    `${selectedFileItem?.fileResDetails?.url ? selectedFileItem?.fileResDetails?.url : 'https://xoxxel.storage.iran.liara.space/'}`,
                    formData,
                    {
                        headers: { "Content-Type": "multipart/form-data" },
                    }
                );

                // بررسی وضعیت آپلود فایل
                if (uploadResponse.status === 204) {
                    // درخواست حذف فایل قبلی از سرور
                    const deleteData = {
                        id: selectedFileItem?.fileResDetails?.dataStorage?.id
                    };
                    const deleteResponse = await axios.post(`${ServerURL.url}/admin/storage/verify-upload`, deleteData, config);

                    // اگر حذف فایل با موفقیت انجام شود
                    if (deleteResponse.status === 201) {
                        // ایجاد داده‌های جدید برای ارسال به سرور
                        const createData = {
                            name: region,
                            id_storage: selectedFileItem?.fileResDetails?.dataStorage?.id
                        };

                        // ارسال درخواست به سرور برای ایجاد کشور جدید
                        const createResponse = await axios.post(`${ServerURL.url}/admin/country/create`, createData, config);

                        // بررسی وضعیت درخواست ایجاد کشور
                        if (createResponse.status === 201) {
                            console.log('کشور با موفقیت ایجاد شد');
                            setOpen(false);
                        } else if (createResponse.status === 400 && createResponse.data.message === 'The country has already been created') {
                            setRequestError("این کشور از قبل وجود دارد");
                        } else {
                            setRequestError("خطا در ایجاد کشور");
                        }
                    } else {
                        setRequestError("خطا در حذف فایل قبلی");
                    }
                } else {
                    setRequestError("خطا در آپلود فایل");
                }
            } catch (error) {
                console.error("خطا: ", error);
                setRequestError("خطا در ارسال درخواست به سرور");
            } finally {
                setAddingFeature(false);
            }
        } else {
            setRequestError("یک فایل انتخاب کنید");
            setAddingFeature(false);
        }
    };


    const handleClosePanel = () => {
        setOpen(false);
        setRegion("");
        setRequestError("");
        setSelectedFileItem({}); // تنظیم مقدار selectedFileItem به خالی
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
                onClick={handleClickOpen}
            >
                ایجاد ریجن
            </Button>
            <Dialog
                fullWidth
                maxWidth={"sm"}
                open={open}
                onClose={handleClosePanel}
            >
                <DialogContent sx={{ px: "50px", py: "30px" }}>
                    <Grid container>
                        <Typography align="left" sx={{ my: "15px" }}>
                            ایجاد ریجن
                        </Typography>
                        <Grid xs={12} md={6}>
                            <TextField
                                error={!!requestError}
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
                        <Grid xs={12} md={12}>
                            <UploadFile
                                id={"file1"}
                                accept="image/png, image/jpg, image/jpeg"
                                label={"ایکون ( با اندازه برابر مثلا 200*200)"}
                                onChange={(e) => {
                                    setSelectedFileItem(e);
                                }}
                            />
                        </Grid>
                    </Grid>

                    <Grid container>
                        {region !== "" && (
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
                                    style={{ marginTop: "20px" }}
                                    disabled={addingFeature}
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
        </Grid>
    );
};

export default CreateRegion;
