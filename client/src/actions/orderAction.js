import axios from 'axios';
const url = process.env.REACT_APP_API;

export const createOrder = (authtoken, order) => async (dispatch, getState) => {
	try {
		dispatch({
			type: 'ORDER_CREATE_REQUEST',
		});

		const config = {
			headers: {
				'Content-Type': 'application/json',
				authtoken,
			},
		};

		const { data } = await axios.post(`${url}/orders`, order, config);

		dispatch({
			type: 'ORDER_CREATE_SUCCESS',
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: 'ORDER_CREATE_FAIL',
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: 'ORDER_DETAILS_REQUEST',
		});

		const { userLogin } = getState();
		const authtoken = userLogin.token;

		const config = {
			headers: {
				authtoken,
			},
		};

		const { data } = await axios.get(`${url}/orders/${id}`, config);

		dispatch({
			type: 'ORDER_DETAILS_SUCCESS',
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: 'ORDER_DETAILS_FAIL',
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const deliverOrder = (order) => async (dispatch, getState) => {
	try {
		dispatch({
			type: 'ORDER_DELIVER_REQUEST',
		});

		const { userLogin } = getState();
		const authtoken = userLogin.token;

		const config = {
			headers: {
				'Content-Type': 'application/json',
				authtoken,
			},
		};

		const { data } = await axios.put(
			`${url}/orders/${order._id}/deliver`,
			{},
			config
		);

		dispatch({
			type: 'ORDER_DELIVER_SUCCESS',
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: 'ORDER_DELIVER_FAIL',
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const payOrder =
	(orderId, paymentResult) => async (dispatch, getState) => {
		try {
			dispatch({
				type: 'ORDER_PAY_REQUEST',
			});

			const { userLogin } = getState();
			const authtoken = userLogin.token;

			const config = {
				headers: {
					'Content-Type': 'application/json',
					authtoken,
				},
			};

			const { data } = await axios.put(
				`${url}/orders/${orderId}/pay`,
				paymentResult,
				config
			);

			dispatch({
				type: 'ORDER_PAY_SUCCESS',
				payload: data,
			});
		} catch (error) {
			dispatch({
				type: 'ORDER_PAY_FAIL',
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};

export const listMyOrders = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: 'ORDER_LIST_MY_REQUEST',
		});

		const { userLogin } = getState();
		const authtoken = userLogin.token;

		const config = {
			headers: {
				authtoken,
			},
		};

		const { data } = await axios.get(`${url}/orders/myorders`, config);

		dispatch({
			type: 'ORDER_LIST_MY_SUCCESS',
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: 'ORDER_LIST_MY_FAIL',
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const listOrders = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: 'ORDER_LIST_REQUEST',
		});

		const { userLogin } = getState();
		const authtoken = userLogin.token;

		const config = {
			headers: {
				authtoken,
			},
		};

		const { data } = await axios.get(`${url}/orders`, config);

		dispatch({
			type: 'ORDER_LIST_SUCCESS',
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: 'ORDER_LIST_FAIL',
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const addNote = (orderId, note) => async (dispatch, getState) => {
	try {
		dispatch({
			type: 'ORDER_NOTE_REQUEST',
		});

		const { userLogin } = getState();
		const authtoken = userLogin.token;

		const config = {
			headers: {
				authtoken,
			},
		};

		const { data } = await axios.put(
			`${url}/orders/${orderId}/note`,
			note,
			config
		);

		console.log(note);
		dispatch({
			type: 'ORDER_NOTE_SUCCESS',
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: 'ORDER_NOTE_FAIL',
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const addState = (orderId, state) => async (dispatch, getState) => {
	try {
		dispatch({
			type: 'ORDER_STATE_REQUEST',
		});

		const { userLogin } = getState();
		const authtoken = userLogin.token;

		const config = {
			headers: {
				authtoken,
			},
		};

		const { data } = await axios.put(
			`${url}/orders/${orderId}/state`,
			state,
			config
		);

		console.log(state);
		dispatch({
			type: 'ORDER_STATE_SUCCESS',
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: 'ORDER_STATE_FAIL',
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
