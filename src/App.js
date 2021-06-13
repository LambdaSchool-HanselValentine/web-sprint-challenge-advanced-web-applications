import React, { useState } from "react";
import { BrowserRouter as Router, Route, useHistory } from "react-router-dom";

import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import BubblePage from "./components/BubblePage";

import "./styles.scss";

function App() {
	const history = useHistory();
	const logoutHandler = () => {
		localStorage.removeItem("token");
		history.push("/");
	};

	return (
		<Router>
			<div className="App">
				<header>
					Color Picker Sprint Challenge
					<a data-testid="logoutButton" href="#" onClick={logoutHandler}>
						logout
					</a>
				</header>

				<Route exact path="/" component={Login} />
				<PrivateRoute path="/protected" component={BubblePage} />
			</div>
		</Router>
	);
}

export default App;

//Task List:
//1. Render BubblePage as a PrivateRoute
//2. Build the logout button to remove the localStorage Item.
