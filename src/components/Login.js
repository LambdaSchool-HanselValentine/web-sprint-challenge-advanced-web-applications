import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Login = () => {
	// make a post request to retrieve a token from the api
	// when you have handled the token, navigate to the BubblePage route

	const [formValues, setFormValues] = useState({ username: "", password: "" });
	const [error, setError] = useState("");

	const onChangeHandler = (e) => {
		setFormValues({ ...formValues, [e.target.name]: e.target.value });
	};

	const history = useHistory();
	const submitHandler = (e) => {
		e.preventDefault();
		axios
			.post("http://localhost:5000/api/login", formValues)
			.then((res) => {
				localStorage.setItem("token", res.data.payload);
				// ! history.push("/where?")
			})
			.catch((err) => {
				console.log(err);
				setError("Please enter correct username or password");
			});
	};

	// const error = "";
	// //replace with error state

	return (
		<div>
			<h1>Welcome to the Bubble App!</h1>
			<div data-testid="loginForm" className="login-form">
				<h2>Login</h2>
				<form onSubmit={submitHandler}>
					<input
						data-testid="username"
						type="text"
						name="username"
						value={formValues.username}
						onChange={onChangeHandler}
						placeholder="Enter Username"
					/>
					<input
						data-testid="password"
						type="password"
						name="password"
						value={formValues.password}
						onChange={onChangeHandler}
						placeholder="Enter Password"
					/>
					<button>Login</button>
				</form>
			</div>

			<p data-testid="errorMessage" className="error">
				{error}
			</p>
		</div>
	);
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state nessiary for form functioning.
//3. MAKE SURE YOUR USERNAME AND PASSWORD INPUTS INCLUDE data-testid="username" and data-testid="password"
//4. If either the username or password is not entered, display the following words with the p tag provided: Username or Password not valid.
//5. If the username / password is equal to Lambda / i<3Lambd4, save that token to localStorage.
