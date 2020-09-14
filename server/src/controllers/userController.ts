import {Request, Response} from 'express';
import db from '../database/connections';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

function compareHash(hash: string, base: string){
    return bcrypt.compare(hash, base);
}

function generateToken(userId: string) {
    return jwt.sign({ id: userId }, "secret", {
        expiresIn: 86400
      });
}


export default class UserController {
    async register(request: Request, response: Response) {
        console.log("---------------------------------------------------");
        console.log("UserController - Register")
        const { name, lastName, email, password } = request.body;

        const avatar = 'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png';
        const whatsapp = '';
        const bio = 'Fale um pouco sobre você';

        const userObj = {
            name: name+" "+lastName, 
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
    
    async login(request: Request, response: Response) {
        console.log("---------------------------------------------------");
        console.log("UserController - Login");
        
        const { email, password} = request.body;
        try {
            var userDataBase = await db('users').where('email','=', email).select('*');
            
            console.log("userDataBase", userDataBase);
    
            if(!userDataBase || userDataBase.length === 0) {
                return response.status(400).json({message:"Usuario não exite"});
            }

            console.log(userDataBase[0]['password']);
            console.log("compareHash", await compareHash(password, userDataBase[0]['password']));
            
            if(!(await compareHash(password, userDataBase[0]['password']))){
                return response.status(400).json({ message: "Invalid password" });
            }
    
            return response.json({
                userDataBase,
                token: generateToken(userDataBase[0]['id'])
            })
        } catch(err) {
            console.log(err);
            return response.status(400).json({
                "message": "Erro ao fazer LOGIN",
                "body": err
            })
        }
        

    }

    async me(request: Request, response: Response) {
        console.log("---------------------------------------------------");
        console.log("UserController - Me");

        const { userId} = request.body;
        try {
            const user = await db('users').where('id','=',userId).select('*');

            if(!user) return response.status(400).json({message: "User not fouded"});
    
            return response.status(200).json(user);
        } catch(err) {
            console.log(err);
            return response.status(400).json({
                "message": "Erro ao buscar usuario",
                "body": err
            })
        }
        
    }
}