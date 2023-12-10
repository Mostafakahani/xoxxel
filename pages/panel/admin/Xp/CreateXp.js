import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AccountLayout from "Components/Common/Layout/AccountLayout";
import StandardImageList from "Components/Common/Images";
import CheckboxesTags from "Components/Common/CheckBoxList";
import ServerURL from "Components/Common/Layout/config";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import GetToken from "GetToken";
import CreateOption from "Components/Common/Creatives/CreateOption";
import { Button, Grid, MenuItem, Select, SvgIcon, TextField, Typography } from '@mui/material';
import { PopularIconOff, PopularIconOn } from 'Icons/icons';
const CreateXp = () => {
    const router = useRouter();
    // const { id } = router.query;
    const [country, setCountry] = useState([]);
    const [pageData, setPageData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setSendMessage] = useState('');
    const [messageTemp, setSendMessageTemp] = useState('');
    const [nameFeature, setNameFeature] = useState("");
    // const [productPrice, setProductPrice] = useState("");
    // const [starRating, setStarRating] = useState("");
    const [dataFeature, setDataFeature] = useState("");
    const [sellMode, setSellMode] = useState("");
    const [xp, setXp] = useState("");
    const [selectedFileItem, setSelectedFileItem] = useState({});
    const [selectedFileItem2, setSelectedFileItem2] = useState({});
    const [selectedFileItem3, setSelectedFileItem3] = useState({});
    const [checkBoxList, setCheckBoxList] = useState([]);
    const [addingFeature, setAddingFeature] = useState(false);
    const [openThis, setOpenThis] = useState(false);
    // const router = useRouter()
    // const [allData, setAllData] = useState([]);
    const [category, setCategory] = useState([]);
    const [responseId, setResponseId] = useState(0);
    const [dataType, setDataType] = useState([]);

    const [countOne, setCountOne] = useState(0);
    const [countTwo, setCountTwo] = useState(0);
    const [countThree, setCountThree] = useState(0);



    const [selectedType, setSelectedType] = useState("");
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    const [isPopular, setIsPopular] = useState(false);

    // useEffect(() => {
    //     async function fetchData() {
    //         const config = { headers: { Authorization: `${ServerURL.developerMode === true ? ServerURL.Bear : GetToken("user")}` } };
    //         const responseCountry = await axios.get(
    //             `${ServerURL.url}/admin/feature/${id}/list-data-feature`,
    //             config
    //         );
    //         setPageData(responseCountry.data.data);
    //     }
    //     fetchData();
    // }, []);
    useEffect(() => {
        async function fetchData() {
            const config = { headers: { Authorization: `${ServerURL.developerMode === true ? ServerURL.Bear : GetToken("user")}` } };
            const responseCountry = await axios.get(
                `${ServerURL.url}/admin/country/get-all-country`,
                config
            );
            setCountry(responseCountry.data.data);
        }
        fetchData();
    }, [countOne]);
    useEffect(() => {
        async function fetchData() {
            const config = { headers: { Authorization: `${ServerURL.developerMode === true ? ServerURL.Bear : GetToken("user")}` } };
            const responseCategory = await axios.get(
                `${ServerURL.url}/admin/cat/get-all-cat-without-pagination`,
                config
            );
            setCategory(responseCategory.data);
        }
        fetchData();
    }, [countTwo]);

    useEffect(() => {
        async function fetchData() {
            const config = { headers: { Authorization: `${ServerURL.developerMode === true ? ServerURL.Bear : GetToken("user")}` } };
            const responseType = await axios.get(
                `${ServerURL.url}/admin/type-product/get-all-type-product-without-pagination`,
                config
            );
            setDataType(responseType.data);
        }
        fetchData();
    }, [countThree]);

    const handleSelectChangeCategory = (event) => {
        setSelectedCategory(event.target.value);
    };
    const handleSelectChange = (event) => {
        setSelectedCountry(event.target.value);
    };
    const handleSelectChangeType = (event) => {
        setSelectedType(event.target.value);
    };

    const handleSubmit = async () => {
        setAddingFeature(true);
        const config = {
            headers: {
                Authorization: `${ServerURL.developerMode === true ? ServerURL.Bear : GetToken("user")}`,
            },
        };
        try {
            const dataBody = {
                name_feature: nameFeature,
                id_type: selectedCategory,
                xp: xp,
                id_Storage: selectedFileItem,
                popular: isPopular,
                data_feature: dataFeature,
                sell_mode: sellMode,
            };
            const uploadResponse = await axios.post(
                `${ServerURL.url}/admin/feature-for-xp/create`,
                dataBody,
                config
            );
            if (uploadResponse.status === 201) {
                toast.success("با موفقیت ساخته شد.");
                handleRemoveFields()
                // window.location.href = "../admin/products";
            } else {
                toast.error("لطفا دوباره امتحان کنید");
            }
        } catch (error) {
            console.error("خطا: ", error);
            setRequestError("خطا در ارسال درخواست به سرور");
        } finally {
            setAddingFeature(false);
        }
    };
    const handleRemoveFields = () => {
        // router.push('/panel/admin/products')
        setNameFeature('')
        setDataFeature('')
        setSellMode('')
        setXp('')
        setSelectedFileItem([])
        setSelectedFileItem2([])
        setSelectedFileItem3([])
        setAddingFeature(false)
        setOpenThis(false)
        setCategory([])
        setCountTwo(0)
        setSelectedCategory('')
        setResponseId(0)
    }



    // useEffect(() => {
    //     if (message) {
    //         SendMessage();
    //     }
    //     // توجه کنید که فقط زمانی می‌خواهید فراخوانی شود که message تغییر کرده باشد.
    // }, [message]);




    // const SendMessage = async () => {
    //     if (message !== '') {
    //         const config = {
    //             headers: {
    //                 Authorization: `${ServerURL.developerMode === true ? ServerURL.Bear : GetToken("user")}`,
    //             },
    //         };
    //         const data = {
    //             id_tiket: parseInt(id),
    //             description: message
    //         }
    //         try {
    //             const response = await axios.post(
    //                 `${ServerURL.url}/admin/tiket/replay-tiket`,
    //                 data, config
    //             );
    //             const dataResponse = response.data;
    //             setData(dataResponse);
    //             // تغییر messageTemp به مقدار فعلی message
    //             setSendMessageTemp(message);
    //         } catch (error) {
    //             console.log(error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     } else {

    //     }
    // };




    return (
        <>
            <AccountLayout>
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    limit={5}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
                <Typography>ساخت فیچر</Typography>
                <Grid container spacing={5}>
                    <Grid item container xs={12} md={12} spacing={2}>
                        <Grid item container xs={12} sm={12} md={12} sx={{ my: "15px", display: "flex", flexDirection: "column" }}>
                            <Grid item xs={12} sm={6} md={8}>
                                <TextField
                                    onChange={(e) => setNameFeature(e.target.value)}
                                    value={nameFeature}
                                    label="نام فیچر"
                                    variant="outlined"
                                    sx={{
                                        my: "5px",
                                        width: { xs: "100%", sm: "100%", md: "100%" },
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Grid item container spacing={2}>
                            <Grid item xs={12} sm={6} md={4}>
                                <Typography>دسته</Typography>
                                <Select
                                    value={selectedCategory}
                                    onChange={handleSelectChangeCategory}
                                    sx={{ width: { xs: "100%" } }}
                                    onOpen={() => setCountTwo(countTwo + 1)}
                                >
                                    {Array.isArray(category) ? (
                                        category.map((data) => (
                                            <MenuItem key={data.id} value={data.id}>
                                                {data.title}
                                            </MenuItem>
                                        ))
                                    ) : (
                                        <MenuItem value={null}>Loading...</MenuItem>
                                    )}
                                </Select>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Typography>ریجن</Typography>
                                <Select
                                    value={selectedCountry}
                                    onChange={handleSelectChange}
                                    sx={{ width: { xs: "100%" } }}
                                    onOpen={() => setCountOne(countOne + 1)}
                                >
                                    {Array.isArray(country) ? (
                                        country.map((data) => (
                                            <MenuItem key={data.id} value={data.id}>
                                                <Grid sx={{ display: "flex", alignItems: "center" }}>
                                                    {/* <Box component={'img'} src={`https://xoxxel.storage.iran.liara.space/${data.id_storage.name}`} sx={{ mr: "10px", width: '30px', height: 'auto' }} alt={data.title} /> */}
                                                    {/* <Avatar alt={data.title} src={`https://xoxxel.storage.iran.liara.space/${data.id_storage.name}`} /> */}
                                                    {data.title}
                                                </Grid>
                                            </MenuItem>
                                        ))
                                    ) : (
                                        <MenuItem value={null}>Loading...</MenuItem>
                                    )}
                                </Select>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Typography>نوع</Typography>
                                <Select
                                    value={selectedType}
                                    onChange={handleSelectChangeType}
                                    sx={{ width: { xs: "100%" } }}
                                    onOpen={() => setCountThree(countThree + 1)}
                                >
                                    {Array.isArray(dataType) ? (
                                        dataType.map((data) => (
                                            <MenuItem key={data.id} value={data.id}>
                                                {data.title}
                                            </MenuItem>
                                        ))
                                    ) : (
                                        <MenuItem value={null}>Loading...</MenuItem>
                                    )}
                                </Select>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <StandardImageList
                            label={"تصویر اصلی (297*147)"}
                            onChange={(e) => {
                                setSelectedFileItem(e);
                                console.log(e);
                            }}
                        />
                    </Grid>
                </Grid>

                <Grid container sx={{ my: "20px" }}>
                    <Grid xs={12} sm={4} md={3}>
                        <TextField
                            size="small"
                            onChange={(e) => setDataFeature(e.target.value)}
                            value={dataFeature}
                            label="Label input"
                            variant="outlined"
                            sx={{ my: "5px", width: { xs: "100%", sm: "90%", md: "80%" } }}
                        />
                    </Grid>
                    <Grid xs={12} sm={4} md={3}>
                        <TextField
                            size="small"
                            onChange={(e) => setSellMode(e.target.value)}
                            value={sellMode}
                            label="Place holder"
                            variant="outlined"
                            sx={{ my: "5px", width: { xs: "100%", sm: "90%", md: "80%" } }}
                        />
                    </Grid>
                </Grid>
                <Grid container sx={{ my: "20px" }}>
                    <Grid xs={12} sm={4} md={12}>
                        <TextField
                            size="small"
                            fullWidth
                            multiline
                            onChange={(e) => setXp(e.target.value)}
                            value={xp}
                            label="متن زیر Input"
                            variant="outlined"
                            sx={{ my: "5px" }}
                        />
                    </Grid>
                </Grid>

                <Grid container>
                    <CheckboxesTags
                        value={checkBoxList}
                        responseId={responseId}
                        onChange={(e) => {
                            setCheckBoxList(e);
                        }}
                    />
                    <CreateOption
                        click={openThis}
                        setClick={(value) => setOpenThis(value)}
                        status={'plus'}
                        setResponseId={(e) => {
                            setResponseId(e);
                            setCheckBoxList([...checkBoxList, e]);
                            console.log(checkBoxList);
                        }}
                    />
                </Grid>

                <Grid container sx={{ my: "25px" }}>
                    <Grid container item spacing={2}>
                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                disabled={
                                    selectedFileItem.length === 0 ||
                                    selectedFileItem2.length === 0 ||
                                    selectedFileItem3.length === 0 ||
                                    nameFeature === "" ||
                                    selectedCategory === "" ||
                                    checkBoxList.length === 0 ||
                                    xp === '' ||
                                    dataFeature === '' ||
                                    sellMode === ''
                                }
                                onClick={handleSubmit}
                            >
                                {addingFeature ? <CircularProgress size={24} /> : "ذخیره تغییرات"}
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={() => {
                                    console.log('')
                                    // window.location.href = "../admin/products";
                                }}
                            >
                                انصراف
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="outlined"
                                color="inherit"
                                onClick={() => setOpenThis(true)}
                            >اضافه کردن ویژگی جدید</Button>
                        </Grid>
                        <Grid xs={12} sm={6} md={3}>
                            <Typography>به عنوان محبوب</Typography>
                            <Grid xs={6} md={6}>
                                <Button
                                    onClick={() => setIsPopular(!isPopular)}
                                    sx={{
                                        color: "#4B4B57",
                                        p: "15px",
                                        px: { sm: "40px", md: "15px" },
                                        border: "1px solid #bdbdbd",
                                        alignItems: "center",
                                        display: "flex",
                                        fontSize: "13px",
                                    }}
                                >
                                    Popular
                                    {!isPopular ? (
                                        <SvgIcon sx={{ ml: "35px" }}><PopularIconOn /></SvgIcon>
                                    ) : (
                                        <SvgIcon sx={{ ml: "35px" }}><PopularIconOff /></SvgIcon>
                                    )}
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>

                </Grid>
            </AccountLayout>
        </>
    );
};

export default CreateXp;
