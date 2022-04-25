import { Request, Response, NextFunction } from 'Express';


const requireUser = (req:Request, res:Response, next:NextFunction) => {
    const user = res.locals.user;
    
    console.log(res);
    if(!user) return res.sendStatus(403);

    return next();
}

export default requireUser;