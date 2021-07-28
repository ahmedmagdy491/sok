import React, { Fragment } from 'react';
import { Menu, Dropdown, Button } from 'antd';
import { Link } from 'react-router-dom';
import './assets/navbar.css';
import { useSelector } from 'react-redux';

const DropDown = () => {
	const { userLogin } = useSelector((state) => ({ ...state }));

	const menu = (
		<Fragment>
			<Menu>
				<Menu.Item>
					<Link to={userLogin ? '/shipping' : 'signin'}>
						Checkout
					</Link>
				</Menu.Item>
				<Menu.Item>
					<Link to={userLogin ? '/cart' : 'signin'}>Cart</Link>
				</Menu.Item>
				<Menu.Item>
					<Link to={userLogin ? '/profile' : 'signin'}>Profile</Link>
				</Menu.Item>
			</Menu>
		</Fragment>
	);
	return (
		<>
			{userLogin && (
				<Dropdown overlay={menu} placement="bottomCenter">
					<Button className="drop-down">MY ACCOUNT</Button>
				</Dropdown>
			)}
		</>
	);
};

export default DropDown;
