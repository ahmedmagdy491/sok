const express = require('express');
const router = express.Router();

const { protect, admin } = require('../middlewares/authMiddleware');

// * controllers
const {
	upload,
	remove,
	getPanner,
} = require('../controllers/Panner/pannerController');

router.route('/panner').post(upload).delete(remove).get(getPanner);
module.exports = router;
