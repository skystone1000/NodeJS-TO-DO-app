

// ==================================================================
// 05)Function Expression

console.log('hey ninjas');

//normal function Statement
function sayHi(){
  console.log('hi');
}
sayHi();

//function Expression
var sayBye = function(){
  console.log('bye');
};
sayBye();

/*OUTPUT:
skystone@skystone-HP-Notebook:~/Documents/Nodejs/netNinja/N
injaApp$ node app.js
hey ninjas
hi
bye
*/

function callFunction(fun){
  fun();
}

var sayBye = function(){
  console.log('bye');
};

callFunction(sayBye);

/*OUTPUT:
bye*/

// =======================================================
// 06)Modules and require()

/* a)intro
we don't typically dump all our application code  in app.js
so we split our code into logical Modules
and call those modules whenevr we need them

And a Module is just another js file
*/

//-------------------------- count.js
// b)create count.js

var counter = function(arr){
  return 'There are ' + arr.length + ' elements in this array';
};

// c)Now if we want to use the count.js module
// ----------------------app.js
require('./count');
console.log(counter(['aditya','shivram','mahajan']));

/* d)
if we runthis then we get an error as we dont have acces to
counter method outside the module count

so we need to explicitly say what part of module we want to make available
to all files which require this module
*/

// ------------------------count.js
var counter = function(arr){
  return 'There are ' + arr.length + ' elements in this array';
};

module.exports = counter;
// Here is exports(and inside counter) is retured


//---------------------------app.js
var counter = require('./count');
console.log(counter(['aditya','shivram','mahajan']));

/*OUTPUT:
skystone@skystone-HP-Notebook:~/Documents/Nodejs/netNinja/NinjaApp$ node app.js
There are 3 elements in this array
*/


//=========================================================================
// 07)Module Patterns
/*
what if we wanted to to pass some more parameters to be exported
*/
// a) rename count.js to -------------------stuff.js

var counter = function(arr){
  return 'There are ' + arr.length + ' elements in this array';
};

var adder = function(a,b){
  return `The sum of the two numbers is ${a+b}`;
};

var pi = 3.142;

// module.exports is just an empty object so we can add properties to it 

//counter property of exports object is the counter() 
module.exports.counter = counter;
module.exports.adder = adder;
module.exports.pi = pi;

//--------------------- app.js
var stuff = require('./stuff');

console.log(stuff.counter(['aditya','shivram','mahajan']));
console.log(stuff.adder(2,3));
console.log(stuff.adder(stuff.pi,3));

/* OUTPUT:
skystone@skystone-HP-Notebook:~/Documents/Nodejs/netNinja/N
injaApp$ node app.js
There are 3 elements in this array
The sum of the two numbers is 5
The sum of the two numbers is 6.1419999999999995
*/


// b) We could also do it like --------------stuff.js
module.exports.counter = function(arr){
  return 'There are ' + arr.length + ' elements in this array';
};

module.exports.adder = function(a,b){
  return `The sum of the two numbers is ${a+b}`;
};

module.exports.pi = 3.142;

// c) Or by object literal notation --------------stuff.js

var counter = function(arr){
  return 'There are ' + arr.length + ' elements in this array';
};

var adder = function(a,b){
  return `The sum of the two numbers is ${a+b}`;
};

var pi = 3.142;

module.exports = {
  counter: counter,
  adder: adder,
  pi: pi,
}


// =====================================================================
// 08) The Node Event Emitter

/*
Along with the custom modules that we create node gives us some bunch of inbuilt
modules one such is events modules
*/

// EVENT MODULE

// a) Simple example
var events = require('events');

var myEmitter = new events.EventEmitter();

myEmitter.on('someEvent', function(mssg){
  console.log(mssg);
});

// manually emitting the event
myEmitter.emit('someEvent', 'The Event was Emitted');

/* OUTPUT: The Event was Emitted */

// b) example (also with help of util module)

var events = require('events');
var util = require('util');
// util modules helps to inherit things from other things(objects)

var Person = function(name){
  this.name = name;
}

// Inherit the event Emitter
util.inherits(Person, events.EventEmitter);

var james = new Person('james');
var mary = new Person('mary');
var ryu = new Person('ryu');

// now we want to wire up some event listeners to each one of the Person
// using some custom Events
var people = [james,mary,ryu];

people.forEach(function(person){
  person.on('speak', function(mssg){
    console.log(person.name + ' said ' + mssg);
  });
});

james.emit('speak', 'hey dudes');
ryu.emit('speak', 'I want curry');

