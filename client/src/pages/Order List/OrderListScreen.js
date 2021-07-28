import React, { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import {
	Table,
	Button,
	DropdownButton,
	Dropdown,
	InputGroup,
	FormControl,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader/Loader';
import { addState, listOrders } from './../../actions/orderAction';
import { auth } from '../../firebase';
const OrderListScreen = ({ history }) => {
	const [state, setState] = useState();
	const [contact, setContact] = useState(null);

	const dispatch = useDispatch();

	const orderList = useSelector((state) => state.orderList);
	const { loading, error, orders } = orderList;

	const userLogin = useSelector((state) => state.userLogin);

	useEffect(() => {
		if (userLogin && userLogin.role === 'admin') {
			dispatch(listOrders());
		} else {
			history.push('/login');
		}
	}, [dispatch, history, userLogin]);

	const contactHandler = async (e) => {
		console.log(contact);
	};

	return (
		<>
			<h1>Orders</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Table striped bordered hover responsive className="table-sm">
					<thead>
						<tr>
							<th>ID</th>
							<th>USER</th>
							<th>DATE</th>
							<th>TOTAL</th>
							<th>PAID</th>
							<th>DELIVERED</th>
							<th>STATE</th>
							<th>NOTE</th>
							<th>CONTACT</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{orders.map((order) => (
							<tr key={order._id}>
								<td>{order._id}</td>
								<td>{order.user && order.user.name}</td>
								<td>{order.createdAt.substring(0, 10)}</td>
								<td>${order.totalPrice}</td>
								<td>
									{order.isPaid ? (
										order.paidAt.substring(0, 10)
									) : (
										<i
											className="fas fa-times"
											style={{ color: 'red' }}
										></i>
									)}
								</td>
								<td>
									{order.isDelivered ? (
										order.deliveredAt.substring(0, 10)
									) : (
										<i
											className="fas fa-times"
											style={{ color: 'red' }}
										></i>
									)}
								</td>
								<td>
									<select
										id="dropdown-basic-button"
										value={order.state}
										onChange={(e) =>
											setState(e.target.value)
										}
									>
										<option value="Shipped">Shipped</option>
										<option value="Pending">Pending</option>
										<option value="Canceled">
											Canceled
										</option>
									</select>
									<Button
										type="button"
										className="btn"
										onClick={(e) => {
											e.preventDefault();
											dispatch(
												addState(order._id, { state })
											);
										}}
									>
										Set
									</Button>
								</td>
								<td>{order.note}</td>
								<td>
									<InputGroup className="mb-3">
										<FormControl
											placeholder="Contact the customer"
											aria-label="Recipient's username"
											aria-describedby="basic-addon2"
											onChange={(e) =>
												setContact(e.target.value)
											}
										/>
										<Button
											variant="outline-secondary"
											id="button-addon2"
											onClick={contactHandler}
										>
											Contact
										</Button>
									</InputGroup>
								</td>
								<td>
									<LinkContainer to={`/order/${order._id}`}>
										<Button
											variant="light"
											className="btn-sm"
										>
											Details
										</Button>
									</LinkContainer>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</>
	);
};

export default OrderListScreen;
