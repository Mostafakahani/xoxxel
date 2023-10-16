import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Avatar, Box, IconButton } from "@mui/material";
import Image from "next/image";
import styles from "./styles";
import MenuList from "./menu";
import IconMenu from "@mui/icons-material/Menu";
import IconClose from "@mui/icons-material/Close";
import Search from "./Search";
import { IconAvatar, IconNotif, IconPhone } from "Icons/icons";

export default function Navbar({ setOpen, open }) {
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "grey.themeColor",
        height: { xs: "50px", sm: "70px" },
        zIndex: (theme) => theme.zIndex.drawer + 1,
        boxShadow: "none",
        boxShadow: "222px 20px 16px 0px #00000005",
      }}
      className="full-center w-100"
    >
      <Toolbar className="center-between w-100" sx={{ pr: 0, pl: 0.5 }}>
        <Box sx={styles.navbarLayout}>
          <Box sx={styles.boxLogo}>
            <IconButton
              sx={{ mr: 1, display: { lg: "none" } }}
              onClick={() => setOpen((c) => !c)}
            >
              {!open ? (
                <IconMenu sx={{ color: "#444" }} />
              ) : (
                <IconClose sx={{ color: "#444" }} />
              )}
            </IconButton>
            <Typography
              component={"h1"}
              className="title-logo rokh"
              sx={{ color: "#292929 !important", fontWeight: "800 !important" }}
            >
              XOXXEL{" "}
            </Typography>
            <Image
              src={"/images/logo.svg"}
              layout="fixed"
              width={50}
              height={50}
              alt="logo"
              loader={({ src }) => src}
              className="logo"
            />
          </Box>
          <Search />
        </Box>
        <Box sx={styles.boxProfile}>
          <IconButton sx={{ display: { xs: "none", sm: "flex" } }}>
            <IconPhone />
          </IconButton>
          <IconButton sx={{ mr: 1.5, display: { xs: "none", sm: "flex" } }}>
            <IconNotif />
          </IconButton>
          <Typography
            component={"span"}
            sx={{ display: { xs: "none", sm: "flex" } }}
            className="full-center"
          >
            <Avatar />
          </Typography>

          <MenuList />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
