const router = require('express').Router();
const {
	createProduct,
	getProducts,
	getCatProduct,
	getProductDetails,
	createProductReview,
	updateProduct,
	deleteProduct,
} = require('../controllers/Product/productController');
const { protect, admin } = require('../middlewares/authMiddleware');
router.route('/product').post(protect, admin, createProduct).get(getProducts);
router.route('/cat/:slug').get(getCatProduct);
router
	.route('/product/:slug')
	.get(getProductDetails)
	.put(protect, admin, updateProduct)
	.delete(protect, admin, deleteProduct);
router.route('/product/:slug/reviews').post(protect, createProductReview);

module.exports = router;
