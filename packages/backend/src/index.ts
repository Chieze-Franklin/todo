import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import {
    createGroup,
    createTask,
    deleteGroup,
    deleteTask,
    getGroups,
    getTasks,
    jwtAuth,
    login,
    updateTask,
} from "./routes";
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

app.get('/groups', jwtAuth, getGroups);
app.delete('/groups/:title', jwtAuth, deleteGroup);
app.post('/groups', jwtAuth, createGroup);

app.get('/tasks', jwtAuth, getTasks);
app.delete('/tasks/:id', jwtAuth, deleteTask);
app.post('/tasks', jwtAuth, createTask);
app.put('/tasks/:id', jwtAuth, updateTask);

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
