import React from 'react';
import { Spin } from 'antd';

const Loader = () => {
	return (
		<div className="w-100 text-center">
			<Spin size="large" />
		</div>
	);
};

export default Loader;
