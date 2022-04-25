import {Request, Response} from "Express";
import { createSession, findSessions, updateSession } from "../services/session.service";
import { validatePassword } from "../services/user.service";
import { signJwt } from "../utils/jwt.utils";
import config from "config";

export async function createUserSessionHandler(req:Request, res:Response){

    //validate the user's password
    const user = await validatePassword(req.body);

    if(!user){
        return res.status(401).send('Invalid email or password');
    }

    //create session
    const session = await createSession(user._id, req.get("user-agent") || "");


    //create access token JWT
    const accessToken = signJwt(
        {...user, session: session._id},
        {expiresIn: config.get("accessTokenTtl")} //15 mins
    );

    //create refresh token
    const refreshToken = signJwt(
        {...user, session: session._id},
        {expiresIn: config.get("refreshTokenTtl")} //15 mins
    );

    //return access and refresh tokens
    return res.send({accessToken, refreshToken});

}

export async function getUserSessionsHandler(req:Request, res:Response){
    const userId = res.locals.user._id;

    const sessions = await findSessions({user: userId, valid: true});

    return res.send(sessions);
}

export async function deleteUserSessionHandler(req:Request, res:Response){
    const sessionId = res.locals.user.session;

    await updateSession({_id: sessionId}, {valid: false});

    return res.send({
        accessToken: null,
        refreshToken: null
    })
}