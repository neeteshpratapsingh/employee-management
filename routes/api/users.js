const crypto = require('crypto');
const nodemailer = require('nodemailer');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const key = require('../../config/keys').secretOrKey;

const userRegisterInput = require('../../validation/register');

const userLoginInput = require('../../validation/login');

const User = require('../../models/Users');
const Token = require('../../models/Token');

require('../../config/passport')(passport);

// Without verification
// router.post('/register', (req, res) => {
// 	console.log(req.body);
// 	const { errors, isValid } = userRegisterInput(req.body);

// 	if (!isValid) {
// 		return res.status(400).json(errors);
// 	}

// 	const name = req.body.name;
// 	const email = req.body.email;
// 	const password = req.body.password;
// 	const role = req.body.role;

// 	User.findOne({
// 		email: email
// 	}).then((user) => {
// 		if (user) {
// 			errors.email = 'User Already exist';
// 			res.status(404).json(errors);
// 		} else {
// 			const NewUser = new User({
// 				name,
// 				email,
// 				password,
// 				role
// 			});

// bcrypt.genSalt(10, (err, salt) => {
// 	bcrypt.hash(password, salt, (err, hash) => {
// 		if (err) {
// 			console.log(err);
// 		}

// 					NewUser.password = hash;

// 					NewUser.save()
// 						.then((user) => {
// 							const profileFields = {
// 								user: user._id
// 							};

// 							Profile.findOne({
// 								user: user._id
// 							}).then((profile) => {
// 								if (profile) {
// 									Profile.findOneAndUpdate(
// 										{
// 											user: user._id
// 										},
// 										{
// 											$set: profileFields
// 										},
// 										{
// 											new: true
// 										}
// 									).then((profile) => res.json(profile));
// 								} else {
// 									new Profile(profileFields).save().then((profile) => res.json(profile));
// 								}
// 							});
// 						})
// 						.catch((err) => {
// 							console.log(err);
// 						});
// 				});
// 			});
// 		}
// 	});
// });

// With verification
// router.post('/register', (req, res) => {
// 	console.log(req.body);
// 	const { errors, isValid } = userRegisterInput(req.body);

// 	if (!isValid) {
// 		return res.status(400).json(errors);
// 	}
// 	User.findOne({ email: req.body.email }, function(err, user) {
// 		if (user)
// 			return res
// 				.status(400)
// 				.send({ msg: 'The email address you have entered is already associated with another account.' });

// 		user = new User({
// 			name: req.body.name,
// 			email: req.body.email,
// 			password: req.body.password
// 		});
// 		user.save(function(err) {
// 			if (err) {
// 				return res.status(500).send({ msg: err.message });
// 			}
// 			var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });

// 			token.save(function(err) {
// 				if (err) {
// 					return res.status(500).send({ msg: err.message });
// 				}

// 				var transporter = nodemailer.createTransport({
// 					service: 'Sendgrid',
// 					auth: { user: 'npsparihar97@gmail.com', pass: '72090000Np' }
// 				});
// 				var mailOptions = {
// 					from: 'npsparihar97@gmail.com',
// 					to: user.email,
// 					subject: 'Account Verification Token',
// 					text:
// 						'Hello,\n\n' +
// 						'Please verify your account by clicking the link: \nhttp://' +
// 						req.headers.host +
// 						'/confirmation/' +
// 						token.token +
// 						'.\n'
// 				};
// 				transporter.sendMail(mailOptions, function(err) {
// 					console.log(err);
// 					if (err) {
// 						return res.status(500).send({ msg: err.message });
// 					}
// 					res.status(200).send('A verification email has been sent to ' + user.email + '.');
// 				});
// 			});
// 		});
// 	});
// });

