import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

// import {
// 	editColorService,
// 	deleteColorService,
// } from "../services/colorServices";
import fetchColorService from "../services/fetchColorService";
import { axiosWithAuth } from "../helpers/axiosWithAuth";

const BubblePage = () => {
	const [colors, setColors] = useState([]);
	const [editing, setEditing] = useState(false);
	const { id } = useParams();

	useEffect(() => {
		fetchColorService().then((res) => {
			setColors(res);
			// console.log(res);
		});
	}, []);

	const toggleEdit = (value) => {
		setEditing(value);
	};

	const saveEdit = (editColor) => {
		axios
			.put(`http://localhost:5000/api/colors/${id}`, editColor)
			.then((res) => {
				console.log(res.data);
				setColors(res.data);
			});
	};

	const deleteColor = (colorToDelete) => {
		axios
			.delete(`http://localhost:5000/api/colors/${colorToDelete}`)
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	};

	return (
		<div className="container">
			<ColorList
				colors={colors}
				editing={editing}
				toggleEdit={toggleEdit}
				saveEdit={saveEdit}
				deleteColor={deleteColor}
			/>
			<Bubbles colors={colors} />
		</div>
	);
};

export default BubblePage;

//Task List:
//1. When the component mounts, make an axios call to retrieve all color data and push to state.
//2. Complete saveEdit, deleteColor functions
