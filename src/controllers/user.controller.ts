import {Request, Response} from "Express";
import { CreateUserInput } from "../schemas/user.schema";
import { createUser } from "../services/user.service";
import logger from '../utils/logger';
import { omit } from 'lodash';

export async function createUserHandler(req:Request<{},{},CreateUserInput["body"]>, res:Response){
    try{
        const user = await createUser(req.body);
        // return res.send(user);
        return res.send(omit(user.toJSON(),"password"));
    }catch(e:any){
        logger.error(e);
        return res.status(409).send(e.message);
    }
}