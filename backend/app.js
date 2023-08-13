require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const crypto = require('crypto'); // экспортируем crypto
const cors = require("cors");
const { requestLogger, errorLogger } = require('./middlewares/logger.js');

const routeSignup = require('./routes/signup.js');
const routeSignin = require('./routes/signin.js');

const auth = require('./middlewares/auth.js');

const routeUsers = require('./routes/users.js');
const routeCards = require('./routes/cards.js');

const NotFoundError = require('./errors/NotFoundError.js');

const INTERNAL_SERVER_ERROR = 500;

const URL = 'mongodb://127.0.0.1:27017/mestodb';
const { PORT = 3000 } = process.env;

//mongoose.set('strictQuery', true);

mongoose.connect(URL);

const app = express();
app.use(cors({ origin: 'http://localhost:3001' }));

app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use('/', routeSignup);
app.use('/', routeSignin);

app.use(auth);

app.use('/users', routeUsers);
app.use('/cards', routeCards);

app.use(errorLogger);

app.use((req, res, next) => next(new NotFoundError('Страница не найдена')));
app.use(errors());
app.use((err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
  } else {
    res.status(INTERNAL_SERVER_ERROR).send({ message: 'dasdsd' });
  }

  next();
});

app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`);
});
