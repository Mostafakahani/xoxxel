import * as React from "react";
import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const IOSSwitch = styled((props) => (
  <Switch
    focusVisibleClassName=".Mui-focusVisible"
    disableRipple
    className="switch-site"
    {...props}
  />
))(({ theme }) => ({
  width: "48px",
  height: "24px",
  padding: 0,
  borderRadius: "32px",
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    transform: "translateX(2px)",

    color: "#272B30",
    "& + .MuiSwitch-track": {
      backgroundColor: "#252525",
      opacity: 1,
      border: 0,
    },
    "&.Mui-checked": {
      transform: "translateX(23px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: "#252525",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#272B30",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: "20px",
    height: "20px",
  },
  "& .MuiSwitch-track": {
    borderRadius: 24 / 2,
    backgroundColor: "#cc2",
    opacity: 1,
    height: "24px",
    m: 0,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

export default function SwitchButton({ check, setCheck }) {
  return (
    <FormGroup>
      <FormControlLabel
        onChange={() => setCheck((c) => !c)}
        checked={check}
        control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
        label=""
      />
    </FormGroup>
  );
}
