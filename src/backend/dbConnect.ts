import mongoose from 'mongoose';

const dbConnect = async () => {
	try {
		if (mongoose.connections[0].readyState === 1) {
			console.log('Connected Successfully');
		}
		await mongoose.connect('mongodb://localhost:27017');
		console.log('Connected Successfully');
	} catch (error) {
		return Promise.reject('Something went wrong. Check your DATABASE');
	}
};

export default dbConnect;
