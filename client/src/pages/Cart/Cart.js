import React, { useEffect } from 'react';
import {
	Button,
	Card,
	Col,
	Form,
	Image,
	ListGroup,
	Row,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../../actions/cartAction';
import Message from '../../components/Message';

const CartScreen = ({ match, location, history }) => {
	const productSlug = match.params.slug;

	const qty = location.search ? Number(location.search.split('=')[1]) : 1;

	const dispatch = useDispatch();

	const { cart, userLogin } = useSelector((state) => ({ ...state }));
	const { cartItems } = cart;

	useEffect(() => {
		if (productSlug) {
			dispatch(addToCart(productSlug, qty));
		}
	}, [dispatch, productSlug, qty]);

	const removeFromCartHandler = (slug) => {
		dispatch(removeFromCart(slug));
	};

	const checkoutHandler = () => {
		if (!userLogin) history.push('/signin');
		else history.push('/shipping');
	};

	return (
		<Row>
			<Col md={8}>
				<h1>Shopping Cart</h1>
				{!cartItems || cartItems.length === 0 ? (
					<Message>
						Your cart is empty <Link to="/">Go Back</Link>
					</Message>
				) : (
					<ListGroup variant="flush">
						{cartItems.map((item) => (
							<ListGroup.Item key={item.product}>
								<Row>
									<Col md={2}>
										<Image
											src={item.image}
											alt={item.name}
											fluid
											rounded
										/>
									</Col>
									<Col md={3}>
										<Link to={`/product/${item.product}`}>
											{item.name}
										</Link>
									</Col>
									<Col md={2}>
										$
										{item.discountPrice
											? item.discountPrice
											: item.originalPrice}
									</Col>
									<Col md={2}>
										<Form.Control
											as="select"
											value={item.qty}
											onChange={(e) =>
												dispatch(
													addToCart(
														item.product,
														Number(e.target.value)
													)
												)
											}
										>
											{[
												...Array(item.available).keys(),
											].map((x) => (
												<option
													key={x + 1}
													value={x + 1}
												>
													{x + 1}
												</option>
											))}
										</Form.Control>
									</Col>
									<Col md={2}>
										<Button
											type="button"
											variant="light"
											onClick={() =>
												removeFromCartHandler(item.slug)
											}
										>
											<i className="fas fa-trash"></i>
										</Button>
									</Col>
								</Row>
							</ListGroup.Item>
						))}
					</ListGroup>
				)}
			</Col>
			<Col md={4}>
				<Card>
					{!cartItems || cartItems.length === 0 ? (
						<></>
					) : (
						<ListGroup variant="flush">
							<ListGroup.Item>
								<h2>
									Subtotal (
									{cartItems.reduce(
										(acc, item) => acc + item.qty,
										0
									)}
									) items
								</h2>
								$
								{cartItems
									.reduce(
										(acc, item) =>
											acc +
											item.qty *
												(item.discountPrice
													? item.discountPrice
													: item.originalPrice),
										0
									)
									.toFixed(2)}
							</ListGroup.Item>
							<ListGroup.Item>
								<Button
									type="button"
									className="btn-block"
									disabled={cartItems.length === 0}
									onClick={checkoutHandler}
								>
									Proceed to Checkout
								</Button>
							</ListGroup.Item>
						</ListGroup>
					)}
				</Card>
			</Col>
		</Row>
	);
};

export default CartScreen;
