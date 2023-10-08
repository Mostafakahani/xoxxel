const styles = {
  box: {
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
    textarea: {
      width: "100%",
      minWidth: "100%",
      maxHeight: "130px",
      minHeight: "130px",
      resize: "none",
      border: "none",
      outline: "none",
      borderRadius: "4px",
      px: 1.5,
      py: 1,
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
    "&.textarea": {
      height: "auto !important",
    },
    input: {
      width: "100%",
      pl: 1.5,
      color: "#2E2E2E",
      fontSize: { xs: "11px", sm: "13.47px" },
      fontWeight: 600,
      border: "none",
      outline: "none",
      backgroundColor: "transparent",
      direction: "rtl !important",
      textAlign: "end !important",
    },
    "&:has(> input:focus)": {
      borderColor: "#1C49F1 !important",
      borderWidth: "2px",
    },
    label: {
      position: "absolute",
      top: "50%",
      right: 7,
      transform: "translateY(-50%)",
      height: "17px",
      zIndex: 1,
      "&.right": {
        right: "90%",
      },
    },
    "&.auth": {
      borderColor: "rgba(55, 55, 55, 1)",
      input: {
        height: "44px",
        color: "#fff",
        pl: 5,
        caretColor: "#fff !important",
        "&::placeholder": {
          color: "rgba(117, 117, 117, 1)",
          fontSize: "13px",
          fontWeight: 400,
        },
      },
      "&:has(> input:focus)": {
        borderColor: "#fff !important",
        borderWidth: "1px",
      },
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
  boxAuth: {
    label: {
      color: "rgba(248, 248, 248, 1) !important",
      fontSize: "12.68px",
      fontWeight: 500,
    },
  },
};

export default styles;
