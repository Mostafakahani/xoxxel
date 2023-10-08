const styles = {
  bgCover: (url) => ({
    backgroundImage: `url(${url})`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
    width: "100%",
    height: "306px",
  }),
  boxInfo: {
    ".card-info": {
      maxWidth: { xs: "100%", md: "60%", lg: "286px" },
      pb: 2,
      mx: "auto",
    },
    transform: { xs: "translateY(-250px)", lg: "translateY(-153px)" },
  },
  tabs: {
    backgroundColor: "#fff",
    minHeight: "54px",
    minWidth: { xs: "100%", md: "60%", lg: "530px" },
    width: "fit-content",
    borderRadius: "8px",
    mt: 3,
    mx: { xs: "auto", lg: 0 },
    ".tab-box": {
      ml: 0,
    },
  },
  boxPage: (page) => ({
    minHeight: { xs: "248px", md: "332px" },
    width: "100%",
    py: { xs: "15px", sm: "20px" },
    px: page === 4 ? 0 : { xs: "15px", sm: "33px" },
    borderRadius: "8px",
    mt: 2.5,
    backgroundColor: page === 4 ? "transparent" : "#fff",
  }),
};

export default styles;
