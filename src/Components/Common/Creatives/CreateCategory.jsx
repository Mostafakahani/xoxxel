import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Popover,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import ServerURL from "../Layout/config";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import GetToken from "GetToken";
import SelectCountry from "../NewCreateProduct/SelectCountry";
import SelectProduct from "../NewCreateProduct/SelecetProduct";

const CreateCategory = ({ dataBody, country, countryId, productId }) => {
  const [open, setOpen] = useState(false);
  const [openSelectProductS, setOpenSelectProductS] = useState(false);
  const [category, setCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [idProduct, setIdProduct] = useState(null);
  const [idCountry, setIdCountry] = useState(null);
  const [requestError, setRequestError] = useState(null);
  const [addingFeature, setAddingFeature] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  // useEffect(() => {
  //   async function fetchData() {
  //     const config = {
  //       headers: {
  //         Authorization: `${
  //           ServerURL.developerMode === true ? ServerURL.Bear : GetToken("user")
  //         }`,
  //       },
  //     };
  //     const responseCategory = await axios.get(
  //       `${ServerURL.url}/admin/country/get-all-country`,
  //       config
  //     );
  //     setCountry(responseCategory.data);
  //   }
  //   fetchData();
  // }, []);

  const handleSubmit = async () => {
    if (category !== "") {
      setAddingFeature(true);
      try {
        const config = {
          headers: {
            Authorization: `${
              ServerURL.developerMode === true
                ? ServerURL.Bear
                : GetToken("user")
            }`,
          },
        };
        const data = {
          title: category,
          id_product: productId,
          id_country: countryId,
        };

        const response = await axios.post(
          `${ServerURL.url}/admin/cat/create`,
          data,
          config
        );

        if (response.status === 401) {
          setRequestError("این دسته وجود دارد");
        } else {
          handleClosePanel();
          toast.success("با موفقیت ساخته شد.");
        }
      } catch (error) {
        console.log(error);
        // console.log(error.response.data.message)
        if (
          error.response.data.message[0] ===
          "title must be longer than or equal to 3 characters"
        ) {
          setRequestError("نام نوع انتخابی نمیتواند کمتر از 3 کاراکتر باشد");
          setAddingFeature(false);
        }
        if (error.response.data.message === "There is a category name") {
          setRequestError("نام دسته انتخابی از قبل وجود دارد");
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
      setRequestError("اطلاعات درست وارد کنید");
      setAddingFeature(false);
    }
  };

  const handleClosePanel = () => {
    setOpen(false);
    setCategory("");
    setAddingFeature(false);
    setRequestError(null);

    // setCategorys([]);
  };

  return (
    <Grid container>
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
        ایجاد دسته
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
        maxWidth={"sm"}
        open={open}
        onClose={() => {
          handleClosePanel();
        }}
      >
        <DialogTitle>ایجاد دسته</DialogTitle>
        <DialogContent>
          <Grid py={1} container item rowSpacing={2}>
            <Grid item xs={12} md={12}>
              <TextField
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                label="نام دسته"
                variant="outlined"
                fullWidth
              />
            </Grid>
          </Grid>
          {/* <Grid item xs={12} md={12}>
            <SelectCountry
              value={country}
              selected={idCountry}
              setValue={(e) => setIdCountry(e)}
            />
          </Grid> */}
          {/* <Grid item xs={12} md={12}>
            <Button
              sx={{ textTransform: "none" }}
              onClick={() => setOpenSelectProductS(true)}
            >
              Select Product
            </Button>
            <Dialog
              fullWidth
              open={openSelectProductS}
              onClose={() => setOpenSelectProductS(false)}
            >
              <DialogContent>
                <SelectProduct
                  dataBody={dataBody}
                  // dataHead={dataHead}
                  selected={idProduct}
                  setSelected={(e) => setIdProduct(e)}
                />
              </DialogContent>
              <DialogActions>
                <Grid container>
                  <Button
                    variant="contained"
                    onClick={() => setOpenSelectProductS(false)}
                  >
                    Select
                  </Button>
                </Grid>
              </DialogActions>
            </Dialog>
          </Grid> */}
          <DialogActions>
            <Grid item container spacing={2}>
              {/* {category !== "" && ( */}
              <Grid item xs={12} sm={3} md={3}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={async () => {
                    setAddingFeature(true);
                    try {
                      await handleSubmit();
                    } finally {
                      setAddingFeature(false);
                    }
                  }}
                  // sx={{ fontSize: { xs: "14px" } }}
                  disabled={category === "" || category.length < 3}
                >
                  {addingFeature ? (
                    <CircularProgress size={24} />
                  ) : (
                    "افزودن ویژگی"
                  )}
                </Button>
              </Grid>
              {/* )} */}
              <Grid item xs={12} sm={3} md={3}>
                <Button
                  fullWidth
                  variant="outlined"
                  color="primary"
                  onClick={handleClosePanel}
                  style={{
                    border: "1px solid #989898",
                    color: "#222",
                    // marginTop: "20px",
                  }}
                >
                  انصراف
                </Button>
              </Grid>
            </Grid>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </Grid>
  );
};

export default CreateCategory;
