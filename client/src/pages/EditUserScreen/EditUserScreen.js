import React, { useEffect, useState } from 'react';
import { Fragment } from 'react';
import { Button, Form, Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getUserDetails, updateUser } from '../../actions/userActions';

import Message from '../../components/Message';

const UserEditScreen = ({ history, match }) => {
	const userId = match.params.id;
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [isAdmin, setIsAdmin] = useState(false);

	const dispatch = useDispatch();

	const userDetails = useSelector((state) => state.userDetails);
	const { loading, error, user } = userDetails;

	const userUpdate = useSelector((state) => state.userUpdate);
	const {
		loading: loadingUpdate,
		error: errorUpdate,
		success: successUpdate,
	} = userUpdate;

	useEffect(() => {
		if (successUpdate) {
			dispatch({ type: 'USER_UPDATE_RESET' });
			history.push('/admin/userlist');
		} else {
			if (!user || !user.name || user._id !== userId) {
				dispatch(getUserDetails(userId));
			} else {
				setName(user.name);
				setEmail(user.email);
				setIsAdmin(user.isAdmin);
			}
		}
	}, [dispatch, userId, user, history, successUpdate]);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(updateUser({ _id: userId, name, email }));
	};

	return (
		<Fragment>
			<Link to="/admin/userlist" className="btn btn-light my-3">
				Go Back
			</Link>
			<Container>
				<Row className="justify-content-md-center">
					<Col xs={12} md={6}>
						<h1>Edit User</h1>
						{errorUpdate && (
							<Message variant="danger">{error}</Message>
						)}
						{/* {loading ? (
                            <Loader />
                        ) : */}{' '}
						{error ? (
							<Message variant="danger">{error}</Message>
						) : (
							<Form onSubmit={submitHandler}>
								<Form.Group
									className="m-bottom"
									controlId="name"
								>
									<Form.Label>Name</Form.Label>
									<Form.Control
										type="name"
										placeholder="Enter Name"
										value={name}
										onChange={(e) =>
											setName(e.target.value)
										}
									></Form.Control>
								</Form.Group>

								<Form.Group
									className="m-bottom"
									controlId="email"
								>
									<Form.Label>Email Address</Form.Label>
									<Form.Control
										type="email"
										placeholder="Enter email"
										value={email}
										onChange={(e) =>
											setEmail(e.target.value)
										}
									></Form.Control>
								</Form.Group>

								<Form.Group
									className="m-bottom"
									controlId="isadmin"
								>
									<Form.Check
										type="checkbox"
										label="Is Admin"
										checked={isAdmin}
										onChange={(e) =>
											setIsAdmin(e.target.checked)
										}
									></Form.Check>
								</Form.Group>

								<Button type="submit" variant="primary">
									Update
								</Button>
							</Form>
						)}
					</Col>
				</Row>
			</Container>
		</Fragment>
	);
};

export default UserEditScreen;
