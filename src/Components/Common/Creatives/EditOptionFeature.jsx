import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AccountLayout from "Components/Common/Layout/AccountLayout";
import StandardImageList from "Components/Common/Images";
import CheckboxesTags from "Components/Common/CheckBoxList";
import ServerURL from "Components/Common/Layout/config";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import GetToken from "GetToken";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  Grid,
  InputAdornment,
  MenuItem,
  Select,
  SvgIcon,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { PopularIconOff, PopularIconOn } from "Icons/icons";

const EditOptionFeature = ({
  id,
  setResponseId = () => {},
  status,
  click,
  setClick = () => {},
  deleteId,
  onUpdate = () => {},
}) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (click === true) {
      setOpen(true);
      setClick(false);
    }
  }, [click, setClick]);
  const [country, setCountry] = useState([]);
  const [nameFeature, setNameFeature] = useState("");
  // const [productPrice, setProductPrice] = useState("");
  // const [starRating, setStarRating] = useState("");
  const [price, setPrice] = useState(0);
  const [selectedFileItem, setSelectedFileItem] = useState([]);
  const [addingFeature, setAddingFeature] = useState(false);
  const [openThis, setOpenThis] = useState(false);
  // const router = useRouter()
  // const [allData, setAllData] = useState([]);
  const [category, setCategory] = useState([]);
  // const [responseId, setResponseId] = useState(0);
  const [dataType, setDataType] = useState([]);

  const [countOne, setCountOne] = useState(0);
  const [countTwo, setCountTwo] = useState(0);
  const [countThree, setCountThree] = useState(0);

  const [sellMode, setSellMode] = useState("");
  const [autoSell, setAutoSell] = useState(true);

  const [selectedType, setSelectedType] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const [isPopular, setIsPopular] = useState(false);
  //New Test:
  const [dataFeature, setDataFeature] = useState("");
  const [uniqueTrimmedArray, setUniqueTrimmedArray] = useState([]);

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setDataFeature(newValue);

    const newUniqueTrimmedArray = newValue
      .split("\n")
      .map((value) => value.trim())
      .filter((value) => value !== "")
      .filter((value, index, self) => self.indexOf(value) === index);

    setUniqueTrimmedArray(newUniqueTrimmedArray);
  };

  useEffect(() => {
    async function fetchData() {
      const config = {
        headers: {
          Authorization: `${
            ServerURL.developerMode === true ? ServerURL.Bear : GetToken("user")
          }`,
        },
      };
      const responseCountry = await axios.get(
        `${ServerURL.url}/admin/country/get-all-country`,
        config
      );
      setCountry(responseCountry.data);
    }
    fetchData();
  }, [countOne]);
  useEffect(() => {
    async function fetchData() {
      const config = {
        headers: {
          Authorization: `${
            ServerURL.developerMode === true ? ServerURL.Bear : GetToken("user")
          }`,
        },
      };
      const responseCategory = await axios.get(
        `${ServerURL.url}/admin/cat/get-all-cat`,
        config
      );
      setCategory(responseCategory);
    }
    fetchData();
  }, [countTwo]);

  useEffect(() => {
    async function fetchData() {
      const config = {
        headers: {
          Authorization: `${
            ServerURL.developerMode === true ? ServerURL.Bear : GetToken("user")
          }`,
        },
      };
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

  const handleChangeToggleButtonGroup = async (event, newAlignment) => {
    setSellMode(newAlignment);
  };
  const fetchData = async () => {
    const config = {
      headers: {
        Authorization: `${
          ServerURL.developerMode === true ? ServerURL.Bear : GetToken("user")
        }`,
      },
    };

    try {
      if (id !== null) {
        const response = await axios.get(
          `${ServerURL.url}/admin/feature/${id}`,
          config
        );
        const dataResponse = response.data;
        // console.log(dataResponse.map((x)=>x.))
        if (dataResponse) {
          // Set initial state based on data from the API
          setNameFeature(dataResponse?.name);
          setAutoSell(dataResponse?.sell_mode === "manual" ? false : true);
          setSellMode(dataResponse?.sell_mode === "manual" ? "manual" : "auto");
          setSelectedCategory(dataResponse?.id_cat?.id);
          setSelectedCountry(dataResponse?.id_country?.id);
          setSelectedType(dataResponse?.id_typeProduct?.id);
          setIsPopular(dataResponse?.vip);
          setPrice(dataResponse?.price);
        }
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    } finally {
      return;
      // setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [countTwo, id]);

  useEffect(() => {
    async function fetchData() {
      if (autoSell & (sellMode === "auto")) {
        const config = {
          headers: {
            Authorization: `${
              ServerURL.developerMode === true
                ? ServerURL.Bear
                : GetToken("user")
            }`,
          },
        };
        const responseDataFeature = await axios.get(
          `${ServerURL.url}/admin/feature/${id}/list-data-feature`,
          config
        );
        setDataFeature(responseDataFeature?.data[0]?.data);
      }
    }
    fetchData();
  }, [autoSell]);
  useEffect(() => {
    setDataFeature("");
    setUniqueTrimmedArray([]);
  }, [sellMode]);

  const handleSubmit = async () => {
    setAddingFeature(true);
    const config = {
      headers: {
        Authorization: `${
          ServerURL.developerMode === true ? ServerURL.Bear : GetToken("user")
        }`,
      },
    };
    try {
      const dataBody = {
        country_id: selectedCountry,
        cat_id: selectedCategory,
        type_id: selectedType,
        name_feature: nameFeature,
        price: price,
        popular: isPopular,
        // id_Storage: selectedFileItem,
        data_feature: dataFeature,
        sell_mode: sellMode,
      };
      const uploadResponse = await axios.post(
        `${ServerURL.url}/admin/feature/${id}/update`,
        dataBody,
        config
      );
      if (uploadResponse.status === 201) {
        setResponseId(id);
        toast.success("با موفقیت انجام شد.");
        handleRemoveFields();
        // fetchData();
        onUpdate();
        setClick(false);
        // window.location.href = "../admin/products";
      } else {
        toast.error("لطفا دوباره امتحان کنید");
        toast.error(error?.response?.data?.message);
      }
    } catch (error) {
      console.error("خطا: ", error);
    } finally {
      setAddingFeature(false);
    }
  };
  const handleDelete = async (e) => {
    try {
      const config = {
        headers: {
          Authorization: `${
            ServerURL.developerMode === true ? ServerURL.Bear : GetToken("user")
          }`,
        },
      };

      const deleteData = {
        ids: e,
      };

      const res = await axios.get(
        `${ServerURL.url}/admin/feature/delete`,
        deleteData,
        config
      );

      // Log the request details
      // console.log("Request:", res.config);

      if (res.status === 200) {
        setClick(false);
        toast.success("با موفقیت حذف شد");
      }
    } catch (error) {
      console.error("Error sending delete request:", error);
      toast.error("Error sending delete request");
    }
  };

  const handleRemoveFields = () => {
    // router.push('/panel/admin/products')
    setOpen(false);
    setNameFeature("");
    setIsPopular(false);
    setSelectedType("");
    setSelectedCountry("");
    setDataFeature("");
    setSellMode("");
    setPrice("");
    setSelectedFileItem([]);
    setAddingFeature(false);
    setOpenThis(false);
    setCategory([]);
    setCountTwo(0);
    setSelectedCategory("");
    // setResponseId(0)
  };

  return (
    <>
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

      <Grid container spacing={5}>
        <Grid item container spacing={2}>
          <Grid item container xs={12} sm={12} md={12} spacing={2}>
            <Grid item xs={12} sm={6} md={8}>
              <Typography>ویرایش فیچر</Typography>
              <TextField
                onChange={(e) => setNameFeature(e.target.value)}
                value={nameFeature}
                label="نام فیچر"
                variant="outlined"
                sx={{
                  mt: 1,
                  width: { xs: "100%", sm: "100%", md: "100%" },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography>حالت فروش</Typography>
              <ToggleButtonGroup
                color="primary"
                value={sellMode}
                exclusive
                fullWidth
                onChange={handleChangeToggleButtonGroup}
                aria-label="Platform"
                sx={{ mt: 1 }}
              >
                <ToggleButton value="auto" color="success">
                  Auto
                </ToggleButton>
                <ToggleButton value="manual" color="info">
                  Manual
                </ToggleButton>
              </ToggleButtonGroup>
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
        {/* <Grid item xs={12} sm={6} md={4}>
          <StandardImageList
            label={"تصویر اصلی (297*147)"}
            idStorage={selectedFileItem.length !== 0 ? true : false}
            onChange={(e) => {
              setSelectedFileItem(e);
              // console.log(e);
            }}
          />
        </Grid> */}
        <Grid item xs={12} sm={6} md={4}>
          <Typography>به عنوان محبوب</Typography>
          <Grid xs={6} md={6} mt={1}>
            <Button
              onClick={() => setIsPopular(!isPopular)}
              variant="outlined"
              endIcon={!isPopular ? <PopularIconOn /> : <PopularIconOff />}
            >
              Popular
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={4} md={2}>
          <Typography>قیمت</Typography>
          <TextField
            sx={{ mt: 1 }}
            size="small"
            fullWidth
            onChange={(e) => setPrice(e.target.value.replace(/\D/g, ""))}
            value={price}
            variant="outlined"
            InputProps={{
              endAdornment: <InputAdornment position="end">$</InputAdornment>,
            }}
          />
        </Grid>
        {autoSell || sellMode === "auto" ? (
          sellMode === "auto" && (
            <Grid item xs={12} sm={4} md={12}>
              <Typography variant="subtitle1">
                تعداد کد ها: {uniqueTrimmedArray.length}
              </Typography>
              <TextField
                sx={{ mt: 1 }}
                size="medium"
                // onChange={(e) => setDataFeature(e.target.value)}
                label="کد ها"
                multiline
                fullWidth
                variant="outlined"
                rows={10}
                value={dataFeature}
                onChange={handleInputChange}
              />
            </Grid>
          )
        ) : (
          <></>
        )}
      </Grid>

      <Grid container sx={{ my: "25px" }}>
        <Grid container item spacing={2}>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              disabled={
                // selectedFileItem.length === 0 ||
                nameFeature === "" ||
                selectedCategory === "" ||
                price === "" ||
                price === 0 ||
                (sellMode === "auto" && dataFeature === "")
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
                // console.log('')
                handleDelete(deleteId);
                // window.location.href = "../admin/products";
              }}
            >
              حذف
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                // console.log('')
                setClick(false);
                // window.location.href = "../admin/products";
              }}
            >
              انصراف
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default EditOptionFeature;
