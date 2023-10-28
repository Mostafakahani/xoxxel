import { Box, Button, Dialog, DialogContent, DialogContentText, DialogTitle, Grid, MenuItem, Select, SvgIcon, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import UploadFile from "../UploadFile";
import ServerURL from "../Layout/config";
import axios from "axios";


const CreateRegon = ({ tableId }) => {
    const [open, setOpen] = useState(false);
    const [region, setRegion] = useState("");
    const [regions, setRegions] = useState([]);
    const [requestError, setRequestError] = useState(null);
    const [imageData, setImageData] = useState('')
    const [imageName, setImageName] = useState('')
    const [selectedFileItem, setSelectedFileItem] = useState(null);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const [fileOption, setFileOptions] = useState(null);

    const handleSubmit = async () => {
        if (fileOption) {
            try {
                const formData = new FormData();
                formData.append("file", selectedFileItem); 
                formData.append("region", region); 
                formData.append("key", fileOption.fields.key);
                formData.append("Policy", fileOption.fields.Policy);
                formData.append("acl", fileOption.fields.acl);
                formData.append("bucket", fileOption.fields.bucket);
                formData.append("X-Amz-Algorithm", fileOption.fields["X-Amz-Algorithm"]);
                formData.append("X-Amz-Credential", fileOption.fields["X-Amz-Credential"]);
                formData.append("X-Amz-Date", fileOption.fields["X-Amz-Date"]);
                formData.append("X-Amz-Signature", fileOption.fields["X-Amz-Signature"]);

                const response = await axios.post(`${fileOption.url}`, formData, {
                    headers: {
                        Authorization: `${ServerURL.Bear}`,
                        'Content-Type': 'multipart/form-data',
                    }
                });

                if (response.status === 400) {
                    setRequestError("این دسته وجود دارد");
                } else {
                    setRegion("");
                    setOpen(false);
                    setRequestError(null);
                }
            } catch (error) {
                console.error(error, 'errr');
                setRequestError("اطلاعات درست وارد کنید");
            }
        } else {
            setRequestError('fileOption نیست');
        }
    };

    const handleClosePanel = () => {
        setOpen(false);
        setRegion("");
        setRegions([]);
        setFileOptions(null)
    }
    const [fileSize, setFileSize] = useState(null);
    const [filePath, setFilePath] = useState(null);

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
                                accept="image/png, image/jpg, image/jpeg"
                                label={"ایکون ( با اندازه برابر مثلا 200*200)"}
                                onChange={(e) => {
                                    // setFileOptions(e.data);
                                    setSelectedFileItem(e.selectedFile);
                                    setFileOptions(e.fileResDetails)
                                }}
                            />


                        </Grid>
                    </Grid>
                    <Grid container>
                        {
                            region !== "" && (
                                <Grid xs={6} sm={3} md={3}>
                                    <Button variant="contained" color="primary"
                                        // onClick={handleSubmit}
                                        onClick={
                                            () => {
                                                console.log(selectedFileItem);
                                                handleSubmit();
                                            }
                                        }
                                        style={{ marginTop: '20px' }}>
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