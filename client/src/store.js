import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
	catListReducer,
	catProductListReducer,
	createCatReducer,
	catReducer,
} from './reducers/categoryReducer';
import {
	productCreateReducer,
	productListReducer,
	productDetailsReducer,
	productReviewCreateReducer,
	productUpdateReducer,
} from './reducers/productReducer';

import { cartReducer } from './reducers/cartReducer';
import {
	userDetailsReducer,
	userUpdateProfileReducer,
	userListReducer,
	userDeleteReducer,
	userUpdateReducer,
	addToWishListReducer,
	createOrUpdateUserReducer,
} from './reducers/userReducers.js';

import {
	orderCreateReducer,
	orderDeliverReducer,
	orderDetailsReducer,
	orderListMyReducer,
	orderListReducer,
	orderPayReducer,
	addNoteReducer,
} from './reducers/orderReducer';
const reducer = combineReducers({
	userLogin: createOrUpdateUserReducer,
	userDetails: userDetailsReducer,
	userUpdateProfile: userUpdateProfileReducer,
	userList: userListReducer,
	userDelete: userDeleteReducer,
	userUpdate: userUpdateReducer,
	addToWishList: addToWishListReducer,
	catList: catListReducer,
	productCreate: productCreateReducer,
	productUpdate: productUpdateReducer,
	productList: productListReducer,
	catProductList: catProductListReducer,
	cat: catReducer,
	productDetails: productDetailsReducer,
	cart: cartReducer,
	createCat: createCatReducer,
	productReviewCreate: productReviewCreateReducer,
	orderCreate: orderCreateReducer,
	orderDetails: orderDetailsReducer,
	orderPay: orderPayReducer,
	orderDeliver: orderDeliverReducer,
	orderListMy: orderListMyReducer,
	orderList: orderListReducer,
	orderNote: addNoteReducer,
});

const userLogin = localStorage.getItem('userInfo')
	? JSON.parse(localStorage.getItem('userInfo'))
	: null;

const cartItemsFormStorge = localStorage.getItem('cartItems')
	? JSON.parse(localStorage.getItem('cartItems'))
	: [];

const shippingAddressFormStorge = localStorage.getItem('shippingAddress')
	? JSON.parse(localStorage.getItem('shippingAddress'))
	: {};

const initialState = {
	userLogin,
	cart: {
		cartItems: cartItemsFormStorge,
		shippingAddress: shippingAddressFormStorge,
	},
};

const middleware = [thunk];
// create store
const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
