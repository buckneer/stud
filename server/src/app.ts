
import express from 'express';
import "dotenv/config"
import cors from "cors"
import log, { errorHandler, requestLogger, unknownEndpoint } from "./logger/";
import connectDB from "./db/connect";
const path = require('path')
import routes from "./routes";


const app = express();

const PORT = process.env.PORT || 1337;
// {
// 	origin: ['http://localhost:3000', 'https://kupibenza.web.app/login'],
// 	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
// 	credentials: true // Enable sending credentials (like cookies) with the request
//   }

// {
	// 	origin: ['http://localhost:3000'],
	// 	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	// 	credentials: true // Enable sending credentials (like cookies) with the request
	// }
app.use(cors(
	
));
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(requestLogger);


routes(app)


app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
// Remove this if errors:
app.use(unknownEndpoint)
app.use(errorHandler)


app.listen(PORT, () => {
	log.info(`Server running on port: ${PORT}`);
	connectDB();
});
