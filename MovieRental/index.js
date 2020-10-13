const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const genre = require('./routes/genre');
const members = require('./routes/member');
const movie = require('./routes/movie');
const rental = require('./routes/rental');
const users = require('./routes/users');
const login = require('./routes/login');
const PORT = process.env.PORT || 3000;
const URL = 'mongodb+srv://ethan:aa2121go@cluster0.3a6qy.gcp.mongodb.net/MovieRental?retryWrites=true&w=majority'
const config = require('config');

if (!config.get('jwtPrivateKey')) {
    console.log('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}


mongoose.connect(URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('connectes to DB;'))
    .catch((error) => console.log(error));

app.use(express.json());
app.use('/api/genre', genre);
app.use('/api/members', members);
app.use('/api/movie', movie);
app.use('/api/rental', rental);
app.use('/api/users', users);
app.use('/api/login', login);



app.listen(PORT, () => console.log(`Listening on port ${PORT}`));