import React from 'react';
import './assets/navbar.css';
import { Navbar, Button, Form, TabContainer } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import NavItems from './Nav';
import { useDispatch, useSelector } from 'react-redux';
import firebase from 'firebase';
const Header = () => {
	const dispatch = useDispatch();
	let { userLogin } = useSelector((state) => ({ ...state }));
	const logout = () => {
		firebase.auth().signOut();
		dispatch({
			type: 'LOGOUT',
			payload: null,
		});
		localStorage.removeItem('userInfo');
		localStorage.removeItem('cartItems');
		localStorage.removeItem('paymentMethod');
		localStorage.removeItem('shippingAddress');
		history.push('/signin');
	};
	const history = useHistory();

	return (
		<Navbar
			bg="light"
			expand="lg"
			sticky="top"
			className="nav menu-desktop  fixed animated slideInDown"
		>
			<TabContainer>
				<Navbar.Brand>
					<Link to="/">SILKS OF KASHMIR</Link>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="navbarScroll" />
				<Navbar.Collapse id="navbarScroll">
					<NavItems />
					<Form className="d-flex justify-content-between">
						{!userLogin ? (
							<>
								<Button
									className="shop mr-4"
									onClick={() => history.push('/signin')}
								>
									LOGIN
								</Button>

								<Button
									className="account"
									onClick={() => history.push('/signup')}
								>
									REGISTER
								</Button>
							</>
						) : (
							<Button className="shop" onClick={logout}>
								LOGOUT
							</Button>
						)}
					</Form>
				</Navbar.Collapse>
			</TabContainer>
		</Navbar>
	);
};

export default Header;
