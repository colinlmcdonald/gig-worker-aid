import React from "react";
import { ThemeProvider } from "emotion-theming";
import preset from "@rebass/preset";

const App = ({ children }) => {
  preset.colors.primary = "rgb(43, 107, 216)";
  preset.colors.layoutBackground = "#f5f5f7";
  return <ThemeProvider theme={preset}>{children}</ThemeProvider>;
};

export default App;
