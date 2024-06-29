import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";

export default function BottomNavBar() {
	const [value, setValue] = React.useState(0);

	return (
		<Box sx={{width: 500}}>
			<BottomNavigation
				showLabels
				value={value}
				onChange={(_event, newValue) => {
					setValue(newValue);
				}}
				sx={{width: "100%", position: "fixed", bottom: 0, backgroundColor: "transparent"}}
				// className="stickToBottom"
			>
				<BottomNavigationAction
					label="GitHub"
					icon={<GitHubIcon />}
					href="https://github.com/arjundha"
					target="_blank"
					sx={{"&.Mui-selected": {color: "black"}}}
				/>
				<BottomNavigationAction
					label="LinkedIn"
					icon={<LinkedInIcon />}
					href="https://www.linkedin.com/in/arjun-dhaliwal/"
					target="_blank"
					sx={{"&.Mui-selected": {color: "black"}}}
				/>
				<BottomNavigationAction
					label="More Things I Made"
					icon={<EmojiPeopleIcon />}
					href="https://arjundha.github.io/"
					target="_blank"
					sx={{"&.Mui-selected": {color: "black"}}}
				/>
			</BottomNavigation>
		</Box>
	);
}
