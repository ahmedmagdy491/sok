import React, { useState } from 'react';
import ImgCrop from 'antd-img-crop';
import { Upload, Button, Form, Drawer } from 'antd';
import { AiOutlineInbox } from 'react-icons/ai';
import axios from 'axios';
import { useSelector } from 'react-redux';
const { Dragger } = Upload;

const PannerUpload = ({ onClose, visible }) => {
	const [images, setImages] = useState([]);
	const [files, setFiles] = useState([]);

	let url = `${process.env.REACT_APP_API}`;

	const uploadFileHandler = async (e) => {
		setFiles(e.target.files);
	};

	const { userLogin } = useSelector((state) => ({ ...state }));

	const upload = async (e) => {
		e.preventDefault();
		let formData = new FormData();
		for (let i = 0; i < files.length; i++)
			formData.append('file', files[i]);

		const config = {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		};

		await axios
			.post(`${url}/uploadimages`, formData, config)
			.then((res) => {
				setImages(res.data);
			})
			.then(async () => {
				await axios
					.post(
						`${url}/panner`,
						{ images },
						{
							headers: {
								authtoken: userLogin.token,
							},
						}
					)
					.then((res) => {
						console.log(res);
					})
					.catch((err) => {
						console.log(err);
					});
			});
	};
	return (
		<>
			<Drawer
				title="Basic Drawer"
				placement="right"
				closable={false}
				onClose={onClose}
				visible={visible}
			>
				<Form className="mt-5 pt-5">
					<ImgCrop rotate>
						<input
							type="file"
							multiple
							name="file"
							onChange={uploadFileHandler}
							onDrop={uploadFileHandler}
						/>
					</ImgCrop>
					<Button type="primary" onClick={upload}>
						upload to panner
					</Button>
				</Form>
			</Drawer>
		</>
	);
};
export default PannerUpload;
