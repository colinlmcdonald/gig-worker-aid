import React from "react";
import { ThemeProvider } from "emotion-theming";
import preset from "@rebass/preset";

const App = ({ children }) => {
  console.log("sup preset", preset);
  preset.colors.primary = "rgb(43, 107, 216)";
  return <ThemeProvider theme={preset}>{children}</ThemeProvider>;
};

export default App;
