import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './orderScreen.css';
import { PayPalButton } from 'react-paypal-button-v2';
import { Link } from 'react-router-dom';
import {
	Row,
	Col,
	ListGroup,
	Image,
	Card,
	Button,
	Form,
	DropdownButton,
	Dropdown,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader/Loader';
import {
	deliverOrder,
	getOrderDetails,
	payOrder,
	addNote,
	addState,
} from '../../actions/orderAction.js';
import { Fragment } from 'react';
import { paypalAction } from '../../actions/paypalAction';

// const PayPalButton = paypal.Buttons.driver('react', { React, ReactDOM });

const OrderScreen = ({ match, history }) => {
	const orderId = match.params.id;

	const [note, setNote] = useState('');

	// const [skip, setSkip] = useState(false);

	const dispatch = useDispatch();

	const orderNote = useSelector((state) => state.orderNote);
	const { loading: loadingNote, error: errorNote } = orderNote;

	const orderDetails = useSelector((state) => state.orderDetails);
	const { order, loading, error } = orderDetails;

	const orderPay = useSelector((state) => state.orderPay);
	const { loading: loadingPay, success: successPay } = orderPay;

	const orderDeliver = useSelector((state) => state.orderDeliver);
	const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

	const userLogin = useSelector((state) => state.userLogin);

	if (!loading) {
		//   Calculate prices
		const addDecimals = (num) => {
			return (Math.round(num * 100) / 100).toFixed(2);
		};

		if (order) {
			order.itemsPrice = addDecimals(
				order.orderItems.reduce(
					(acc, item) =>
						acc + item.discountPrice
							? item.discountPrice
							: item.originalPrice * item.qty,
					0
				)
			);
		}
	}

	useEffect(() => {
		if (!userLogin) {
			history.push('/login');
		}

		if (!order || successPay || successDeliver || order._id !== orderId) {
			dispatch({ type: 'ORDER_PAY_RESET' });
			dispatch({ type: 'ORDER_DELIVER_RESET' });
			dispatch(getOrderDetails(orderId));
		}

		const elementExist = document.getElementById('paypal-button');

		let buttons;

		if (elementExist) {
			if (buttons && buttons.close) {
				buttons.close();
			}
			buttons = window.paypal.Buttons({
				createOrder: function (data, actions) {
					// This function sets up the details of the transaction, including the amount and line item details.

					return actions.order.create({
						purchase_units: [
							{
								amount: {
									value: order.totalPrice,
								},
							},
						],
					});
				},

				onApprove: function (data, actions) {
					// This function captures the funds from the transaction.

					return actions.order.capture().then(function (details) {
						// This function shows a transaction success message to your buyer.

						console.log(details);
						try {
							dispatch(payOrder(orderId, details));
						} catch (error) {
							console.log(error);
						}
					});
				},
			});
			buttons.render('#paypal-button');
		}
	}, [
		dispatch,
		orderId,
		successPay,
		order,
		history,
		userLogin,
		successDeliver,
	]);

	const successPaymentHandler = async (paymentResult) => {
		try {
			console.log(paymentResult);
			dispatch(payOrder(orderId, paymentResult));
		} catch (error) {
			console.log(error);
		}
	};

	const deliverHandler = () => {
		dispatch(deliverOrder(order));
	};

	const submitNoteHandler = (e) => {
		e.preventDefault();
		dispatch(addNote(orderId, { note }));
	};

	return loading ? (
		<Loader />
	) : error ? (
		<Message variant="danger">{error}</Message>
	) : (
		<>
			<h1>Order {order._id}</h1>
			<Row>
				<Col md={8}>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<h2>Shipping</h2>
							<p>
								<strong>Name: </strong> {order.user.name}
							</p>
							<p>
								<strong>Email: </strong>{' '}
								<a href={`mailto:${order.user.email}`}>
									{order.user.email}
								</a>
							</p>
							<p>
								<strong>Address: </strong>
								{order.shippingAddress.address},{' '}
								{order.shippingAddress.city}{' '}
								{order.shippingAddress.postalCode},{' '}
								{order.shippingAddress.country}
							</p>
							{order.isDelivered ? (
								<Message variant="success">
									Delivered on {order.deliveredAt}
								</Message>
							) : (
								<Message variant="danger">
									Not Delivered
								</Message>
							)}
						</ListGroup.Item>

						<ListGroup.Item>
							<h2>Payment Method</h2>
							<p>
								<strong>Method: </strong>
								{order.paymentMethod}
							</p>
							{order.isPaid ? (
								<Message variant="success">
									Paid on {order.paidAt}
								</Message>
							) : (
								<Message variant="danger">Not Paid</Message>
							)}
						</ListGroup.Item>

						<ListGroup.Item>
							<h2>Order Items</h2>
							{order.orderItems.length === 0 ? (
								<Message>Order is empty</Message>
							) : (
								<ListGroup variant="flush">
									{order.orderItems.map((item, index) => (
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
													{item.qty} x $ (
													{item.discountPrice
														? item.discountPrice
														: item.originalPrice}
													) = $
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
									<Col>${order.itemsPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Shipping</Col>
									<Col>${order.shippingPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Tax</Col>
									<Col>${order.taxPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Total</Col>
									<Col>${order.totalPrice}</Col>
								</Row>
							</ListGroup.Item>

							{userLogin.role !== 'admin' ? (
								<ListGroup.Item>
									{loadingNote ? (
										<Loader />
									) : errorNote ? (
										<Message>{errorNote}</Message>
									) : (
										<div className="note">
											<label htmlFor="message">
												Do you have any notes
											</label>
											<textarea
												name="message"
												id="message"
												rows="4"
												cols="50"
												value={note}
												onChange={(e) =>
													setNote(e.target.value)
												}
											></textarea>
											<button
												className="submit-button"
												type="submit"
												onClick={submitNoteHandler}
											>
												Submit
											</button>
										</div>
									)}
								</ListGroup.Item>
							) : null}
							{!order.isPaid & (userLogin.role !== 'admin') ? (
								<ListGroup.Item>
									{loadingPay && <Loader />}

									{
										// <PayPalButton
										//     amount={order.totalPrice}
										//     onSuccess={successPaymentHandler}
										// />

										<div id="paypal-button"></div>
									}

									{/* <PayPalButton
                                        createOrder={(data, actions) =>
                                            createOrder(data, actions)
                                        }
                                        onApprove={(data, actions) =>
                                            onApprove(data, actions)
                                        }
                                    /> */}
								</ListGroup.Item>
							) : null}

							{loadingDeliver && <Loader />}
							{userLogin &&
								userLogin.role === 'admin' &&
								order.isPaid &&
								!order.isDelivered && (
									<ListGroup.Item>
										<Button
											type="button"
											className="btn btn-block"
											onClick={deliverHandler}
										>
											Mark As Delivered
										</Button>
									</ListGroup.Item>
								)}
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default OrderScreen;
