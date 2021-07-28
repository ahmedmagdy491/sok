import React from 'react';
import { message, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { AiOutlineInbox } from 'react-icons/ai';
const { Dragger } = Upload;
const FileUpload = () => {
	let url = `${process.env.REACT_APP_API}/uploadimages`;

	const props = {
		name: 'file',
		multiple: true,
		action: url,
		onChange(info) {
			const { status } = info.file;
			if (status !== 'uploading') {
				console.log('Image Info --->', info.file.name);
			}
			if (status === 'done') {
				message.success(
					`${info.file.name} file uploaded successfully.`
				);
				localStorage.setItem('image', JSON.stringify(info.file.name));
			} else if (status === 'error') {
				message.error(`${info.file.name} file upload failed.`);
			}
		},
		onDrop(e) {
			console.log('Dropped files', e.dataTransfer.files);
			e.preventDefault();
		},
	};

	return (
		<>
			<ImgCrop rotate>
				<Dragger {...props} listType="picture-card">
					<p className="ant-upload-drag-icon">
						<AiOutlineInbox />
					</p>
					<p className="ant-upload-text">
						Click or drag file to this area to upload
					</p>
				</Dragger>
			</ImgCrop>
		</>
	);
};

export default FileUpload;
