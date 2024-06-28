import "./App.css";
import FormTabs from "./components/FormTabs";
import {Container} from "@mui/material";

function App() {
	// const [count, setCount] = useState(0);
	// <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>

	return (
		<Container>
			<h1>DNA Sequencer</h1>
			<FormTabs />
		</Container>
	);
}

export default App;
