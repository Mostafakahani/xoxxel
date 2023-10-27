import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import StatusButton from "../StatusButton";
import styles from "./styles";
import { useRef } from "react";

function UploadFile({
  label = null,
  accept = "image/*",
  id,
  readOnly = false,
  onChange = () => { },
  fileName = null,
  srcImage = null,
}) {
  const [fileUrl, setFileUrl] = useState(null);
  const file = useRef();

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
          onChange={(e) => {
            if (e?.target?.files[0]) {
              let fileURL = URL.createObjectURL(e?.target?.files[0]);
              setFileUrl(fileURL);

              onChange(e);
            } else {
              setFileUrl("");
              onChange({
                ...e,
                target: {
                  ...e.target.fileURL,
                  files: [0],
                },
              });
            }
          }}
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
