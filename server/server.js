var express = require('express');
var mysql = require('./dbcon.js');

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


app.get('/', function(req, res, next) {
    res.status(200);
    res.render('home', { results: "Welcome to my neighborhood." })
});
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();

});
app.use(express.json())
app.use(express.urlencoded())

//define api routes
app.get('/address/:id?', address.select);
app.post('/address', address.insertUpdate);
app.delete('/address/:id?', address.delete);
app.get('/house/:id?', house.select);
app.post('/house/:id?', house.insertUpdate);
app.delete('/house/:id?', house.delete);
app.get('/job/education', job.allEducation);
app.get('/job/:id?', job.select);
app.post('/job', job.insertUpdate);
app.delete('/job/:id?', job.delete);
app.get('/neighbor', neighbor.select);
app.post('/neighbor', neighbor.insert);
app.post('/neighbor/search');
app.delete('/neighbor/:id?', neighbor.delete);
app.get('/owner', owner.select);
app.post('/owner', owner.insert);
app.post('/owner/search/:houseid?', owner.search);
app.delete('/owner/:id?', owner.delete);
app.get('/person/:id?', person.select);
app.post('/person/search', person.search);
app.post('/person', person.insertUpdate);
app.delete('/person/:id?', person.delete);

app.options('*', (req, res) => {
    res.header("Allow", "GET, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS")
    res.status(204);
    res.send("OK");
});
app.use(function(req, res, next) {
    //console.log(req);
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