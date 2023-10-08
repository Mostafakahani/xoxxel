import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Sidebar from "../Sidebar";
import { dataSidebar, dataAdmin } from "./data";
import Navbar from "../Navbar";
import { Backdrop, CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";

const SpinnerLoading = ({ loadingSpinner }) => (
  <Backdrop
    sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
    open={loadingSpinner}
  >
    <CircularProgress color="error" />
  </Backdrop>
);

export default function AdminLayout({ children, data = null, titleBadge }) {
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ display: "flex" }}>
      <Navbar setOpen={setOpen} open={open} />
      <Sidebar
        data={data ? data : dataSidebar}
        open={open}
        setOpen={setOpen}
        titleBadge={titleBadge}
      />
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          position: "fixed",
          top: 0,
          left: 0,
          backgroundColor: "rgba(0,0,0,0.15)",
          zIndex: (theme) => theme.zIndex.drawer - 1,
          display: open ? "block" : "none",
        }}
        onClick={() => setOpen(false)}
      ></Box>
      <Box
        component="main"
        sx={{
          p: 0,
          ml: { lg: "185px" },
          py: { xs: 3, sm: 5 },
          px: { xs: 1, sm: 2, md: 3 },
          pl: { xs: 1, md: "30px" },
          width: "100%",
        }}
      >
        <Toolbar />

        {children}
      </Box>
    </Box>
  );
}
