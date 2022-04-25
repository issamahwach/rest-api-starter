import { Request, Response, NextFunction } from 'Express';
import {get} from 'lodash';
import { reIssueAccessToken } from '../services/session.service';
import { verifyJwt } from '../utils/jwt.utils';

const deserializeUser = async (req:Request, res:Response, next:NextFunction) => {
    const accessToken = get(req, "headers.authorization", "").replace(/^Bearer\s/,""); //safer way to get property might not exist (using lodash)

    const refreshToken = get(req, "headers.x-refresh");

    if(!accessToken) return next();

    const {decoded, expired} = verifyJwt(accessToken);

    if(decoded){
    res.locals.user = decoded;
    }

    if(expired && refreshToken){
        const newAccessToken = await reIssueAccessToken({refreshToken});

        if(newAccessToken) {
            res.setHeader('x-access-token', newAccessToken);
            const result = verifyJwt(newAccessToken);
            res.locals.user = result.decoded;
        }
    }

    return next();

}

export default deserializeUser;