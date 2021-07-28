import React from 'react';
import { Form, Input, Button } from 'antd';

const CatForm = ({ handleChange, values, handleSubmit }) => {
	const { name } = values;
	return (
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
					placeholder="Please enter category name"
					onChange={handleChange}
					value={name}
					name="name"
				/>
			</Form.Item>

			<Form.Item
				wrapperCol={{
					offset: 8,
					span: 16,
				}}
			>
				<Button type="primary" htmlType="submit">
					Submit
				</Button>
			</Form.Item>
		</Form>
	);
};

export default CatForm;
