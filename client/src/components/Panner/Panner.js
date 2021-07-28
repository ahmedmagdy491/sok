import React, { useEffect, useState } from 'react';
import { Carousel, Image } from 'react-bootstrap';
import './Panner.css';
import axios from 'axios';
const Panner = ({ cats }) => {
	const [panner, setPanner] = useState([]);
	let url = `${process.env.REACT_APP_API}`;
	const getPanner = async () => {
		await axios
			.get(`${url}/panner`)
			.then((res) => {
				setPanner(res.data);
				console.log(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		getPanner();
	}, []);
	return (
		<Carousel fade className="panner">
			{panner.map((p) => (
				<Carousel.Item>
					<Image
						className="d-block w-100 carousel-image"
						src={p.image}
						alt={p._id}
						roundedCircle
					/>
				</Carousel.Item>
			))}
		</Carousel>
	);
};

export default Panner;
