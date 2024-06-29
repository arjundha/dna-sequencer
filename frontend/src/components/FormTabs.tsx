import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import DNASequencerForm from "./DNASequencerForm";
import RNATranslatorFrom from "./RNATranslaterForm";
import FileUploadForm from "./FileUploadForm";

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

function CustomTabPanel(props: TabPanelProps) {
	const {children, value, index, ...other} = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && <Box sx={{p: 3}}>{children}</Box>}
		</div>
	);
}

export default function BasicTabs() {
	const [value, setValue] = React.useState(0);

	const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	return (
		<Box sx={{width: "100%"}}>
			<Box sx={{borderBottom: 1, borderColor: "divider"}}>
				<Tabs
					value={value}
					onChange={handleChange}
					aria-label="basic tabs example"
					// centered
					variant="scrollable"
					scrollButtons="auto"
				>
					<Tab label="DNA Sequencer" />
					<Tab label="RNA Translater" />
					<Tab label="Sequence from File" />
				</Tabs>
			</Box>
			<CustomTabPanel value={value} index={0}>
				<DNASequencerForm />
			</CustomTabPanel>
			<CustomTabPanel value={value} index={1}>
				<RNATranslatorFrom />
			</CustomTabPanel>
			<CustomTabPanel value={value} index={2}>
				<FileUploadForm />
			</CustomTabPanel>
		</Box>
	);
}
