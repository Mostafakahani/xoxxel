import {
  Button,
  CircularProgress,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import AccountLayout from "Components/Common/Layout/AccountLayout";
import StandardImageList from "Components/Common/Images";
import CheckboxesTags from "Components/Common/CheckBoxList";
import ServerURL from "Components/Common/Layout/config";
import { useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import GetToken from "GetToken";
import CreateOptionFeature from "Components/Common/Creatives/CreateOptionFeature";
import { useRouter } from "next/router";
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
  const [openThis, setOpenThis] = useState(false);
  // const router = useRouter()
  // const [allData, setAllData] = useState([]);
  const [category, setCategory] = useState([]);
  const [countTwo, setCountTwo] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [responseId, setResponseId] = useState(0);

  // const handleSubmit = () => {
  //     setAllData([...allData, {
  //         id: Date.now(), productName: productName, productPrice: productPrice, starRating: starRating, labelInput: labelInput,
  //         placeholder: placeholder, textArea: textArea
  //     }])
  //     console.log(allData)
  // }
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

  const handleSelectChangeCategory = (event) => {
    setSelectedCategory(event.target.value);
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
        name: productName,
        id_type: selectedCategory,
        id_image_main: selectedFileItem,
        id_image_trends: selectedFileItem2,
        id_image_square: selectedFileItem3,
        placeholder: placeholder,
        lable_input: labelInput,
        description_input: textArea,
        ids_feature: checkBoxList.map((x) => x),
      };
      const uploadResponse = await axios.post(
        `${ServerURL.url}/admin/product/create`,
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
    setProductName('')
    setLabelInput('')
    setPlaceholder('')
    setTextArea('')
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

  return (
    <>
      <AccountLayout>
        <Grid container>
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
          <Typography>ایجاد محصول </Typography>
          <Grid container xs={12} md={12} spacing={2}>
            <Grid
              item
              container
              xs={12}
              sm={8}
              md={8}
              sx={{ my: "15px", display: "flex", flexDirection: "column" }}
            >
              <Grid xs={12} sm={8} md={8}>
                <TextField
                  onChange={(e) => setProductName(e.target.value)}
                  value={productName}
                  label="نام محصول"
                  variant="outlined"
                  sx={{
                    my: "5px",
                    width: { xs: "100%", sm: "100%", md: "100%" },
                  }}
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
            <Grid item xs={12} sm={4} md={4} sx={{ mb: "50px" }}>
              <Typography>دسته</Typography>
              <Select
                value={selectedCategory}
                onChange={handleSelectChangeCategory}
                sx={{ width: { xs: "100%", sm: "80%" } }}
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
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <StandardImageList
              label={"تصویر اصلی (297*147)"}
              onChange={(e) => {
                setSelectedFileItem(e);
                console.log(e);
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <StandardImageList
              label={"تصویر Trends (153*190)"}
              onChange={(e) => {
                setSelectedFileItem2(e);
                console.log(e);
              }}
            />

          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StandardImageList
              label={"تصویر اسلایدی یا مربعی (134*134)"}
              onChange={(e) => {
                setSelectedFileItem3(e);
                console.log(e);
              }}
            />

          </Grid>
        </Grid>

        <Grid container sx={{ my: "20px" }}>
          <Grid xs={12} sm={4} md={3}>
            <TextField
              size="small"
              onChange={(e) => setLabelInput(e.target.value)}
              value={labelInput}
              label="Label input"
              variant="outlined"
              sx={{ my: "5px", width: { xs: "100%", sm: "90%", md: "80%" } }}
            />
          </Grid>
          <Grid xs={12} sm={4} md={3}>
            <TextField
              size="small"
              onChange={(e) => setPlaceholder(e.target.value)}
              value={placeholder}
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
              onChange={(e) => setTextArea(e.target.value)}
              value={textArea}
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
          <CreateOptionFeature
            click={openThis}
            setClick={(value) => setOpenThis(value)}
            // status={'plus'}
            setResponseId={(e) => {
              setResponseId(e);
              setCheckBoxList([...checkBoxList, e]);
              // console.log(checkBoxList);
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
                  productName === "" ||
                  selectedCategory === "" ||
                  checkBoxList.length === 0 ||
                  textArea === '' ||
                  labelInput === '' ||
                  placeholder === ''
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
                  console.log(checkBoxList)
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
          </Grid>

        </Grid>
      </AccountLayout>
    </>
  );
};
export default CreateProduct;
