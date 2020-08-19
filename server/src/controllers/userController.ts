import {Request, Response} from 'express';
import db from '../database/connections';

import bcrypt from 'bcrypt';


export default class UserController {
    async register(request: Request, response: Response) {
        console.log("UserController - Register")
        const { name, email, password } = request.body;

        const avatar = 'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png';
        const whatsapp = '';
        const bio = 'Fale um pouco sobre você';

        const userObj = {
            name, 
            email,
            password: await bcrypt.hash(password, 8), 
            avatar, 
            whatsapp,
            bio
        }

        try {
            console.log("userObj", userObj);

            const insertUser = await db('users').insert(userObj);

            console.log("insertUser", insertUser);

            return response.status(201).json({
                "message": "Usuario inserido com sucesso",
                "body": userObj,
                "id": insertUser
                })
        } catch(err) {
            console.log(err);
            return response.status(400).json({
                "message": "Erro ao inserir Usuario",
                "body": err
            })
        }
    }
        
}