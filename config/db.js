const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI2');

const connectDB = async () => {
	try {
		await mongoose.connect(db, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false
		});
		console.log('MongoDb connected...');
	} catch (error) {
		console.error(error.message);
		// Exit process with failure
		process.exit(1);
	}
};

module.exports = connectDB;
