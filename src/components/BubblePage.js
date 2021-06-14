import React, { useEffect, useState } from "react";
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
	// const { id } = props.match.params;

	useEffect(() => {
		fetchColorService().then((res) => {
			setColors(res);
		});
	}, []);

	const toggleEdit = (value) => {
		setEditing(value);
	};

	const saveEdit = (editColor) => {
		axiosWithAuth()
			.put(`http://localhost:5000/api/colors/${id}`, editColor)
			.then((res) => {
				setColors([...colors, res.data]);
				console.log(colors);
			});
	};

	const deleteColor = (colorToDelete) => {
		axiosWithAuth()
			.delete(`http://localhost:5000/api/colors/${colorToDelete.id}`)
			.then((res) => {
				// the return data is the ID of the color to delete. So:
				const colorsArray = colors;
				setColors(colorsArray.filter((color) => color.id !== res.data));
			})
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
