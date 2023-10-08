import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import StatusButton from "Components/Common/StatusButton";
import { IconLogout } from "Icons/icons";
import Link from "Link";
import { useRouter } from "next/router";
import React from "react";

export default function Sidebar({ data, open, titleBadge = null }) {
  const { pathname, push } = useRouter();

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: { xs: "100%", lg: "175px" },
        maxWidth: { xs: "fit-content", lg: "none" },
        flexShrink: 0,
        backgroundColor: "grey.themeColor",
        height: "100vh",
        zIndex: (theme) => theme.zIndex.drawer,
        transition: "all 0.3s ease",
        px: { xs: 0, lg: 0 },
        pt: 1.5,
        transform: {
          xs: !open ? "translateX(-100%)" : "translateX(0)",
          lg: "translateX(0px)",
        },
        [`& .MuiDrawer-paper`]: {
          backgroundColor: "primary.light",
          width: { xs: "100%", sm: 400, md: 450, lg: "175px" },
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      <Box
        sx={{ overflow: "auto", height: "91%" }}
        className="center-between column light-scroll"
      >
        <List sx={{ px: 0, width: "100%" }}>
          {titleBadge && (
            <ListItem
              sx={{
                button: {
                  width: "100%",
                  height: "40px",
                  borderRadius: "8px",
                },
              }}
            >
              <StatusButton
                startIcon={titleBadge?.icon}
                text={titleBadge?.text}
              />
            </ListItem>
          )}
          {data.map((e) => {
            const active =
              e.href === data[0]?.href
                ? e.href === pathname
                  ? true
                  : false
                : pathname.includes(e.href)
                ? true
                : false;

            return (
              <ListItem
                key={e.href}
                sx={{
                  px: 0,
                  px: 0,
                  position: "relative",
                }}
              >
                <Link href={e.href} sx={{ width: "100%" }}>
                  <ListItemButton
                    sx={{
                      px: 3,
                      color: active ? "#2A2A2A" : "#616161",
                      position: "relative",
                      ".MuiTypography-root": {
                        fontSize: "16.01px",
                      },
                      "&::before": {
                        content: '""',
                        width: "4px",
                        height: "24px",
                        borderRadius: "6px",
                        backgroundColor: "primary.main",
                        position: "absolute",
                        top: "50%",
                        left: 0,
                        transform: "translateY(-50%)",
                        display: active ? "block" : "none",
                      },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: "36px" }}>
                      {active ? e.iconActive : e.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={e.text}
                      sx={{
                        span: {
                          fontWeight: active ? "800" : "300",
                        },
                      }}
                    />
                  </ListItemButton>
                </Link>
              </ListItem>
            );
          })}
        </List>
        <List sx={{ px: 0, width: "100%" }}>
          <ListItem
            sx={{ px: 0, px: 1 }}
            onClick={() => {
              push("/");
            }}
          >
            <ListItemButton
              sx={{
                color: "#DBDBDB",
                ".MuiTypography-root": {
                  fontSize: "16px",
                  color: "secondary.main",
                },
                width: "100%",
              }}
            >
              <ListItemIcon sx={{ minWidth: "36px" }}>
                <IconLogout />
              </ListItemIcon>
              <ListItemText primary={"خروج"} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
}
