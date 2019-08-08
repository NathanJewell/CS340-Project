var express = require('express');
var mysql = require('./dbcon_local.js');

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
app.get('/address/:id?', address.select);
app.post('/address', address.insert);
app.get('/house/:id?', house.select);
app.post('/house/:id?', house.insertUpdate);
app.delete('/house/:id?', house.delete);
app.get('/job/:id?', job.select);
app.post('/job', job.insert);
app.get('/neighbor', neighbor.select);
app.post('/neighbor', neighbor.insert);
app.delete('/neighbor', neighbor.delete);
app.get('/owner', owner.select);
app.post('/owner', owner.insertUpdate);
app.delete('/owner', owner.delete);
app.get('/person/:id?', person.select);
app.post('/person', person.insert);

app.get('/', function(req, res, next) {
    res.status(200);
    res.render('home', { results: "Welcome to my neighborhood." })
});

app.use(express.json())
app.use(express.urlencoded())

app.use(function(req, res, next) {
    console.log(req);
    next();
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