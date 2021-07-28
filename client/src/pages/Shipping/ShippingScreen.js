import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../../actions/cartAction';
import CheckoutSteps from '../../components/Checkout/CheckoutSteps';

const ShippingScreen = ({ history }) => {
	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;

	const [address, setAddress] = useState(shippingAddress.address);
	const [city, setCity] = useState(shippingAddress.city);
	const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
	const [country, setCountry] = useState(shippingAddress.country);

	const dispatch = useDispatch();

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(saveShippingAddress({ address, city, postalCode, country }));
		history.push('/payment');
	};

	return (
		<Container>
			<Row className="justify-content-md-center">
				<Col xs={12} md={6}>
					<CheckoutSteps step1 step2 />
					<h1>Shipping</h1>
					<Form onSubmit={submitHandler}>
						<Form.Group className="m-bottom" controlId="address">
							<Form.Label>Address</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter Address"
								value={address}
								required
								onChange={(e) => setAddress(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group className="m-bottom" controlId="city">
							<Form.Label>City</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter City"
								value={city}
								required
								onChange={(e) => setCity(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group className="m-bottom" controlId="postalCode">
							<Form.Label>Postal Code</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter Postal Code"
								value={postalCode}
								required
								onChange={(e) => setPostalCode(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group className="m-bottom" controlId="country">
							<Form.Label>Country</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter Country"
								value={country}
								required
								onChange={(e) => setCountry(e.target.value)}
							></Form.Control>
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

export default ShippingScreen;
