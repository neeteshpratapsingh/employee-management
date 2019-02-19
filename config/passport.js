const jwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const mongoose = require('mongoose');
const Employer = mongoose.model('employers');
const keys = require('../config/keys');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrkey = keys.secretOrkey;

module.exports = (passport) => {
	passport.use(
		new jwtStrategy(
			{
				jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
				secretOrKey: 'secret'
			},
			(jwt_payload, done) => {
				Employer.findById(jwt_payload.id)
					.then((employer) => {
						if (employer) {
							return done(null, employer);
						}
						return done(null, false);
					})
					.catch((err) => console.log(err));
			}
		)
	);
};
