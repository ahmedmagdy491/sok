import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../../actions/cartAction';
import CheckoutSteps from '../../components/Checkout/CheckoutSteps';

const PaymentScreen = ({ history }) => {
	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;

	if (!shippingAddress.address) {
		history.push('/shipping');
	}

	const [paymentMethod, setPaymentMethod] = useState('paypal');

	const dispatch = useDispatch();

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(savePaymentMethod(paymentMethod));
		history.push('/placeorder');
	};

	return (
		<Container>
			<Row className="justify-content-md-center">
				<Col xs={12} md={6}>
					<CheckoutSteps step1 step2 step3 />
					<h1>Payment Method</h1>
					<Form onSubmit={submitHandler}>
						<Form.Group>
							<Form.Label as="legend">Select Method</Form.Label>
							<Col className="m-bottom">
								<Form.Check
									type="radio"
									label="PayPal or Credit Cart"
									id="PayPal"
									name="paymentMethod"
									value="PayPal"
									checked
									onChange={(e) =>
										setPaymentMethod(e.target.value)
									}
								></Form.Check>
							</Col>
						</Form.Group>

						<Button type="submit" variant="primary">
							Continue
						</Button>
					</Form>
				</Col>
			</Row>
		</Container>
	);
};

export default PaymentScreen;
