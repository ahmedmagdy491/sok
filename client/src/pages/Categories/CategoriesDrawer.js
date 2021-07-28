import React, { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { Drawer, Image, notification } from 'antd';
import { Table, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { updateCatAction, removeCatAction } from '../../actions/catActions';

const CategoriesDrawer = ({ onClose, visible }) => {
	const [childVisible, setChildVisible] = useState(false);
	const [name, setName] = useState();
	const [image, setImage] = useState();
	const [slug, setSlug] = useState();
	const [file, setFile] = useState({});

	const { userLogin } = useSelector((state) => ({ ...state }));
	let dispatch = useDispatch();

	const { catList } = useSelector((state) => ({ ...state }));

	const showChildrenDrawer = () => {
		setChildVisible(true);
	};

	const onChildrenDrawerClose = () => {
		setChildVisible(false);
	};
	const uploadFileHandler = async (e) => {
		setFile(e.target.files[0]);
	};

	const removeCat = (e, slug) => {
		dispatch(removeCatAction(userLogin.token, slug));
	};
	const url = process.env.REACT_APP_API;

	const upload = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('file', file);

		await axios.post(`${url}/uploadimage`, formData).then((res) => {
			setImage(res.data);
			if (res.data) {
				notification.success({
					message: 'Image has been uploaded',
					placement: 'bottomLeft',
				});
			}
		});
	};
	const submitHandler = async (e) => {
		e.preventDefault();
		dispatch(updateCatAction(userLogin.token, { name, image }, slug));
	};
	return (
		<div>
			<Drawer
				title="All Categories"
				placement="right"
				closable={false}
				visible={visible}
				width={720}
				onClose={onClose}
				footer={
					<div
						style={{
							textAlign: 'right',
						}}
					>
						<Button
							onClick={onClose}
							style={{ marginRight: 8 }}
							type="danger"
						>
							Cancel
						</Button>
					</div>
				}
			>
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>No.</th>
							<th>Name</th>
							<th>Image</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody className="text-center col-12 align-items-center">
						{catList &&
							catList.map((cat, index) => (
								<tr>
									<td>{index + 1}</td>
									<td>{cat.name}</td>
									<td className="p-0 m-0">
										<Image
											src={cat.image}
											className="p-0 m-0"
											width={70}
										/>
									</td>
									<td>
										<Button
											variant="primary"
											onClick={() => {
												showChildrenDrawer();
												setSlug(cat.slug);
											}}
										>
											Edit
										</Button>
										<Button
											variant="danger"
											onClick={(e) => {
												setSlug();
												removeCat(e, cat.slug);
											}}
										>
											Remove
										</Button>
									</td>
								</tr>
							))}
					</tbody>
				</Table>

				<Drawer
					title="Two-level Drawer"
					width={720}
					closable={false}
					onClose={onChildrenDrawerClose}
					visible={childVisible}
				>
					<Form onSubmit={submitHandler}>
						<Form.Label>Name</Form.Label>

						<Form.Group
							controlId="formFileMultiple"
							className="mb-3"
						>
							<Form.Control
								type="text"
								placeholder="Enter name"
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</Form.Group>
						<Form.Group
							controlId="formFileMultiple"
							className="mb-3"
						>
							<Form.Label>Upload an image</Form.Label>
							<Form.Control
								type="file"
								name="file"
								onChange={uploadFileHandler}
							/>
							<Button variant="success" onClick={upload}>
								Upload
							</Button>
						</Form.Group>

						<Button type="submit">Update</Button>
					</Form>
				</Drawer>
			</Drawer>
		</div>
	);
};

export default CategoriesDrawer;
