const router = require('express').Router();
const {
	addOrderItems,
	getOrderById,
	updateOrderToPaid,
	updateOrderToDelivered,
	getAllOrders,
	getMyOrders,
	addNote,
	setState,
} = require('../controllers/Order/orderController');
const { protect, admin } = require('../middlewares/authMiddleware');

router
	.route('/orders')
	.post(protect, addOrderItems)
	.get(protect, admin, getAllOrders);
router.route('/orders/myorders').get(protect, getMyOrders);
router.route('/orders/:id').get(protect, getOrderById);
router.route('/orders/:id/pay').put(protect, updateOrderToPaid);
router.route('/orders/:id/deliver').put(protect, admin, updateOrderToDelivered);
router.route('/orders/:id/note').put(protect, addNote);
router.route('/orders/:id/state').put(protect, admin, setState);

module.exports = router;
