import { createTheme } from "@mui/material/styles";

// Create a theme instance.
const theme = createTheme({
  direction: "rtl",
  palette: {
    primary: {
      dark: "#101418",
      main: "#1C49F1",
      light: "#1C49F11A",
    },
    success: {
      light: "#09856A1A",
      main: "#09856A",
    },
    error: {
      light: "#d044544d",
      main: "#D04455",
    },
    warning: {
      light: "#BD92231A",
      main: "#BD9223",
    },
    info: {
      light: "#2A85FF1A",
      main: "#2A85FF",
    },
    secondary: {
      main: "#616161",
    },
    grey: {
      themeColor: "#ffffff",
    },
  },
  components: {},
});

export default theme;
