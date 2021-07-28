import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productListAction } from './../../actions/productActions';
import Skeleton from './../../components/Loader/Skeleton';
const CartPanner = () => {
	let dispatch = useDispatch();
	useEffect(() => {
		dispatch(productListAction());
	}, [dispatch]);

	const { productList } = useSelector((state) => ({ ...state }));
	const { loading, products } = productList;
	return <div>{loading ? <Skeleton /> : JSON.stringify(products)}</div>;
};

export default CartPanner;
