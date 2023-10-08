const stylesAdmin = {
  welcome: {
    h1: {
      color: "#222222",
      fontSize: "18px",
      fontWeight: 800,
    },
  },
  bgTitle: {
    minHeight: "437px",
    maxHeight: "437px",
    overflow: "auto",
    backgroundColor: "grey.themeColor",
    borderRadius: "8px",
    px: 1,
  },
};

export default stylesAdmin;

export const stylesSingleUser = {
  boxStatus: {
    position: "relative",
    width: "100%",
    height: "56px",
    "&::before": {
      content: '""',
      width: "145px",
      height: "1px",
      backgroundColor: "#EEEEEE",
      position: "absolute",
      bottom: 0,
      left: 0,
    },
    button: {
      ml: 2.5,
      height: "33px",
      width: "94px",
      px: 0,
      fontSize: "12.04px",
      fontWeight: 600,
    },
  },
  boxTitle: {
    gap: "18px",
    mt: "22px",
    ".user-name": {
      color: "#222222",
      fontWeight: 800,
      fontSize: "18px",
    },
    ".date": {
      fontSize: "12.04px",
      fontWeight: 500,
      color: "#212121",
    },
    ".btn-status": {
      width: "114px",
      height: "40px",
    },
    ".btn-chat": {
      height: "38px",
    },
  },
};

export const StylesCardPrice = {
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: "8px",
    px: 2,
    minHeight: "76px",
    minWidth: "194px",
    width: { xs: "100%", md: "26%" },
    ".title": {
      color: "#505050",
      fontSize: "13.14px",
      fontWeight: 500,
      letterSpacing: "-2%",
      mb: 1.4,
    },
    ".price": {
      color: "#1A1D1F",
      fontSize: "14.9px",
      fontWeight: 700,
      letterSpacing: "-2%",
      span: {
        fontSize: "14.9px",
        color: "#1A1D1F",
        fontWeight: 400,
        letterSpacing: "-2%",
      },
    },
    svg: {
      mr: 2,
    },
  },
  btnSet: {
    width: "157px",
    height: "43px",
    px: 0,
    fontSize: "13.9px",
    fontWeight: 500,
    letterSpacing: "-0.08px",
    mt: { xs: 2, lg: 0 },
  },
};
