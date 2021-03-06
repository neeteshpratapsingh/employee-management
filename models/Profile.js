const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	},
	name: {
		type: String
	},
	email: {
		type: String
	},
	currentbranch: {
		type: String
	},
	department: {
		type: String
	},
	designation: {
		type: String
	},
	salary: {
		type: Number
	},
	dateofjoining: {
		type: Date
	},
	dateofbirth: {
		type: Date
	},
	gender: {
		type: String
	},
	maritalstatus: {
		type: String
	},
	bloodgroup: {
		type: String
	},
	mobile: {
		type: Number
	},
	address: {
		type: String
	},
	clopening: {
		type: Number
	},
	clavailed: {
		type: Number
	},
	mlopening: {
		type: Number
	},
	mlavailed: {
		type: Number
	},
	absents: {
		type: Number
	},
	remarks: {
		type: String
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
