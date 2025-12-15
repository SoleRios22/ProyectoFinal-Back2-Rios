import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import passport from 'passport';
import { engine } from 'express-handlebars';
import path from 'path';

import configurePassport from './config/passport.js';
import sessionsRouter from './routes/sessions.router.js';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import passwordRouter from './routes/password.router.js';

dotenv.config();
const app = express();
const __dirname = path.resolve();

// DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB conectado'))
  .catch(console.error);

// Handlebars
app.engine('hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'src/views'));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
configurePassport();
app.use(passport.initialize());

// Rutas
app.use('/api/sessions', sessionsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/password', passwordRouter);

// Home
app.get('/', (req, res) => res.render('home'));

app.listen(process.env.PORT, () =>
  console.log(`Servidor activo en puerto ${process.env.PORT}`)
);
