const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

const Employer = require('../../models/Employer');

router.get('/test', (req, res) => res.json({ msg: 'employer works' }));

router.post('/register', (req, res) => {
	User.findOne({ email: req.body.email }).then((employer) => {
		if (employer) {
			errors.email = 'Email already exists';
			return res.status(400).json(errors);
		} else {
			const newEmployer = new User({
				name: req.body.name,
				email: req.body.email,
				password: req.body.password
			});

			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newEmployer.password, salt, (err, hash) => {
					if (err) throw err;
					newEmployer.password = hash;
					newEmployer.save().then((employer) => res.json(employer)).catch((err) => console.log(err));
				});
			});
		}
	});
});

router.post('/login', (req, res) => {
	const email = req.body.email;
	const password = req.body.password;

	Employer.findOne({ email }).then((employer) => {
		if (!employer) {
			errors.email = 'Employer not found';
			return res.status(404).json(errors);
		}
		bcrypt.compare(password, employer.password).then((isMatch) => {
			if (isMatch) {
				const payload = { id: employer.id, name: employer.name };

				jwt.sign(payload, 'secret', { expiresIn: '7d' }, (err, token) => {
					res.json({
						success: true,
						token: 'Bearer ' + token
					});
				});
			} else {
				errors.password = 'Password incorrect';
				return res.status(400).json(errors);
			}
		});
	});
});

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
	res.json({
		id: req.employer.id,
		name: req.employer.name,
		email: req.employer.email
	});
});

module.exports = router;
