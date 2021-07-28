const mongoose = require('mongoose');

const connectDB = () =>
	mongoose.connect(
		process.env.DATABASE_URL,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false,
		},
		(err) => {
			if (err) throw err;
			console.log(`Database connected`.green.bold);
		}
	);

module.exports = connectDB;
