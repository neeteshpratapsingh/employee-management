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
	role: {
		type: 'String',
		default: 'admin'
	},
	isAdmin: {
		type: Boolean,
		default: false
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
	// isAdmin: {
	// 	type: Boolean,
	// 	default: false
	// },
	Date: {
		type: Date,
		default: Date.now
	}
});

module.exports = User = mongoose.model('users', UserSchema);
