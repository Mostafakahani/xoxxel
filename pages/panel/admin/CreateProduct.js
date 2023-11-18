import { Button, CircularProgress, Grid, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useState } from "react";
import AccountLayout from "Components/Common/Layout/AccountLayout";
import UploadFile from "Components/Common/UploadFile";
import ProductOption from "Components/Common/ProductOption/ProductOption";
import StandardImageList from "Components/Common/Images";
import CheckboxesTags from "Components/Common/CheckBoxList";
import ServerURL from "Components/Common/Layout/config";
import { useEffect } from "react";
import axios from "axios";
const CreateProduct = () => {
    const [productName, setProductName] = useState("");
    // const [productPrice, setProductPrice] = useState("");
    // const [starRating, setStarRating] = useState("");
    const [labelInput, setLabelInput] = useState("");
    const [placeholder, setPlaceholder] = useState("");
    const [textArea, setTextArea] = useState("");
    const [selectedFileItem, setSelectedFileItem] = useState({});
    const [selectedFileItem2, setSelectedFileItem2] = useState({});
    const [selectedFileItem3, setSelectedFileItem3] = useState({});
    const [checkBoxList, setCheckBoxList] = useState([]);
    const [addingFeature, setAddingFeature] = useState(false);

    const [allData, setAllData] = useState([]);
    const [category, setCategory] = useState([]);
    const [countTwo, setCountTwo] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState('');

    // const handleSubmit = () => {
    //     setAllData([...allData, {
    //         id: Date.now(), productName: productName, productPrice: productPrice, starRating: starRating, labelInput: labelInput,
    //         placeholder: placeholder, textArea: textArea
    //     }])
    //     console.log(allData)
    // }
    useEffect(() => {
        async function fetchData() {
            const config = { headers: { Authorization: `${ServerURL.Bear}` } };
            const responseCategory = await axios.get(`${ServerURL.url}/admin/storage/get-all-cat`, config);
            setCategory(responseCategory.data.data);
        }
        fetchData();
    }, [countTwo]);

    const handleSelectChangeCategory = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleSubmit = async () => {
        setAddingFeature(true);
        const config = {
            headers: {
                Authorization: `${ServerURL.Bear}`
            }
        };
        try {
            const dataBody = {
                name: productName,
                id_type: selectedCategory,
                id_image_main: selectedFileItem,
                id_image_trends: selectedFileItem2,
                id_image_square: selectedFileItem3,
                placeholder: placeholder,
                lable_input: labelInput,
                description_input: textArea,
                ids_feature: checkBoxList.map((x) => x),
            }
            const uploadResponse = await axios.post(`${ServerURL.url}/admin/product/create`, dataBody, config);
            console.log(uploadResponse.response)
        } catch (error) {
            console.error("خطا: ", error);
            setRequestError("خطا در ارسال درخواست به سرور");
        } finally {
            setAddingFeature(false);
        }
    };




    return (
        <>
            <AccountLayout>
                <Grid container>
                    <Typography>ایجاد محصول </Typography>
                    <Grid container xs={12} md={12} spacing={2}>
                        <Grid item container xs={12} sm={12} md={12} sx={{ my: '15px', display: 'flex', flexDirection: "column" }}>
                            <Grid xs={12} sm={6} md={8}>
                                <TextField
                                    onChange={(e) => setProductName(e.target.value)}
                                    value={productName}
                                    label="نام محصول"
                                    variant="outlined"
                                    sx={{ my: '5px', width: { xs: '100%', sm: '100%', md: '100%' } }}
                                />
                            </Grid>

                            {/* <Grid xs={12} sm={3} md={3}>
                                <TextField
                                    // error={!priceError ? false : true}
                                    // helperText={!priceError ? '' : ErrorList[1]}
                                    onChange={(e) => setProductPrice(e.target.value)}
                                    value={productPrice}
                                    label="قیمت محصول"
                                    variant="outlined"
                                    sx={{ my: '5px', width: { xs: '100%', sm: '90%', md: '80%' } }}
                                />
                            </Grid> */}
                            {/* <Grid xs={12} sm={3} md={3}>
                                <TextField
                                    // error={!priceError ? false : true}
                                    // helperText={!priceError ? '' : ErrorList[1]}
                                    onChange={(e) => setStarRating(e.target.value)}
                                    value={starRating}
                                    label="ستاره محصول"
                                    variant="outlined"
                                    sx={{ my: '5px', width: { xs: '100%', sm: '100%', md: '80%' } }}
                                />
                            </Grid> */}

                        </Grid>
                        <Grid item xs={12} sm={6} md={4} sx={{ mb: "50px" }}>
                            <Typography>دسته</Typography>
                            <Select
                                value={selectedCategory}
                                onChange={handleSelectChangeCategory}
                                sx={{ width: { xs: '100%', sm: "80%" } }}
                                onOpen={() => setCountTwo(countTwo + 1)}
                            >
                                {Array.isArray(category) ? (
                                    category.map((data) => (
                                        <MenuItem key={data.id} value={data.id}>
                                            {data.title}
                                        </MenuItem>
                                    ))
                                ) : (
                                    <MenuItem value={null}>
                                        Loading...
                                    </MenuItem>
                                )}
                            </Select>
                        </Grid>
                    </Grid>
                </Grid >

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={4}>
                        <StandardImageList
                            label={"تصویر اصلی (297*147)"}
                            onChange={(e) => {
                                setSelectedFileItem(e);
                                console.log(e)
                            }}
                        />
                    </Grid>
                    {/* <UploadFile
                        id={"file1"}
                        accept="video/*"
                        label={"تصویر اصلی ( 297*147)"}
                        onChange={(e) => console.log(e)}
                    /> */}
                    <Grid item xs={12} sm={6} md={4}>
                        <StandardImageList
                            label={"تصویر Trends (153*190)"}
                            onChange={(e) => {
                                setSelectedFileItem2(e);
                                console.log(e)
                            }}
                        />
                        {/* <UploadFile
                            id={"file1"}
                            accept="video/*"
                            label={"تصویر Trends ( 153*190)"}
                            onChange={(e) => console.log(e)}
                        /> */}
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <StandardImageList
                            label={"تصویر اسلایدی یا مربعی (134*134)"}
                            onChange={(e) => {
                                setSelectedFileItem3(e);
                                console.log(e)
                            }}
                        />
                        {/* <UploadFile
                            id={"file1"}
                            accept="video/*"
                            label={"تصویر اسلایدی یا مربعی ( 134*134)"}
                            onChange={(e) => console.log(e)}
                        /> */}
                    </Grid>
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
                            multiline
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

                <Grid
                    container
                // sx={{ borderRadius: '10px', border: '2px dashed #5A5A5A', p: '20px', my: '15px' }}
                >
                    {/* <ProductOption tableId={'tableId'} /> */}
                    <CheckboxesTags
                        onChange={(e) => {
                            setCheckBoxList(e);
                            // console.log(e)
                            // console.log('list: ', checkBoxList)
                        }}
                    />
                </Grid>

                <Grid container sx={{ my: '25px' }}>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            sx={{
                                // color: selectedFileItem.length !== 0 && selectedFileItem2.length !== 0 && selectedFileItem3.length !== 0 && productName !== '' && productPrice !== null && productPrice !== 0 && productPrice !== '' ? '' : '',
                                borderRadius: "5px",
                                mr: '10px'
                            }}
                            disabled={selectedFileItem.length === 0 || selectedFileItem2.length === 0 || selectedFileItem3.length === 0 || productName === '' || selectedCategory === ''}

                            onClick={handleSubmit}>
                            {addingFeature ? <CircularProgress size={24} /> : 'ذخیره تغییرات'}
                        </Button>
                        <Button variant="outlined" sx={{
                            color: '#B12640', border: '1px solid #B12640', borderRadius: "5px",
                            '&:hover': {
                                border: '1px solid #B12640',
                                backgroundColor: '#f11c1c0a'
                            }
                        }} onClick={() => { console.log(selectedFileItem, ' 2: ', selectedFileItem2, ' 3: ', selectedFileItem3, ' list: ', checkBoxList) }}>انصراف</Button>
                    </Grid>

                    {/* <Button sx={{ color: '#1D1E2D', borderRadius: '5px', border: '1px solid #807D7D' }}>اضافه کردن ویژگی جدید</Button> */}
                </Grid>
            </AccountLayout >
        </>
    )
}
export default CreateProduct;