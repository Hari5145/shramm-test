import PropTypes from "prop-types";
import { useState } from "react";
import { Form, FormikProvider, useFormik } from "formik";
// material
import {
	Box,
	Card,
	Checkbox,
	CardHeader,
	Typography,
	FormControlLabel,
	Stack,
} from "@mui/material";

// ----------------------------------------------------------------------

const TASKS = [
	"Create FireStone Logo",
	"Add SCSS and JS files if required",
	"Stakeholder Meeting",
	"Scoping & Estimations",
	"Sprint Showcase",
];

// ----------------------------------------------------------------------

TaskItem.propTypes = {
	task: PropTypes.string,
	checked: PropTypes.bool,
	formik: PropTypes.object,
};

function TaskItem({ task, checked, formik, ...other }) {
	const { getFieldProps } = formik;

	return (
		<Stack direction="row" justifyContent="space-between" sx={{ py: 0.75 }}>
			<FormControlLabel
				control={
					<Checkbox
						{...getFieldProps("checked")}
						value={task}
						checked={checked}
						{...other}
					/>
				}
				label={
					<Typography
						variant="body2"
						sx={{
							...(checked && {
								color: "text.disabled",
								textDecoration: "line-through",
							}),
						}}
					>
						{task}
					</Typography>
				}
			/>
		</Stack>
	);
}

export default function AppTasks() {
	const [inp, setInp] = useState("");
	const [tasks, setTasks] = useState([...TASKS]);

	const addTask = () => {
		if (inp.trim() !== "") { //trim removes white spaces
			//checks if entry is empty string
			setTasks([inp, ...tasks]); //updates the state with a new entry
		}
	};

	const formik = useFormik({
		initialValues: {
			checked: [tasks[2]],
		},
		onSubmit: values => {
			console.log(values);
		},
	});

	const { values, handleSubmit } = formik;

	return (
		<Card>
			<CardHeader title="Tasks" />
			<Box sx={{ px: 3, py: 1 }}>
				<div style={{ display: "flex" }}>
					<input
						style={{
							padding: 5,
							border: "1px solid lightgrey",
							borderRadius: 4,
						}}
						onChange={e => setInp(e.target.value)}
					/>
					<button
						style={{
							marginLeft: 10,
							padding: "5px 20px",
							color: "#fff",
							backgroundColor: "#00ff00",
							borderRadius: 4,
							border: "1px solid transparent",
						}}
						onClick={addTask}
					>
						Add
					</button>
				</div>
				<FormikProvider value={formik}>
					<Form autoComplete="off" noValidate onSubmit={handleSubmit}>
						{tasks.map((task, i) => (
							<TaskItem
								key={`task-${i}`}
								task={task}
								formik={formik}
								checked={values.checked.includes(task)}
							/>
						))}
					</Form>
				</FormikProvider>
			</Box>
		</Card>
	);
}
