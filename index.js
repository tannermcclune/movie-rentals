const express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    Joi = require('joi'),
    genre = require('./routes/genre'),
    members = require('./routes/member'),
    movie = require('./routes/movie'),
    rental = require('./routes/rental'),
    users = require('./routes/users'),
    login = require('./routes/login'),
    PORT = process.env.PORT || 3000,
    URL = 'mongodb+srv://ethan:aa2121go@cluster0.3a6qy.gcp.mongodb.net/MovieRental?retryWrites=true&w=majority'
    config = require('config');

Joi.objectId = require('joi-objectid')(Joi);

if (!config.get('jwtPrivateKey')) {
    console.log('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}


mongoose.connect(URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('connected to DB;'))
    .catch((error) => console.log(error));

app.use(express.json());
app.use('/api/genre', genre);
app.use('/api/members', members);
app.use('/api/movie', movie);
app.use('/api/rental', rental);
app.use('/api/users', users);
app.use('/api/login', login);



app.listen(PORT, () => console.log(`Listening on port ${PORT}`));