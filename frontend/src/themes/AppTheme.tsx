import {createTheme} from "@mui/material/styles";
import {ThemeOptions} from "@mui/material/styles";
import Lato from "../assets/Lato-Regular.ttf";

export const themeOptions: ThemeOptions = {
	palette: {
		mode: "light",
		primary: {
			main: "#083D77",
		},
		secondary: {
			main: "#F95738",
		},
		background: {
			default: "#EBEBD3",
		},
	},
	typography: {
		fontFamily: "Lato",
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					background: "linear-gradient(135deg, #083D77 30%, #EE964B 90%)",
					border: 0,
					borderRadius: 3,
					boxShadow: "0 3px 5px 2px rgba(8, 61, 119, .3)",
					color: "white",
					height: 48,
					padding: "0 30px",
				},
			},
		},
		MuiCssBaseline: {
			styleOverrides: `
			  @font-face {
				font-family: 'Lato';
				font-style: normal;
				font-display: swap;
				font-weight: 400;
				src: local('Lato'), local('Lato-Regular'), url(${Lato}) format('ttf');
				unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
			  }
			`,
		},
	},
};

export const theme = createTheme(themeOptions);

export default theme;
