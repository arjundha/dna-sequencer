import logo from "./logo.svg";
import "./App.css";
import Button from "@mui/material/Button";

function App(): JSX.Element {
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.tsx</code> and save to reload hehehe!
				</p>
				<a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
					Learn React
				</a>
			</header>
			<Button variant="contained">hello button</Button>
		</div>
	);
}

export default App;
