const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
	employer: {
		type: Schema.Types.ObjectId,
		ref: 'employers'
	},
	handle: {
		type: String,
		required: true,
		max: 40
	},
	company: {
		type: String
	},
	website: {
		type: String
	},
	location: {
		type: String
	},
	status: {
		type: String,
		required: true
	},
	skills: {
		type: [ String ],
		required: true
	},
	bio: {
		type: String
	}
});
module.exports = Profile = mongoose.model('profile', ProfileSchema);
