import * as React from "react";
import { styled } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: "47px",
  height: "23px",
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(23.5px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: "#2A85FF",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#2A85FF",
      border: "0px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color: "#fff",
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: "19.43px",
    height: "19.43px",
  },
  "& .MuiSwitch-track": {
    borderRadius: 47 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

export default function MySwitch({ label, value, onChange }) {
  return (
    <FormControlLabel
      control={<IOSSwitch checked={value} sx={{ m: 1 }} />}
      label={label}
      onChange={onChange}
      sx={{
        direction: "rtl",
        textAlign: "start",
        ".MuiTypography-root": {
          color: "#3A3A3A",
          fontSize: { xs: "13px", sm: "16px" },
          fontWeight: 500,
          mr: { xs: 1, sm: 3 },
        },
      }}
      className="box-select"
    />
  );
}
