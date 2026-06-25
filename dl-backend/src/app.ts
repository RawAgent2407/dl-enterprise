import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';

import authRouter from './routes/auth';
import categoriesRouter from './routes/categories';
import productsRouter from './routes/products';
import contactsRouter from './routes/contacts';
import uploadsRouter from './routes/uploads';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors());
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));

// Static file serving
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use('/panel', express.static(path.join(__dirname, '../public/panel')));

// API routes
app.use('/api/admin', authRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/products', productsRouter);
app.use('/api/contacts', contactsRouter);
app.use('/api/upload', uploadsRouter);

// SPA fallback for admin panel
app.get('/panel/*', (_req, res) => {
  res.sendFile(path.join(__dirname, '../public/panel/index.html'));
});

app.use(errorHandler);

export default app;
