import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { createOrUpdateUserAction } from '../../actions/userActions';

const RegisterComplete = ({ history }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	let dispatch = useDispatch();

	useEffect(() => {
		setEmail(window.localStorage.getItem('emailForRegistration'));
		console.log(window.location.href);
		console.log(window.localStorage.getItem('emailForRegistration'));
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		// validation
		if (!email || !password) toast.error('Email and Password are required');
		if (password.length < 6)
			toast.error('Password must be at least 6 characters long');
		try {
			const result = await auth.signInWithEmailLink(
				email,
				window.location.href
			);
			// console.log('Result', result);
			if (result.user.emailVerified) {
				// remove user email from local storage
				window.localStorage.removeItem('emailForRegistration');
				// get user id token
				let user = auth.currentUser;
				await user.updatePassword(password);
				const idTokenResult = await user.getIdTokenResult();
				dispatch(createOrUpdateUserAction(idTokenResult.token));

				// redux store
				console.log('user', user, 'idTokenResult', idTokenResult);
				// redirect
				history.push('/');
			}
		} catch (error) {
			console.log(error);
			toast.error(error.message);
		}
	};
	const completeRegistrationForm = () => (
		<form onSubmit={handleSubmit}>
			<input
				type="email"
				className="form-control"
				value={email}
				disabled
			/>
			<input
				type="password"
				className="form-control"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				placeholder="Password"
				autoFocus
			/>
			<br />

			<button type="submit" className="btn btn-raised text-primary mt-4">
				Complete Registration
			</button>
		</form>
	);

	return (
		<div className="container p-5">
			<div className="row">
				<div className="col-md-6 offset-md-3">
					<h4 className="text-primary">Complete Registration</h4>
					{completeRegistrationForm()}
				</div>
			</div>
		</div>
	);
};

export default RegisterComplete;
