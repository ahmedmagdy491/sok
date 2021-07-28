import React, { Fragment } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Image, Col } from 'react-bootstrap';
import './Categories.css';
const Category = ({ image, name, slug }) => {
	let history = useHistory();
	const showProducts = () => {
		history.push(`/${slug}/products`);
	};
	return (
		<Col xs={10} md={6} xl={5}>
			<Image
				className="cat-image w-100 h-75"
				src={image}
				rounded
				onClick={showProducts}
			/>
			<h5>{name}</h5>
		</Col>
	);
};

export default Category;
