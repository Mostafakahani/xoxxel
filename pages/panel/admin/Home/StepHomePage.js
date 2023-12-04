import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import BackArrow from "Components/Common/Back";
import StandardImageList from "Components/Common/Images";
import AccountLayout from "Components/Common/Layout/AccountLayout";
import ServerURL from "Components/Common/Layout/config";
import UploadFile from "Components/Common/UploadFile";
import GetToken from "GetToken";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const StepHomePage = () => {
  const [expanded, setExpanded] = useState("panel1");
  const [listLevel, setListLevel] = useState([]);
  const [selectedFileItem, setSelectedFileItem] = useState([]);
  const [selectedFileItem2, setSelectedFileItem2] = useState([]);
  const [selectedFileItem3, setSelectedFileItem3] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const config = {
        headers: { Authorization: `${ServerURL.developerMode === true ? ServerURL.Bear : GetToken("user")}` },
      };
      try {
        const responseListLevel = await axios.get(
          `${ServerURL.url}/admin/info/level/list`,
          config
        );
        setListLevel(responseListLevel.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }
    fetchData();
  }, []);

  const handleSubmit = async () => {
    const config = {
      headers: {
        Authorization: `${ServerURL.developerMode === true ? ServerURL.Bear : GetToken("user")}`,
      },
    };

    const updateSection = async (index, name, titel, text, selectedFileItem) => {
      try {
        const dataBody = {
          name: name,
          title: titel,
          description: text,
          id_storage: selectedFileItem,
        };
        const uploadResponse = await axios.post(
          `${ServerURL.url}/admin/info/level/update/${listLevel[index].id}`,
          dataBody,
          config
        );
        if (uploadResponse.status === 200) {
          toast.success(`مرحله ${index + 1} با موفقیت به‌روزرسانی شد.`);
        } else {
          toast.error(`خطا در به‌روزرسانی مرحله ${index + 1}`);
        }
      } catch (error) {
        console.error(`Error updating section ${index + 1}: `, error);
        toast.error("خطا در ارسال درخواست به سرور");
      }
    };

    listLevel.forEach((section, index) => {
      const nameField = `name${index + 1}`;
      const titelField = `titel${index + 1}`;
      const textField = `text${index + 1}`;
      const selectedFileItemField = `selectedFileItem${index + 1}`;

      if (section[nameField] !== "" && section[titelField] !== "" && section[textField] !== "") {
        updateSection(index, section[nameField], section[titelField], section[textField], section[selectedFileItemField]);
      }
    });
  };

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleSectionChange = (index, field, value) => {
    const updatedListLevel = [...listLevel];
    updatedListLevel[index] = {
      ...updatedListLevel[index],
      [field]: value,
    };
    setListLevel(updatedListLevel);
  };

  const handleFileItemChange = (index, value) => {
    const updatedListLevel = [...listLevel];
    updatedListLevel[index].selectedFileItem = value;
    setListLevel(updatedListLevel);
  };

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
        <Grid sx={{ backgroundColor: "#fff", p: "25px" }}>
          <Grid sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: "10px" }}>
            <Typography sx={{ color: "#333333", my: "15px", fontSize: "18px" }}> مراحل صفحه اصلی</Typography>
            <BackArrow />
          </Grid>

          {listLevel.map((section, index) => (
            <Accordion
              key={index}
              expanded={expanded === `panel${index + 1}`}
              onChange={handleChange(`panel${index + 1}`)}
              sx={{ border: "2px dashed #5a5a5a75", borderRadius: "10px", my: "15px", boxShadow: "none" }}
            >
              <AccordionSummary aria-controls={`panel${index + 1}d-content`} id={`panel${index + 1}d-header`}>
                <Typography sx={{ color: "#2C7EFA", my: "15px", fontSize: "16px" }}>{`مرحله ${index + 1}`}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid>
                  <Grid container>
                    <Grid container>
                      <Grid item xs={12} sm={7} md={4}>
                        <TextField
                          onChange={(e) => handleSectionChange(index, `name${index + 1}`, e.target.value)}
                          value={section[`name${index + 1}`] || ""}
                          label="نام  "
                          variant="outlined"
                          sx={{ width: { xs: "100%", sm: "100%", md: "100%" }, my: "10px" }}
                        />
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid item xs={12} sm={7} md={7}>
                        <TextField
                          onChange={(e) => handleSectionChange(index, `titel${index + 1}`, e.target.value)}
                          value={section[`titel${index + 1}`] || ""}
                          label="عنوان  "
                          variant="outlined"
                          sx={{ width: { xs: "100%", sm: "100%", md: "100%" }, my: "10px" }}
                        />
                      </Grid>
                    </Grid>
                    <Grid xs={12} md={12}>
                      <TextField
                        onChange={(e) => handleSectionChange(index, `text${index + 1}`, e.target.value)}
                        value={section[`text${index + 1}`] || ""}
                        label="متن  "
                        variant="outlined"
                        type="text"
                        multiline
                        sx={{ width: { xs: "100%", sm: "100%", md: "100%" }, my: "10px" }}
                      />
                    </Grid>
                    <Grid container>
                      <StandardImageList
                        label={`ویدیو ( 728*357) - ${index + 1}`}
                        onChange={(e) => handleFileItemChange(index, e)}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          ))}

          <Grid sx={{ my: "20px" }}>
            <Button variant="contained" color="primary" disableElevation onClick={handleSubmit}>
              ذخیره تغییرات
            </Button>
          </Grid>
        </Grid>
      </AccountLayout>
    </>
  );
};

export default StepHomePage;
