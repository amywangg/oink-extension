import { createMuiTheme } from "@material-ui/core/styles";
import pink from "@material-ui/core/colors/pink";

export const muiTheme = createMuiTheme({
  props: {
    MuiInputBase: {
      disableripple: "true",
    },
  },
  palette: {
    primary: { main: pink[50] },
    secondary: { main: pink[100] },
    tertiary: { main: "#ff0044" },
  },
  sizing: {
    sideBar: { width: "15%" },
    drilldownBar: { width: "25%" },
  },
  typography: {
    fontFamily: "Roboto",
    h1: {
      fontFamily: "Roboto",
    },
    h2: {
      fontFamily: "Roboto",
    },
    h3: {
      fontFamily: "Roboto",
    },
    h4: {
      fontFamily: "Roboto",
    },
    h5: {
      fontFamily: "Roboto",
    },
    h6: {
      fontFamily: "Roboto",
    },
  },
});
