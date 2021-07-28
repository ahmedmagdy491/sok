import React, { createElement } from 'react';

const Tbody = ({ productInfo }) => {
	return (
		<tbody>
			<tr>
				<td>Quantity</td>
				<td>{productInfo.quantity}</td>
			</tr>
			<tr>
				<td>Brand</td>
				<td>{productInfo.brand}</td>
			</tr>
			<tr>
				<td>Color</td>
				<td>{productInfo.color}</td>
			</tr>
			<tr>
				<td>Shipping</td>
				<td>{productInfo.shipping}</td>
			</tr>
		</tbody>
	);
};

export default Tbody;
