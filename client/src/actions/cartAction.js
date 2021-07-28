import axios from 'axios';
import {
	CART_ADD_ITEM,
	CART_REMOVE_ITEM,
	CART_SAVE_PAYMENT_METHOD,
	CART_SAVE_SHIPPING_ADDRESS,
} from '../constants/cartConst';
let url = process.env.REACT_APP_API;
export const addToCart = (slug, qty) => async (dispatch, getState) => {
	const { data } = await axios.get(`${url}/product/${slug}`);
	dispatch({
		type: CART_ADD_ITEM,
		payload: {
			product: data.slug,
			name: data.name,
			image: data.images[0],
			originalPrice: data.originalPrice,
			discountPrice: data.discountPrice && data.discountPrice,
			available: data.quantity - data.sold,
			qty,
		},
	});

	localStorage.setItem(
		'cartItems',
		JSON.stringify(getState().cart.cartItems)
	);
};

export const removeFromCart = (slug) => async (dispatch, getState) => {
	dispatch({
		type: CART_REMOVE_ITEM,
		payload: slug,
	});

	localStorage.setItem(
		'cartItems',
		JSON.stringify(getState().cart.cartItems)
	);
};

export const saveShippingAddress = (data) => async (dispatch) => {
	dispatch({
		type: CART_SAVE_SHIPPING_ADDRESS,
		payload: data,
	});

	localStorage.setItem('shippingAddress', JSON.stringify(data));
};

export const savePaymentMethod = (data) => async (dispatch) => {
	dispatch({
		type: CART_SAVE_PAYMENT_METHOD,
		payload: data,
	});

	localStorage.setItem('paymentMethod', JSON.stringify(data));
};
