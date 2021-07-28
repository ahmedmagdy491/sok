import { Table } from 'antd';
import React from 'react';

const ProductItemInfo = ({ productInfo }) => {
	const columns = [
		{
			title: 'Name',
			dataIndex: 'name',
		},
		{
			title: 'Value',
			dataIndex: 'value',
		},
	];

	const data = [
		{
			key: '1',
			name: 'Quantity',
			value: productInfo.quantity,
		},
		{
			key: '2',
			name: 'Brand',
			value: productInfo.brand,
		},
		{
			key: '3',
			name: 'Color',
			value: productInfo.color,
		},
		{
			key: '4',
			name: 'Shipping',
			value: productInfo.shipping,
		},
	];
	return (
		<Table
			columns={columns}
			dataSource={data}
			size="small"
			pagination={false}
		/>
	);
};

export default ProductItemInfo;
