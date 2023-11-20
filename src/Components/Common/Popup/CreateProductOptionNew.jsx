import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  MenuItem,
  Select,
  SvgIcon,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ServerURL from "../Layout/config";
import axios from "axios";
import { useEffect } from "react";
import GetToken from "GetToken";

const btnStyle = {
  backgroundColor: "#1C49F1",
  color: "#F4F4F4",
  "&:hover": {
    backgroundColor: "#4066f3",
  },
  borderRadius: "5px",
  py: "6px",
  mt: "30px",
};
const AddProductFeatureNew = ({ tableId }) => {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("ندارد");
  const [rows, setRows] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [isPopular, setIsPopular] = useState(false);
  const ErrorList = [
    "نام محصول نمیتواند خالی باشد.",
    "قیمت محصول نمی تواند خالی باشد.",
    "نمی تواند تکراری باشد.",
  ];
  const [nameError, setNameError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const [step, setStep] = useState(true);

  const [region, setRegion] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [updateData, setUpdateData] = useState(false);
  const [addingFeature, setAddingFeature] = useState(false);
  const [requestError, setRequestError] = useState(null);

  // const handleAddRow = () => {
  //     if (name.trim() === "" || price.trim() === "") {
  //         console.log("نام و قیمت نمی‌تواند خالی باشد.");
  //         setNameError(true)
  //         setPriceError(true)
  //     } else {
  //         const isDuplicate = rows.some((row) => row.name === name && row.price === price);
  //         if (!isDuplicate) {
  //             setIsPopular(false);
  //             setRows([...rows, { id: Date.now(), name: name, price: price, isPopular: isPopular }]);
  //             setName("");
  //             setPrice("");
  //             setNameError(false)
  //             setPriceError(false)

  //         } else {
  //             console.log("این نام و قیمت قبلاً وارد شده است.");
  //         }
  //     }
  // };

  // const handleDeleteRow = (id) => {
  //     setRows(rows.filter((row) => row.id !== id));
  // };

  // const handleTogglePopular = (id) => {
  //     setRows(
  //         rows.map((row) =>
  //             row.id === id ? { ...row, isPopular: !row.isPopular } : row
  //         )
  //     );
  //     setIsPopular(
  //         rows.map((row) => {
  //             row.id === id ? { ...row, isPopular: !row.isPopular } : row
  //             setIsPopular(true)
  //         }
  //         )
  //     )
  //     console.log(isPopular)
  // };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: {
            Authorization: `${GetToken("user")}`,
          },
        };
        // setUpdateData(false);

        const response = await axios.get(
          `${ServerURL.url}/.admin/country/get-all-country`,
          config
        );
        const apiData = response.data;
        const updatedRegionData = apiData.data.map((item) => {
          return {
            id: item.id,
            value: item.title,
            icon: "/images/Flags.png",
          };
        });
        setRegion(updatedRegionData);
        setMenuItems(updatedRegionData);
      } catch (error) {
        console.error("Error fetching data from the server:", error);
      }
    };

    // fetchData();
  }, [updateData]);

  // const menuItems = [
  //     { id: 1, value: 'North America', icon: '/images/Flags.png' },
  //     { id: 2, value: 'Europe', icon: '/images/Flags.png' },
  //     { id: 3, value: 'Asia', icon: '/images/Flags.png' },
  // ]
  const menuCats = [
    { id: 1, value: "ندارد" },
    { id: 2, value: "دسته دوم" },
    { id: 3, value: "دسته سوم" },
  ];

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleNext = () => {
    setStep(false);
  };
  const handleSubmit = () => {
    const formattedData = rows.map((row) => {
      return {
        name: row.name,
        price: row.price,
        isPopular: row.isPopular,
        tableId: tableId,
      };
    });

    const isValidData = formattedData.every(
      (data) =>
        data.name &&
        data.price !== "" &&
        data.isPopular !== "" &&
        data.tableId !== ""
    );
    if (isValidData) {
      console.log(formattedData);
    } else {
      console.log("Error: همه فیلدها باید پر شوند.");
    }

    setOpen(false);
    setName("");
    setPrice("");
    // setRegion(0);
    setCategory("ندارد");
    setStep(true);
    setRows([]);
  };
  const handleClosePanel = () => {
    setName("");
    setPrice("");
    setRegion("");
    setCategory("ندارد");
    setStep(true);
    setRows([]);
    setAddingFeature(false);
    setRequestError(null);
    setOpen(false);

    // setCategorys([]);
  };
  return (
    <Grid>
      <Button
        sx={{
          backgroundColor: "#1C49F11A",
          color: "#1C49F1",
          borderRadius: "5px",
          mr: "10px",
        }}
        onClick={() => {
          handleClickOpen();
        }}
      >
        افزودن ویژگی
      </Button>
      <Dialog
        fullWidth
        maxWidth={step ? "sm" : "lg"}
        open={open}
        onClose={() => {
          handleClosePanel();
        }}
      >
        <DialogContent sx={{ px: "50px", py: "30px" }}>
          <Typography align="left" sx={{ my: " 15px" }}>
            ایجاد ویژگی محصول
          </Typography>

          {step && (
            <>
              <Grid container>
                <Grid md={6}>
                  <Typography>ریجن</Typography>
                  <Select
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    fullWidth
                    displayEmpty
                    inputProps={{ "aria-label": "Region" }}
                    sx={{
                      width: { md: "200px", xs: "100px" },
                      display: "flex !important",
                    }}
                    onClick={() => fetchData()}
                  >
                    {menuItems.map((x) => (
                      <MenuItem key={x.id} value={x.value}>
                        <Grid sx={{ display: "flex", alignItems: "center" }}>
                          <Box
                            component={"img"}
                            src={x.icon}
                            width={"30"}
                            height={"auto"}
                            sx={{ mr: "10px" }}
                          />
                          <Typography>{x.value}</Typography>
                        </Grid>
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid md={6}>
                  <Typography>دسته</Typography>
                  <Select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    fullWidth
                    displayEmpty
                    inputProps={{ "aria-label": "Category" }}
                    sx={{ width: { md: "200px", md: "100px" } }}
                  >
                    {menuCats.map((x) => (
                      <MenuItem key={x.id} value={x.value}>
                        {x.value}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
              </Grid>
            </>
          )}
          {!step && (
            <>
              <Grid>
                <DialogContentText align="left" sx={{ my: "20px" }}>
                  ایجاد محصول برای ریجن {region}
                </DialogContentText>
              </Grid>
              <Grid
                container
                sx={{
                  display: "flex",
                  justifyContent: { md: "space-evenly" },
                  my: "30px",
                }}
              >
                <Grid container>
                  <Grid
                    container
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <Grid container sm={9} md={9}>
                      <Grid xs={12} sm={7} md={7}>
                        <TextField
                          error={!nameError ? false : true}
                          helperText={!nameError ? "" : ErrorList[0]}
                          onChange={handleNameChange}
                          value={name}
                          label="نام محصول"
                          variant="outlined"
                          sx={{
                            width: { xs: "100%", sm: "80%", md: "80%" },
                            my: "5px",
                          }}
                        />
                      </Grid>
                      <Grid xs={12} sm={4} md={4}>
                        <TextField
                          error={!priceError ? false : true}
                          helperText={!priceError ? "" : ErrorList[1]}
                          onChange={handlePriceChange}
                          value={price}
                          label="قیمت محصول"
                          variant="outlined"
                          sx={{
                            width: { xs: "100%", sm: "100%", md: "100%" },
                            my: "5px",
                          }}
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      sm={3}
                      md={3}
                      sx={{
                        width: "100%",
                        display: { xs: "flex", sm: "block" },
                        justifyContent: "center",
                      }}
                    >
                      <Button sx={{ color: "#362FD9" }} onClick={handleSubmit}>
                        افزودن ردیف +
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </>
          )}
          {step && region !== "" && (
            <Button sx={btnStyle} onClick={handleNext}>
              رفتن به مرحله بعد
            </Button>
          )}
        </DialogContent>
      </Dialog>
    </Grid>
  );
};

export default AddProductFeatureNew;
