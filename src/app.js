import cors from 'cors';
import express from 'express';

import fileRoutes from './fileRoutes.js';
import routes from './routes.js';

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (_req, res) => res.status(200).json({ ok: true }));

app.use(fileRoutes);
app.use(routes);

export default app;
