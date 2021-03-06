import React, { useEffect, useState } from 'react';
import { auth, googleAuthProvider } from '../../firebase';
import { toast } from 'react-toastify';
import { Button, notification } from 'antd';
import { GoogleOutlined, MailOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrUpdateUserAction } from '../../actions/userActions';

const LoginScreen = ({ history }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	let { userLogin } = useSelector((state) => ({
		...state,
	}));
	const [loading, setLoading] = useState(false);

	const roleBasedRedirect = (user) => {
		if (user && user.role === 'admin') history.push('/admin/dashboard');
		else history.push('/user/history');
	};

	let dispatch = useDispatch();
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			let result = await auth.signInWithEmailAndPassword(email, password);

			const { user } = result;
			const idTokenResult = await user.getIdTokenResult();

			dispatch(createOrUpdateUserAction(idTokenResult.token));
			roleBasedRedirect(userLogin);
			let name =
				user && user.displayName
					? user.displayName
					: user.email.split('@')[0];
			notification.info({
				message: `Hello ${name} !`,
				placement: 'topRight',
				style: {
					marginTop: '80px',
				},
				duration: 15,
			});

			history.push('/');
		} catch (error) {
			notification.error({
				message: 'Oops !',
				description: error.message,
				placement: 'bottomLeft',
			});
			setLoading(false);
		}
	};

	const googleLogin = async () => {
		auth.signInWithPopup(googleAuthProvider)
			.then(async (result) => {
				const { user } = result;
				const idTokenResult = await user.getIdTokenResult();
				dispatch(createOrUpdateUserAction(idTokenResult.token));
				roleBasedRedirect(userLogin);
			})
			.catch((error) => {
				console.log(error);
				toast.error(error.message);
			});
	};

	const loginForm = () => (
		<form onSubmit={handleSubmit}>
			<div className="form-group">
				<input
					type="email"
					className="form-control"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Your Email"
					autoFocus
				/>
			</div>
			<br />
			<div className="form-group">
				<input
					type="password"
					className="form-control"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Your Password"
					autoFocus
				/>
			</div>
			<br />
			<Button
				onClick={handleSubmit}
				type="primary"
				className="mb-3"
				block
				shape="round"
				icon={<MailOutlined />}
				size="large"
				disabled={!email || password.length < 6}
			>
				Login with Email/Password
			</Button>
		</form>
	);

	return (
		<div className="container p-5">
			<div className="row">
				<div className="col-md-6 offset-md-3">
					{loading ? (
						<h4 className="text-danger">Loading...</h4>
					) : (
						<h4>Login</h4>
					)}
					{loginForm()}
					<Button
						onClick={googleLogin}
						type="danger"
						className="mb-3"
						block
						shape="round"
						icon={<GoogleOutlined />}
						size="large"
					>
						Login with Google
					</Button>
					<Link
						className="float-right text-danger"
						to="/forgetpassword"
					>
						Forgot Password
					</Link>
				</div>
			</div>
		</div>
	);
};

export default LoginScreen;
