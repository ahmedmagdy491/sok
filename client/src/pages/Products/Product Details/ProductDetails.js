import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productDetailsAction } from './../../../actions/productActions';
import Loader from './../../../components/Loader/Loader';
import RelatedProducts from '../Related Products/RelatedProducts';
import { listCatProduct } from '../../../actions/catActions';
import AppoveScreen from './AppoveScreen';
import TabsLayout from './Tabs/Tabs';
import '../assets/Product.css';

import RateForm from './Rate';

const ProductDetails = ({ match }) => {
	const dispatch = useDispatch();
	const { productDetails, catProductList } = useSelector((state) => ({
		...state,
	}));
	const { loading, productInfo } = productDetails;
	const { products } = catProductList;

	useEffect(() => {
		dispatch(productDetailsAction(match.params.productSlug));
		dispatch(listCatProduct(match.params.catSlug));
	}, [dispatch, match]);

	return (
		<div>
			{loading ? (
				<Loader />
			) : (
				productInfo && (
					<div>
						<AppoveScreen productInfo={productInfo} />
						<hr />
						<TabsLayout
							description={productInfo.description}
							reviews={productInfo.reviews}
						/>
						<RateForm />
						<RelatedProducts products={products} />
					</div>
				)
			)}
		</div>
	);
};

export default ProductDetails;
