import "./style/main.css";
import Navbar from "./components/Navbar";
import { Box } from "./components/Box";
import { Outlet } from "react-router-dom";
import { CssBaseline, ThemeProvider, responsiveFontSizes } from "@mui/material";
import useStore from "./store/useStore";
import { MuiThemeCustom } from "./plugin/MuiThemeCustom";

function App() {
  const mode = useStore((state: any) => state.mode)
  const lightMode = useStore((state: any) => state.lightMode)

  if (mode === null) {
    window.localStorage.setItem("data-theme", "light")

    lightMode
  }

  let theme = MuiThemeCustom({ mode })
  theme = responsiveFontSizes(theme)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <Box
        css={{
          maxWidth: "1380px",
          margin: "0 auto",
          padding: "10px",
        }}
      >
        <Outlet />
      </Box>
    </ThemeProvider>
  );
}

export default App;
