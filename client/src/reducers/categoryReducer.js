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

export const catListReducer = (state = [], action) => {
	switch (action.type) {
		case CAT_LIST_SUCCESS:
			return action.payload;
		case CAT_LIST_FAIL:
			return action.payload;
		default:
			return state;
	}
};

export const catReducer = (state = {}, action) => {
	switch (action.type) {
		case 'CAT_SUCCESS':
			return action.payload;
		case 'CAT_FAIL':
			return action.payload;
		default:
			return state;
	}
};

export const catProductListReducer = (state = { products: [] }, action) => {
	switch (action.type) {
		case CAT_PRODUCT_LIST_REQUEST:
			return { loading: true, products: [] };
		case CAT_PRODUCT_LIST_SUCCESS:
			return { loading: false, products: action.payload };
		case CAT_PRODUCT_LIST_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const createCatReducer = (state = { cat: {} }, action) => {
	switch (action.type) {
		case CREATE_CAT_REQUEST:
			return { loading: true, cat: {} };
		case CREATE_CAT_SUCCESS:
			return { loading: false, cat: action.payload };
		case CREATE_CAT_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};
