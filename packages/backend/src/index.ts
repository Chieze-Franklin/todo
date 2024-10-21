import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { getTasks, jwtAuth, login } from "./routes";
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.post('/login', login);

app.get('/tasks', jwtAuth, getTasks);

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
