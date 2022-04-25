import express from 'express';
import config from 'config';
import log from './utils/logger';
import connect from './utils/connect';
import routes from './routes';
import deserializeUser from './middlewares/decerializeUser';


const port = config.get<number>("port");
const host = config.get<string>("host");

const app = express();

app.use(deserializeUser);

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.listen(port, host, async ()=> {
    log.info(`Server is listening on: http://${host}:${port}`);

    //open mongodb connection
    await connect();

    //initialize server routes
    routes(app);
})