const Panner = require('../../models/Panner');
const Async = require('express-async-handler');
const upload = Async(async (req, res) => {
	const { images } = req.body;

	for (let i = 0; i < images.length; i++) {
		let image = images[i];
		if (await Panner.findOne({ image })) {
			res.json({
				added: false,
				message: `${image} already exists`,
			});
		} else {
			await new Panner({ image }).save();
		}
	}
	const panner = await Panner.find();
	res.json({
		added: true,
		panner,
	});
});

const remove = Async(async (req, res) => {
	await Panner.remove({ image: req.body.image }, function (err) {
		if (err) console.log(err);
	});
	res.json({
		removed: true,
	});
});

const getPanner = Async(async (req, res) => {
	res.json(await Panner.find());
});

module.exports = { upload, remove, getPanner };
