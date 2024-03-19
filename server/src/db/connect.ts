import mongoose from 'mongoose';
import log from "../logger";

const connectDB = async () => {
	await mongoose.connect(process.env.MONGO_URI!);
	log.info("MongoDB Connected");
}

export default connectDB;
