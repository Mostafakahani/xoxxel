import { Button, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import AccountLayout from "Components/Common/Layout/AccountLayout";
import UploadFile from "Components/Common/UploadFile";
import ProductOption from "Components/Common/ProductOption/ProductOption";
import StandardImageList from "Components/Common/Images";
const CreateProduct = () => {
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [starRating, setStarRating] = useState("");
    const [labelInput, setLabelInput] = useState("");
    const [placeholder, setPlaceholder] = useState("");
    const [textArea, setTextArea] = useState("");
    const [selectedFileItem, setSelectedFileItem] = useState({});

    const [allData, setAllData] = useState([]);

    // const handleSubmit = () => {
    //     setAllData([...allData, {
    //         id: Date.now(), productName: productName, productPrice: productPrice, starRating: starRating, labelInput: labelInput,
    //         placeholder: placeholder, textArea: textArea
    //     }])
    //     console.log(allData)
    // }


    const handleSubmit = async () => {
        setAddingFeature(true);
        const config = {
            headers: {
                Authorization: `${ServerURL.Bear}`
            }
        };
        if (selectedFileItem && selectedFileItem.file) {
            try {
                const formData = new FormData();
                Object.keys(selectedFileItem?.fileResDetails?.fields || {}).map((x) => {
                    formData.append(x, selectedFileItem?.fileResDetails?.fields[x]);
                });
                formData.append("file", selectedFileItem.file);

                const uploadResponse = await axios.post(
                    `${selectedFileItem?.fileResDetails?.url ? selectedFileItem?.fileResDetails?.url : 'https://xoxxel.storage.iran.liara.space/'}`,
                    formData,
                    {
                        headers: { "Content-Type": "multipart/form-data" },
                    }
                );

                if (uploadResponse.status === 204) {
                    const verifyData = {
                        id: selectedFileItem?.fileResDetails?.dataStorage?.id
                    };
                    const verifyResponse = await axios.post(`${ServerURL.url}/admin/storage/verify-upload`, verifyData, config);

                    if (verifyResponse.status === 201) {
                        const createData = {
                            name: region,
                            id_storage: selectedFileItem?.fileResDetails?.dataStorage?.id
                        };

                        const createResponse = await axios.post(`${ServerURL.url}/admin/country/create`, createData, config);

                        if (createResponse.status === 201) {
                            setOpen(false);
                            setRegion("");
                            setRequestError("");
                            setSelectedFileItem({});
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




    return (
        <>
            <AccountLayout>
                <Grid container>
                    <Grid container xs={12} md={12}>
                        <Grid sm={9} md={12}>
                            <Typography>ایجاد محصول </Typography>
                        </Grid>
                        <Grid container xs={12} sm={12} md={12} sx={{ my: '15px' }}>
                            <Grid xs={12} sm={6} md={3}>
                                <TextField
                                    // error={!nameError ? false : true}
                                    // helperText={!nameError ? '' : ErrorList[0]}
                                    onChange={(e) => setProductName(e.target.value)}
                                    value={productName}
                                    label="نام محصول"
                                    variant="outlined"
                                    sx={{ my: '5px', width: { xs: '100%', sm: '90%', md: '80%' } }}
                                />
                            </Grid>
                            <Grid xs={12} sm={3} md={3}>
                                <TextField
                                    // error={!priceError ? false : true}
                                    // helperText={!priceError ? '' : ErrorList[1]}
                                    onChange={(e) => setProductPrice(e.target.value)}
                                    value={productPrice}
                                    label="قیمت محصول"
                                    variant="outlined"
                                    sx={{ my: '5px', width: { xs: '100%', sm: '90%', md: '80%' } }}
                                />
                            </Grid>
                            <Grid xs={12} sm={3} md={3}>
                                <TextField
                                    // error={!priceError ? false : true}
                                    // helperText={!priceError ? '' : ErrorList[1]}
                                    onChange={(e) => setStarRating(e.target.value)}
                                    value={starRating}
                                    label="ستاره محصول"
                                    variant="outlined"
                                    sx={{ my: '5px', width: { xs: '100%', sm: '100%', md: '80%' } }}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid >

                <Grid container>
                    <StandardImageList
                        onChange={(e) => {
                            setSelectedFileItem(e);
                            console.log(e)
                        }}
                    />
                    {/* <UploadFile
                        id={"file1"}
                        accept="video/*"
                        label={"تصویر اصلی ( 297*147)"}
                        onChange={(e) => console.log(e)}
                    /> */}
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
                            onChange={(e) => setLabelInput(e.target.value)}
                            value={labelInput}
                            label="Label input"
                            variant="outlined"
                            sx={{ my: '5px', width: { xs: '100%', sm: '90%', md: '80%' } }}
                        />
                    </Grid>
                    <Grid xs={12} sm={4} md={3}>
                        <TextField
                            // error={!priceError ? false : true}
                            // helperText={!priceError ? '' : ErrorList[1]}
                            onChange={(e) => setPlaceholder(e.target.value)}
                            value={placeholder}
                            label="Place holder"
                            variant="outlined"
                            sx={{ my: '5px', width: { xs: '100%', sm: '90%', md: '80%' } }}
                        />
                    </Grid>

                </Grid>
                <Grid container sx={{ my: '20px' }}>
                    <Grid xs={12} sm={4} md={12}>
                        <TextField
                            fullWidth
                            // error={!priceError ? false : true}
                            // helperText={!priceError ? '' : ErrorList[1]}
                            onChange={(e) => setTextArea(e.target.value)}
                            value={textArea}
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
                    <Button sx={{ color: '#1C49F1' }} onClick={handleSubmit}>ذخیره تغییرات</Button>
                    <Button sx={{ color: '#B12640' }}>انصراف</Button>
                    <Button sx={{ color: '#1D1E2D', borderRadius: '5px', border: '1px solid #807D7D' }}>اضافه کردن ویژگی جدید</Button>
                </Grid>
            </AccountLayout >
        </>
    )
}
export default CreateProduct;