//tried Complete verification
router.post('/register', (req, res) => {
	console.log(req.body);
	const { errors, isValid } = userRegisterInput(req.body);

	if (!isValid) {
		return res.status(400).json(errors);
	}
	email = req.body.email;
	password = req.body.password;

	User.findOne({ email: email }, function(err, user) {
		if (user)
			return res
				.status(400)
				.send({ msg: 'The email address you have entered is already associated with another account.' });

		user = new User({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password
		});
		user.save(function(err) {
			if (err) {
				return res.status(500).send({ msg: err.message });
			}
			var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });

			token.save(function(err) {
				if (err) {
					return res.status(500).send({ msg: err.message });
				}
				bcrypt.genSalt(10, (err, salt) => {
					bcrypt.hash(password, salt, (err, hash) => {
						if (err) {
							console.log(err);
						}

						user.password = hash;

						user
							.save()
							.then((user) => {
								const profileFields = {
									user: user._id
								};

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
				var transporter = nodemailer.createTransport({
					service: 'Sendgrid',
					auth: { user: 'npsparihar97@gmail.com', pass: '72090000Np' }
				});
				var mailOptions = {
					from: 'npsparihar97@gmail.com',
					to: user.email,
					subject: 'Account Verification Token',
					text:
						'Hello,\n\n' +
						'Please verify your account by clicking the link: \nhttp://' +
						req.headers.host +
						'/confirmation/' +
						token.token +
						'.\n'
				};
				transporter.sendMail(mailOptions, function(err) {
					console.log(err);
					if (err) {
						return res.status(500).send({ msg: err.message });
					}
					res.status(200).send('A verification email has been sent to ' + user.email + '.');
				});
			});
		});
	});
});

// router.post('/login', (req, res) => {
// 	const { errors, isValid } = userLoginInput(req.body);

// 	if (!isValid) {
// 		return res.status(400).json(errors);
// 	}

// 	const email = req.body.email;
// 	const password = req.body.password;

// 	User.findOne({
// 		email: email
// 	}).then((user) => {
// 		if (!user) {
// 			errors.email = 'User Not found';
// 			return res.status(400).json(errors);
// 		}

// 		bcrypt.compare(password, user.password).then((isMatch) => {
// 			if (!isMatch) {
// 				errors.password = 'password is incorrect';
// 				return res.status(404).json(errors);
// 			} else {
// 				const payload = {
// 					id: user.id,
// 					name: user.name,
// 					email: user.email,
// 					role: user.role,
// 					date: user.date
// 				};

// 				jwt.sign(
// 					payload,
// 					'secret',
// 					{
// 						expiresIn: 3600
// 					},
// 					(err, token) => {
// 						return res
// 							.json({
// 								message: 'success',
// 								token: 'Bearer ' + token
// 							})
// 							.catch(console.log(err));
// 					}
// 				);
// 			}
// 		});
// 	});
// });

router.post('/login', (req, res) => {
	const { errors, isValid } = userLoginInput(req.body);

	if (!isValid) {
		return res.status(400).json(errors);
	}
	const password = req.body.password;

	User.findOne({ email: req.body.email }, function(err, user) {
		if (!user)
			return res.status(401).send({
				msg:
					'The email address ' +
					req.body.email +
					' is not associated with any account. Double-check your email address and try again.'
			});

		bcrypt.compare(password, user.password).then((isMatch) => {
			if (!isMatch) {
				errors.password = 'password is incorrect';
				return res.status(404).json(errors);
			} else {
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

router.post('/confirmation', (req, res) => {
	console.log(req.body);
	const { errors, isValid } = userConfirmationInput(req.body);

	if (!isValid) {
		return res.status(400).json(errors);
	}

	Token.findOne({ token: req.body.token }, function(err, token) {
		if (!token)
			return res.status(400).send({
				type: 'not-verified',
				msg: 'We were unable to find a valid token. Your token my have expired.'
			});

		User.findOne({ _id: token._userId, email: req.body.email }, function(err, user) {
			if (!user) return res.status(400).send({ msg: 'We were unable to find a user for this token.' });
			if (user.isVerified)
				return res.status(400).send({ type: 'already-verified', msg: 'This user has already been verified.' });

			user.isVerified = true;
			user.save(function(err) {
				if (err) {
					return res.status(500).send({ msg: err.message });
				}
				res.status(200).send('The account has been verified. Please log in.');
			});
		});
	});
});

router.post('/resend', (req, res) => {
	console.log(req.body);
	const { errors, isValid } = userConfirmationInput(req.body);

	if (!isValid) {
		return res.status(400).json(errors);
	}

	User.findOne({ email: req.body.email }, function(err, user) {
		if (!user) return res.status(400).send({ msg: 'We were unable to find a user with that email.' });
		if (user.isVerified)
			return res.status(400).send({ msg: 'This account has already been verified. Please log in.' });

		var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });

		token.save(function(err) {
			if (err) {
				return res.status(500).send({ msg: err.message });
			}

			var transporter = nodemailer.createTransport({
				service: 'Sendgrid',
				auth: { user: 'npsparihar97@gmail.com', pass: '72090000Np' }
			});
			var mailOptions = {
				from: 'npsparihar97@gmail.com',
				to: user.email,
				subject: 'Account Verification Token',
				text:
					'Hello,\n\n' +
					'Please verify your account by clicking the link: \nhttp://' +
					req.headers.host +
					'/confirmation/' +
					token.token +
					'.\n'
			};
			transporter.sendMail(mailOptions, function(err) {
				if (err) {
					return res.status(500).send({ msg: err.message });
				}
				res.status(200).send('A verification email has been sent to ' + user.email + '.');
			});
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
