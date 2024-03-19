
import {Express, Request, Response} from "express";


export default function (app: Express) {
    app.get("/healthcheck", (request: Request, response: Response) => response.sendStatus(200));
}
