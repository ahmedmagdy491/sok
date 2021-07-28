import React from 'react';
import { BiEuro } from 'react-icons/bi';
import { Row, Col } from 'react-bootstrap';
import Rating from '../../../components/Ratings/Ratings';

const Details = ({ product }) => {
	return (
		<Col className="p-3">
			<Row className="justify-content-around">
				{product.discountPrice ? (
					<>
						<div
							className="h5 row align-items-center"
							id="original-price"
						>
							{product.originalPrice}
							{'  '}
							<BiEuro className="mt-1" />
						</div>
						<div className="h5 row align-items-center">
							{product.discountPrice} {'  '}
							<BiEuro className="mt-1" />
						</div>
					</>
				) : (
					<div className="h5 row align-items-center">
						{product.originalPrice}
						{'  '}
						<BiEuro className="mt-1" />
					</div>
				)}
			</Row>
			<Row className="justify-content-center h5">
				<div>
					<Rating value={product.rating} />
				</div>
			</Row>
		</Col>
	);
};

export default Details;
