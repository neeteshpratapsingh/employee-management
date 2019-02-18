// const express = require('express');
// const app = express();
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const morgan = require('morgan');
// const passport = require('passport');
// const jsonwebtoken = require('jsonwebtoken');
// const cors = require('cors');

// const employers = require('./routes/api/employers');

// mongoose.connect('mongodb://localhost:27017/employee', { useNewUrlParser: true });
// const db = mongoose.connection;

// app.use(cors());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(jsonwebtoken);
// app.use(morgan('dev'));
// app.use(passport.initialize());

// require('./config/passport')(passport);

// app.use('/api/employers', employers);

// const port = process.env.port || 6000;
// app.listen(port, () => console.log(`server running on ${port}`));

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');
const cors = require('cors');

const employers = require('./routes/api/employers');

mongoose.connect('mongodb://localhost:27017/employee', { useNewUrlParser: true });
const db = mongoose.connection;

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev'));

app.use(passport.initialize());

require('./config/passport')(passport);

app.use('/api/employers', employers);

const port = process.env.port || 6000;

app.listen(port, () => console.log(`server running on ${port}`));
