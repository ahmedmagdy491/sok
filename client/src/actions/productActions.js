import {
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
	PRODUCT_LIST_FAIL,
	PRODUCT_CREATE_REQUEST,
	PRODUCT_CREATE_SUCCESS,
	PRODUCT_CREATE_FAIL,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_DETAILS_FAIL,
	PRODUCT_CREATE_REVIEW_REQUEST,
	PRODUCT_CREATE_REVIEW_SUCCESS,
	PRODUCT_CREATE_REVIEW_FAIL,
} from '../constants/productConst';
import axios from 'axios';
import { notification } from 'antd';
import { listCatProduct } from './catActions';
import { useParams } from 'react-router-dom';

let url = process.env.REACT_APP_API;

export const productListAction = () => async (dispatch) => {
	try {
		dispatch({ type: PRODUCT_LIST_REQUEST });

		const { data } = await axios.get(`${url}/product`);
		console.log('data from action', data);
		dispatch({
			type: PRODUCT_LIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: PRODUCT_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const productCreateAction = (authtoken, product) => async (dispatch) => {
	try {
		dispatch({ type: PRODUCT_CREATE_REQUEST });

		const config = {
			headers: {
				'Content-Type': 'application/json',
				authtoken,
			},
		};
		const { data } = await axios.post(`${url}/product`, product, config);
		if (data.success === true) {
			notification.success({
				message: 'Product has been updated',
				placement: 'bottomLeft',
			});
			productListAction();
			const params = useParams();
			if (params.productSlug) {
				listCatProduct(params.productSlug);
			}
		}
	} catch (error) {
		dispatch({
			type: PRODUCT_CREATE_FAIL,
			payload:
				error.response && error.response.data
					? error.response.data
					: error.data,
		});
	}
};

export const productUpdateAction =
	(slug, product) => async (dispatch, getState) => {
		try {
			const { data } = await axios.put(
				`${url}/product/${slug}`,
				product
				// config
			);
			if (data.success === true) {
				notification.success({
					message: 'Product has been updated',
					placement: 'bottomLeft',
				});
				listCatProduct(slug);
			}
		} catch (error) {
			if (error) {
				notification.error({
					message: error.response.data,
					placement: 'bottomLeft',
				});
				listCatProduct(slug);
			}
		}
	};

export const productDetailsAction = (slug) => async (dispatch) => {
	try {
		dispatch({ type: PRODUCT_DETAILS_REQUEST });

		const { data } = await axios.get(`${url}/product/${slug}`);
		dispatch({
			type: PRODUCT_DETAILS_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: PRODUCT_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const createProductReview =
	(productSlug, review) => async (dispatch, getState) => {
		try {
			dispatch({
				type: PRODUCT_CREATE_REVIEW_REQUEST,
			});

			const {
				userLogin: { userInfo },
			} = getState();

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${userInfo.token}`,
				},
			};

			await axios.post(
				`${url}/product/${productSlug}/reviews`,
				review,
				config
			);

			dispatch({
				type: PRODUCT_CREATE_REVIEW_SUCCESS,
			});
		} catch (error) {
			const message =
				error.response && error.response.data.message
					? error.response.data.message
					: error.message;
			if (message === 'Not authorized, token failed') {
				// dispatch(logout());
			}
			dispatch({
				type: PRODUCT_CREATE_REVIEW_FAIL,
				payload: message,
			});
		}
	};

export const deleteProductAction = (authtoken, slug) => async (dispatch) => {
	try {
		const config = {
			headers: {
				authtoken,
			},
		};
		const { data } = await axios.delete(`${url}/product/${slug}`, config);
		console.log(data);
		if (data.success) {
			notification.warning({
				message: 'product has been deleted',
				placement: 'bottomLeft',
			});
			listCatProduct(slug);
		}
	} catch (err) {
		if (err) {
			notification.error({
				message: err.response.data.err,
				placement: 'bottomLeft',
			});
		}
	}
};
