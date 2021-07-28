const multer = require('multer');
const sharp = require('sharp');
const path = require('path');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads/');
	},
	filename: function (req, file, cb) {
		cb(null, `${file.filename}-${Date.now()}`);
	},
});
function checkFileType(file, cb) {
	const filetypes = /jpg|jpeg|png/;
	const extname = filetypes.test(
		path.extname(file.originalname).toLowerCase()
	);
	const mimetype = filetypes.test(file.mimetype);

	if (extname && mimetype) {
		return cb(null, true);
	} else {
		cb('Images only!');
	}
}

const uploadImgs = multer({
	limits: {
		fileSize: 15_000_000,
	},
	fileFilter: function (req, file, cb) {
		checkFileType(file, cb);
	},

	storage: storage,
});

module.exports = uploadImgs;
