import React, { useState } from 'react';
import { Drawer, Input, notification } from 'antd';
import { createCatAction } from '../../../../actions/catActions';
import { useDispatch, useSelector } from 'react-redux';
import './Create.css';
import { Form, Button } from 'antd';
import axios from 'axios';

const Create = ({ onCatClose, visible }) => {
	const [name, setName] = useState('');
	const [file, setFile] = useState('');
	const [image, setImage] = useState('');
	const { userLogin } = useSelector((state) => ({ ...state }));
	let dispatch = useDispatch();
	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(createCatAction(userLogin.token, { name, image }));
	};
	const handleUpload = (e) => {
		e.preventDefault();
		setFile(e.target.files[0]);
	};
	const upload = async (e) => {
		const formData = new FormData();
		formData.append('file', file);
		try {
			const { data } = await axios.post(
				`${process.env.REACT_APP_API}/uploadimage`,
				formData
			);
			console.log(data);
			setImage(data);

			if (data) {
				notification.success({
					message: 'the image uploaded',
					placement: 'bottomLeft',
				});
			}
		} catch (err) {
			notification.success({
				message: err.message,
				placement: 'bottomLeft',
			});
		}
	};
	return (
		<Drawer
			title="Create a new category"
			width={400}
			onClose={onCatClose}
			visible={visible}
			bodyStyle={{ paddingBottom: 80 }}
			className="drawer"
			footer={
				<div
					style={{
						textAlign: 'right',
					}}
				>
					<Button
						type="primary"
						onClick={handleSubmit}
						htmlType="submit"
						className="mb-5 pb-5"
					>
						Submit
					</Button>
				</div>
			}
		>
			<Form
				name="basic"
				labelCol={{
					span: 8,
				}}
				wrapperCol={{
					span: 16,
				}}
				initialValues={{
					remember: true,
				}}
				onSubmitCapture={handleSubmit}
			>
				<Form.Item label="Category Name">
					<Input
						name="name"
						placeholder="Please enter category name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</Form.Item>

				<Form.Item
					name="file"
					label="Category image"
					rules={[
						{
							required: true,
							message: 'Category image is required',
						},
					]}
				>
					<Input type="file" name="file" onChange={handleUpload} />
				</Form.Item>
				<Button type="primary" onClick={upload}>
					Upload
				</Button>
			</Form>
		</Drawer>
	);
};

export default Create;
