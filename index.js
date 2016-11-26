var express = require('express');
var app = express();
var bodyParser = require('body-parser'); // Middleware for request bodies
var morgan = require('morgan'); // Logging

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
app.use(morgan('combined'));

var session = require('express-session');
var RedisStore = require('connect-redis')(session);
app.use(session({
    store: new RedisStore({
        url: process.env.REDIS_URL,
    }),
    resave: false,
    saveUninitialized: false,
    secret: 'abc123'
}));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Set userId for use on all templates
app.use(function(request, response, next) {
    response.locals.userId = request.session.userId;
    next();
});

// Router
var Router = require('./router.js');
var masterRouter = new Router();
masterRouter.bindRoutesToApp(app);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
