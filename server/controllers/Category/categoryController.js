const Category = require('../../models/Category');
const Async = require('express-async-handler');
const slugify = require('slugify');

const createCategory = Async(async (req, res) => {
	const { name } = req.body;
	const image = req.body.image;

	if (await Category.findOne({ name }))
		res.status(400).json('The category already exists');

	const category = await new Category({
		name,
		image,
		slug: slugify(name),
	}).save();
	res.json({
		success: true,
		category,
	});
});

const getCategories = Async(async (req, res) => {
	let categories = await Category.find().sort({ createdAt: -1 }).exec();
	res.json(categories);
});

const getSpecCategory = Async(async (req, res) => {
	const category = await Category.findOne({ slug: req.params.slug }).exec();
	res.json(category);
});

const updateCategory = Async(async (req, res) => {
	const { name, image } = req.body;
	const updated = await Category.findOneAndUpdate(
		{
			slug: req.params.slug,
		},
		{ name, slug: slugify(name), image },
		{ new: true }
	);

	res.json({
		success: true,
		updated,
	});
});

const removeCategory = Async(async (req, res) => {
	await Category.findOneAndDelete({
		slug: req.params.slug,
	});
	res.json({
		success: true,
	});
});

module.exports = {
	createCategory,
	getCategories,
	updateCategory,
	removeCategory,
	getSpecCategory,
};
