const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
	name: { type: String, required: true },
	rating: { type: Number, required: true },
	comment: { type: String, required: true },
	user: {
		type: mongoose.Schema.Types.String,
		required: true,
		ref: 'User',
	},
});

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true,
			maxlength: 50,
			text: true,
		},
		slug: {
			type: String,
			unique: true,
			lowercase: true,
			index: true,
			required: true,
		},
		description: {
			type: String,
			trim: true,
			required: true,
			// maxlength: 150,
		},
		originalPrice: {
			type: Number,
			required: true,
			maxlength: 2000,
			text: true,
		},
		discountPrice: {
			type: Number,
			maxlength: 2000,
			text: true,
		},
		category: {
			type: mongoose.Schema.Types.String,
			ref: 'Category',
			required: true,
		},

		quantity: { type: Number, required: true },
		sold: {
			type: Number,
			default: 0,
		},

		shipping: {
			type: String,
			enum: ['Yes', 'No'],
			default: 'Yes',
			required: true,
		},
		color: {
			type: String,
			required: true,
		},
		brand: {
			type: String,
			required: true,
		},
		images: {
			type: Array,
		},
		reviews: [reviewSchema],
		rating: {
			type: Number,
			required: true,
			default: 0.0,
		},
		numReviews: {
			type: Number,
			required: true,
			default: 0.0,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Product', productSchema);
