import React, { useState } from 'react';
import { Image } from 'antd';
import { Col, Row, Carousel } from 'react-bootstrap';
import Details from './Details';
import DetailsTable from './Table/DetailsTable';
import { addToWishListAction } from './../../../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
const AppoveScreen = ({ productInfo }) => {
	const [index, setIndex] = useState(0);

	const handleSelect = (selectedIndex, e) => {
		setIndex(selectedIndex);
	};

	return (
		<Row>
			<Col xs={12} md={6} xl={4}>
				<Carousel activeIndex={index} onSelect={handleSelect}>
					{productInfo &&
						productInfo.images &&
						productInfo.images.map((image) => (
							<Carousel.Item>
								<Image className="w-100 h-100" src={image} />
							</Carousel.Item>
						))}
				</Carousel>
			</Col>
			<Col xs={6} md={6}>
				<Details productInfo={productInfo} />
				<DetailsTable productInfo={productInfo} />
			</Col>
		</Row>
	);
};

export default AppoveScreen;
