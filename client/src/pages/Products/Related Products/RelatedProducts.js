import React from 'react';
import { Col, Row } from 'antd';
import Product from '../Products/Product';
const RelatedProducts = ({ products }) => {
	return (
		<Col className="related-products">
			<Row>
				<h1>RELATED PRODUCTS</h1>
			</Row>
			<Row>
				{products &&
					products.map((product) => <Product product={product} />)}
			</Row>
		</Col>
	);
};

export default RelatedProducts;
