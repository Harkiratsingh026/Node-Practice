var port=3000;
var express= require("express");
var app= express();

app.get('/',function(req,res){
	res.send("HELLO WORLD");
});

app.get('/test',function(req,res){
	res.send("TESTING");
});


app.listen(port,function(req,res){
	console.log("Express Server is Listening on Port:"+port);
});

