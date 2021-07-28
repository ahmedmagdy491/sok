import React, { useState } from 'react';
import { Alert, Col, Row } from 'react-bootstrap';
import { AiOutlineHeart, AiOutlineShoppingCart } from 'react-icons/ai';
import { FaCheckCircle } from 'react-icons/fa';
import { BiEuro } from 'react-icons/bi';
import { useHistory, useParams } from 'react-router-dom';
import { Select, Button } from 'antd';
import { Option } from 'antd/lib/mentions';
import '../assets/Product.css';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishListAction } from './../../../actions/userActions';
const Details = ({ productInfo }) => {
	const [quantity, setQuantity] = useState();
	let available = productInfo && productInfo.quantity - productInfo.sold;

	const history = useHistory();
	const params = useParams();
	console.log(params);
	const addItem = () => {
		history.push(`/cart/${params.productSlug}?qty=${quantity}`);
	};

	const { addToWishList, userLogin } = useSelector((state) => ({ ...state }));
	const dispatch = useDispatch();

	const addItemToWishList = async (e) => {
		e.preventDefault();
		dispatch(addToWishListAction(userLogin.token, productInfo.slug));
	};

	return (
		<Col className="align-items-center">
			<Row className="justify-content-between h1">
				<div>{productInfo.name}</div>
				<div>
					{productInfo.discountPrice
						? productInfo.discountPrice
						: productInfo.originalPrice}
					<BiEuro className="mb-1" />
				</div>
			</Row>
			<Row className="justify-content-between pb-4">
				{available !== 0 && (
					<div className="text-success font-weight-bolder">
						<FaCheckCircle
							style={{ fontSize: '18px', fontWeight: 'bolder' }}
						/>{' '}
						IN STOCK
					</div>
				)}
				<AiOutlineHeart className="heart" onClick={addItemToWishList} />
			</Row>
			<h5 className="text-warning ">
				{available <= 8 && (
					<Alert variant="warning">
						The product is available with only {available} pieces
					</Alert>
				)}
			</h5>
			<Row className="justify-content-between p-3">
				<Button
					type="primary"
					shape="round"
					icon={<AiOutlineShoppingCart />}
					size="large"
					onClick={addItem}
				>
					{'  '} Add to cart
				</Button>

				<Select
					className="mt-1"
					showSearch
					style={{ width: 200 }}
					placeholder="Quantity"
					optionFilterProp="children"
					onChange={(value) => setQuantity(value)}
					value={quantity}
					filterOption={(input, option) =>
						option.children
							.toLowerCase()
							.indexOf(input.toLowerCase()) >= 0
					}
				>
					{[...Array(available).keys()].map((x) => (
						<Option key={x + 1} value={x + 1}>
							{x + 1}
						</Option>
					))}
				</Select>
			</Row>
		</Col>
	);
};

export default Details;
