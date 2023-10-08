import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { IconButton, MenuItem, Select } from "@mui/material";
import { IconClose } from "Icons/icons";
import StatusButton from "../StatusButton";
import styles, { stylesSelect } from "./styles";
import { dataStatusBlog, dataStatusUser } from "Services/config";
import { Textarea } from "../Inputs";
import { BTN_STATUS } from "Data";

export default function ChangeStatus({
  open,
  setOpen,
  defaultStatus,
  sx = {},
  dataList = dataStatusUser,
  onClick,
  message_error = null,
}) {
  const [status, setStatus] = React.useState(defaultStatus?.value);
  const [message, setMessage] = React.useState("");
  const handleClose = () => setOpen(false);
  const index = dataList?.findIndex((x) => x?.value == status);

  const handelChange = () => {
    onClick({ status, message });
  };

  React.useEffect(() => {
    if (message_error) {
      setMessage(message_error);
      setStatus("off");
    }
  }, [message_error]);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{
        backdrop: Backdrop,
      }}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: "rgba(244, 244, 244,0.8)",
          },
        },
      }}
    >
      <Fade in={open}>
        <Box sx={{ ...styles.box, ...sx }}>
          <IconButton sx={styles.close} onClick={handleClose}>
            <IconClose />
          </IconButton>
          <Box className="center-between" sx={{ mb: 3 }}>
            <Typography component={"h4"} className="title">
              تغیر وضعیت
            </Typography>
            <StatusButton
              text={defaultStatus?.text}
              color={defaultStatus?.color}
              className="btn-status"
            />
          </Box>
          <Box sx={stylesSelect.box} className="box-select">
            <label htmlFor={"status"}>وضعیت</label>
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              sx={{
                ...stylesSelect.select,
                ".MuiSelect-select": {
                  pt: "18px",
                  color: (theme) =>
                    theme?.palette[dataList[index]?.color]?.main,
                },
              }}
            >
              {dataStatusBlog?.map((e) => (
                <MenuItem
                  value={e?.value}
                  key={e?.value}
                  sx={{
                    color: (theme) => theme?.palette[e?.color]?.main,
                    fontSize: "11.47px",
                  }}
                >
                  {e?.label}
                </MenuItem>
              ))}
            </Select>
          </Box>
          {dataList[index]?.message && (
            <Textarea
              id={"message"}
              label={"دلیل رد"}
              value={message}
              onChange={(e) => setMessage(e?.target?.value)}
            />
          )}
          <Button
            variant="contained"
            className="btn-save"
            onClick={handelChange}
          >
            ذخیره تغییرات
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
}
