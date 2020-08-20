import jwt from 'jsonwebtoken';
import {promisify} from 'util';
import { Request, Response, NextFunction } from 'express';

export default async (request: Request, response: Response, next: NextFunction) => {
    console.log("MIDDLEWARE");
    const authHeader = request.headers.authorization;
    console.log("authHeader", authHeader);
    var {userId} = request.body;
    console.log("request.body", request.body);


    if(!authHeader) {
        return response.status(401).json({ message: "No toke Providen"});
    }

    const [scheme, token] = authHeader.split('  ');
    console.log("scheme", scheme);
    console.log("token", token);


    try {
        console.log("try");
        var decoded = await promisify(jwt.verify)(token, "secret");
        console.log("decoded", decoded);

        userId = decoded;

        return next();
    } catch(err) {
        return response.status(401).json({ message: "Invalid Token"});
    }
}