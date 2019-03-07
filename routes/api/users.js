const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const company = require('../../models/Company');

const key = require('../../config/keys').secretOrKey;

const userRegisterInput = require('../../validation/register');

const userLoginInput = require('../../validation/login');

const User = require('../../models/Users');

require('../../config/passport')(passport);

exports.findAll = (req, res) => {
	User.find()
		.then((users) => {
			res.send(users);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message
			});
		});
};

exports.findByName = (req, res) => {
	User.findOne({ name: req.params.userName }).populate('company').exec(function(err, user) {
		if (err) {
			if (err.kind === 'ObjectId') {
				return res.status(404).send({
					message: 'Users not found with given name ' + req.params.userName
				});
			}
			return res.status(500).send({
				message: 'Error retrieving Users with given Company Id ' + req.params.userName
			});
		}

		res.send(product);
	});
};

exports.findByCompanyId = (req, res) => {
	User.find({ company: req.params.companyId }).exec(function(err, users) {
		if (err) {
			if (err.kind === 'ObjectId') {
				return res.status(404).send({
					message: 'Users not found with given Company Id ' + req.params.companyId
				});
			}
			return res.status(500).send({
				message: 'Error retrieving Users with given Company Id ' + req.params.companyId
			});
		}

		res.send(products);
	});
};

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

// register: async (parent, args, { transporter, models, EMAIL_SECRET }) => {
// 	const hashedPassword = await bcrypt.hash(args.password, 12);
// 	const user = await models.User.create({
// 		...args,
// 		password: hashedPassword
// 	});
// };

// jwt.sign(
// 	{
// 		user: _.pick(user, 'id')
// 	},
// 	(err, emailToken) => {
// 		const url = `http://localhost:3000/confirmation/${emailToken}`;

// 		transporter.sendMail({
// 			to: req.body.email,
// 			subject: 'Confirm Email',
// 			html: `please click the email to confirm your email: <a href= "${url}">${url}</a>`
// 		});
// 	}
// );

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
