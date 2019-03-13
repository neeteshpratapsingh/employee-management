const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');
const cors = require('cors');

// app.post('/confirmation', userController.confirmationPost);
// app.post('/resend', userController.resendTokenPost);
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const leave = require('./routes/api/leave');
const posts = require('./routes/api/posts');
// const feedback = require('./routes/api/feedback');

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
app.use('/api/posts', posts);
// app.use('./api/feedback', feedback);

const port = process.env.port || 6000;

app.listen(port, () => console.log(`server running on ${port}`));
