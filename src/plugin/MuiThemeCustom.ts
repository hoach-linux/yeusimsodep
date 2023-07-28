import { PaletteMode, createTheme } from "@mui/material";
import SFProRegular from '../../SFProDisplay-Regular.woff2';

export const MuiThemeCustom = ({ mode }: { mode: PaletteMode }) => createTheme({
    palette: {
        mode,
    },
    typography: {
        fontFamily:
            [
                'SFProDisplay',
                '-apple-system',
                'Arial',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(','),
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: `
          @font-face {
            font-family: 'SFProDisplay';
            font-style: normal;
            font-display: swap;
            font-weight: 400;
            src: local('SFProDisplay'), local('SFProDisplay-Regular'), url(${SFProRegular}) format('woff2');
            unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
          }
        `,
        },
        MuiCard: {
            styleOverrides: {
                root: ({ theme }) => ({
                    ...(theme.palette.mode === "light" && {
                        boxShadow: "none",
                        background: "#F5F5F7"
                    })

                }),
            },
        }
    }
})