/* OUTPUT:
james said hey dudes
ryu said I want curry
*/

//=========================================================
// 09)Reading and Writing files (fs)
// a) Read and Write file Synchronus

var fs = require('fs');

/*
//  Synchronus request
var readMe = fs.readFileSync('readMe.txt', 'utf8'); // character encoding (UTF8)
console.log(readMe);
fs.writeFileSync('writeMe.txt', readMe);
*/

// b) Read and write file Asynchronous

// Asynchronous request
fs.readFile('readMe.txt', 'utf8', function(err, data){
  //fs.writeFile('writeMe.txt', data);
  fs.writeFile('writeMe.txt',data, (err)=>{ })
  //console.log(data);

});
//console.log('test');
// Benifit of this is that we are not blocking the code while we
// are reading the file and you can see by the output that
// the test is getting printed first and when file is fully read is printed


// ======================================================================
// 10)Creating and removing directories

var fs = require('fs');

// a)Deleting a FILE
// fs.unlink('writeMe.txt');
fs.unlink('writeMe.txt',(err)=>{});


// b) creating and removing directories Synchronously
// But this will block the code
// Synchronus method
fs.mkdirSync('stuff');
fs.rmdirSync('stuff');

// c) creating and removing directories Asynchronously

/* OLD Depricated
var fs = require('fs');

fs.mkdir('stuff', function(){
  fs.readFile('readMe.txt', 'utf8', function(err,data){
    fs.writeFile('./stuff/writeMe.txt',data);
  });
});
*/

var fs = require('fs');

fs.mkdir('stuff', () => {
  fs.readFile('readMe.txt', 'utf8', (err,data)=>{
    if (err) throw err;
    fs.writeFile('./stuff/writeMe.txt',data , (err)=> {
      if (err) throw err;
      console.log('File saved');
    });
  });
});


// we cannot remove the directory unless the directory is empty
fs.unlink('./stuff/writeMe.txt',(err) => {
  if (err) throw err;
  fs.rmdir('stuff',(err) => {
    if (err) throw err;
  });
});

// ======================================================================
// 11)Clients & Servers























// ======================================================================
// 20)The Node Package Manager

/*
NPM is just a bunch of command line tools which helps in installing 
3rd party packages or modules to help out our node project.

Example 
Express Package help us in routing or templating.

we can load these packages into our node application and use that functionality into 
our code and we can do that with NPM

we can install, update or even publish our own packages

npmjs.com

$ npm install express // this will not add the dependency 

$ npm uninstall express // this will uninstall the express

*/


// ======================================================================
// 21)The package.json file

/*
we should track all the packages we install and 
also keep track of all the packages on which your application depends on (dependencies)

with package.json file we can do that 

we can create the file manually ourself or with following command

$ npm init

this will ask a couple of questions about our project
and we need to fill the answers

To keep track of packages while installing we add a -save tag
$ npm install express -save

To get dependencies required for a particular project we just do
$ npm install

*/

/*OUTPUT

skystone@skystone-HP-Notebook:/opt/lampp/htdocs/github/JLT-India-Challenge/09 nodeApp$ npm init
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help json` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg>` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
package name: (09-nodeapp) JLT-node-site
Sorry, name can no longer contain capital letters.
package name: (09-nodeapp) jlt-node-site
version: (1.0.0) 
description: JLT website with node
entry point: (index.js) app.js
test command: 
git repository: 
keywords: node
author: me
license: (ISC) 
About to write to /opt/lampp/htdocs/github/JLT-India-Challenge/09 nodeApp/package.json:

{
  "name": "jlt-node-site",
  "version": "1.0.0",
  "description": "JLT website with node",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [
    "node"
  ],
  "author": "me",
  "license": "ISC"
}


Is this OK? (yes) y

*/




// ======================================================================
// 22)Installing Nodemon

/*
Nodemon monitors your application files 
if we make a change in any file , then it restarts 
the server automatically

$ npm install -g nodemon // Install the package globally

so starting the server, inplace of writing 
$ node app.js
we type
$ nodemon app.js
*/

// ======================================================================
// 23)Introduction to express

/* Express
Easy and flexible routing system
Integrates with many templating engines
Contains a middleware framework
*/

// app.js 

var express = require('express');
var app = express();
// Listening to the port 3000
app.listen(3000);

// How do we respond to requests
/*
when we setup app variable we have given access to variety of methods on it
that help us respond to the requests and these methods all corrospond to 
the types of requests being made 
thats known as HTTP verbs or methods

HTTP method (kinds of request we make)
-GET
-POST
-DELETE
-PUT	
Responding requests
	- GET = app.get('route',fn)
	- POST = app.post('route',fn)
	- DELETE = app.delete('route',fn)
*/

