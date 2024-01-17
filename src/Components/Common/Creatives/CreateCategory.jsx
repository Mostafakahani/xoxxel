import {
  Button,
  CircularProgress,
  Dialog,
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

const CreateCategory = () => {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [idProduct, setIdProduct] = useState(null);
  const [idCountry, setIdCountry] = useState(null);
  const [requestError, setRequestError] = useState(null);
  const [addingFeature, setAddingFeature] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSubmit = async () => {
    if ((category !== "") & (idProduct !== null) & (idCountry !== null)) {
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
          id_prouduct: idProduct,
          id_country: idCountry,
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
        <DialogContent
        // sx={{ px: "50px", py: "30px" }}
        >
          <Grid container item>
            <Typography align="left" sx={{ my: " 15px" }}>
              ایجاد دسته
            </Typography>
            <Grid item xs={12} md={12}>
              <TextField
                error={!!requestError} // Convert string to boolean
                helperText={requestError}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setRequestError("");
                }}
                value={category}
                label="نام دسته "
                variant="outlined"
                sx={{
                  width: { xs: "100%", sm: "100%", md: "100%" },
                  my: "10px",
                }}
              />
            </Grid>
          </Grid>
          <Grid item container>
            {category !== "" && (
              <Grid item xs={6} sm={3} md={3}>
                <Button
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
                  sx={{ fontSize: { xs: "14px" }, marginTop: "20px" }}
                  disabled={addingFeature}
                >
                  {addingFeature ? (
                    <CircularProgress size={24} />
                  ) : (
                    "افزودن ویژگی"
                  )}
                </Button>
              </Grid>
            )}
            <Grid item xs={6} sm={3} md={3}>
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

export default CreateCategory;
