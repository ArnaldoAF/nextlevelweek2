import {Request, Response} from 'express';
import db from "../database/connections";


export default class ConnectionController {
     async index(request: Request, response: Response)  {
        const connections = await db('connections').count('* as total');

        return response.status(201).json(connections[0]);

    }

     async create(request: Request, response: Response) {
         const {user_id} = request.body;

         await db('connections').insert({
             user_id,
         });

         return response.status(201).json({
             ok:"ok"
         })
    }
}