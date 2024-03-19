import logger from 'pino';
import dayjs from 'dayjs';
import {Request, Response, NextFunction} from "express";


export const requestLogger = (request: Request, response: Response, next: NextFunction) => {
	console.log('Method:', request.method)
	console.log('Path:  ', request.path)
	console.log('Body:  ', request.body)
	console.log('---')
	next()
}
  
export const unknownEndpoint = (request: Request, response: Response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}

export const errorHandler = (error: any, request: Request, response: Response, next: NextFunction) => {
	console.error(error.message)
  
	if (error.name === 'CastError') {
	  return response.status(400).send({ error: 'malformatted id' })
	} else if (error.name === 'ValidationError') {
	  return response.status(400).json({ error: error.message })
	}
  
	next(error)
}
  

const log = logger({
	transport: {
		target: 'pino-pretty',
		options: {
			colorize: true
		}
	},
	timestamp: ()=> `,"time": "${dayjs().format()}"`,
})

export default log;
