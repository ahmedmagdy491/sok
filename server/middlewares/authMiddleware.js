const jwt = require('jsonwebtoken');
const User = require('../models/User.js');
const asyncHandler = require('express-async-handler');
const adminFb = require('../firebase/firebase');
// const protect = asyncHandler(async (req, res, next) => {
// 	let token;

// 	if (
// 		req.headers.authorization &&
// 		req.headers.authorization.startsWith('Bearer')
// 	) {
// 		try {
// 			token = req.headers.authorization.split(' ')[1];

// 			const decoded = jwt.verify(token, process.env.JWT_SECRET);

// 			req.user = await User.findById(decoded.id).select('-password');
// 			next();
// 		} catch (error) {
// 			res.status(401);
// 			throw new Error('Not authorized, token failed');
// 		}
// 	}

// 	if (!token) {
// 		res.status(401);
// 		throw new Error('Not authorized, no token');
// 	}
// });

// const admin = (req, res, next) => {
// 	if (req.user && req.user.isAdmin) {
// 		next();
// 	} else {
// 		res.status(401);
// 		throw new Error('Not authorized as an admin');
// 	}
// };

const protect = async (req, res, next) => {
	try {
		const firebaseUser = await adminFb
			.auth()
			.verifyIdToken(req.headers.authtoken);
		req.user = firebaseUser;
		next();
	} catch (error) {
		res.status(401).json({
			err: 'Please login at first',
		});
	}
};
const admin = async (req, res, next) => {
	const { email } = req.user;
	const adminUser = await User.findOne({ email }).exec();
	if (adminUser.role !== 'admin') {
		res.status(403).json({
			error: 'Admin resource. Access denied',
		});
	} else {
		next();
	}
};

module.exports = { protect, admin };
