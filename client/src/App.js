import React, { Fragment, useState, useEffect } from 'react';
import Header from './components/Navbar/Navbar';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from './firebase';
import { Container } from 'react-bootstrap';
import LandingPage from './pages/landing page/Landing';
import CreateCategory from './pages/Categories/CreateCategory';
import SignUpScreen from './pages/SignUpScreen/SignUpScreen';
import LoginScreen from './pages/LoginScreen/LoginScreen';
import UserEditScreen from './pages/EditUserScreen/EditUserScreen';
import UserListScreen from './pages/UserListScreen/UserListScreen';
import ProductDetails from './pages/Products/Product Details/ProductDetails';
import Products from './pages/Products/Products/Products';
import AdminMenu from './components/Admin/Menu/AdminMenu';
import Create from './components/Admin/Forms/Category/Create';
import Cart from './pages/Cart/Cart';
import CreateProduct from './components/Admin/Forms/Product.js/Create';
import OrderScreen from './pages/Order/OrderScreen';
import ShippingScreen from './pages/Shipping/ShippingScreen';
import PaymentScreen from './pages/Payment/PaymentScreen';
import PlaceOrderScreen from './pages/Place Order/PlaceOrderScreen';
import OrderListScreen from './pages/Order List/OrderListScreen';
import Shop from './pages/Shop/Shop';
import UpdateProduct from './components/Admin/Forms/Product.js/Update';
import RegisterComplete from './pages/SignUpScreen/RegisterComplete';
import { createOrUpdateUserAction, currentUser } from './actions/userActions';
import ForgetPassword from './pages/Forget Password/ForgetPassword';
import PannerUpload from './components/Panner/PannerUpload';
import CategoriesDrawer from './pages/Categories/CategoriesDrawer.js';
import AddUser from './pages/Add User/AddUser';
import ProfileScreen from './pages/Profile Screen/ProfileScreen';
const App = () => {
	const [productVisible, setProductVisible] = useState(false);
	const [productUpdateVisible, setProductUpdateVisible] = useState(false);
	const [catVisible, setCatVisible] = useState(false);
	const [pannerVisible, setPannerVisible] = useState(false);
	const [catsVisible, setCatsVisible] = useState(false);
	const [addUserDrawer, setAddUserVisible] = useState(false);

	const open = (set) => {
		set(true);
	};

	const close = (set) => {
		set(false);
	};

	return (
		<Fragment>
			<Router>
				<Header />
				<PannerUpload
					onClose={() => close(setPannerVisible)}
					visible={pannerVisible}
				/>
				<AdminMenu
					showProductDrawer={() => open(setProductVisible)}
					showCatDrawer={() => open(setCatVisible)}
					showPannerDrawer={() => open(setPannerVisible)}
					showCatsDrawer={() => open(setCatsVisible)}
					showAddUserDrawer={() => open(setAddUserVisible)}
				/>
				<Create
					onCatClose={() => close(setCatVisible)}
					visible={catVisible}
				/>
				<CreateProduct
					onProductClose={() => close(setProductVisible)}
					visible={productVisible}
				/>
				<UpdateProduct
					visible={productUpdateVisible}
					closeDrawer={() => close(setProductUpdateVisible)}
				/>
				<CategoriesDrawer
					onClose={() => close(setCatsVisible)}
					visible={catsVisible}
				/>

				<AddUser
					onClose={() => close(setAddUserVisible)}
					visible={addUserDrawer}
				/>

				<Container className="mt-5">
					<Route path="/" component={LandingPage} exact />
					<Route path="/signup" component={SignUpScreen} />
					<Route
						path="/register/complete"
						component={RegisterComplete}
						exact
					/>
					<Route path="/signin" component={LoginScreen} />
					<Route path="/forgetpassword" component={ForgetPassword} />
					<Route
						path="/admin/user/:id/edit"
						component={UserEditScreen}
					/>
					<Route path="/admin/userlist" component={UserListScreen} />
					<Route path="/createcat" component={CreateCategory} exact />
					<Route
						path="/:slug/products"
						component={(routeProps) => (
							<Products
								showDrawer={() => open(setProductUpdateVisible)}
								{...routeProps}
							/>
						)}
						exact
					/>
					<Route
						path="/:catSlug/:productSlug"
						component={ProductDetails}
						exact
					/>
					<Route path="/profile" component={ProfileScreen} />
					<Route path="/shop" component={Shop} exact />
					<Route path="/cart/:slug?" component={Cart} exact />
					<Route path="/order/:id" component={OrderScreen} exact />
					<Route path="/shipping" component={ShippingScreen} exact />
					<Route path="/payment" component={PaymentScreen} exact />
					<Route path="/placeorder" component={PlaceOrderScreen} />
					<Route
						path="/admin/orderlist"
						component={OrderListScreen}
					/>
				</Container>
			</Router>
		</Fragment>
	);
};
export default App;
