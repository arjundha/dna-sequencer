import "./App.css";
import FormTabs from "./components/FormTabs";
import {Container} from "@mui/material";

function App() {
	return (
		<Container>
			<h1>DNA Sequencer</h1>
			<FormTabs />
		</Container>
	);
}

export default App;
