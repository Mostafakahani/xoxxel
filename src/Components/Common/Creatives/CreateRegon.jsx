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
import { ToastContainer, toast } from "react-toastify";
import StandardImageList from "../Images";
import GetToken from "GetToken";

const CreateRegion = ({ onUpdate = () => {} }) => {
  const [open, setOpen] = useState(false);
  const [region, setRegion] = useState("");
  const [requestError, setRequestError] = useState(null);
  const [selectedFileItem, setSelectedFileItem] = useState([]);
  const [addingFeature, setAddingFeature] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSubmit = async () => {
    setAddingFeature(true);
    const config = {
      headers: {
        Authorization: `${
          ServerURL.developerMode === true ? ServerURL.Bear : GetToken("user")
        }`,
      },
    };
    if (selectedFileItem) {
      try {
        const createData = {
          name: region,
          id_storage: selectedFileItem,
          // id_storage: selectedFileItem?.fileResDetails?.dataStorage?.id
        };

        const createResponse = await axios.post(
          `${ServerURL.url}/admin/country/create`,
          createData,
          config
        );

        if (createResponse.status === 201) {
          toast.success("با موفقیت ساخته شد.");
          onUpdate();
          handleClosePanel();
        } else if (
          createResponse.status === 400 &&
          createResponse.data.message === "The country has already been created"
        ) {
          setRequestError("این کشور از قبل وجود دارد");
          setSelectedFileItem({});
        } else {
          setRequestError("خطا در ایجاد کشور");
          setSelectedFileItem({});
        }
      } catch (error) {
        console.error("خطا: ", error);
        if (
          error.response.data.message === "The country has already been created"
        ) {
          setRequestError("این کشور از قبل وجود دارد");
          setSelectedFileItem({});
        } else {
          setRequestError("خطا در ارسال درخواست به سرور");
          setSelectedFileItem({});
        }
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
    setSelectedFileItem({});
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
      <Dialog fullWidth maxWidth={"sm"} open={open} onClose={handleClosePanel}>
        <DialogContent
        // sx={{ px: { lg: "50px" }, py: { lg: "30px" } }}
        >
          <Typography align="left" sx={{ my: "15px" }}>
            ایجاد ریجن
          </Typography>
          <Grid container>
            <Grid item xs={12} md={12}>
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
            <Grid item xs={12} md={12}>
              {/* <UploadFile
                                id={"file1"}
                                accept="image/png, image/jpg, image/jpeg"
                                label={"ایکون ( با اندازه برابر مثلا 200*200)"}
                                onChange={(e) => {
                                    setSelectedFileItem(e);
                                }}
                                selectedFileItem={selectedFileItem}
                            /> */}
              <StandardImageList
                label={"تصویر اصلی (297*147)"}
                onChange={(e) => {
                  setSelectedFileItem(e);
                  console.log(e);
                }}
              />
            </Grid>
          </Grid>

          <Grid container>
            {(region !== "") & (selectedFileItem.length !== 0) && (
              <Grid item xs={6} sm={3} md={3}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setAddingFeature(true);
                    handleSubmit().finally(() => {
                      setAddingFeature(false);
                    });
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

export default CreateRegion;
