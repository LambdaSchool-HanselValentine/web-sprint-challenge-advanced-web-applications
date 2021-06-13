//Task List:
//1. Build a PrivateRoute component that redirects if user is not logged in

import React from "react";
import { Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) => {
				if (localStorage.getItem("token")) {
					return <Component {...props} />;
				} else {
					return <h1> Please login to continue </h1>;
				}
			}}
		/>
	);
};

export default PrivateRoute;
