const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const validateProfileInput = require('../../validation/profile');

const Profile = require('../../models/Profile');
const User = require('../../models/Users');

router.post(
	'/id/:user_id',
	passport.authenticate('jwt', {
		session: false
	}),
	(req, res) => {
		const { errors, isValid } = validateProfileInput(req.body);

		if (!isValid) {
			return res.status(400).json(errors);
		}

		const profileFields = {};
		if (req.params.user_id) profileFields.user = req.params.user_id;
		if (req.body.currentbranch) profileFields.currentbranch = req.body.currentbranch;
		if (req.body.department) profileFields.department = req.body.department;
		if (req.body.designation) profileFields.designation = req.body.designation;
		if (req.body.salary) profileFields.salary = req.body.salary;
		if (req.body.dateofjoining) profileFields.dateofjoining = req.body.dateofjoining;
		if (req.body.dateofbirth) profileFields.dateofbirth = req.body.dateofbirth;
		if (req.body.gender) profileFields.gender = req.body.gender;
		if (req.body.maritalstatus) profileFields.maritalstatus = req.body.maritalstatus;
		if (req.body.bloodgroup) profileFields.bloodgroup = req.body.bloodgroup;
		if (req.body.mobile) profileFields.mobile = req.body.mobile;
		if (req.body.nationality) profileFields.nationality = req.body.nationality;
		if (req.body.address) profileFields.address = req.body.address;
		if (req.body.clopening) profileFields.clopening = req.body.clopening;
		if (req.body.clavailed) profileFields.clavailed = req.body.clavailed;
		if (req.body.mlopening) profileFields.mlopening = req.body.mlopening;
		if (req.body.mlavailed) profileFields.mlavailed = req.body.mlavailed;
		if (req.body.absents) profileFields.absents = req.body.absents;
		if (req.body.remarks) profileFields.remarks = req.body.remarks;

		Profile.findOne({
			user: req.params.user_id
		}).then((profile) => {
			if (profile) {
				Profile.findOneAndUpdate(
					{
						user: req.params.user_id
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
	}
);

router.get(
	'/current',
	passport.authenticate('jwt', {
		session: false
	}),
	(req, res) => {
		const errors = {};

		Profile.findOne({
			user: req.user.id
		})
			.populate('user', [ 'name', 'email' ])
			.then((profile) => {
				if (!profile) {
					errors.noprofile = 'There is no profile for this user';
					return res.status(404).json(errors);
				}
				res.json(profile);
				console.log(profile);
			})
			.catch((err) => res.status(404).json(err));
	}
);

router.get('/all', (req, res) => {
	const errors = {};

	Profile.find()
		.populate('user', [ 'name', 'email', '_id' ])
		.then((profiles) => {
			if (!profiles) {
				errors.noprofile = 'There are no profiles';
				return res.status(404).json(errors);
			}

			res.json(profiles);
		})
		.catch((err) =>
			res.status(404).json({
				profile: 'There are no profiles'
			})
		);
});

router.get('/id/:user_id', (req, res) => {
	const errors = {};

	Profile.findOne({
		user: req.params.user_id
	})
		.populate('user', [ 'name', 'email' ])
		.then((profile) => {
			if (!profile) {
				errors.noprofile = 'There is no profile for this user';
				res.status(404).json(errors);
			}

			res.json(profile);
		})
		.catch((err) => res.status(404).json(err));
});

router.delete(
	'/id/:user_id',
	passport.authenticate('jwt', {
		session: false
	}),
	(req, res) => {
		Profile.findOneAndRemove({
			user: req.params.user_id
		}).then(() => {
			User.findOneAndRemove({
				_id: req.params.user_id
			}).then(() =>
				res.json({
					success: true
				})
			);
		});
	}
);

module.exports = router;

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
	const errors = {};

	Profile.findOne({ user: req.user.id })
		.populate('user', [ 'name', 'avatar' ])
		.then((profile) => {
			if (!profile) {
				errors.noprofile = 'There is no profile for this user';
				return res.status(404).json(errors);
			}
			res.json(profile);
		})
		.catch((err) => res.status(404).json(err));
});

router.get('/all', (req, res) => {
	const errors = {};

	Profile.find()
		.populate('user', [ 'name', 'avatar' ])
		.then((profiles) => {
			if (!profiles) {
				errors.noprofile = 'There are no profiles';
				return res.status(404).json(errors);
			}

			res.json(profiles);
		})
		.catch((err) => res.status(404).json({ profile: 'There are no profiles' }));
});

router.get('/user/:user_id', (req, res) => {
	const errors = {};

	Profile.findOne({ user: req.params.user_id })
		.populate('user', [ 'name', 'avatar' ])
		.then((profile) => {
			if (!profile) {
				errors.noprofile = 'There is no profile for this user';
				res.status(404).json(errors);
			}

			res.json(profile);
		})
		.catch((err) => res.status(404).json({ profile: 'There is no profile for this user' }));
});

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
	console.log('profile', req.body);
	const { errors, isValid } = validateProfileInput(req.body);

	if (!isValid) {
		return res.status(400).json(errors);
	}

	const profileFields = {};
	profileFields.user = req.user.id;
	if (req.params.user_id) profileFields.user = req.params.user_id;
	if (req.body.currentbranch) profileFields.currentbranch = req.body.currentbranch;
	if (req.body.department) profileFields.department = req.body.department;
	if (req.body.designation) profileFields.designation = req.body.designation;
	if (req.body.salary) profileFields.salary = req.body.salary;
	if (req.body.dateofjoining) profileFields.dateofjoining = req.body.dateofjoining;
	if (req.body.dateofbirth) profileFields.dateofbirth = req.body.dateofbirth;
	if (req.body.gender) profileFields.gender = req.body.gender;
	if (req.body.maritalstatus) profileFields.maritalstatus = req.body.maritalstatus;
	if (req.body.bloodgroup) profileFields.bloodgroup = req.body.bloodgroup;
	if (req.body.mobile) profileFields.mobile = req.body.mobile;
	if (req.body.nationality) profileFields.nationality = req.body.nationality;
	if (req.body.address) profileFields.address = req.body.address;
	if (req.body.clopening) profileFields.clopening = req.body.clopening;
	if (req.body.clavailed) profileFields.clavailed = req.body.clavailed;
	if (req.body.mlopening) profileFields.mlopening = req.body.mlopening;
	if (req.body.mlavailed) profileFields.mlavailed = req.body.mlavailed;
	if (req.body.absents) profileFields.absents = req.body.absents;
	if (req.body.remarks) profileFields.remarks = req.body.remarks;

	Profile.findOne({ user: req.user.id }).then((profile) => {
		if (profile) {
			Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true }).then((profile) =>
				res.json(profile)
			);
		} else {
			Profile.findOne({ handle: profileFields.handle }).then((profile) => {
				if (profile) {
					errors.handle = 'That handle already exists';
					res.status(400).json(errors);
				}
				new Profile(profileFields).save().then((profile) => res.json(profile));
			});
		}
	});
});

router.delete('/', passport.authenticate('jwt', { session: false }), (req, res) => {
	Profile.findOneAndRemove({ user: req.user.id }).then(() => {
		User.findOneAndRemove({ _id: req.user.id }).then(() => res.json({ success: true }));
	});
});

module.exports = router;
