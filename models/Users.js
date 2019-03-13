// const Company = require('./Company');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		unique: true
	},
	roles: {
		type: 'String',
		default: 'admin'
	},
	isVerified: {
		type: Boolean,
		default: false
	},
	password: {
		type: String
	},
	passwordResetToken: {
		type: String
	},
	passwordResetExpires: {
		type: Date
	},
	// name: {
	// 	type: String,
	// 	required: true
	// },
	// email: {
	// 	type: String,
	// 	required: true
	// },

	// password: {
	// 	type: String,
	// 	required: true
	// },
	// role: {
	// 	type: String,
	// 	default: 'admin'
	// },
	// confirmed: {
	// 	type: String,
	// 	default: false
	// },
	// isAdmin: {
	// 	type: Boolean,
	// 	default: false
	// },
	Date: {
		type: Date,
		default: Date.now
	},
	company: {
		type: Schema.Types.ObjectId,
		ref: 'Company'
	}
});

module.exports = User = mongoose.model('users', UserSchema);
