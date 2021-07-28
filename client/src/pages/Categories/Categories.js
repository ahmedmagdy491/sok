import React from 'react';
import Category from './Category';
import { Row } from 'antd';
import './Categories.css';
const Categories = ({ cats }) => {
	return (
		<Row className="justify-content-center">
			{cats &&
				cats.map((cat) => (
					<Category
						image={cat.image}
						name={cat.name}
						slug={cat.slug}
					/>
				))}
		</Row>
	);
};

export default Categories;
