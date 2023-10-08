const styles = {
  box: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "307px",
    minHeight: "307px",
    py: 3,
    px: 2.5,
    outline: "none",
    borderRadius: "8px",
    backgroundColor: "grey.themeColor",
    position: "relative",
    pt: 6,
    ".title": {
      color: "#3C3C3C",
      fontSIze: "14px",
      fontWeight: 700,
    },
    ".btn-status": {
      width: "94px",
      height: "33px",
      px: 0,
      fontSize: "12.04px",
      fontWeight: 500,
    },
    ".btn-save": {
      width: "109px",
      height: "38px",
      borderRadius: "3px",
      px: 0,
      fontSize: "11.9px",
      fontWeight: 500,
      mt: 8,
    },
  },
  close: {
    position: "absolute",
    top: 0,
    right: 3,
  },
};

export default styles;

export const stylesSelect = {
  box: {
    mb: 2,
    label: {
      display: "block",
      color: "#333333",
      fontSize: { xs: "11px", sm: "13.47px" },
      fontWeight: 500,
      span: {
        fontSize: "10px",
        fontWeight: 100,
        color: "error.main",
        ml: 0.5,
      },
    },
    ".MuiSelect-select": {
      pt: "21px",
    },
  },
  boxInput: {
    border: "1px solid #E0E0E0",
    borderRadius: "4px",
    height: { xs: "35px", sm: "39px" },
    width: "100%",
    backgroundColor: "transparent",
    mt: 1,
    position: "relative",
    label: {
      position: "absolute",
      top: "50%",
      right: 7,
      transform: "translateY(-50%)",
      height: "17px",
      zIndex: 1,
    },
  },
  select: {
    borderRadius: "4px",
    height: "39px",
    width: "100%",
    backgroundColor: "transparent",
    mt: 1,
    position: "relative",
    fontSize: { xs: "11px", sm: "13.47px" },
    fieldset: {
      border: "1px solid #E0E0E0",
      fontSize: { xs: "11px", sm: "13.47px" },
    },
  },
};