var express = require('express');

var app = express();

// Setting up routes
app.get('/',function(req,res){
    // send string with send() and express indentified it without the encoding (Content type)
    res.send('this is the homepage');
});
app.get('/contact',function(req,res){
    res.send('this is the contact page');
});

app.listen(3000);


// ======================================================================
// 24) Route Parameters (in express)

/*
Getting varaibles from url like id etc can be done with the 
Route parameters
*/

// Here id paramter is accessed from url with req.params
app.get('/profile/:id', function(req,res){
    res.send('You requested to see a profile with id ' + req.params.id);
});


// ======================================================================
// 25) Templating engines

/*
Lets send a html page
by sendFile() Example
*/
app.get('/contact',function(req,res){
    res.sendFile(__dirname + '/contact.html');
});

/* ------------------------------
Sending dynamic content to the html page

Tempalate engine help us embed data and js code into html file
and then inject this dynamic content into the file which we return to the 
client or browser

there are variety of engines available we will be looking at
templating engine called ejs
embeddedejs.com

install EJS with 
$ npm install ejs -save

// we have to tell express that we will be using ejs as our view or template engine
*/
app.set('view engine','ejs');
/*
	By default when we request some views or templates it is going to look
 	/view folder


 	create a new diretory /views
 	create new file  /view/profile.ejs

 	In EJS we can do every thing as HTML but now along with that we can embed data in it. 

	now we render the view profile.ejs in the app.js file
*/
app.get('/profile/:id', function(req,res){
    //res.send('You requested to see a profile with id ' + req.params.id);
    res.render('profile');
});

//	Now we need to inject the dynamic content into view

// ----------- app.js
app.get('/profile/:name', function(req,res){
    res.render('profile',{person: req.params.name});
});

//----------- profile.ejs
//<h1>Welcome to Profile of <%= person %> </h1>


// Final Files
//---------------app.js
var express = require('express');
var app = express();
app.set('view engine','ejs');

// Setting up routes
app.get('/',function(req,res){
    // send string with send() and express indentified it without the encoding (Content type)
    //res.send('this is the homepage');
    res.sendFile(__dirname + '/index.html')
});

// sendFile() renders the html file
app.get('/contact',function(req,res){
    res.sendFile(__dirname + '/contact.html');
});

// Here id paramter is accessed from url with req.params
app.get('/profile/:name', function(req,res){
    //res.send('You requested to see a profile with id ' + req.params.id);
    var data = {age:29,job:'ninja'}
    res.render('profile',{person: req.params.name, data: data});
});

app.listen(3000);

//---------------- profile.ejs 
/*
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        body{background:skyblue ;color: #fff;padding: 30px;}
        h1{font-size: 48px;text-align: center;}
        p{font-size: 16px;text-align: center;}
    </style>
</head>
<body>
    <h1>Welcome to Profile of <%= person %> </h1>
    <p>Age: <%= data.age %> </p>
    <p>Job: <%= data.job %> </p>
    
</body>
</html>
*/


// <%= ____  %>  Data output
// <% ______ %>  Code output

// ======================================================================
// 26) Templating engines (Part 2)


// In this we would be looking at embeding code in ejs
// statements like looping and outputting the data

// ----------------app.js

app.get('/profile/:name', function(req,res){
    //res.send('You requested to see a profile with id ' + req.params.id);
    var data = {age:29, job:'ninja', hobbies: ['eating', 'fighting', 'fishing'] };
    res.render('profile',{person: req.params.name, data: data});
});

// ---------------- profile.ejs

/*
	<h2>Hobbies</h2>
	<ul>
	    <% data.hobbies.forEach(function(item){ %>
	        <li> <%= item %> </li>
	    <% }); %>
	</ul>
*/



// ======================================================================
// 27) Partial Templates (or views)

// these are like "include" in php so that the things which are repeated all over the website would be 
// included so as to avoid repetition of code

// Create a new folder partials in views 
// create a new file nav.ejs

//------------------nav.ejs
/*
<nav>
    <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/contact">Contact</a></li>
    </ul>
</nav>
*/

// ---------------profile.ejs 
// Here we will include that view nav.ejs
<%- include('partials/nav'); %>

// create new file index.ejs and contact.ejs in views

// -------------------app.js
// Also change the sendFile() to render() as we are requesting view
var express = require('express');
var app = express();
app.set('view engine','ejs');

