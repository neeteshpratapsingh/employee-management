'use strict';
require('dotenv').config();
const nodemailer = require('nodemailer');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');
const cors = require('cors');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const leave = require('./routes/api/leave');
const posts = require('./routes/api/posts');

nodemailer.createTestAccount((err, account) => {
	let transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: 'npsparihar97@gmail.com',
			pass: 72090000
		}
	});

	let mailOptions = {
		from: '"Neetesh pratap singh " <npsparihar97@gmail.com>',
		to: 'p904485@nwytg.net',
		subject: 'Hello from Neetesh',
		text: 'Hello world',
		html: '<h1> Hello</h1><b>Hello World?</b>'
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			return console.log(error);
		}

		console.log('message sent: %s', info.messageId);
		console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
	});
});

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

const port = process.env.port || 6000;

app.listen(port, () => console.log(`server running on ${port}`));
