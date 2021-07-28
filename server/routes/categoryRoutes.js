const router = require('express').Router();

const {
	createCategory,
	getCategories,
	updateCategory,
	removeCategory,
	getSpecCategory,
} = require('../controllers/Category/categoryController');

const { protect, admin } = require('../middlewares/authMiddleware');

router
	.route('/category')
	.post(protect, admin, createCategory)
	.get(getCategories);
router
	.route('/category/:slug')
	.put(protect, admin, updateCategory)
	.delete(protect, admin, removeCategory)
	.get(protect, admin, getSpecCategory);

module.exports = router;
