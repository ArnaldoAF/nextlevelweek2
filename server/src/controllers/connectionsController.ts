import {Request, Response} from 'express';
import db from "../database/connections";


export default class ConnectionController {
     async index(request: Request, response: Response)  {
        console.log("create ConnectionController");
        
        console.log(request.body);
        const connections = await db('connections').count('* as total');

        return response.status(201).json(connections[0]);

    }

     async create(request: Request, response: Response) {
         const {user_id} = request.body;
         console.log("create ConnectionController");
        
        console.log(request.body);

        try {
         await db('connections').insert({
             user_id,
         });
        }catch (err) {
            console.log("ERRO");
            console.log(err);
            return response.status(400).json({
                error: "error while creating a new class"
            });
        }

         return response.status(201).json({
             ok:"ok"
         })
    }
}