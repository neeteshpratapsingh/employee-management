const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const nodemailer = require('nodemailer');

const key = require('../../config/keys').secretOrKey;

const userRegisterInput = require('../../validation/register');

const userLoginInput = require('../../validation/login');

const User = require('../../models/Users');

require('../../config/passport')(passport);

// router.post('/confirmation', userController.confirmationPost);
// router.post('/resend', userController.resendTokenPost);

router.post('/register', (req, res) => {
	console.log(req.body);
	const { errors, isValid } = userRegisterInput(req.body);

	if (!isValid) {
		return res.status(400).json(errors);
	}

	const name = req.body.name;
	const email = req.body.email;
	const password = req.body.password;
	const role = req.body.role;

	User.findOne({
		email: email
	}).then((user) => {
		if (user) {
			errors.email = 'User Already exist';
			res.status(404).json(errors);
		} else {
			const NewUser = new User({
				name,
				email,
				password,
				role
			});

			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(password, salt, (err, hash) => {
					if (err) {
						console.log(err);
					}

					NewUser.password = hash;

					NewUser.save()
						.then((user) => {
							const profileFields = {
								user: user._id
							};
							// //Create a verification token
							// const token = new Token({
							// 	_userId: user._id,
							// 	token: crypto.randomBytes(16).toString('hex')
							// });
							// //Save the verification token
							// token.save();

							// //Send the email
							// var transporter = nodemailer.createTransport({
							// 	service: 'Sendgrid',
							// 	auth: {
							// 		user: process.env.SENDGRID_USERNAME,
							// 		pass: process.env.SENDGRID_PASSWORD
							// 	}
							// });
							// var mailOptions = {
							// 	from: 'no-reply@yourwebapplication.com',
							// 	to: user.email,
							// 	subject: 'Account Verification Token',
							// 	text:
							// 		'Hello,\n\n' +
							// 		'Please verify your account by clicking the link: \nhttp://' +
							// 		req.headers.host +
							// 		'/confirmation/' +
							// 		token.token +
							// 		'.\n'
							// };
							// transporter.sendMail(mailOptions, function(err) {
							// 	if (err) {
							// 		return res.status(500).send({ msg: err.message });
							// 	}
							// 	res.status(200).send('A verification email has been sent to ' + user.email + '.');
							// });

							Profile.findOne({
								user: user._id
							}).then((profile) => {
								if (profile) {
									Profile.findOneAndUpdate(
										{
											user: user._id
										},
										{
											$set: profileFields
										},
										{
											new: true
										}
									).then((profile) => res.json(profile));
								} else {
									new Profile(profileFields).save().then((profile) => res.json(profile));
								}
							});
						})
						.catch((err) => {
							console.log(err);
						});
				});
			});
		}
	});
});

// exports.confirmationPost = function(req, res, next) {
// 	req.assert('email', 'Email is not valid').isEmail();
// 	req.assert('email', 'Email cannot be blank').notEmpty();
// 	req.assert('token', 'Token cannot be blank').notEmpty();
// 	req.sanitize('email').normalizeEmail({ remove_dots: false });

// 	// Check for validation errors
// 	var errors = req.validationErrors();
// 	if (errors) return res.status(400).send(errors);

// 	// Find a matching token
// 	Token.findOne({ token: req.body.token }, function(err, token) {
// 		if (!token)
// 			return res.status(400).send({
// 				type: 'not-verified',
// 				msg: 'We were unable to find a valid token. Your token my have expired.'
// 			});

// 		// If we found a token, find a matching user
// 		User.findOne({ _id: token._userId, email: req.body.email }, function(err, user) {
// 			if (!user) return res.status(400).send({ msg: 'We were unable to find a user for this token.' });
// 			if (user.isVerified)
// 				return res.status(400).send({ type: 'already-verified', msg: 'This user has already been verified.' });

// 			// Verify and save the user
// 			user.isVerified = true;
// 			user.save(function(err) {
// 				if (err) {
// 					return res.status(500).send({ msg: err.message });
// 				}
// 				res.status(200).send('The account has been verified. Please log in.');
// 			});
// 		});
// 	});
// };

// exports.resendTokenPost = function(req, res, next) {
// 	req.assert('email', 'Email is not valid').isEmail();
// 	req.assert('email', 'Email cannot be blank').notEmpty();
// 	req.sanitize('email').normalizeEmail({ remove_dots: false });

// 	// Check for validation errors
// 	var errors = req.validationErrors();
// 	if (errors) return res.status(400).send(errors);

// 	User.findOne({ email: req.body.email }, function(err, user) {
// 		if (!user) return res.status(400).send({ msg: 'We were unable to find a user with that email.' });
// 		if (user.isVerified)
// 			return res.status(400).send({ msg: 'This account has already been verified. Please log in.' });

// 		// Create a verification token, save it, and send email
// 		var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });

// 		// Save the token
// 		token.save(function(err) {
// 			if (err) {
// 				return res.status(500).send({ msg: err.message });
// 			}

// 			// Send the email
// 			var transporter = nodemailer.createTransport({
// 				service: 'Sendgrid',
// 				auth: { user: process.env.SENDGRID_USERNAME, pass: process.env.SENDGRID_PASSWORD }
// 			});
// 			var mailOptions = {
// 				from: 'no-reply@codemoto.io',
// 				to: user.email,
// 				subject: 'Account Verification Token',
// 				text:
// 					'Hello,\n\n' +
// 					'Please verify your account by clicking the link: \nhttp://' +
// 					req.headers.host +
// 					'/confirmation/' +
// 					token.token +
// 					'.\n'
// 			};
// 			transporter.sendMail(mailOptions, function(err) {
// 				if (err) {
// 					return res.status(500).send({ msg: err.message });
// 				}
// 				res.status(200).send('A verification email has been sent to ' + user.email + '.');
// 			});
// 		});
// 	});
// };

router.post('/login', (req, res) => {
	const { errors, isValid } = userLoginInput(req.body);

	if (!isValid) {
		return res.status(400).json(errors);
	}

	const email = req.body.email;
	const password = req.body.password;

	User.findOne({
		email: email
	}).then((user) => {
		if (!user) {
			errors.email = 'User Not found';
			return res.status(400).json(errors);
		}

		bcrypt.compare(password, user.password).then((isMatch) => {
			if (!isMatch) {
				errors.password = 'password is incorrect';
				return res.status(404).json(errors);
			} else {
				//  else if (!user.isVerified) {
				// 	// Make Sure User has been Verified
				// 	return res.status(401).send({
				// 		type: 'not-verified',
				// 		msg: 'Your account has not been verified.'
				// 	});

				// 	//Login successful, write token and send back to user
				// 	res.send({ token: generateToken(user), user: user.toJSON() });
				// }
				const payload = {
					id: user.id,
					name: user.name,
					email: user.email,
					role: user.role,
					date: user.date
				};

				jwt.sign(
					payload,
					'secret',
					{
						expiresIn: 3600
					},
					(err, token) => {
						return res
							.json({
								message: 'success',
								token: 'Bearer ' + token
							})
							.catch(console.log(err));
					}
				);
			}
		});
	});
});

router.get(
	'/current',
	passport.authenticate('jwt', {
		session: false
	}),
	(req, res) => {
		res.json({
			id: req.user.id,
			name: req.user.name,
			email: req.user.email,
			role: req.user.role
		});
	}
);

module.exports = router;
