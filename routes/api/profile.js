const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const validateProfileInput = require('../../validation/profile');

const Profile = require('../../models/Profile');
const Employer = require('../../models/Employer');

router.get('/test', (req, res) => res.json({ msg: 'Profile Works' }));

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
	const errors = {};

	Profile.findOne({ employer: req.employer.id })
		.populate('employer', [ 'name' ])
		.then((profile) => {
			if (!profile) {
				errors.noprofile = 'There is no profile for this employer';
				return res.status(404).json(errors);
			}
			res.json(profile);
		})
		.catch((err) => res.status(404).json(err));
});

router.get('/all', (req, res) => {
	const errors = {};

	Profile.find()
		.populate('employer', [ 'name' ])
		.then((profiles) => {
			if (!profiles) {
				errors.noprofile = 'There are no profiles';
				return res.status(404).json(errors);
			}

			res.json(profiles);
		})
		.catch((err) => res.status(404).json({ profile: 'There are no profiles' }));
});

router.get('/handle/:handle', (req, res) => {
	const errors = {};

	Profile.findOne({ handle: req.params.handle })
		.populate('employer', [ 'name' ])
		.then((profile) => {
			if (!profile) {
				errors.noprofile = 'There is no profile for this employer';
				res.status(404).json(errors);
			}

			res.json(profile);
		})
		.catch((err) => res.status(404).json(err));
});

router.get('/employer/:employer_id', (req, res) => {
	const errors = {};

	Profile.findOne({ employer: req.params.employer_id })
		.populate('employer', [ 'name' ])
		.then((profile) => {
			if (!profile) {
				errors.noprofile = 'There is no profile for this employer';
				res.status(404).json(errors);
			}

			res.json(profile);
		})
		.catch((err) => res.status(404).json({ profile: 'There is no profile for this employer' }));
});

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
	const { errors, isValid } = validateProfileInput(req.body);

	if (!isValid) {
		return res.status(400).json(errors);
	}

	const profileFields = {};
	profileFields.employer = req.employer.id;
	if (req.body.handle) profileFields.handle = req.body.handle;
	if (req.body.company) profileFields.company = req.body.company;
	if (req.body.website) profileFields.website = req.body.website;
	if (req.body.location) profileFields.location = req.body.location;
	if (req.body.bio) profileFields.bio = req.body.bio;
	if (req.body.status) profileFields.status = req.body.status;

	if (typeof req.body.skills !== 'undefined') {
		profileFields.skills = req.body.skills.split(',');
	}

	Profile.findOne({ employer: req.employer.id }).then((profile) => {
		if (profile) {
			Profile.findOneAndUpdate(
				{ employer: req.employer.id },
				{ $set: profileFields },
				{ new: true }
			).then((profile) => res.json(profile));
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
	Profile.findOneAndRemove({ employer: req.employer.id }).then(() => {
		Employer.findOneAndRemove({ _id: req.employer.id }).then(() => res.json({ success: true }));
	});
});

module.exports = router;
