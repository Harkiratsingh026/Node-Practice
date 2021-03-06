var express = require('express');
var bodyParser = require('body-parser');
var port = 3000;
var fs = require('fs');
var app = express();
var router = express.Router();
var validator = require('express-validator');
var session = require('express-session');
var arr = { Harkirat: "Singh", Akshay: "Kakkar", Anureet: "Singh" };

app.use(bodyParser.urlencoded({ extended: true }));
app.use(validator());
app.use(session({
	secret: 'max',
	saveUninitialized: true,
	resave: false
}));

app.use('/demo', router)

//handle logout for user
router.get('/logout', function (request, response) {
	request.session.destroy(function (err) {
		response.redirect('/demo/login');
	});
});

//handle get request for login
router.get('/login', function (requester, response) {
	fs.readFile('public/Login.html', null, function (error, data) {
		response.setHeader("Content-type", "text/html");
		if (error) {
			response.write("<h1>404</h1><br>");
			response.write("<h1>File Not Found</h1>");
		}
		else {
			response.write(data);
		}
		response.end();
	});

});

//handle get request for home directly
router.get('/home', function (request, response) {
	if (!request.session.user) {
		return response.status(401).send();
	}
	else {
		response.setHeader("Content-type", "text/html");
		fs.readFile('public/Home.html', null, function (error, data) {
			if (error) {
				response.write("<h1>404</h1><br>");
				response.write("<h1>File Not Found</h1>");
				response.end();
			}
			else {
				response.write(data);
				response.end();
			}
		});
	}
});

//handle post request
router.post('/home', function (request, response) {
	response.setHeader("Content-type", "text/html");
	if (arr[request.body.name] != undefined) {
		if (request.body.password == arr[request.body.name]) {
			fs.readFile('public/Home.html', null, function (error, data) {
				if (error) {
					response.write("<h1>404</h1><br>");
					response.write("<h1>File Not Found</h1>");
					response.end();
				}
				else {
					response.write(data);
					request.session.user = request.body.name;
					response.end();
				}
			});
		}
		else {
			response.redirect('/login');
			response.end();
		}
	}
	else {
		response.redirect('/login');
		response.end();
	}
});

//listen on port 3000
app.listen(port, function () {
	console.log("Server started at port:" + port);
});