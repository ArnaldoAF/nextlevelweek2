import jwt from 'jsonwebtoken';
import {promisify} from 'util';


export default async function getUserIdByToken(token: string) {
    console.log("---------------------------------------------------");
    console.log("getUserIdByToken");
    const decoded = await promisify(jwt.verify)(token, "secret");
    console.log("decoded", decoded);
    const userObject = JSON.parse(JSON.stringify(decoded));
    const userId = userObject.id;
    console.log("userID", userId);
    console.log("---------------------------------------------------");
    
    return userId;

}