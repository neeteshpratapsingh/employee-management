const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../models/Users');

const key = require('../config/keys');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = key.secretOrKey;

module.exports = (passport) => {
	passport.use(
		new JwtStrategy(
			{
				jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
				secretOrKey: 'secret'
			},
			(jwt_payload, done) => {
				console.log(jwt_payload);

				User.findById(jwt_payload.id).then((user) => {
					if (user) {
						return done(null, user);
					}
					return done(null, false).catch((err) => {
						console.log(err);
					});
				});
			}
		)
	);
};

// const jwtStrategy = require('passport-jwt').Strategy;
// const { ExtractJwt } = require('passport-jwt');
// const mongoose = require('mongoose');
// const Employer = mongoose.model('employers');
// const keys = require('../config/keys');

// const opts = {};
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrkey = keys.secretOrkey;

// module.exports = (passport) => {
// 	passport.use(
// 		new jwtStrategy(
// 			{
// 				jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
// 				secretOrKey: 'secret'
// 			},
// 			(jwt_payload, done) => {
// 				Employer.findById(jwt_payload.id)
// 					.then((employer) => {
// 						if (employer) {
// 							return done(null, employer);
// 						}
// 						return done(null, false);
// 					})
// 					.catch((err) => console.log(err));
// 			}
// 		)
// 	);
// };
