import { createTheme, responsiveFontSizes } from "@mui/material";

let theme = createTheme({
  typography: {
    fontFamily: ["Open Sans"].join(","),
    fontSize: 14,
  },
});

theme = responsiveFontSizes(theme);

export default theme;