app.get('/',function(req,res){
    //res.sendFile(__dirname + '/index.html');
    res.render('index');
});

app.get('/contact',function(req,res){
    //res.sendFile(__dirname + '/contact.html');
    res.render('contact');
});

app.get('/profile/:name', function(req,res){
    var data = {age:29, job:'ninja', hobbies: ['eating', 'fighting', 'fishing'] };
    res.render('profile',{person: req.params.name, data: data});
});
app.listen(3000);

// ======================================================================
// 28) Middleware and static files

/*
if we directly link the css file in head and add it in assets folder the css file 
it won't detect the css file so handling static files in node can be done with middleware

Middleware is the code that runs between the request and the response
*/

app.get('/contact',function(req,res){
	/*
		all the code that is present here (after the request /contact and before the response) 
		is the middleware
	*/
    res.render('contact');
});

/*
we will fire the function (or the middleware) whenever someone visits /assets
*/

// Custom middleware
app.use('/assets', function(res,req,next){
	console.log(req.url); // this will return url after /assets/?????  => /?????
	next();  // this goes back to the middle ware inside the request
});

/*example 

if we goto "localhost:3000/assets" we get back
/
if we goto "localhost:3000/assets/styles.css" we get back
/styles.css

*/

/*
but we will be using middleware present in the express
*/
app.use('/assets',express.static('assets'));

/*
create directory "/assets"
create file "/assets/styles.css"
move all styles form view to this styles

use it in the ejs file like

<link rel="stylesheet" href="/assets/styles.css">
*/


// ======================================================================
// 29) Query Strings

/*
Query String = Additional data added onto http request in the form of
name value pairs (like in blogs etc)
example:
mysite.com/blog/news?page=2

query string is in url present after the question mark (?) and seperated 
by ampersend (&)
mysite.com/contact?person=ryu&department=marketing

parse the request and pull out the data


Passing query String data to the view
*/
app.get('/contact',function(req,res){
    //res.sendFile(__dirname + '/contact.html');
    //console.log(req.query);
    res.render('contact',{qs: req.query});
});

// contact.ejs

/*
<form id="contact-form">
    <label for="who">Who do you want to contact</label>
    <input type="text" name="who" value="<%= qs.person %>"><br>
    <label for="department">Which Department?</label>
    <input type="text" name="department" value="<%= qs.department %>"><br>
    <label for="email">Your Email</label>
    <input type="text" name="email"><br>
    <input type="submit" value="submit">
</form>
*/


// ======================================================================
// 30) Handling POST requests

/*

POST is a request method

POST requests, ask the server to accept/store data which is enclosed in the 
body of the request

Often used when submitting the forms

data is present in the request body itself

In form we uses POST by
<form id="contact-form" method="POST" action="/contact">

Rest is done in app.js

Now we need additional middleware to handle post requests
body-parser
$ npm install body-parser -save

*/

var bodyParser = require('body-parser')

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// Handling the post requests
app.post('/contact', urlencodedParser, function(req,res){
    console.log(req.body);
    res.render('contact-success',{data: req.body});
});

// ----------------------- contact-success.ejs

/*
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="/assets/styles.css">
</head>
<body>
    <%- include('partials/nav'); %>

    <h1>Contact Us Right away </h1>
    <p>Thanks for getting in touch!</p>
    
    <p>You contacted <%= data.who %> in the <%= data.department %> department.</p>
    <p>we will reply you at <%= data.email %></p>

</body>
</html>
*/

// -------------------- app.js
var express = require('express');
var bodyParser = require('body-parser');  // For handling the post requests
var app = express();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.set('view engine','ejs');

// Serving staic file with express
app.use('/assets',express.static('assets'));


// Setting up routes
app.get('/',function(req,res){
    // send string with send() and express indentified it without the encoding (Content type)
    //res.send('this is the homepage');
    //res.sendFile(__dirname + '/index.html');
    res.render('index');
});

// sendFile() renders the html file
app.get('/contact',function(req,res){
    //res.sendFile(__dirname + '/contact.html');
    //console.log(req.query);
    res.render('contact',{qs: req.query});
});

// Handling the post requests
app.post('/contact', urlencodedParser, function(req,res){
    console.log(req.body);
    res.render('contact-success',{data: req.body});
});

// Here id paramter is accessed from url with req.params
app.get('/profile/:name', function(req,res){
    //res.send('You requested to see a profile with id ' + req.params.id);
    var data = {age:29, job:'ninja', hobbies: ['eating', 'fighting', 'fishing'] };
    res.render('profile',{person: req.params.name, data: data});
});

app.listen(3000);