import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProductReview } from './../../../actions/productActions';
import { Button, Form } from 'react-bootstrap';
import { Alert, message, Rate } from 'antd';
import { useHistory, useParams } from 'react-router-dom';

const RateForm = () => {
	const dispatch = useDispatch();

	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState('');

	const { userLogin, productReviewCreate } = useSelector((state) => ({
		...state,
	}));
	const { userInfo } = userLogin;
	const {
		success: successProductReview,
		loading: loadingProductReview,
		error: errorProductReview,
	} = productReviewCreate;

	let history = useHistory();
	let params = useParams();

	const submitHandler = (e) => {
		e.preventDefault();
		if (!userInfo) history.push('/login');
		dispatch(
			createProductReview(params.productSlug, {
				rating,
				comment,
			})
		);
	};
	if (successProductReview) message.success('Thanks for review');
	else if (errorProductReview) message.error(errorProductReview);

	return (
		<Form onSubmit={submitHandler} className="w-50">
			<Form.Label className="h3 font-weight-bold">
				Please leave Rating & Comment
			</Form.Label>

			{successProductReview ? (
				<Alert
					message="Thanks for your review"
					type="success"
					showIcon
				/>
			) : (
				errorProductReview && (
					<Alert message={errorProductReview} type="error" showIcon />
				)
			)}

			<Form.Group className="m-bottom" controlId="rating">
				<Rate
					value={rating}
					onChange={(e) => {
						setRating(e);
					}}
					className="h1"
				/>
			</Form.Group>
			<Form.Group className="m-bottom" controlId="comment">
				<Form.Control
					as="textarea"
					placeholder="type a comment"
					className="w-50"
					value={comment}
					onChange={(e) => {
						setComment(e.target.value);
					}}
				/>
			</Form.Group>
			<Button
				disabled={loadingProductReview}
				type="submit"
				variant="primary"
			>
				Submit
			</Button>
		</Form>
	);
};

export default RateForm;
