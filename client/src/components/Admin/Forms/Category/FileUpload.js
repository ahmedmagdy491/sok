import React, { useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import axios from 'axios';

const FileUpload = ({ values, setValues }) => {
	const [file, setFile] = useState('');
	const [image, setImage] = useState();
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
			setValues({ ...values, image });
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
		<div>
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
		</div>
	);
};

export default FileUpload;
