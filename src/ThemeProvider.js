import React from "react";
import { MuiThemeProvider, createTheme } from "@material-ui/core";

const primary = "#ed1c24";
const DARK = "#0f1a20";

class ThemeProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      themeType: window.localStorage.themeType || "light",
      formatType: window.localStorage.formatType || "10",
      calculationMethod: window.localStorage.calculationMethod || "raw",
      sceneMethod: window.localStorage.sceneMethod || "ha",
      setSceneMethod: (method) => {
        this.setState({ sceneMethod: method });
        window.localStorage.setItem("sceneMethod", method);
      },
      setFormat: (format) => {
        this.setState({ formatType: format });
        window.localStorage.setItem("formatType", format);
      },
      setCalculationMethod: (method) => {
        this.setState({ calculationMethod: method });
        window.localStorage.setItem("calculationMethod", method);
      },
      setTheme: (theme) => {
        if (theme === "light" || theme === "dark") {
          this.setState({ themeType: theme });
          window.localStorage.setItem("themeType", theme);
        }
      },
    };
  }

  render() {
    let palette = {
      type: this.state.themeType,
      primary: { main: primary },
      background: { default: DARK, paper: "#343434" },
    };

    if (this.state.themeType !== "dark") {
      delete palette.background;
    }

    const THEME = createTheme({
      palette: palette,
      typography: {
        fontFamily: "Quicksand",
      },
    });
    return (
      <MuiThemeProvider theme={THEME}>
        {this.props.children(this.state)}
      </MuiThemeProvider>
    );
  }
}

export default ThemeProvider;
