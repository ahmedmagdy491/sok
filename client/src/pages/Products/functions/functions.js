import axios from 'axios';
const url = `${process.env.REACT_APP_API}`;

export const uploadImg = async (formData) =>
	await axios.post(`${url}/upload`, formData, {
		headers: {
			'content-type': 'multipart/form-data',
		},
	});

export const productCreate = async (product) =>
	await axios.post(`${url}/product`, product);
