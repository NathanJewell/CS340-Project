var express = require('express');
var mysql = require('./dbcon.js.js');

var app = express();
var handlebars = require('express-handlebars').create({ defaultLayout: 'main' });

var address = require("./endpoints/address.js");
var house = require("./endpoints/house.js");
var job = require("./endpoints/job.js");
var neighbor = require("./endpoints/neighbor.js");
var owner = require("./endpoints/owner.js");
var person = require("./endpoints/person.js")

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.argv[2]);

//define api routes
app.get('/address', address.select);
app.post('/address', address.insert);
app.get('/house', house.select);
app.post('/house', house.insertUpdate);
app.get('/job', job.select);
app.post('/job', job.insert);
app.post('/neighbor', neighbor.insert);
app.delete('/neighbor', neighbor.delete);
app.post('/owner', owner.insert);
app.delete('/owner', owner.delete);

app.get('/', function(req, res, next) {
    res.status(200);
    res.render('home', "Welcome to my neighborhood.")
});

app.use(function(req, res) {
    res.status(404);
    res.render('404');
});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function() {
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});