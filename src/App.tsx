import "./style/main.css";
import Navbar from "./components/Navbar";
import { Box } from "./components/Box";
import { Outlet } from "react-router-dom";
import { CssBaseline, Fab, ThemeProvider, Toolbar, responsiveFontSizes } from "@mui/material";
import useStore from "./store/useStore";
import { MuiThemeCustom } from "./plugin/MuiThemeCustom";
import ScrollTop from "./components/scrollToTop";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useTheme, Theme } from "@mui/material/styles";


function App() {
  const mode = useStore((state: any) => state.mode)
  const lightMode = useStore((state: any) => state.lightMode)
  const theme: Theme = useTheme()
  const isDarkMode = theme.palette.mode === 'dark'

  if (mode === null) {
    window.localStorage.setItem("data-theme", "light")

    lightMode
  }

  let customTheme = MuiThemeCustom({ mode })
  customTheme = responsiveFontSizes(customTheme)

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <Navbar />
      <div id="back-to-top-anchor" />
      <Box
        css={{
          maxWidth: "1380px",
          margin: "0 auto",
          padding: "10px",
        }}
      >
        <Outlet />
      </Box>
      <ScrollTop>
        <Fab aria-label="scroll back to top"
          sx={{
            border: isDarkMode ? "1px solid #313131" : "1px solid #ECECEC",
            background: isDarkMode ? "rgba(31, 31, 31, 0.5)" : "rgba(245, 245, 246, 0.5)",
            backdropFilter: "blur(8px)",
            boxShadow: "none"
          }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </ThemeProvider>
  );
}

export default App;
