const styles = {
  btn: {
    color: "#757575",
    fontSize: { xs: "10.54px", sm: "14px" },
    fontWeight: 500,
    borderBottom: "1px solid #EEEEEE",
    pb: 1,
    borderRadius: "0px",
    px: { xs: 1, sm: 2 },
    minWidth: "10px",
    minWidth: "fit-content",
    svg: {
      ml: 0.6,
    },
    "&.first": {
      pl: "0px",
      minWidth: 0,
    },
    "&.last": {
      pr: "0px",
      minWidth: 0,
    },
    "&.active": {
      color: "#1C49F1",
      borderBottom: "2px solid #1C49F1",
    },
    "&:hover": {
      backgroundColor: "transparent",
    },
    span: {
      display: "none",
    },
  },
};

export default styles;
