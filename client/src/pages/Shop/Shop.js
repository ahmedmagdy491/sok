import React, { useEffect } from 'react';
import { Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { productListAction } from '../../actions/productActions';
import Product from '../Products/Products/Product';
import Skeleton from './../../components/Loader/Skeleton';

const Shop = () => {
	const { products, loading } = useSelector((state) => state.productList);
	let dispatch = useDispatch();
	useEffect(() => {
		dispatch(productListAction());
	}, [dispatch]);

	return (
		<>
			<Row>
				{loading ? (
					<Skeleton />
				) : (
					products &&
					products.map((product) => (
						<Product key={product._id} product={product} />
					))
				)}
			</Row>
		</>
	);
};

export default Shop;
