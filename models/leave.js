const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LeaveSchema = new Schema({
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
	leavetype: {
		type: String
	},
	fromdate: {
		type: Date
	},
	todate: {
		type: Date
	},
	applyto: {
		type: String
	},
	reason: {
		type: String
	},
	contactdetails: {
		type: String
	},
	designation: {
		type: String
	},
	department: {
		type: String
	},
	branch1: {
		type: String
	},
	branch2: {
		type: String
	},
	branch3: {
		type: String
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = Leave = mongoose.model('leave', LeaveSchema);
