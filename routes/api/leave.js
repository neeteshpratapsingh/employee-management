const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const validateLeaveInput = require('../../validation/leave');

const User = require('../../models/Users');

const Leave = require('../../models/leave');

router.post(
	'/id/:user_id',
	// passport.authenticate('jwt', {
	// 	session: false
	// }),
	(req, res) => {
		// const { errors, isValid } = validateLeaveInput(req.body);

		// if (!isValid) {
		// 	return res.status(400).json(errors);
		// }
		console.log(req.body);
		const leavefields = {};
		if (req.params.user_id) leavefields.user = req.params.user_id;
		if (req.body.name) leavefields.name = req.body.name;
		if (req.body.email) leavefields.email = req.body.email;
		if (req.body.leavetype) leavefields.leavetype = req.body.leavetype;
		if (req.body.fromdate) leavefields.fromdate = req.body.fromdate;
		if (req.body.todate) leavefields.todate = req.body.todate;
		if (req.body.applyto) leavefields.applyto = req.body.applyto;
		if (req.body.reason) leavefields.reason = req.body.reason;
		if (req.body.contactdetails) leavefields.contactdetails = req.body.contactdetails;
		if (req.body.designation) leavefields.designation = req.body.designation;
		if (req.body.department) leavefields.department = req.body.department;
		if (req.body.branch1) leavefields.branch1 = req.body.branch1;
		if (req.body.branch2) leavefields.branch2 = req.body.branch2;
		if (req.body.branch3) leavefields.branch3 = req.body.branch3;

		Leave.findOne({
			user: req.params.user_id
		}).then((leave) => {
			// if (leave) {
			// 	errors.email = 'User Already applied for leave';
			// 	res.status(404).json(errors);
			// } else

			new Leave(leavefields).save().then((leave) => res.json(leave));
		});
	}
);

router.get(
	'/current',
	passport.authenticate('jwt', {
		session: false
	}),
	async (req, res) => {
		await Leave.findOne({
			user: req.user.id
		})
			.populate('user', [ 'name', 'email', 'role' ])
			.then((leave) => {
				console.log('leave');
				if (!leave) {
					errors.leave = 'There is no leave for this user';
					return res.status(404).json(errors);
				}
				res.json(leave);
			})
			.catch((err) => res.status(404).json(err));
	}
);

router.get('/all', (req, res) => {
	const errors = {};
	console.log(errors);
	Leave.find()
		.populate('user', [ 'name', 'email' ])
		.then((leaves) => {
			if (!leaves) {
				errors.noleave = 'There are no leaves applied';
				console.log(errors);
				return res.status(404).json(errors);
			}

			res.json(leaves);
		})
		.catch((err) => res.status(404).json(err));
});

router.get('/id/:user_id', (req, res) => {
	const errors = {};

	Leave.findOne({
		user: req.params.user_id
	})
		.populate('user', [ 'name', 'email' ])
		.then((leave) => {
			if (!leave) {
				errors.noprofile = 'There is no leave for this user';
				res.status(404).json(errors);
			}

			res.json(leave);
		})
		.catch((err) => res.status(404).json(err));
});

router.delete(
	'/id/:user_id',
	passport.authenticate('jwt', {
		session: false
	}),
	(req, res) => {
		Leave.findOneAndRemove({
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
