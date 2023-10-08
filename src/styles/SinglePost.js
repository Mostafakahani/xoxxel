const styles = {
  boxMain: {
    px: 2,
    my: 3,
    position: "relative",
    ".title": {
      color: "#E0E0E0",
      fontSize: "30px",
      fontWeight: 600,
      mb: 1.5,
    },
    ".des": {
      color: "#E0E0E0",
      fontSize: "18px",
      fontWeight: 500,
      lineHeight: "30px",
      pb: 6,
      borderBottom: "1px solid #373737",
    },
  },
  boxShear: {
    flexWrap: { xs: "wrap", md: "nowrap" },
    position: "relative",
    justifyContent: { xs: "center", sm: "start" },
    ".text-shear": {
      color: "#262626",
      fontSize: { xs: "10.5px", sm: "16.12px" },
      fontWeight: 600,
      mr: { sm: 2.5 },
      minWidth: { xs: "100%", sm: "fit-content" },
      textAlign: "center",
      mb: { xs: 2, sm: 0 },
    },
    ".btn-copy": {
      borderRadius: "16px",
      height: { xs: "33px", sm: "42px" },
      minWidth: { xs: "85px", sm: "131px" },
      boxShadow: "none",
      mr: 2,
      fontSize: { xs: "12.19px", sm: "14.12px" },
    },
  },
};

export default styles;

export const stylesComments = {
  py: { xs: 3, sm: 3 },
  px: { xs: 2, sm: 4 },
  borderRadius: "8px",
  backgroundColor: "#fff",
  mt: { xs: 5 },
  ".title": {
    fontSize: { xs: "12.84px", sm: "17.68px" },
    color: "#212121",
    fontWeight: 500,
    svg: {
      mr: 2,
    },
  },
  ".btn": {
    width: "107.68px",
  },
};
