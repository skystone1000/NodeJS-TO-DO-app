// Making a todo app

// =========================================================
// 31) Todo app Part 01
$ npm init
package name: (to-do app) todo-app
version: (1.0.0)
description: simple to do app
entry point: (index.js) app.js
test command:

$ npm install express -save

$ npm install ejs -save

$ npm install body-parser -save

// =========================================================
// 32) Todo app Part 02

/*
MVC (Models-Views-Controller)
Model  -  Data: todos, users
Views  -  Tempate Files: (EJS files) todo.ejs, account.ejs
Controller - Controlling the app: todoController, userController
*/


// make an app.js file
// -------------------------- app.js

var express = require('express');
var todoController = require('./controllers/todoController');

var app = express();

// setup template engine
app.set('view engine','ejs');

// static files (using Built in middleware)
app.use(express.static('./public'))

// fire controller
todoController(app)

// Listen to port
app.listen(3000);
console.log('You are listening to port 3000 ');


// create a controllers folder an inside it todoController.js files
// -------------------------- /controllers/todoController.js

module.exports = function(app){
  app.get('/todo',function(req, res){
  });

  app.post('/todo',function(req, res){
  });

  app.delete('/todo',function(req, res){
  });

};


// ===================================================
// 33) Todo app Part 03
// Creating Views

/*
  Create a new folder views
  and then the file todo.ejs
*/
// --------------------------- /views/todo.ejs
<br>
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Todo List</title>
    <link rel="stylesheet" href="/assets/styles.css">
  </head>
  <body>
    <h1>My Todo List</h1>
    <div id="todo-table">
        <form class="" action="index.html" method="post">
          <input type="text" name="item" value="" placeholder="Add new item... " required>
          <button type="submit" name="button">Add Item</button>
        </form>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
    </div>

  </body>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
</html>


// Render this in get handler in todoController.js
// --------------------------------- /controllers/todoController.js

/*
app.get('/todo',function(req, res){
  res.render('todo');
});
*/

// ===================================================
// 34) Todo app Part 04

// Create dummy data onserver
//  --------------------/controller/todoController.js

/*
var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'kick some coding ass'}];

module.exports = function(app){
  app.get('/todo',function(req, res){
    res.render('todo', {todos: data});

  });
});
*/


// ------------------- /views/todo.ejs
<ul>
  <% for(var i=0;i<todos.length;i++){ %>
    <li><%= todos[i].item %></li>

  <%  } %>
</ul>


// Add items
/*
// ------------------------------------------ /controllers/todoController.js
var bodyParser = require('body-parser');

var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'kick some coding ass'}];
var urlencodedParser = bodyParser.urlencoded({exteded: false});

module.exports = function(app){
  app.get('/todo',function(req, res){
    res.render('todo', {todos: data});

  });

  app.post('/todo', urlencodedParser,function(req, res){
    data.push(req.body);
    //res.json(data);
    res.render('todo', {todos: data});
  });
});
*/

// Delete Items
