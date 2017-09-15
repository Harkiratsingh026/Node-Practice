var express=require('express');
var bodyParser=require('body-parser');
var port=3000;
var fs=require('fs');
var app=express();
var arr={Harkirat:"Singh",Akshay:"Kakkar",Anureet:"Singh"};

app.get('/login',function(requester,response){
	fs.readFile('public/Login.html',null,function(error,data){
		response.setHeader("Content-type","text/html");
		if(error){
			response.write("<h1>404</h1><br>");
			response.write("<h1>File Not Found</h1>");
		}
		else{
			response.write(data);
		}
		response.end();
	});

});

app.use(bodyParser.urlencoded({extended:true}));

app.post('/home',function(request,response){
		response.setHeader("Content-type","text/html");
		if(arr[request.body.name]!=undefined){
			if(request.body.password==arr[request.body.name]){
				fs.readFile('public/Home.html',null,function(error,data){
					if(error){
						response.write("<h1>404</h1><br>");
						response.write("<h1>File Not Found</h1>");
						response.end();
					}
					else{
						response.write(data);
						response.end();
					}
				});
			}
			else{
				response.write("Incorrect Password!! Please Try AGAIN!!!");
				response.end();
			}
		}
		else{
			response.write("Incorrect Username!! Please Try AGAIN!!!");
			response.end();
		}
});


app.listen(port,function(){
	console.log("Server started at port:"+port);
});