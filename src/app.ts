// Imports modules
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import config from './config';
import pkg from '../package.json';

// init
const app = express();

// Settings
app.set('pkg', pkg);
app.set('port', config.PORT);
app.set('json spaces', 2);

// Middlewares
const corsOptions = {
  // origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

//Welcome Route
app.get('/', (_req, res) => {
  res.json({
    message: 'Welcome',
    name: pkg.name,
    version: pkg.version,
    description: pkg.description,
    author: pkg.author,
  });
});

export default app;
