import React, { Fragment, useEffect, useState } from 'react';
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
} from 'antd';

import { listCats } from '../../../../actions/catActions';
import { useDispatch, useSelector } from 'react-redux';
import ImgCrop from 'antd-img-crop';
import { AiOutlineInbox } from 'react-icons/ai';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import { productUpdateAction } from './../../../../actions/productActions';

const { Dragger } = Upload;
const { Option } = Select;

const UpdateProduct = ({ closeDrawer, visible }) => {
	let url = `${process.env.REACT_APP_API}/uploadimages`;
	const props = {
		name: 'file',
		multiple: true,
		action: url,
		async onChange(info) {
			const { status } = info.file;
			if (status === 'done') {
				message.success(`${info.files} file uploaded successfully.`);

				setImages(info.fileList.map((file) => `/uploads/${file.name}`));
			} else if (status === 'error') {
				message.error(`${info.file.name} file upload failed.`);
			}
		},
		onDrop(e) {
			e.preventDefault();
		},
	};

	const [name, setName] = useState();
	const [images, setImages] = useState();
	const [description, setDescription] = useState();
	const [originalPrice, setOriginalPrice] = useState();
	const [discountPrice, setDiscountPrice] = useState();
	const [category, setCategory] = useState();
	const [qty, setQty] = useState();
	const [shipping, setShipping] = useState();
	const [color, setColor] = useState();
	const [brand, setBrand] = useState();
	const [checked, setChecked] = useState(false);

	let dispatch = useDispatch();

	const { catList } = useSelector((state) => ({ ...state }));
	const { cats } = catList;

	useEffect(() => {
		dispatch(listCats());
	}, [dispatch]);

	const handleSubmit = (e) => {
		e.preventDefault();
		const slug = JSON.parse(localStorage.getItem('slug'));
		dispatch(
			productUpdateAction(slug, {
				name,
				description,
				originalPrice,
				discountPrice,
				category,
				quantity: qty,
				shipping,
				color,
				brand,
				images,
			})
		);
	};
	return (
		<>
			<Drawer
				title="Update Product"
				width={500}
				onClose={closeDrawer}
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
							onClick={closeDrawer}
							id="close"
							style={{ marginRight: 8 }}
						>
							Cancel
						</Button>
						<Button
							onClick={handleSubmit}
							id="submit-btn"
							type="primary"
						>
							Submit
						</Button>
					</div>
				}
			>
				<h3>Update Product</h3>

				<Form
					labelCol={{
						span: 4,
					}}
					wrapperCol={{
						span: 14,
					}}
					layout="horizontal"
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
						<Checkbox
							onChange={(e) => setChecked(e.target.checked)}
						>
							Discount
						</Checkbox>
					</Form.Item>
					{checked && (
						<Form.Item>
							<InputNumber
								placeholder="new price"
								defaultValue={discountPrice}
								onChange={(e) => setDiscountPrice(e)}
							/>
						</Form.Item>
					)}
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
							{cats &&
								cats.map((cat) => (
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
						<Select
							placeholder="shipping"
							value={shipping}
							onChange={(e) => setShipping(e)}
						>
							<Select.Option value="Yes">Yes</Select.Option>
							<Select.Option value="No">No</Select.Option>
						</Select>
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
						<Dragger {...props} listType="picture-card" required>
							<p className="ant-upload-drag-icon">
								<AiOutlineInbox />
							</p>
							<p className="ant-upload-text">
								Click or drag file to this area to upload
							</p>
						</Dragger>
					</ImgCrop>
				</Form>
			</Drawer>
		</>
	);
};

export default UpdateProduct;
