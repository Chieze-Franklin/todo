import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { getTasks } from "./routes";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/tasks', getTasks);

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
