import React from "react";
import ThemeProvider from "./ThemeProvider";
import App from "./App";

export default function (props) {
  return (
    <ThemeProvider>
      {({
        setTheme,
        themeType,
        formatType,
        setFormat,
        setCalculationMethod,
        calculationMethod,
        setSceneMethod,
        sceneMethod,
        setProtocolType,
      }) => (
        <App
          setTheme={setTheme}
          themeType={themeType}
          formatType={formatType}
          setFormat={setFormat}
          setCalculationMethod={setCalculationMethod}
          calculationMethod={calculationMethod}
          setSceneMethod={setSceneMethod}
          sceneMethod={sceneMethod}
          setProtocolType={setProtocolType}
        />
      )}
    </ThemeProvider>
  );
}
