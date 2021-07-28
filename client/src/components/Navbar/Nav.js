import React from 'react';
import {
	Navbar,
	Button,
	Form,
	FormControl,
	Nav,
	Container,
} from 'react-bootstrap';
import './assets/navbar.css';
import { Link } from 'react-router-dom';
import DropDown from './DropDown';

const NavItems = () => {
	return (
		<Nav
			className="mr-auto ml-auto my-2 my-lg-0"
			style={{ maxHeight: '100px' }}
			navbarScroll
		>
			<Nav.Link>
				<Link to="/" className="links text-decoration-none">
					home
				</Link>
				<Link to="/about" className="links text-decoration-none">
					about
				</Link>
				<Link to="/contact" className="links text-decoration-none">
					contact
				</Link>
			</Nav.Link>

			<DropDown />
		</Nav>
	);
};

export default NavItems;
