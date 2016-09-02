// modules =================================================
var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');

// configuration ===========================================
	
// config files
var db = require('./config/db');

//connect to db
mongoose.connect(db.url);

var port = process.env.PORT || 8080; // set our port


// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

// routes ==================================================
var apiRoutes = require('./app/routes/routes')(app,express); // pass application into our routes

app.use('/api',apiRoutes);
// start app ===============================================
app.get('*', function(req, res) {
    res.sendfile('./public/index.html');
});
app.listen(port);
console.log('Hosting on port ' + port); 			
exports = module.exports = app; 						// expose app