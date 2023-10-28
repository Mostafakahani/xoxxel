import React, { useRef } from "react";
import { Box, Typography } from "@mui/material";
import StatusButton from "../StatusButton";
import styles from "./styles";
import ServerURL from "../Layout/config";

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

  const handleFileUpload = async () => {
    const selectedFile = fileInputRef.current.files[0];

    if (selectedFile) {
      try {
        const response = await fetch(`${ServerURL.url}/admin/storage/create-key-upload`, {
          method: "POST",
          body: JSON.stringify({
            size: selectedFile.size,
            type: selectedFile.type,
            name: selectedFile.name,
          }),
          headers: {
            Authorization: `${ServerURL.Bear}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data) {
            onChange({ selectedFile: selectedFile });
            onChange({ fileResDetails: data });

            console.log('data hast')
          } else {
            console.error("خطا در دریافت اطلاعات ریسپاس!");
          }
        }

        // if (uploadResponse.ok) {
        //   const data = await response.json();

        //   const fileResDetails = {
        //     fileURL: `${data.url}${data.fields.key}`,
        //     fields: data.fields,
        //     dataStorage: data.dataStorage,
        //   };
        //   onChange({ fileResDetails });
        // } else {
        //   console.error("خطا در آپلود فایل!");
        // }


        // if (uploadResponse.ok) {
        //   console.log("فایل با موفقیت آپلود شد!");
        //   const fileDetails = {
        //     fileURL: `${data.url}${data.fields.key}`, // آدرس کامل فایل برای نمایش یا ذخیره
        //     fileName: selectedFile.name,
        //     fileSize: selectedFile.size,
        //     fileType: selectedFile.type,
        //   };

        //   // ارسال اطلاعات به کامپوننت والد
        //   onChange({ fileDetails });
        // } else {
        //   console.error("خطا در آپلود فایل!");
        // }

        // else {
        //   console.error("خطا در درخواست به سرور!");
        // }

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
