import React, { Fragment, useEffect, useState } from 'react';
import './placeOrder.css';
import { Link } from 'react-router-dom';
import {
	Col,
	ListGroup,
	Row,
	Image,
	Card,
	Button,
	InputGroup,
	FormControl,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../../components/Checkout/CheckoutSteps';
import Message from '../../components/Message';
import { createOrder } from './../../actions/orderAction';

const PlaceOrderScreen = ({ history }) => {
	const cart = useSelector((state) => state.cart);

	const userLogin = useSelector((state) => state.userLogin);

	// Calculate Prices
	const addDecimals = (num) => {
		return (Math.round(num * 100) / 100).toFixed(2);
	};

	cart.itemsPrice = addDecimals(
		cart.cartItems.reduce(
			(acc, item) =>
				acc + item.discountPrice
					? item.discountPrice
					: item.originalPrice * item.qty,
			0
		)
	);

	cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100);
	cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
	cart.totalPrice = (
		Number(cart.itemsPrice) +
		Number(cart.shippingPrice) +
		Number(cart.taxPrice)
	).toFixed(2);

	const orderCreate = useSelector((state) => state.orderCreate);
	const { order, success, error } = orderCreate;

	useEffect(() => {
		if (success) {
			history.push(`/order/${order._id}`);
		}
		if (!cart.shippingAddress.address) {
			history.push('/shipping');
		} else if (!cart.paymentMethod) {
			history.push('/payment');
		}
	}, [history, success, order, cart]);

	const dispatch = useDispatch();

	const placeOrderHandler = () => {
		dispatch(
			createOrder(userLogin.token, {
				orderItems: cart.cartItems,
				shippingAddress: cart.shippingAddress,
				paymentMethod: cart.paymentMethod,
				itemsPrice: cart.itemsPrice,
				shippingPrice: cart.shippingPrice,
				taxPrice: cart.taxPrice,
				totalPrice: cart.totalPrice,
			})
		);
	};

	return (
		<Fragment>
			<CheckoutSteps step1 step2 step3 step4 />
			<Row>
				<Col md={8}>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<h2>Shipping</h2>
							<p>
								<strong>Address:</strong>
								<br />

								{cart.shippingAddress.address}
								<br />
								{cart.shippingAddress.city}
								<br />
								{cart.shippingAddress.postalCode}
								<br />
								{cart.shippingAddress.country}
							</p>
						</ListGroup.Item>

						<ListGroup.Item>
							<h2>Payment Method</h2>

							<strong>Method: </strong>
							{cart.paymentMethod}
						</ListGroup.Item>

						<ListGroup.Item>
							<h2>Order Items</h2>
							{cart.cartItems.length === 0 ? (
								<Message>Your cart is empty</Message>
							) : (
								<ListGroup variant="flush">
									{cart.cartItems.map((item, index) => (
										<ListGroup.Item key={index}>
											<Row>
												<Col md={1}>
													<Image
														src={item.image}
														alt={item.name}
														fluid
														rounded
													/>
												</Col>
												<Col>
													<Link
														to={`/product/${item.product}`}
													>
														{item.name}
													</Link>
												</Col>
												<Col md={4}>
													{item.qty} x $
													{item.discountPrice
														? item.discountPrice
														: item.originalPrice}{' '}
													= $
													{(
														item.qty *
														(item.discountPrice
															? item.discountPrice
															: item.originalPrice)
													).toFixed(2)}
												</Col>
											</Row>
										</ListGroup.Item>
									))}
								</ListGroup>
							)}
						</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col md={4}>
					<Card>
						<ListGroup variant="flush">
							<ListGroup.Item>
								<h2>Order Summary</h2>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Items</Col>
									<Col>${cart.itemsPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Shipping</Col>
									<Col>${cart.shippingPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Tax</Col>
									<Col>${cart.taxPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Total</Col>
									<Col>${cart.totalPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								{error && (
									<Message variant="danger">{error}</Message>
								)}
							</ListGroup.Item>
							<ListGroup.Item>
								<Button
									type="button"
									className="btn-block"
									disabled={cart.cartItems === 0}
									onClick={placeOrderHandler}
								>
									Place Order
								</Button>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</Fragment>
	);
};

export default PlaceOrderScreen;
