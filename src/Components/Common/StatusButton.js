import { useTheme } from "@emotion/react";
import { Button } from "@mui/material";
import Link from "Link";
import React from "react";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
function StatusButton(props) {
  const { color = "primary", text, isUploaded } = props;
  const theme = useTheme();

  const BUTTON = () => {
    let copyProps = { ...props };
    delete copyProps?.href;

    return (
      <Button
        variant="contained"
        color={color}
        disabled={text ? false : true}
        sx={{
          backgroundColor: text === "مشاهده" && !isUploaded ? theme?.palette[color]?.light : '#00ff0030', // تغییرات اینجا
          boxShadow: "none",
          color: text === "مشاهده" && !isUploaded ? theme?.palette[color]?.main : '#1cf14c',
          fontSize: "12.04px",
          fontWeight: 600,
          minWidth: "max-content",
          fontFamily: "rokh-semmi",
          "&:hover": {
            boxShadow: "none",
            backgroundColor: theme?.palette[color]?.light,
            opacity: 0.8,
          },
        }}
        disableElevation
        {...copyProps}
      >
        {isUploaded && <CheckCircleIcon style={{ marginLeft: '5px' }} />} {/* نمایش تیک اگر isUploaded برابر با true باشد */}

        {text}
      </Button>
    );
  };

  if (props?.href)
    return (
      <Link href={props?.href}>
        <BUTTON />
      </Link>
    );

  return <BUTTON />;
}

export default StatusButton;
