import React, { useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import StatusButton from "../StatusButton";
import styles from "./styles";
import ServerURL from "../Layout/config";
import axios from "axios";

function UploadFile({
  label = null,
  accept = "image/*",
  id,
  readOnly = false,
  onChange = () => { },
  fileName = null,
  srcImage = null,
}) {
  const fileInputRef = useRef();
  const [resItems, setResItems] = useState([])
  const handleFileUpload = async () => {
    const selectedFile = fileInputRef.current.files[0];
    console.log(selectedFile)

    if (selectedFile) {
      try {
        const config = {
          headers: {
            Authorization: `${ServerURL.Bear}`
          }
        };
        const data = {
          size: selectedFile.size,
          type: selectedFile.type,
          name: selectedFile.name,
        };

        // const formData = new FormData();
        // formData.append("file", selectedFile);

        const response = await axios.post(`${ServerURL.url}/admin/storage/create-key-upload`, data, config);

        if (response.data) {
          // const fieldsData = response.data.map((x) => x);
          setResItems(response.data)
          console.log('fieldsData: ', resItems.fields)
          const imageURL = URL.createObjectURL(selectedFile);

          onChange({ fileResDetails: resItems, imageURL: imageURL });
          console.log('عکس انتخاب شده: ', imageURL);
        } else {
          console.error("خطا در دریافت اطلاعات ریسپانس!");
        }
      } catch (error) {
        console.error("خطایی رخ داده است: ", error);
      }
    } else {
      onChange({ fileDetails: [] });
    }
  };


  return (
    <Box sx={{ ...styles.box, width: "100%", my: "15px" }} className="box-upload input-box">
      {label && <label htmlFor={id}>{label}</label>}
      <Box className="box-input center-between" onClick={() => !readOnly && fileInputRef.current.click()}>
        <input type="file" accept={accept} hidden ref={fileInputRef} id={id} onChange={handleFileUpload} />
        <Typography component={"h6"}>
          {fileName
            ? fileName
            : srcImage
              ? srcImage.split("/")[srcImage.split("/").length - 1]
              : "فایل خود را انتخاب کنید"}
        </Typography>
        <StatusButton
          text="مشاهده"
          onClick={(e) => {
            e.stopPropagation();
            if (fileInputRef.current.files[0] || srcImage) {
              const newLink = document.createElement("a");
              newLink.href = fileInputRef.current.files[0]
                ? URL.createObjectURL(fileInputRef.current.files[0])
                : srcImage;
              newLink.setAttribute("target", "_blank");
              newLink.click();
            }
          }}
        />
      </Box>
    </Box>
  );
}

export default UploadFile;
