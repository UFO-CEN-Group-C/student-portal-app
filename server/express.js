var path = require('path'),
    express = require('express'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    config = require('./config'),
    listingsRouter = require('../routes/listings.server.routes'),
    getCoordinates = require('../controllers/coordinates.server.controller.js');
const basicAuth = require('express-basic-auth');

module.exports.init = function() {
  //connect to database
  mongoose.connect(config.db.uri);

  //initialize app
  var app = express();

  //enable request logging for development debugging
  app.use(morgan('dev'));

  //body parsing middleware
  app.use(bodyParser.json());

/*Server connection to Amazon S3

  /* serve static files */


/*Auth*/
/* Uncomment for auth - probably a mongo query here Steven will take that.
app.use(basicAuth({users: { 'admin': 'supersecret' }}))
*/

  /* go to homepage for all routes not specified */
  app.get('*', function(req, res){
    res.redirect('/');
  });

  return app;
};
