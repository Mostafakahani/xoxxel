export const styleCard = {
  backgroundColor: "primary.dark",
  py: 3,
  px: 5,
  position: "relative",
  mb: 3,
  ".box-input-form .MuiInputBase-root": {
    backgroundColor: "transparent",
  },
  ".box-input-form input": {
    backgroundColor: "transparent",
  },
};

export const stylesInput = {
  label: {
    color: "#DBDBDB",
    fontWeight: 400,
    fontSize: "14px",
  },
  "input,select": {
    height: "48px",
    width: { xs: "100%", sm: "89%", md: "78%" },
    backgroundColor: "transparent",
    borderRadius: "10px",
    px: 2,
    border: "none",
    outline: "none",
    fontSize: "16px",
    fontWeight: 100,
    fontFamily: '"yekan-reguler"',
    color: "#212121",
  },
  ".box-input-add-tag": {
    minHeight: "52px",
    backgroundColor: "transparent !important",
    width: "100%",
    border: "1px solid #E0E0E0",
    px: 1,
    display: "flex",
    alignItems: "center",
    gap: "15.41px",
    mt: 0,
    flexWrap: "wrap",
    maxHeight: "200px",
    overflowY: "auto",
    borderRadius: "5px",
    input: {
      width: "100%",
      backgroundColor: "transparent",
      "&::placeholder": {
        color: "#535353",
      },
    },
  },
};

export const chipTag = {
  backgroundColor: "#F5F5F5",
  color: "#212121",
  fontSize: "15px",
  borderRadius: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "3.616px",
  pl: 1,
  pr: 1.5,
  minHeight: "41px",
  ".MuiTypography-root": {
    m: 0,
    transform: "translateY(6px) translateX(1px)",
  },
  ".MuiChip-label": {
    fontWeight: 100,
  },
};
