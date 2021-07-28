import React, { useState } from 'react';
import { Menu, Switch, Divider, Button } from 'antd';

import { AppstoreOutlined, LinkOutlined } from '@ant-design/icons';
import './AdminMenu.css';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
const { SubMenu } = Menu;

const AdminMenu = ({
	showProductDrawer,
	showCatDrawer,
	showPannerDrawer,
	showCatsDrawer,
	showAddUserDrawer,
}) => {
	const [mode, setMode] = React.useState('inline');
	const [theme, setTheme] = React.useState('light');
	const history = useHistory();
	const changeMode = (value) => {
		setMode(value ? 'vertical' : 'inline');
	};

	const { userLogin } = useSelector((state) => ({ ...state }));

	const changeTheme = (value) => {
		setTheme(value ? 'dark' : 'light');
	};
	const [collapsed, setCollapsed] = useState(true);
	const toggleCollapsed = () => {
		setCollapsed(!collapsed);
	};

	return (
		<>
			{userLogin && userLogin.role === 'admin' && (
				<div id="menu" style={{ width: 256 }}>
					<Button
						type="primary"
						onClick={toggleCollapsed}
						style={{ marginBottom: 16 }}
					>
						Collapsed
					</Button>

					<Menu
						mode={mode}
						theme={theme}
						inlineCollapsed={collapsed}
						className="menu"
					>
						<Menu.Item key="9">
							<Switch onChange={changeMode} /> Mode
							<Divider type="vertical" />
							<Switch onChange={changeTheme} /> Style
						</Menu.Item>

						<SubMenu
							key="sub1"
							icon={<AppstoreOutlined />}
							title="Category"
						>
							<Menu.Item key="3" onClick={showCatDrawer}>
								Add New Category
							</Menu.Item>
							<Menu.Item key="4" onClick={showCatsDrawer}>
								Get All Categories
							</Menu.Item>
						</SubMenu>
						<SubMenu
							key="sub2"
							icon={<AppstoreOutlined />}
							title="Product"
						>
							<Menu.Item key="5" onClick={showProductDrawer}>
								Add New Product
							</Menu.Item>
							<Menu.Item key="6">Get All Products</Menu.Item>
						</SubMenu>
						<SubMenu
							key="sub3"
							icon={<AppstoreOutlined />}
							title="User"
						>
							<Menu.Item key="7" onClick={showAddUserDrawer}>
								Add New User
							</Menu.Item>
							<Menu.Item
								key="8"
								onClick={() => history.push('/admin/userlist')}
							>
								Get All Users
							</Menu.Item>
						</SubMenu>
						<Menu.Item
							key="orders"
							icon={<LinkOutlined />}
							onClick={() => history.push('/admin/orderlist')}
						>
							Orders
						</Menu.Item>
						<Menu.Item
							key="panner"
							icon={<LinkOutlined />}
							onClick={showPannerDrawer}
						>
							Panner
						</Menu.Item>
					</Menu>
				</div>
			)}
		</>
	);
};

export default AdminMenu;
