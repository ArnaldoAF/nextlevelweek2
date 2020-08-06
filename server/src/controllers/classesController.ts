
import {Request, Response} from 'express';

import db from '../database/connections';
import convertHourToMinute from '../utils/convertHourToMinute';


interface ScheduleItemIterface {
    week_day: number,
    from: string,
    to: string
}

export default class ClassController {
    async create(request:Request, response:Response) {
        const {
            name,
            avatar,
            whatsapp,
            bio,
            subject ,
            cost,
            schedule,
        } = request.body;
    
        const trx = await db.transaction();
    
        try {
            const insertedUserIds = await trx('users').insert({
                name,
                avatar,
                whatsapp,
                bio
            });
        
            const user_id = insertedUserIds[0];
        
            const insertedClassesIds = await trx('classes').insert({
                subject ,
                cost,
                user_id
            });
        
            const class_id = insertedClassesIds[0];
        
            const classSchedule = schedule.map((item:ScheduleItemIterface) => {
                return {
                    class_id,
                    week_day: item.week_day,
                    from: convertHourToMinute(item.from),
                    to: convertHourToMinute(item.to),
                }
            });
        
            await trx('classes_schedule').insert(classSchedule);
        
            await trx.commit();
        
            return response.status(201).json({"response": "ok"});
        } catch (err) {
            console.log(err);
            await trx.rollback();
            return response.status(400).json({
                error: "error while creating a new class"
            });
        }
    }
}