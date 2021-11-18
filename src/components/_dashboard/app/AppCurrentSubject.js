import { Card, CardHeader } from "@mui/material";

export default function AppCurrentSubject(props) {
	const { data } = props;

	return (
		<Card>
			<CardHeader title="Current Subject" />
			{/* <Alert severity="info">Replace this with the data coming from API!</Alert> */}
			<div style={{ padding: 5, maxHeight: 300, overflow: "auto" }}>
				<label>{data}</label>
			</div>
		</Card>
	);
}
