const styles = {
  navbarLayout: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  boxLogo: {
    display: "flex",
    alignItems: "center",
    mr: { xs: 2, md: 10 },
    ".title-logo": {
      color: "#292929",
      fontSize: { xs: "14px", sm: "16px" },
      fontWeight: 600,
      ml: 1,
      mr: 2,
      display: { xs: "none", sm: "block" },
    },
    ".logo": {
      display: { xs: "none", sm: "block" },
    },
  },
  list: {
    display: { xs: "none", lg: "flex" },
    alignItems: "center",
    ".item": {
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
      px: 0,
      mx: 2,
      "&:hover .submenu": {
        display: "flex",
      },
      a: {
        color: "#CACACA",
        fontSize: "16px",
        fontWeight: 400,
        width: "max-content",
      },
    },
  },
  subMenu: {
    position: "absolute",
    bottom: 0,
    left: 0,
    minWidth: "100%",
    borderRadius: "10px",
    boxShadow: "0px 2px 4px rgba(0,0,0,0.3)",
    backgroundColor: "primary.light",
    display: "flex",
    flexDirection: "column",
    transform: "translateY(100%)",
    display: "none",
    "&::before": {
      content: "''",
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "4px",
      backgroundColor: "#fff",
      borderRadius: "0 0 5px 5px",
    },
    a: {
      fontSize: "14px !important",
    },
  },
  boxProfile: {
    display: "flex",
    alignItems: "center",
    ".avatar": {
      borderRadius: "0px",
      width: "46px",
      height: "46px",
      ml: 1,
      display: { xs: "none", sm: "inline-block" },
    },
    ".btn-menu": {
      color: "#CED4DA",
      fontSize: { xs: "14px", sm: "16px" },
      fontWeight: 600,
      maxWidth: { xs: "140px", sm: "none" },
      px: { xs: 0, sm: 2 },
      svg: {
        mr: 2,
      },
    },
  },
  boxSearch: {
    borderRadius: "4px",
    border: "1px solid #E0E0E0",
    backgroundColor: "transparent",
    height: "40px",
    width: "320px",
    px: 1.7,
    display: { xs: "none", md: "flex" },
    input: {
      backgroundColor: "transparent",
      width: "100%",
      height: "40px",
      color: "#757575",
      outline: "none",
      border: "none",
      ml: 1,
    },
  },
};

export default styles;
