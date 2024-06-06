import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import logger from 'morgan';
import { connectCassandraDB } from './db/cassandra/connect/connect.cassandra.db.ts';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

await connectCassandraDB();

app.use(logger('combined'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.get('/', (req, res) => {
    res.send('hi');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server listening on PORT: ${PORT}`);
});
