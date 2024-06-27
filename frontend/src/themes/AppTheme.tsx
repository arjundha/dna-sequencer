import {createTheme} from "@mui/material/styles";
import {ThemeOptions} from "@mui/material/styles";

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
					background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
					border: 0,
					borderRadius: 3,
					boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
					color: "white",
					height: 48,
					padding: "0 30px",
				},
			},
		},
	},
};

export const theme = createTheme(themeOptions);

export default theme;
