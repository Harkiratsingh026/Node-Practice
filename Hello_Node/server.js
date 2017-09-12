var http= require('http');
var port= 3000;
var requestHandler= function http(request,response){
	console.log("Request From: "+ request.url);
	response.end("Hello World");
} 

var server= http.createServer(requestHandler);

server.listen(port,function(){
	console.log("Listening on Port:"+port);

});