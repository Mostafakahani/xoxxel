const styles = {
  boxForm: {
    backgroundColor: "#1F1F1F",
    maxWidth: "413px",
    minHeight: { xs: "auto", md: "433px" },
    px: 4,
    py: 8,
    borderRadius: { xs: "6px", sm: "8px" },
    position: "relative",
    width: "100%",
    ".title": {
      color: "#EAEAEA",
      fontSize: { xs: "18. ", sm: "23px" },
      fontWeight: 800,
      mb: 1,
      textAlign: { xs: "start", sm: "center" },
      "&.otp": {
        textAlign: { xs: "center", sm: "center" },
      },
    },
    ".des": {
      fontSize: { xs: "10.64px", sm: "13px" },
      color: "#C3C3C3",
      fontWeight: 600,
      mb: 4,
      textAlign: { xs: "start", sm: "center" },
      "&.otp": {
        textAlign: { xs: "center", sm: "center" },
        maxWidth: { xs: "240.26px", sm: "309px" },
        mx: "auto",
        lineHeight: "18.35px",
      },
    },
  },
  btnSubmit: {
    width: "100%",
    height: "40px",
    mt: 4.5,
    mx: "auto",
    fontSize: "14px",
    fontWeight: 400,
    "&.otp": {
      width: { xs: "184px", sm: "100%" },
    },
  },
  buttonBack: {
    width: "100%",
    height: "40px",
    mx: "auto",
    borderColor: "#A29A9A",
    mt: 1.5,
    color: "#FFFFFF",
    fontSize: "14px",
    fontWeight: 400,
  },

  loginLink: {
    color: "#CACACA",
    fontSize: "14.6px",
    fontWeight: 400,
    mt: { xs: 3, sm: 4 },
    textAlign: "center",
    a: {
      color: "#1C49F1",
      fontWeight: 500,
    },
  },
  close: {
    color: "#EEEEEE",
    fontSize: "10.2px",
    fontWeight: 400,
    position: "absolute",
    top: 20,
    right: 20,
  },
  titleSend: {
    fontSize: { xs: "12px", sm: "16.68px" },
    fontWeight: 500,
    color: "rgba(234, 234, 234, 1)",
    mb: 0.4,
    svg: {
      transform: "translateY(7px)",
      display: { xs: "none", sm: "inline" },
    },
    span: {
      fontSize: { xs: "16.05px", sm: "23.68px" },
      fontWeight: 700,
      mr: 0.5,
    },
  },
};

export default styles;

export const stylesButtonType = (select) => ({
  width: "48%",
  maxWidth: "142px",
  height: "81px",
  border: "1px solid #9D9D9D",
  borderRadius: "8px",
  color: select ? "#D4D4D4" : "#9D9D9D",
  fontSize: "12.68px",
  fontWeight: 500,
  px: 0,
  flexDirection: "column",
  backgroundColor: select ? "#1C49F11A" : "transparent",
  svg: {
    mb: "11px",
  },
});
