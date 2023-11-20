import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  Grid,
  MenuItem,
  Select,
  SvgIcon,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import ServerURL from "../Layout/config";
import Alert from "../AlertPopup/AlertPopup";
import { ToastContainer, toast } from "react-toastify";
import GetToken from "GetToken";

const CreateOption = () => {
  const [open, setOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [rows, setRows] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [count, setCount] = useState(0);
  const [isPopular, setIsPopular] = useState(false);
  const [addingFeature, setAddingFeature] = useState(false);
  const [data, setData] = useState([]);
  const [listData, setListData] = useState([]);
  const [dataCategory, setDataCategory] = useState([]);
  const [dataType, setDataType] = useState([]);
  const [countOne, setCountOne] = useState(0);
  const [countTwo, setCountTwo] = useState(0);
  const [countThree, setCountThree] = useState(0);
  const [countList, setCountList] = useState(0);
  const [delRow, setDelRow] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  // useEffect(() => {
  //     async function fetchData() {
  //         const config = {
  //             headers: {
  //                 Authorization: `${GetToken('user')}`
  //             }
  //         };
  //         const responseCountry = await axios.get(`${ServerURL.url}/admin/country/get-all-country`, config);
  //         const responseCategory = await axios.get(`${ServerURL.url}/admin/storage/get-all-cat`, config);
  //         const responseType = await axios.get(`${ServerURL.url}/admin/storage/get-all-type-product`, config);

  //         setData(responseCountry.data.data);
  //         setDataCategory(responseCategory.data.data);
  //         setDataType(responseType.data.data);
  //     }

  //     fetchData();
  // }, [countOne, countTwo, countThree]);
  // useEffect(() => {
  //     async function fetchData() {
  //         const config = { headers: { Authorization: `${GetToken('user')}` } };
  //         const responseList = await axios.get(`${ServerURL.url}/admin/feature/get-all-feature`, config);
  //         setListData(responseList.data.data);
  //     }
  //     fetchData();
  // }, [countList]);

  useEffect(() => {
    async function fetchData() {
      const config = { headers: { Authorization: `${GetToken("user")}` } };
      const responseCountry = await axios.get(
        `${ServerURL.url}/admin/country/get-all-country`,
        config
      );
      setData(responseCountry.data.data);
    }
    fetchData();
  }, [countOne]);
  useEffect(() => {
    async function fetchData() {
      const config = { headers: { Authorization: `${GetToken("user")}` } };
      const responseCategory = await axios.get(
        `${ServerURL.url}/admin/storage/get-all-cat`,
        config
      );
      setDataCategory(responseCategory.data.data);
    }
    fetchData();
  }, [countTwo]);
  useEffect(() => {
    async function fetchData() {
      const config = { headers: { Authorization: `${GetToken("user")}` } };
      const responseType = await axios.get(
        `${ServerURL.url}/admin/storage/get-all-type-product`,
        config
      );
      setDataType(responseType.data.data);
    }
    fetchData();
  }, [countThree]);

  const handleSelectChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const handleSelectChangeCategory = (event) => {
    setSelectedCategory(event.target.value);
  };
  const handleSelectChangeType = (event) => {
    setSelectedType(event.target.value);
  };

  // const handleAddRow = () => {
  //     // Validation
  //     if (name.trim() === "") {
  //         console.log("نام و قیمت نمی‌تواند خالی باشد.");
  //         return;
  //     }

  //     const isDuplicate = rows.some((row) => {
  //         row.name === name
  //         // &&
  //         // row.price === price
  //     });
  //     if (!isDuplicate) {
  //         // با افزودن یک ویژگی جدید، وضعیت محبوبیت به حالت اولیه تنظیم می‌شود
  //         setRows([...rows,
  //         {
  //             id: Date.now(),
  //             country_id: selectedCountry,
  //             type_id: selectedType,
  //             cat_id: selectedCategory,
  //             name_feature: name,
  //             price: price,
  //             count: count,
  //             popular: isPopular
  //         }]);
  //         setIsPopular(false);
  //         setName("");
  //         setPrice("");
  //         setCount(0)
  //         setCountOne(0)
  //         setCountTwo(0)
  //         setCountThree(0)
  //         setData('')
  //         setDataCategory('')
  //         setDataType('')
  //         setSelectedCategory('')
  //         setSelectedCountry('')
  //         setSelectedType('')
  //         setIsPopular(false)

  //     } else {
  //         console.log("این نام و قیمت قبلاً وارد شده است.");
  //     }
  // };

  // const handleDeleteRow = async (id) => {
  //     setRows(rows.filter((row) => row.id !== id));
  //     setDelRow(id)
  //     try {
  //         setAddingFeature(true);
  //         const config = { headers: { Authorization: `${GetToken('user')}` } };
  //         const dataBody = {
  //             ids: [id]
  //         };
  //         const response = await axios.post(`${ServerURL.url}/admin/feature/delete`, dataBody, config);
  //         console.log(response);
  //         setCountList(countList + 1)
  //     } catch (error) {
  //         console.error("خطا در ارسال درخواست به سرور", error);
  //     } finally {
  //         setAddingFeature(false);
  //     }
  // };

  // const handleTogglePopular = (id) => {
  //     setRows(
  //         rows.map((row) =>
  //             row.id === id ? { ...row, isPopular: !row.isPopular } : row
  //         )
  //     );
  // };
  // const formattedData = rows.map(({ country_id, cat_id, type_id, name_feature, price, count, popular }) => ({
  //     country_id,
  //     cat_id,
  //     type_id,
  //     name_feature,
  //     price,
  //     count,
  //     popular
  // }));

  const handleSubmit = async () => {
    // Validation
    const isValidData = rows.every(
      (data) =>
        data.name_feature !== "" &&
        data.price !== "" &&
        data.count !== "" &&
        data.popular !== ""
    );
    if (!isValidData) {
      console.log("Error: همه فیلدها باید پر شوند.");
      return;
    }

    try {
      setAddingFeature(true);
      const config = {
        headers: {
          Authorization: `${GetToken("user")}`,
        },
      };

      // const dataBody = rows.map((x) => ({
      //     country_id: x.country_id,
      //     cat_id: x.cat_id,
      //     type_id: x.type_id,
      //     name_feature: x.name_feature,
      //     price: x.price,
      //     count: x.count,
      //     popular: x.popular
      // }));
      const dataBody = {
        // id: Date.now(),
        country_id: selectedCountry,
        type_id: selectedType,
        cat_id: selectedCategory,
        name_feature: name,
        price: price,
        count: count,
        popular: isPopular,
      };
      // ارسال rows به API
      const response = await axios.post(
        `${ServerURL.url}/admin/feature/create`,
        dataBody,
        config
      );
      console.log(response);
      setErrorMessage("با موفقیت ساخته شد");
      toast.success("با موفقیت ساخته شد.");
      handleClosePanel();

      // setOpen(false);
      // setName("");
      // setPrice("");
      // setRows([]);
    } catch (error) {
      console.error("خطا در ارسال درخواست به سرور", error);
    } finally {
      setAddingFeature(false);
    }
  };

  const handleClosePanel = () => {
    setOpen(false);
    setName("");
    setPrice(0);
    // setRows([]);
    setCount(0);
    setCountOne(0);
    setCountTwo(0);
    setCountThree(0);
    setData("");
    setDataCategory("");
    setDataType("");
    setSelectedCategory("");
    setSelectedCountry("");
    setSelectedType("");
    setIsPopular(false);
  };

  const notify = () => {
    toast.success("Default Notification !");

    // toast.success("Success Notification !", {
    //     position: toast.POSITION.TOP_CENTER
    // });

    // toast.error("Error Notification !", {
    //     position: toast.POSITION.TOP_LEFT
    // });

    // toast.warn("Warning Notification !", {
    //     position: toast.POSITION.BOTTOM_LEFT
    // });

    // toast.info("Info Notification !", {
    //     position: toast.POSITION.BOTTOM_CENTER
    // });

    // toast("Custom Style Notification with css class!", {
    //     position: toast.POSITION.BOTTOM_RIGHT,
    //     className: 'foo-bar'
    // });
  };
  return (
    <Grid>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => setOpen(true)}
        sx={{
          fontSize: "12px",
          marginRight: "5px",
          padding: "5px 12px",
          borderRadius: "5px",
          border: "1px solid #B6B6B6",
          mr: { md: "5px", xs: "2px" },
          color: "#525252",
          "&:hover": {
            border: "1px solid #B6B6B6",
          },
        }}
      >
        ایجاد ویژگی
      </Button>
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
      <Dialog
        fullWidth
        maxWidth={"lg"}
        open={open}
        onClose={handleClosePanel}
        onOpen={() => setCountList(countList + 1)}
      >
        <DialogContent>
          <Typography align="left" style={{ marginTop: "15px" }}>
            ایجاد ویژگی
          </Typography>
          <Grid container>
            <Grid container sx={{ my: "15px" }}>
              <Grid xs={12} sm={6} md={4}>
                <Typography>ریجن</Typography>
                <Select
                  value={selectedCountry}
                  onChange={handleSelectChange}
                  sx={{ width: { xs: "100%", sm: "80%" } }}
                  onOpen={() => setCountOne(countOne + 1)}
                >
                  {Array.isArray(data) ? (
                    data.map((data) => (
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
              {/* <Button onClick={() => toast.success("با موفقیت ساخته شد.")}>notify</Button> */}
              <Grid xs={12} sm={6} md={4}>
                <Typography>دسته</Typography>
                <Select
                  value={selectedCategory}
                  onChange={handleSelectChangeCategory}
                  sx={{ width: { xs: "100%", sm: "80%" } }}
                  onOpen={() => setCountTwo(countTwo + 1)}
                >
                  {Array.isArray(dataCategory) ? (
                    dataCategory.map((data) => (
                      <MenuItem key={data.id} value={data.id}>
                        {data.title}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value={null}>Loading...</MenuItem>
                  )}
                </Select>
              </Grid>
              <Grid xs={12} sm={6} md={4}>
                <Typography>نوع</Typography>
                <Select
                  value={selectedType}
                  onChange={handleSelectChangeType}
                  sx={{ width: { xs: "100%", sm: "80%" } }}
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
            <Grid container sx={{ my: "15px" }}>
              <Grid xs={12} sm={6} md={4}>
                <Typography>نام ویژگی</Typography>
                <TextField
                  variant="outlined"
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  sx={{
                    width: { xs: "100%", sm: "80%" },
                    marginBottom: "10px",
                  }}
                />
              </Grid>
              <Grid xs={6} sm={6} md={2}>
                <Typography>تعداد</Typography>
                <TextField
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={count}
                  onChange={(e) => setCount(parseInt(e.target.value))}
                  sx={{ width: { xs: "80%", sm: "80%" }, marginBottom: "10px" }}
                />
              </Grid>
              <Grid xs={6} sm={6} md={3}>
                <Typography>قیمت</Typography>
                <TextField
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  sx={{ width: { xs: "80%", sm: "80%" }, marginBottom: "10px" }}
                />
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
                      <SvgIcon sx={{ ml: "35px" }}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="23"
                          height="23"
                          viewBox="0 0 23 23"
                          fill="none"
                        >
                          <path
                            d="M9.65325 7.59868C10.6785 5.75946 11.1911 4.83984 11.9576 4.83984C12.724 4.83984 13.2366 5.75945 14.2619 7.59868L14.5271 8.07451C14.8185 8.59716 14.9641 8.85848 15.1913 9.0309C15.4184 9.20333 15.7013 9.26733 16.267 9.39534L16.7821 9.51188C18.7731 9.96235 19.7685 10.1876 20.0054 10.9492C20.2422 11.7108 19.5636 12.5044 18.2063 14.0915L17.8551 14.5022C17.4694 14.9532 17.2766 15.1787 17.1898 15.4577C17.1031 15.7367 17.1322 16.0376 17.1905 16.6393L17.2436 17.1872C17.4488 19.3048 17.5514 20.3636 16.9314 20.8343C16.3113 21.305 15.3793 20.8759 13.5152 20.0176L13.0329 19.7955C12.5032 19.5516 12.2383 19.4297 11.9576 19.4297C11.6768 19.4297 11.4119 19.5516 10.8822 19.7955L10.4 20.0176C8.53585 20.8759 7.60379 21.305 6.98375 20.8343C6.3637 20.3636 6.4663 19.3048 6.67151 17.1872L6.7246 16.6393C6.78291 16.0376 6.81206 15.7367 6.72531 15.4577C6.63855 15.1787 6.4457 14.9532 6.06 14.5022L5.70886 14.0915C4.35157 12.5044 3.67292 11.7108 3.90976 10.9492C4.1466 10.1876 5.14206 9.96235 7.13299 9.51188L7.64807 9.39534C8.21384 9.26733 8.49672 9.20333 8.72385 9.0309C8.95098 8.85848 9.09666 8.59716 9.388 8.07451L9.65325 7.59868Z"
                            stroke="#2C7EFA"
                            stroke-width="1.4284"
                          />
                          <path
                            opacity="0.55"
                            d="M4.80809 1.98291C4.80809 1.98291 5.08228 3.37104 5.68344 3.96815C6.28459 4.56526 7.67455 4.83006 7.67455 4.83006C7.67455 4.83006 6.28641 5.10425 5.6893 5.70541C5.0922 6.30656 4.82739 7.69652 4.82739 7.69652C4.82739 7.69652 4.5532 6.30838 3.95205 5.71128C3.35089 5.11417 1.96094 4.84936 1.96094 4.84936C1.96094 4.84936 3.34907 4.57518 3.94618 3.97402C4.54329 3.37287 4.80809 1.98291 4.80809 1.98291Z"
                            stroke="#2C7EFA"
                            stroke-width="0.952268"
                            stroke-linejoin="round"
                          />
                          <path
                            opacity="0.55"
                            d="M17.1953 4.83996H19.0998M18.1476 5.79223L18.1476 3.8877"
                            stroke="#2C7EFA"
                            stroke-width="1.4284"
                            stroke-linecap="round"
                          />
                        </svg>
                      </SvgIcon>
                    ) : (
                      <SvgIcon sx={{ ml: "35px" }}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M10.0802 7.89712C11.1568 5.96571 11.6952 5 12.5 5C13.3048 5 13.8432 5.96571 14.9198 7.89712L15.1984 8.3968C15.5043 8.94564 15.6573 9.22007 15.8958 9.40114C16.1343 9.5822 16.4314 9.64942 17.0255 9.78384L17.5664 9.90622C19.6571 10.3793 20.7025 10.6158 20.9512 11.4156C21.1999 12.2153 20.4872 13.0487 19.0619 14.7154L18.6932 15.1466C18.2881 15.6203 18.0856 15.8571 17.9945 16.1501C17.9034 16.443 17.934 16.759 17.9953 17.3909L18.051 17.9662C18.2665 20.19 18.3742 21.3019 17.7231 21.7962C17.072 22.2905 16.0932 21.8398 14.1357 20.9385L13.6292 20.7053C13.073 20.4492 12.7948 20.3211 12.5 20.3211C12.2052 20.3211 11.927 20.4492 11.3708 20.7053L10.8643 20.9385C8.90677 21.8398 7.928 22.2905 7.27688 21.7962C6.62575 21.3019 6.7335 20.19 6.94899 17.9662L7.00474 17.3909C7.06597 16.759 7.09659 16.443 7.00548 16.1501C6.91438 15.8571 6.71186 15.6203 6.30683 15.1466L5.93808 14.7154C4.51276 13.0487 3.8001 12.2153 4.04881 11.4156C4.29751 10.6158 5.34288 10.3793 7.43361 9.90622L7.9745 9.78384C8.56862 9.64942 8.86568 9.5822 9.1042 9.40114C9.34272 9.22007 9.4957 8.94565 9.80165 8.3968L10.0802 7.89712Z"
                            fill="#2684FC"
                          />
                          <path
                            d="M4.8685 2.50058C4.89849 2.3948 5.08625 2.39416 5.11696 2.49974C5.25716 2.98185 5.51713 3.69447 5.91026 4.08495C6.30338 4.47543 7.01774 4.73058 7.50079 4.86752C7.60657 4.89751 7.60721 5.08528 7.50163 5.11598C7.01952 5.25618 6.3069 5.51616 5.91642 5.90928C5.52594 6.30241 5.27079 7.01676 5.13385 7.49981C5.10386 7.6056 4.91609 7.60623 4.88539 7.50065C4.74518 7.01854 4.48521 6.30592 4.09209 5.91545C3.69896 5.52497 2.9846 5.26981 2.50156 5.13287C2.39577 5.10288 2.39514 4.91511 2.50072 4.88441C2.98283 4.74421 3.69544 4.48424 4.08592 4.09111C4.4764 3.69798 4.73155 2.98363 4.8685 2.50058Z"
                            fill="#2684FC"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M19 3.25C19.4142 3.25 19.75 3.58579 19.75 4V4.25H20C20.4142 4.25 20.75 4.58579 20.75 5C20.75 5.41421 20.4142 5.75 20 5.75H19.75V6C19.75 6.41421 19.4142 6.75 19 6.75C18.5858 6.75 18.25 6.41421 18.25 6V5.75H18C17.5858 5.75 17.25 5.41421 17.25 5C17.25 4.58579 17.5858 4.25 18 4.25H18.25V4C18.25 3.58579 18.5858 3.25 19 3.25Z"
                            fill="#2684FC"
                          />
                        </svg>
                      </SvgIcon>
                    )}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{
              fontSize: "12px",
              margin: "10px 0",
              padding: "5px 12px",
              borderRadius: "5px",
            }}
            style={{
              color:
                (selectedCountry !== null &&
                  selectedCategory !== null &&
                  name !== "" &&
                  price !== null) ||
                0
                  ? "#fff"
                  : "",
              fontSize: "12px",
              margin: "10px 0",
              padding: "5px 12px",
              borderRadius: "5px",
              padding: "5px 12px",
            }}
            disabled={
              selectedCountry === "" ||
              selectedCategory === "" ||
              name === "" ||
              price === 0 ||
              price === ""
            }
          >
            افزودن ویژگی
          </Button>

          {/* <div>
                        <Typography variant="h6" style={{ marginTop: "15px" }}>
                            لیست ویژگی‌ها
                        </Typography>
                        {listData.length === 0 ? (
                            <Typography>هیچ ویژگی‌ای اضافه نشده است.</Typography>
                        ) : (
                            <div>
                                {listData.map((row) => (
                                    <Grid container key={row.id} sx={{ my: '10px' }}>
                                        <Typography>{row.selectedCategory}</Typography>
                                        <Grid container alignItems="center" marginTop={2}>
                                            <Grid container xs={12} md={7}>
                                                <Grid xs={12} md={6}>
                                                    <TextField value={row.name} label="نام" disabled
                                                        sx={{ width: { xs: '100%', sm: '100%', md: '90%' }, my: '10px' }} />
                                                </Grid>
                                                <Grid xs={12} md={3}>
                                                    <TextField value={row.price} label="قیمت (تومان)" disabled
                                                        sx={{ width: { xs: '100%', sm: '100%', md: '90%' }, my: '10px' }} />
                                                </Grid>
                                                <Grid xs={12} md={3}>
                                                    <TextField value={row.count} label="تعداد" disabled
                                                        sx={{ width: { xs: '100%', sm: '100%', md: '90%' }, my: '10px' }} />
                                                </Grid>
                                            </Grid>
                                            <Grid container xs={12} md={5} alignItems={'center'} >
                                                <Grid xs={6} md={6}>
                                                    <Button
                                                        onClick={() => handleTogglePopular(row.id)}
                                                        sx={{ color: '#4B4B57', p: '15px', px: { sm: '40px', md: '15px' }, marginLeft: { sm: '0px', md: '40px' }, border: '1px solid #bdbdbd', alignItems: 'center', display: 'flex', fontSize: '13px' }}
                                                        disabled
                                                    >
                                                        Popular
                                                        {!row.vip ? (
                                                            <SvgIcon sx={{ ml: '35px' }}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                                                                    <path d="M9.65325 7.59868C10.6785 5.75946 11.1911 4.83984 11.9576 4.83984C12.724 4.83984 13.2366 5.75945 14.2619 7.59868L14.5271 8.07451C14.8185 8.59716 14.9641 8.85848 15.1913 9.0309C15.4184 9.20333 15.7013 9.26733 16.267 9.39534L16.7821 9.51188C18.7731 9.96235 19.7685 10.1876 20.0054 10.9492C20.2422 11.7108 19.5636 12.5044 18.2063 14.0915L17.8551 14.5022C17.4694 14.9532 17.2766 15.1787 17.1898 15.4577C17.1031 15.7367 17.1322 16.0376 17.1905 16.6393L17.2436 17.1872C17.4488 19.3048 17.5514 20.3636 16.9314 20.8343C16.3113 21.305 15.3793 20.8759 13.5152 20.0176L13.0329 19.7955C12.5032 19.5516 12.2383 19.4297 11.9576 19.4297C11.6768 19.4297 11.4119 19.5516 10.8822 19.7955L10.4 20.0176C8.53585 20.8759 7.60379 21.305 6.98375 20.8343C6.3637 20.3636 6.4663 19.3048 6.67151 17.1872L6.7246 16.6393C6.78291 16.0376 6.81206 15.7367 6.72531 15.4577C6.63855 15.1787 6.4457 14.9532 6.06 14.5022L5.70886 14.0915C4.35157 12.5044 3.67292 11.7108 3.90976 10.9492C4.1466 10.1876 5.14206 9.96235 7.13299 9.51188L7.64807 9.39534C8.21384 9.26733 8.49672 9.20333 8.72385 9.0309C8.95098 8.85848 9.09666 8.59716 9.388 8.07451L9.65325 7.59868Z" stroke="#2C7EFA" stroke-width="1.4284" />
                                                                    <path opacity="0.55" d="M4.80809 1.98291C4.80809 1.98291 5.08228 3.37104 5.68344 3.96815C6.28459 4.56526 7.67455 4.83006 7.67455 4.83006C7.67455 4.83006 6.28641 5.10425 5.6893 5.70541C5.0922 6.30656 4.82739 7.69652 4.82739 7.69652C4.82739 7.69652 4.5532 6.30838 3.95205 5.71128C3.35089 5.11417 1.96094 4.84936 1.96094 4.84936C1.96094 4.84936 3.34907 4.57518 3.94618 3.97402C4.54329 3.37287 4.80809 1.98291 4.80809 1.98291Z" stroke="#2C7EFA" stroke-width="0.952268" stroke-linejoin="round" />
                                                                    <path opacity="0.55" d="M17.1953 4.83996H19.0998M18.1476 5.79223L18.1476 3.8877" stroke="#2C7EFA" stroke-width="1.4284" stroke-linecap="round" />
                                                                </svg>
                                                            </SvgIcon>
                                                        ) : (
                                                            <SvgIcon sx={{ ml: '35px' }}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                    <path d="M10.0802 7.89712C11.1568 5.96571 11.6952 5 12.5 5C13.3048 5 13.8432 5.96571 14.9198 7.89712L15.1984 8.3968C15.5043 8.94564 15.6573 9.22007 15.8958 9.40114C16.1343 9.5822 16.4314 9.64942 17.0255 9.78384L17.5664 9.90622C19.6571 10.3793 20.7025 10.6158 20.9512 11.4156C21.1999 12.2153 20.4872 13.0487 19.0619 14.7154L18.6932 15.1466C18.2881 15.6203 18.0856 15.8571 17.9945 16.1501C17.9034 16.443 17.934 16.759 17.9953 17.3909L18.051 17.9662C18.2665 20.19 18.3742 21.3019 17.7231 21.7962C17.072 22.2905 16.0932 21.8398 14.1357 20.9385L13.6292 20.7053C13.073 20.4492 12.7948 20.3211 12.5 20.3211C12.2052 20.3211 11.927 20.4492 11.3708 20.7053L10.8643 20.9385C8.90677 21.8398 7.928 22.2905 7.27688 21.7962C6.62575 21.3019 6.7335 20.19 6.94899 17.9662L7.00474 17.3909C7.06597 16.759 7.09659 16.443 7.00548 16.1501C6.91438 15.8571 6.71186 15.6203 6.30683 15.1466L5.93808 14.7154C4.51276 13.0487 3.8001 12.2153 4.04881 11.4156C4.29751 10.6158 5.34288 10.3793 7.43361 9.90622L7.9745 9.78384C8.56862 9.64942 8.86568 9.5822 9.1042 9.40114C9.34272 9.22007 9.4957 8.94565 9.80165 8.3968L10.0802 7.89712Z" fill="#2684FC" />
                                                                    <path d="M4.8685 2.50058C4.89849 2.3948 5.08625 2.39416 5.11696 2.49974C5.25716 2.98185 5.51713 3.69447 5.91026 4.08495C6.30338 4.47543 7.01774 4.73058 7.50079 4.86752C7.60657 4.89751 7.60721 5.08528 7.50163 5.11598C7.01952 5.25618 6.3069 5.51616 5.91642 5.90928C5.52594 6.30241 5.27079 7.01676 5.13385 7.49981C5.10386 7.6056 4.91609 7.60623 4.88539 7.50065C4.74518 7.01854 4.48521 6.30592 4.09209 5.91545C3.69896 5.52497 2.9846 5.26981 2.50156 5.13287C2.39577 5.10288 2.39514 4.91511 2.50072 4.88441C2.98283 4.74421 3.69544 4.48424 4.08592 4.09111C4.4764 3.69798 4.73155 2.98363 4.8685 2.50058Z" fill="#2684FC" />
                                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M19 3.25C19.4142 3.25 19.75 3.58579 19.75 4V4.25H20C20.4142 4.25 20.75 4.58579 20.75 5C20.75 5.41421 20.4142 5.75 20 5.75H19.75V6C19.75 6.41421 19.4142 6.75 19 6.75C18.5858 6.75 18.25 6.41421 18.25 6V5.75H18C17.5858 5.75 17.25 5.41421 17.25 5C17.25 4.58579 17.5858 4.25 18 4.25H18.25V4C18.25 3.58579 18.5858 3.25 19 3.25Z" fill="#2684FC" />
                                                                </svg>
                                                            </SvgIcon>
                                                        )}
                                                    </Button>
                                                </Grid>
                                                <Grid xs={4} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                    <Button
                                                        onClick={() => handleDeleteRow(row.id)}
                                                        // style={{ marginLeft: '10px' }}
                                                        color="secondary"
                                                        // fullWidth
                                                        sx={{ marginLeft: { xs: '40px', sm: '20px' } }}
                                                    >
                                                        حذف
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                ))}
                            </div>
                        )} */}
          {/* <Typography>لیست ویژگی های جدید:</Typography> */}
          {/* {rows.length === 0 ? (
                            <Typography>هیچ ویژگی‌ای اضافه نشده است.</Typography>
                        ) : (
                            <div>
                                {rows.map((row) => (
                                    <Grid container key={row.id} sx={{ my: '10px' }}>
                                        <Grid container alignItems="center" marginTop={2}>
                                            <Grid container xs={12} md={7}>
                                                <Grid xs={12} md={6}>
                                                    <TextField value={row.name_feature} label="نام" disabled
                                                        sx={{ width: { xs: '100%', sm: '100%', md: '90%' }, my: '10px' }} />
                                                </Grid>
                                                <Grid xs={12} md={3}>
                                                    <TextField value={row.price} label="قیمت (تومان)" disabled
                                                        sx={{ width: { xs: '100%', sm: '100%', md: '90%' }, my: '10px' }} />
                                                </Grid>
                                                <Grid xs={12} md={3}>
                                                    <TextField value={row.count} label="تعداد" disabled
                                                        sx={{ width: { xs: '100%', sm: '100%', md: '90%' }, my: '10px' }} />
                                                </Grid>
                                            </Grid>
                                            <Grid container xs={12} md={5} alignItems={'center'} >
                                                <Grid xs={6} md={6}>
                                                    <Button
                                                        onClick={() => handleTogglePopular(row.id)}
                                                        sx={{ color: '#4B4B57', p: '15px', px: { sm: '40px', md: '15px' }, marginLeft: { sm: '0px', md: '40px' }, border: '1px solid #bdbdbd', alignItems: 'center', display: 'flex', fontSize: '13px' }}
                                                        disabled
                                                    >
                                                        Popular
                                                        {!row.popular ? (
                                                            <SvgIcon sx={{ ml: '35px' }}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                                                                    <path d="M9.65325 7.59868C10.6785 5.75946 11.1911 4.83984 11.9576 4.83984C12.724 4.83984 13.2366 5.75945 14.2619 7.59868L14.5271 8.07451C14.8185 8.59716 14.9641 8.85848 15.1913 9.0309C15.4184 9.20333 15.7013 9.26733 16.267 9.39534L16.7821 9.51188C18.7731 9.96235 19.7685 10.1876 20.0054 10.9492C20.2422 11.7108 19.5636 12.5044 18.2063 14.0915L17.8551 14.5022C17.4694 14.9532 17.2766 15.1787 17.1898 15.4577C17.1031 15.7367 17.1322 16.0376 17.1905 16.6393L17.2436 17.1872C17.4488 19.3048 17.5514 20.3636 16.9314 20.8343C16.3113 21.305 15.3793 20.8759 13.5152 20.0176L13.0329 19.7955C12.5032 19.5516 12.2383 19.4297 11.9576 19.4297C11.6768 19.4297 11.4119 19.5516 10.8822 19.7955L10.4 20.0176C8.53585 20.8759 7.60379 21.305 6.98375 20.8343C6.3637 20.3636 6.4663 19.3048 6.67151 17.1872L6.7246 16.6393C6.78291 16.0376 6.81206 15.7367 6.72531 15.4577C6.63855 15.1787 6.4457 14.9532 6.06 14.5022L5.70886 14.0915C4.35157 12.5044 3.67292 11.7108 3.90976 10.9492C4.1466 10.1876 5.14206 9.96235 7.13299 9.51188L7.64807 9.39534C8.21384 9.26733 8.49672 9.20333 8.72385 9.0309C8.95098 8.85848 9.09666 8.59716 9.388 8.07451L9.65325 7.59868Z" stroke="#2C7EFA" stroke-width="1.4284" />
                                                                    <path opacity="0.55" d="M4.80809 1.98291C4.80809 1.98291 5.08228 3.37104 5.68344 3.96815C6.28459 4.56526 7.67455 4.83006 7.67455 4.83006C7.67455 4.83006 6.28641 5.10425 5.6893 5.70541C5.0922 6.30656 4.82739 7.69652 4.82739 7.69652C4.82739 7.69652 4.5532 6.30838 3.95205 5.71128C3.35089 5.11417 1.96094 4.84936 1.96094 4.84936C1.96094 4.84936 3.34907 4.57518 3.94618 3.97402C4.54329 3.37287 4.80809 1.98291 4.80809 1.98291Z" stroke="#2C7EFA" stroke-width="0.952268" stroke-linejoin="round" />
                                                                    <path opacity="0.55" d="M17.1953 4.83996H19.0998M18.1476 5.79223L18.1476 3.8877" stroke="#2C7EFA" stroke-width="1.4284" stroke-linecap="round" />
                                                                </svg>
                                                            </SvgIcon>
                                                        ) : (
                                                            <SvgIcon sx={{ ml: '35px' }}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                    <path d="M10.0802 7.89712C11.1568 5.96571 11.6952 5 12.5 5C13.3048 5 13.8432 5.96571 14.9198 7.89712L15.1984 8.3968C15.5043 8.94564 15.6573 9.22007 15.8958 9.40114C16.1343 9.5822 16.4314 9.64942 17.0255 9.78384L17.5664 9.90622C19.6571 10.3793 20.7025 10.6158 20.9512 11.4156C21.1999 12.2153 20.4872 13.0487 19.0619 14.7154L18.6932 15.1466C18.2881 15.6203 18.0856 15.8571 17.9945 16.1501C17.9034 16.443 17.934 16.759 17.9953 17.3909L18.051 17.9662C18.2665 20.19 18.3742 21.3019 17.7231 21.7962C17.072 22.2905 16.0932 21.8398 14.1357 20.9385L13.6292 20.7053C13.073 20.4492 12.7948 20.3211 12.5 20.3211C12.2052 20.3211 11.927 20.4492 11.3708 20.7053L10.8643 20.9385C8.90677 21.8398 7.928 22.2905 7.27688 21.7962C6.62575 21.3019 6.7335 20.19 6.94899 17.9662L7.00474 17.3909C7.06597 16.759 7.09659 16.443 7.00548 16.1501C6.91438 15.8571 6.71186 15.6203 6.30683 15.1466L5.93808 14.7154C4.51276 13.0487 3.8001 12.2153 4.04881 11.4156C4.29751 10.6158 5.34288 10.3793 7.43361 9.90622L7.9745 9.78384C8.56862 9.64942 8.86568 9.5822 9.1042 9.40114C9.34272 9.22007 9.4957 8.94565 9.80165 8.3968L10.0802 7.89712Z" fill="#2684FC" />
                                                                    <path d="M4.8685 2.50058C4.89849 2.3948 5.08625 2.39416 5.11696 2.49974C5.25716 2.98185 5.51713 3.69447 5.91026 4.08495C6.30338 4.47543 7.01774 4.73058 7.50079 4.86752C7.60657 4.89751 7.60721 5.08528 7.50163 5.11598C7.01952 5.25618 6.3069 5.51616 5.91642 5.90928C5.52594 6.30241 5.27079 7.01676 5.13385 7.49981C5.10386 7.6056 4.91609 7.60623 4.88539 7.50065C4.74518 7.01854 4.48521 6.30592 4.09209 5.91545C3.69896 5.52497 2.9846 5.26981 2.50156 5.13287C2.39577 5.10288 2.39514 4.91511 2.50072 4.88441C2.98283 4.74421 3.69544 4.48424 4.08592 4.09111C4.4764 3.69798 4.73155 2.98363 4.8685 2.50058Z" fill="#2684FC" />
                                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M19 3.25C19.4142 3.25 19.75 3.58579 19.75 4V4.25H20C20.4142 4.25 20.75 4.58579 20.75 5C20.75 5.41421 20.4142 5.75 20 5.75H19.75V6C19.75 6.41421 19.4142 6.75 19 6.75C18.5858 6.75 18.25 6.41421 18.25 6V5.75H18C17.5858 5.75 17.25 5.41421 17.25 5C17.25 4.58579 17.5858 4.25 18 4.25H18.25V4C18.25 3.58579 18.5858 3.25 19 3.25Z" fill="#2684FC" />
                                                                </svg>
                                                            </SvgIcon>
                                                        )}
                                                    </Button>
                                                </Grid>
                                                <Grid xs={4} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                    <Button
                                                        onClick={() => handleDeleteRow(row.id)}
                                                        // style={{ marginLeft: '10px' }}
                                                        color="secondary"
                                                        // fullWidth
                                                        sx={{ marginLeft: { xs: '40px', sm: '20px' } }}
                                                    >
                                                        حذف
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                ))}
                            </div>
                        )} */}
          {/* </div> */}
          {/* <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        style={{ fontSize: "12px", margin: "10px 0", padding: "5px 12px", borderRadius: "5px" }}
                        disabled={rows.length === 0 ? true : false}
                    >
                        ارسال و ثبت
                    </Button> */}
          {addingFeature && (
            <div style={{ marginTop: "10px", textAlign: "center" }}>
              <CircularProgress size={24} />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Grid>
  );
};

export default CreateOption;
