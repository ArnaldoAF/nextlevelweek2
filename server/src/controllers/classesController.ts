
import {Request, Response} from 'express';

import db from '../database/connections';
import convertHourToMinute from '../utils/convertHourToMinute';


interface ScheduleItemIterface {
    week_day: number,
    from: string,
    to: string
}

export default class ClassController {
    async index(request: Request, response: Response) {
        const filters = request.query;
        console.log("INDEX ClassController");
        console.log(request.body);


        const week_day = filters.week_day as string;
        const subject = filters.subject as string;
        const time = filters.time as string;

        if(!filters.week_day || !filters.subject || !filters.time) {
            return response.status(400).json({
                error:"err, no filters informed"
            })
        }

        const timeInMinutes = convertHourToMinute(time);

        const classes = await db('classes')
        .whereExists(function() {
            this.select('classes_schedule.*')
                .from('classes_schedule')
                .whereRaw('`classes_schedule`.`class_id` = `classes`.`id`')
                .whereRaw('`classes_schedule`.`week_day` = ??',[Number(week_day)])
                .whereRaw('`classes_schedule`.`from` <= ??',[timeInMinutes])
                .whereRaw('`classes_schedule`.`to` > ??',[timeInMinutes])
        })
        .where('classes.subject','=',subject)
        .join('users', 'classes.user_id', "=", 'users.id')
        .select(['classes.*', 'users.*']);

        return response.json(classes);
    }
    
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
        console.log("create ClassController");
        
        console.log(request.body);
    
        const trx = await db.transaction();
    
        try {
            const insertedUserIds = await trx('users').insert({
                name,
                avatar,
                whatsapp,
                bio
            });

            console.log("users");
        
            const user_id = insertedUserIds[0];
        
            const insertedClassesIds = await trx('classes').insert({
                subject ,
                cost,
                user_id
            });
            console.log("classes");
        
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
            console.log("classes_schedule");
        
            await trx.commit();
        
            return response.status(201).json({"response": "ok"});
        } catch (err) {
            console.log("ERRO");
            console.log(err);
            await trx.rollback();
            return response.status(400).json({
                error: "error while creating a new class"
            });
        }
    }
}