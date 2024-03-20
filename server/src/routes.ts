
import { handleLogin, handleLogout, handleRefresh, handleRegister, handleSendPasswordMail, handleSetPassword } from "./controllers/user.controller";
import {Express, Request, Response} from "express";


export default function (app: Express) {
    app.get("/healthcheck", (request: Request, response: Response) => response.sendStatus(200));


    app.post('/login', handleLogin);
    app.post('/register', handleRegister);
    app.post('/refresh', handleRefresh);
    app.post('/logout', handleLogout);


    app.patch('/password', handleSetPassword);
    app.post('/password', handleSendPasswordMail);


}
