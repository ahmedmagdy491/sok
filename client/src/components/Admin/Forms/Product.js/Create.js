import React, { useEffect, useState } from 'react';
import {
	Drawer,
	Form,
	Button,
	Input,
	message,
	Upload,
	Alert,
	Select,
	InputNumber,
	notification,
} from 'antd';

import { listCats } from '../../../../actions/catActions';
import { useDispatch, useSelector } from 'react-redux';
import ImgCrop from 'antd-img-crop';
import { AiOutlineInbox } from 'react-icons/ai';
import { productCreateAction } from '../../../../actions/productActions';
import axios from 'axios';
const { Dragger } = Upload;
const { Option } = Select;

const CreateProduct = ({ onProductClose, visible }) => {
	const [name, setName] = useState();

	const [description, setDescription] = useState('');
	const [originalPrice, setOriginalPrice] = useState('');
	const [category, setCategory] = useState('');
	const [qty, setQty] = useState('');
	const [color, setColor] = useState('');
	const [brand, setBrand] = useState('');
	const [files, setFiles] = useState([]);
	const [images, setImages] = useState([]);

	const handleUpload = (e) => {
		setFiles(e.target.files);
	};

	let url = `${process.env.REACT_APP_API}/uploadimages`;

	const upload = async (e) => {
		let formData = new FormData();
		for (let i = 0; i < files.length; i++)
			formData.append('file', files[i]);

		const config = {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		};
		try {
			const { data } = await axios.post(url, formData, config);

			if (data) {
				setImages(data);
				console.log('success', data);
				notification.success({
					message: 'the images uploaded',
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

	let dispatch = useDispatch();

	useEffect(() => {
		dispatch(listCats());
	}, [dispatch]);

	const { catList, userLogin } = useSelector((state) => ({ ...state }));
	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(
			productCreateAction(userLogin.token, {
				name,
				description,
				originalPrice,
				category,
				quantity: qty,
				color,
				brand,
				images,
			})
		);
	};
	return (
		<>
			<Drawer
				title="Create a new product"
				width={500}
				className="drawer"
				onClose={onProductClose}
				visible={visible}
				bodyStyle={{ paddingBottom: 80 }}
				footer={
					<div
						style={{
							textAlign: 'right',
						}}
					>
						<Button
							onClick={onProductClose}
							id="close"
							style={{ marginRight: 8 }}
						>
							Cancel
						</Button>
						<Button
							onClick={handleSubmit}
							id="submit-btn"
							htmlType="submit"
							type="primary"
							className="mb-5 pb-5"
						>
							Submit
						</Button>
					</div>
				}
			>
				<Form
					labelCol={{
						span: 4,
					}}
					wrapperCol={{
						span: 14,
					}}
					layout="horizontal"
					onSubmitCapture={handleSubmit}
				>
					<Form.Item>
						<Input
							placeholder="product name"
							onChange={(e) => setName(e.target.value)}
							value={name}
						/>
					</Form.Item>
					<Form.Item>
						<Input
							placeholder="product description"
							onChange={(e) => setDescription(e.target.value)}
							value={description}
						/>
					</Form.Item>
					<Form.Item>
						<InputNumber
							placeholder="price"
							defaultValue={originalPrice}
							onChange={(e) => setOriginalPrice(e)}
						/>
					</Form.Item>
					<Form.Item>
						<Select
							showSearch
							style={{ width: 200 }}
							placeholder="Select a category"
							optionFilterProp="children"
							value={category}
							onChange={(e) => setCategory(e)}
							filterOption={(input, option) =>
								option.children
									.toLowerCase()
									.indexOf(input.toLowerCase()) >= 0
							}
						>
							{catList &&
								catList.map((cat) => (
									<Option value={cat.slug} key={cat._id}>
										{cat.name}
									</Option>
								))}
						</Select>
					</Form.Item>
					<Form.Item>
						<InputNumber
							placeholder="quantity"
							min={1}
							max={100}
							defaultValue={qty}
							onChange={(e) => setQty(e)}
						/>
					</Form.Item>

					<Form.Item>
						<Input
							placeholder="brand"
							value={brand}
							onChange={(e) => setBrand(e.target.value)}
						/>
					</Form.Item>

					<Form.Item>
						<Input
							placeholder="color"
							value={color}
							onChange={(e) => setColor(e.target.value)}
						/>
					</Form.Item>

					<ImgCrop rotate>
						<input
							type="file"
							multiple
							name="file"
							onChange={handleUpload}
							onDrop={handleUpload}
						/>
					</ImgCrop>
					<Button type="primary" onClick={upload}>
						upload
					</Button>
				</Form>
			</Drawer>
		</>
	);
};

export default CreateProduct;
