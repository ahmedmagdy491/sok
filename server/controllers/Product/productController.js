const Product = require('../../models/Product');
const Async = require('express-async-handler');
const slugify = require('slugify');

const createProduct = Async(async (req, res) => {
	req.body.slug = slugify(req.body.name);
	const product = await Product.find({ name: req.body.name });
	if (product) res.status(400).json('The product already exists');
	const newPorduct = await new Product(req.body).save();
	res.status(204).json({
		success: true,
		newPorduct,
	});
});

const updateProduct = Async(async (req, res) => {
	const slug = req.params.slug;
	if (req.body.name) {
		req.body.slug = slugify(req.body.name);
	}
	const updated = await Product.findOneAndUpdate({ slug }, req.body, {
		new: true,
	}).exec();
	res.json({
		success: true,
		updated,
	});
});

const deleteProduct = Async(async (req, res) => {
	const { slug } = req.params;
	const product = await Product.findOne({ slug });
	await product.remove();
	res.json({
		success: true,
	});
});

const getProducts = Async(async (req, res) => {
	let products = await Product.find()
		.sort([['cratedAt', 'desc']])
		.exec();
	res.json(products);
});

const getCatProduct = Async(async (req, res) => {
	let { slug } = req.params;

	res.json(
		await Product.find({ category: slug })
			.sort([['cratedAt', 'desc']])
			.exec()
	);
});
const getProductDetails = Async(async (req, res) => {
	const { slug } = req.params;
	res.json(await Product.findOne({ slug }));
});

const createProductReview = Async(async (req, res) => {
	const { rating, comment } = req.body;

	const product = await Product.findOne({ slug: req.params.slug });

	if (product) {
		const alreadyReviewd = product.reviews.find(
			(r) => r.user.toString() === req.user._id.toString()
		);

		if (alreadyReviewd) {
			res.status(400);
			throw new Error('Product already reviewd');
		}
		console.log(req.user);

		const review = {
			name: req.user.name,
			rating: Number(rating),
			comment,
			user: req.user._id,
		};

		product.reviews.push(review);

		product.numReviews = product.reviews.length;

		product.rating =
			product.reviews.reduce((acc, item) => item.rating + acc, 0) /
			product.reviews.length;

		await product.save();

		res.status(201).json({ meassage: 'Review added' });
	} else {
		res.status(404);
		throw new Error('Product not found');
	}
});

module.exports = {
	createProduct,
	getProducts,
	getCatProduct,
	getProductDetails,
	createProductReview,
	updateProduct,
	deleteProduct,
};
