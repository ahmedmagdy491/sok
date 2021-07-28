const router = require('express').Router();
const {
	loginUser,
	registerUser,
	getUserProfile,
	updateUserProfile,
	deleteUser,
	getUserById,
	updateUser,
	getUsers,
	addToWishList,
	getWishes,
	createOrLoginUser,
	currentUser,
} = require('../controllers/User/userController.js');

const { admin, protect } = require('../middlewares/authMiddleware.js');

router.route('/user').get(protect, admin, getUsers);
router.route('/user/register').post(registerUser);
router.route('/user/login').post(loginUser);
router
	.route('/user/profile')
	.get(protect, getUserProfile)
	.put(protect, updateUserProfile);
router
	.route('/user/:id')
	.delete(protect, admin, deleteUser)
	.get(protect, getUserById)
	.put(protect, admin, updateUser);
router.route('/wishlist').post(protect, addToWishList);
router.route('/wishes').get(protect, getWishes);

router.post('/create-or-login-user', protect, createOrLoginUser);
router.post('/current-user', protect, currentUser);
router.post('/current-admin', protect, admin, currentUser);

module.exports = router;
