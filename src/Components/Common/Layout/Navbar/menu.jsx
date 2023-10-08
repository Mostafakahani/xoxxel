import React, { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { dataMenuDrop } from "./data";
import Link from "Link";
import { IconArrowMenu } from "Icons/icons";
import { Box, Typography } from "@mui/material";

export default function MenuList() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Box>
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          className="btn-menu"
          endIcon={<IconArrowMenu />}
          sx={{ pr: "0 !important", color: "#2A2A2A !important" }}
        >
          امیر محمد دیمه
        </Button>
        <Typography
          component={"h6"}
          sx={{
            color: "#2A2A2A",
            fontSize: "16px",
            fontWeight: 400,
            ml: 2,
            mt: -0.7,
            display: { xs: "none", sm: "block" },
          }}
        >
          ادمین
        </Typography>
      </Box>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {dataMenuDrop.map((e, i) => (
          <MenuItem
            key={i}
            sx={{
              fontWeight: 400,
              fontSize: "14px",
              a: {
                color: "secondary.main",
              },
            }}
          >
            <Link href={e.href}>{e.text}</Link>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
