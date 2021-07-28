import axios from 'axios';
const url = `${process.env.REACT_APP_API}`;
export const createCat = async (category) =>
	await axios.post(`${url}/category`, category);

export const uploadImg = async (formData) =>
	await axios.post(`${url}/upload`, formData, {
		headers: {
			'content-type': 'multipart/form-data',
		},
	});

/* export const getCatProducts = async (id) =>
	await axios.get(`${url}/catproduct`, id); */

export const getCats = async () => await axios.get(`${url}/category`);
