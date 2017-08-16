const express = require('express');
const path = require('path');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.set('view engine', 'hbs');

hbs.registerHelper("getCurrentYear", () => {
	return new Date().getFullYear();
});

hbs.registerHelper("uppercase", (text) => {
	return text.toUpperCase();
});

// app.use((req, res, next) => {
// 	res.render('maintenance.hbs');
// });

app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use((req, res, next) => {
	console.log(`${new Date()}: ${req.url} - ${req.method}`);
	fs.appendFile('logs.txt', `${new Date()}: ${req.url} - ${req.method}\n`, (err) => {
		return console.log(err);
	});
	next();
});


app.get('/', (req, res) => {
	res.render('home.hbs', {title: 'Home page', name: 'Arun', pageTitle: 'Home'});
});

app.get('/about', (req, res) => {
	res.render('about.hbs', {title: 'About', name: 'Arun', pageTitle: 'About'});
});

app.get('/bad', (req, res) => {
	res.send({
		error: "Unable to process the request"
	});
});

app.listen(port, () => {
	console.log('listening on port ' + port);
});

