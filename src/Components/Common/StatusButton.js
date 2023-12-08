import { useTheme } from "@emotion/react";
import { Button } from "@mui/material";
import Link from "Link";
import React from "react";

function StatusButton(props) {
  const { color = "primary", text, onClick, ...otherProps } = props;
  const theme = useTheme();

  const BUTTON = () => {
    // let copyProps = { ...props };
    // delete copyProps?.href;

    return (
      <Button
        variant="contained"
        color={color}
        sx={{
          backgroundColor: theme?.palette[color]?.light,
          boxShadow: "none",
          color: theme?.palette[color]?.main,
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
        // {...copyProps}
        onClick={onClick}
        {...otherProps}

      >
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
