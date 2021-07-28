import React, { useState } from 'react';
import { Form, Input, Drawer, Button, notification } from 'antd';
import { auth } from '../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../actions/userActions';

const AddUser = ({ onClose, visible }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	let dispatch = useDispatch();
	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			await auth.createUserWithEmailAndPassword(email, password);
			dispatch(signup(email));
			setEmail('');
			setPassword('');
		} catch (err) {
			notification.error({
				message: err.message,
				placement: 'bottomLeft',
			});
		}
	};

	return (
		<Drawer
			title="Basic Drawer"
			placement="right"
			closable={false}
			onClose={onClose}
			visible={visible}
			className="drawer"
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
				onSubmitCapture={submitHandler}
			>
				<Form.Item
					label="Email"
					name="email"
					value={email}
					rules={[
						{
							required: true,
							message: 'Please input email!',
						},
					]}
					onChange={(e) => setEmail(e.target.value)}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="Password"
					name="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					rules={[
						{
							required: true,
							message: 'Please input password!',
						},
					]}
				>
					<Input.Password />
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
		</Drawer>
	);
};

export default AddUser;
