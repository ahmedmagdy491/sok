import React, { useState, useEffect } from 'react';
import { Col, Image } from 'react-bootstrap';
import { BsEye, BsHeart, BsFillHeartFill } from 'react-icons/bs';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { FiShoppingCart } from 'react-icons/fi';
import { GoSettings } from 'react-icons/go';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import '../assets/Product.css';
import Details from './Details';
import IconList from './IconsList';
import { addToWishListAction } from './../../../actions/userActions';
import { Badge, Popover } from 'antd';
import { deleteProductAction } from '../../../actions/productActions';

const Product = ({ product, showDrawer }) => {
	const [src, setSrc] = useState(product.images[0]);
	const [inWishlist, setInWishlist] = useState(false);
	const history = useHistory();
	const { addToWishList, userLogin } = useSelector((state) => ({ ...state }));

	// const { error, wishlist } = addToWishList;

	const addItem = () => {
		history.push(`/cart/${product.slug}?quantity=${1}`);
	};
	const showDetails = () => {
		history.push(`/${product.category}/${product.slug}`);
	};

	const dispatch = useDispatch();

	const token = userLogin && userLogin.token;

	const addItemToWishList = async (e) => {
		e.preventDefault();
		dispatch(addToWishListAction(token, product.slug));
	};
	const deleteProduct = (e) => {
		e.preventDefault();
		dispatch(deleteProductAction(token, product.slug));
	};
	const content = (
		<div className="row justify-content-around">
			<AiFillEdit
				className="btn-info h3"
				onClick={(e) => {
					showDrawer();
					localStorage.setItem('slug', JSON.stringify(product.slug));
				}}
			/>
			<AiFillDelete className="btn-danger h3" onClick={deleteProduct} />
		</div>
	);
	return (
		<Col xs={12} sm={6} md={4} xl={3} className="product-card">
			{product.discountPrice && (
				<Badge className="w-100">
					<img
						src="https://image.flaticon.com/icons/png/512/1831/1831655.png"
						className="discount-badge"
						alt=""
					/>
				</Badge>
			)}
			<Image
				className="product-image w-100 h-75"
				src={src}
				alt={product.name}
				onMouseEnter={() => setSrc(product.images[1])}
				onMouseLeave={() => setSrc(product.images[0])}
				onClick={showDetails}
			/>
			<span className="product-options ">
				<ul>
					{userLogin.role === 'admin' && (
						<Popover content={content} title="Title">
							<button
								style={{
									background: 'transparent',
									border: 'none',
								}}
								value={product.slug}
							>
								<IconList item={<GoSettings />} />
							</button>
						</Popover>
					)}
					{userLogin.role !== 'admin' && (
						<Link className="add-to-cart" onClick={addItem}>
							<IconList
								item={<FiShoppingCart />}
								className="shop-cart w-100"
							/>
						</Link>
					)}
					<IconList
						item={
							inWishlist ? (
								<BsFillHeartFill
									style={{ color: 'red' }}
									onClick={addItemToWishList}
								/>
							) : (
								<BsHeart onClick={addItemToWishList} />
							)
						}
					/>
					<IconList item={<BsEye />} />
				</ul>
			</span>

			<Details product={product} />
		</Col>
	);
};

export default Product;
