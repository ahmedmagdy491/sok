import {
	CAT_LIST_REQUEST,
	CAT_LIST_FAIL,
	CAT_LIST_SUCCESS,
	CAT_PRODUCT_LIST_REQUEST,
	CAT_PRODUCT_LIST_SUCCESS,
	CAT_PRODUCT_LIST_FAIL,
	CREATE_CAT_REQUEST,
	CREATE_CAT_SUCCESS,
	CREATE_CAT_FAIL,
} from '../constants/catConst';
import axios from 'axios';
import { notification } from 'antd';
let url = process.env.REACT_APP_API;

export const listCats = () => async (dispatch) => {
	try {
		dispatch({ type: CAT_LIST_REQUEST });

		const { data } = await axios.get(`${url}/category`);

		dispatch({
			type: CAT_LIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: CAT_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const getCat = (authtoken, slug) => async (dispatch) => {
	try {
		dispatch({ type: 'CAT_REQUEST' });

		const config = {
			headers: {
				authtoken,
			},
		};
		const { data } = await axios.get(`${url}/category/${slug}`, config);
		dispatch({
			type: 'CAT_SUCCESS',
			payload: data,
		});
	} catch (error) {
		console.log(error.response);
	}
};

export const createCatAction = (authtoken, values) => async (dispatch) => {
	try {
		dispatch({ type: CREATE_CAT_REQUEST });

		const config = {
			headers: {
				authtoken,
			},
		};
		const { data } = await axios.post(`${url}/category`, values, config);

		dispatch({
			type: CREATE_CAT_SUCCESS,
			payload: data,
		});
		if (data.success === true) {
			console.log('sucess', data);
			notification.success({
				message: 'Category has been created',
				placement: 'bottomLeft',
			});

			dispatch(listCats());
		}
	} catch (err) {
		if (err) {
			console.log('errrrr -->', err.response.data);
			notification.error({
				message: err.response.data,
				placement: 'bottomLeft',
			});
		}
	}
};

export const updateCatAction =
	(authtoken, values, slug) => async (dispatch) => {
		try {
			const config = {
				headers: {
					authtoken,
				},
			};
			const { data } = await axios.put(
				`${url}/category/${slug}`,
				values,
				config
			);

			if (data.success === true) {
				notification.success({
					message: 'Category has been updated',
					placement: 'bottomLeft',
				});
				dispatch(listCats());
			}
		} catch (err) {
			if (err) {
				notification.error({
					message: err.response.data.message,
					placement: 'bottomLeft',
				});
			}
		}
	};

export const listCatProduct = (slug) => async (dispatch) => {
	try {
		dispatch({ type: CAT_PRODUCT_LIST_REQUEST });

		const { data } = await axios.get(`${url}/cat/${slug}`);
		dispatch({
			type: CAT_PRODUCT_LIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: CAT_PRODUCT_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const removeCatAction = (authtoken, slug) => async (dispatch) => {
	try {
		const config = {
			headers: {
				authtoken,
			},
		};
		const { data } = await axios.delete(`${url}/category/${slug}`, config);
		console.log(data);
		if (data.success) {
			notification.success({
				message: 'Done !',
				description: 'the user have been removed successfully',
				placement: 'bottomLeft',
			});
			dispatch(listCats());
		}
	} catch (error) {
		console.log(error);
	}
};
