import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './SignUpScreen.css';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';

const SignUpScreen = ({ history }) => {
	const [email, setEmail] = useState('');

	let { userLogin } = useSelector((state) => ({ ...state }));

	useEffect(() => {
		if (userLogin && userLogin.token) history.push('/');
	}, [userLogin, history]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const config = {
			url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
			handleCodeInApp: true,
		};
		await auth.sendSignInLinkToEmail(email, config);
		toast.success(
			`Email is sent to ${email}. Click the link to complete your registration.`
		);
		window.localStorage.setItem('emailForRegistration', email);

		setEmail('');
	};

	return (
		<div className="form-container">
			<h1>Sign Up</h1>

			<form className="signup-form" onSubmit={handleSubmit}>
				<div className="content">
					<label htmlFor="email">Email</label>
					<input
						type="email"
						name="email"
						id="email"
						placeholder="Enter Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>

					<button className="signup-button" type="submit">
						SIGN UP
					</button>
					<p className="signup-p">
						Have an Account? <Link to="/login">Login</Link>
					</p>
				</div>
			</form>
		</div>
	);
};

export default SignUpScreen;

{
	/* <label htmlFor="name">Name</label>
					<input
						type="text"
						name="name"
						id="name"
						placeholder="Enter Name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
					/> */
}
{
	/* <label htmlFor="password">Password</label>
					<input
						type="password"
						name="password"
						id="password"
						placeholder="Enter Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
					<label htmlFor="confirmPassword">Confirm Password</label>
					<input
						type="password"
						name="confirmPassword"
						id="confirmPassword"
						placeholder="Confirm Password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				*/
}
