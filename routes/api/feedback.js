// const express = require('express');
// const router = express.Router();
// const mongoose = require('mongoose');
// const passport = require('passport');

// const Feedback = require('../../models/feedback');
// const Profile = require('../../models/Profile');

// const validateFeedbackInput = require('../../validation/feedback');

// router.get('/test', (req, res) => res.json({ msg: 'Feedback works' }));

// router.get('/', (req, res) => {
// 	Feedback.find()
// 		.sort({ date: -1 })
// 		.then((feedback) => res.json(feedback))
// 		.catch((err) => res.status(404).json({ nofeedbackfound: 'No feedback found' }));
// });

// router.get('/:id', (req, res) => {
// 	feedback
// 		.findById(req.params.id)
// 		.then((feedback) => res.json(feedback))
// 		.catch((err) => res.status(404).json({ nofeedbackfound: 'No feedback found with that ID' }));
// });

// router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
// 	const { errors, isValid } = validateFeedbackInput(req.body);

// 	if (!isValid) {
// 		return res.status(400).json(errors);
// 	}
// 	const newFeedback = new feedback({
// 		text: req.body.text,
// 		name: req.body.name,
// 		avatar: req.body.name,
// 		user: req.user.id
// 	});

// 	newFeedback.save().then((feedback) => res.json(feedback));
// });

// router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
// 	Profile.findOne({ user: req.user.id }).then((profile) => {
// 		Feedback.findById(req.params.id)
// 			.then((feedback) => {
// 				if (feedback.user.toString() !== req.user.id) {
// 					return res.status(401).json({ notauthorized: 'User not authorized' });
// 				}
// 				feedback.remove().then(() => res.json({ success: true }));
// 			})
// 			.catch((err) => res.status(404).json({ feedbacknotfound: 'No feedback found' }));
// 	});
// });

// module.exports = router;
