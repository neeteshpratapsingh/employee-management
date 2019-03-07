const Company = require('../../models/Company');
const User = require('../../models/Users');

export const company = (req, res) => {
	var bestpeers = new Company({
		name: 'bestpeers',
		location: 'vijaynagar',
		phone: '1-408-996-1010'
	});

	bestpeers.save(function(err) {
		if (err) return console.error(err.stack);

		console.log('bestpeers company is added');

		var neetesh = new User({
			name: 'Neetesh',
			email: 'pratapneetesh@gmail.com',
			company: bestpeers._id
		});

		neetesh.save(function(err) {
			if (err) return console.error(err.stack);

			console.log('Neetesh is added');
		});

		var shubham = new User({
			name: 'Shubham',
			email: 'shubham@gmail.com',
			company: bestpeers._id
		});

		shubham.save(function(err) {
			if (err) return console.error(err.stack);

			console.log('Subham is added');
		});
	});

	var wipro = new Company({
		name: 'Wipro',
		location: 'banglore',
		phone: '+82-2-2053-3000'
	});

	wipro.save(function(err) {
		if (err) return console.error(err.stack);

		console.log('Wipro company is added');

		var bhupendra = new User({
			name: 'Bhupendra',
			email: 'bhupendra@gmail.com',
			company: wipro._id
		});

		bhupendra.save(function(err) {
			if (err) return console.error(err.stack);
			console.log('bhupendra is added');
		});

		var anshul = new User({
			name: 'Anshul',
			email: 'anhul@gmail.com',
			company: wipro._id
		});

		anshul.save(function(err) {
			if (err) return console.error(err.stack);
			console.log('anshul is added');
		});
	});

	res.send('Done Initial Data!');
};

exports.findAll = (req, res) => {
	Company.find()
		.then((users) => {
			res.send(users);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message
			});
		});
};
