import React, { Fragment, useState } from 'react';
import { Form, Button, Image, Col } from 'react-bootstrap';
import { createCat, uploadImg } from './functions/functions';
import './Categories.css';

const CreateCategory = () => {
	const [name, setName] = useState('');
	const [file, setFile] = useState('');
	const [image, setImage] = useState('');

	const onChange = (e) => {
		setFile(e.target.files[0]);
	};
	const onSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('file', file);
		uploadImg(formData)
			.then((res) => {
				const { filePath } = res.data;
				console.log(filePath);
				setImage(filePath);
			})
			.catch((err) => {
				if (err.response.status === 500) {
					console.log('There is a problem with the server');
				} else {
					console.log(err.response.data.msg);
				}
			});
	};
	console.log(image);
	const handleSubmit = (e) => {
		e.preventDefault();
		createCat({ name, image }).then((res) => {
			console.log(res);
		});
	};

	return (
		<Form className="col-md-4 m-auto pt-5" onSubmit={handleSubmit}>
			<h1>Create Category</h1>
			<Form.Group className="mb-3" controlId="formBasicEmail">
				<Form.Label>Category Name</Form.Label>
				<Form.Control
					type="text"
					placeholder="Enter Category Name"
					onChange={(e) => setName(e.target.value)}
				/>
			</Form.Group>
			<Fragment>
				<Form>
					<Form.Group controlId="formFile" className="mb-3">
						<Form.Label>Please Choose Category Image</Form.Label>
						<Form.Control
							name="file"
							type="file"
							onChange={onChange}
						/>
					</Form.Group>
					<Button onClick={onSubmit}>Upload</Button>
				</Form>
				{image && (
					<Col xs={6} md={4}>
						<Image src={image} thumbnail />
					</Col>
				)}
			</Fragment>
			<Button className="create-btn" type="submit" onClick={handleSubmit}>
				Create
			</Button>
		</Form>
	);
};

export default CreateCategory;
