require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');
const cors = require('cors');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const leave = require('./routes/api/leave');

mongoose.connect('mongodb://localhost:27017/employee', { useNewUrlParser: true });
const db = mongoose.connection;

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev'));

app.use(passport.initialize());

require('./config/passport')(passport);

app.use('/api/user', users);
app.use('/api/profile', profile);
app.use('/api/leave', leave);

const port = process.env.port || 6000;

app.listen(port, () => console.log(`server running on ${port}`));
