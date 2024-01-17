import {
  IconButton,
  SvgIcon,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { IconB, IconS } from "Icons/icons";
import React from "react";

function TableItems({ feature }) {
  return (
    <TableBody>
      <TableRow>
        <TableCell>
          <IconButton>
            <IconB />
          </IconButton>
        </TableCell>
        <TableCell>
          <Typography sx={{ color: "#616162" }}>{feature.price}</Typography>
        </TableCell>
        <TableCell>
          <Typography sx={{ color: "#616162" }}>{feature.date}</Typography>
        </TableCell>
        <TableCell>
          <Typography
            sx={{
              color: feature.state === "auto" ? "#0085FF" : "#000",
            }}
          >
            {feature.state}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography
            sx={{
              bgcolor: feature.status === "active" ? "#C7F1DB" : "#f1c7c7",
              color: feature.status === "active" ? "#0DB25B" : "red",
              borderRadius: 2,
              px: 1,
              fontSize: 14,
              textAlign: "center",
              width: "fit-content",
            }}
          >
            {feature.status}
          </Typography>
        </TableCell>
        <TableCell
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          {feature.name}
          <SvgIcon sx={{ ml: 1 }}>
            <IconS />
          </SvgIcon>
        </TableCell>
      </TableRow>
    </TableBody>
  );
}

export default TableItems;
