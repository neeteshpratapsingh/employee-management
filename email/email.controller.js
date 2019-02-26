// const User = require('../models/Users');
// const sendEmail = require('./email.send');
// const msgs = require('./email.msgs');

// exports.collectEmail = (req, res) => {
// 	const { email } = req.body;

// 	User.findOne({ email })
// 		.then((user) => {
// 			if (!user) {
// 				User.create({ email }).then((newUser) => sendEmail(newUser.email)).then(() => console.log(err));
// 			} else if (user && !user.confirmed) {
// 				sendEmail(user.email).then(() => res.json({ msg: msg.resend }));
// 			} else {
// 				res.json({ msg: msg.alreadyConfirmed });
// 			}
// 		})
// 		.catch((err) => console.log(err));
// };

// exports.confirmEmail = (req, res) => {
// 	const { id } = req.params;

// 	User.findById(id)
// 		.then((user) => {
// 			if (!user) {
// 				res.json({ msg: msg.couldNotFind });
// 			} else if (user && !user.confirmed) {
// 				User.findByIdAndUpdate(id, { confirmed: true })
// 					.then(() => res.json({ msg: msgs.confirmed }))
// 					.catch((err) => console.log(err));
// 			} else {
// 				res.json({ msg: msg.alreadyConfirmed });
// 			}
// 		})
// 		.catch((err) => console.log(err));
// };
