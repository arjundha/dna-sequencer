import {ThemeProvider} from "@mui/material/styles";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import theme from "./themes/AppTheme";
import "./index.css";
import CssBaseline from "@mui/material/CssBaseline";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<App />
		</ThemeProvider>
	</React.StrictMode>,
);
