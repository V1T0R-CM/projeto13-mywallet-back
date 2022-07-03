import express from 'express';
import router from './routes/index.js';
import dotenv from "dotenv";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.use(router);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
