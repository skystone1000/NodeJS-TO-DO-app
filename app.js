var express = require('express');
var todoController = require('./controllers/todoController');

var app = express();

// setup template engine
app.set('view engine','ejs');

// static files (using Built in middleware)
app.use(express.static('./public'));

// fire controller
todoController(app);

// Listen to port
app.listen(3001);
console.log('You are listening to port 3001 ');
