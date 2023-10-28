import React, { useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import StatusButton from "../StatusButton";
import styles from "./styles";

function UploadFile({
  label = null,
  accept = "image/*",
  id,
  readOnly = false,
  onChange = () => { },
  fileName = null,
  srcImage = null,
}) {
  const [fileUrl, setFileUrl] = useState(srcImage || null);
  const [fileSize, setFileSize] = useState(null);
  const file = useRef();

  // const handleFileChange = (e) => {
  //   if (e?.target?.files[0]) {
  //     let fileURL = URL.createObjectURL(e?.target?.files[0]);
  //     const fileDetails = {
  //       fileURL: fileURL,
  //       fileName: e?.target?.files[0]?.name,
  //       fileSize: e?.target?.files[0]?.size,
  //       filePath: e?.target?.files[0]?.path,
  //     };
  //     setFileUrl(fileDetails.fileURL);
  //     setFileSize(fileDetails.fileSize);
  //     setFilePath(fileDetails.filePath)
  //     onChange({ fileDetails });
  //     handleFileUpload(fileDetails.fileURL, fileDetails.fileSize);
  //   } else {
  //     setFileUrl("");
  //     setFilePath('')
  //     setFileSize(0);
  //     const emptyFileDetails = {
  //       fileURL: "",
  //       fileName: "",
  //       fileSize: 0,
  //     };
  //     onChange({ fileDetails: emptyFileDetails });
  //   }
  // };
// در کامپوننت UploadFile
const handleFileChange = (e) => {
  if (e?.target?.files) {
      const selectedFiles = e.target.files;
      let fileDetailsArray = [];

      for (let i = 0; i < selectedFiles.length; i++) {
          let fileURL = URL.createObjectURL(selectedFiles[i]);
          const fileDetails = {
              fileURL: fileURL,
              fileName: selectedFiles[i].name,
              fileSize: selectedFiles[i].size,
              fileType: selectedFiles[i].type
          };
          fileDetailsArray.push(fileDetails);
      }

      onChange({ fileDetails: fileDetailsArray });
  } else {
      // اگر هیچ فایلی انتخاب نشده باشد، یک آرایه خالی ارسال کنید
      onChange({ fileDetails: [] });
  }
};


  // تابع دریافت کننده اطلاعات فایل و URL
  // function handleFileUpload(fileUrl, fileSize) {
  //   // اینجا می‌توانید از اطلاعات فایل و URL برای کارهای خاصی استفاده کنید
  //   // مثلاً ارسال اطلاعات به کامپوننت دیگر یا انجام کارهای دیگر...
  //   // console.log("URL فایل:", fileUrl);
  //   console.log("حجم فایل:", fileSize);
  // }

  return (
    <Box sx={{ ...styles.box, width: '100%', my: '15px' }} className="box-upload input-box">
      {label && <label htmlFor={id}>{label}</label>}
      <Box
        className="box-input center-between"
        onClick={() => !readOnly && file?.current?.click()}
      >
        <input
          type="file"
          accept={accept}
          hidden
          ref={file}
          id={id}
          onChange={handleFileChange}
        />
        <Typography component={"h6"}>
          {fileName
            ? fileName
            : srcImage
              ? srcImage?.split("/")[srcImage?.split("/")?.length - 1]
              : "فایل خود را انتخاب کنید"}
        </Typography>
        <StatusButton
          text="مشاهده"
          onClick={(e) => {
            e.stopPropagation();
            if (fileUrl || srcImage) {
              const newLink = document.createElement("a");
              newLink.href = fileUrl ? fileUrl : srcImage;
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
