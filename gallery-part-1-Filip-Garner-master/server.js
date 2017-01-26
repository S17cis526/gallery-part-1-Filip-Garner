/**
 * server.js
 * This file defines the server for a
 * simple photo gallery web app.
 */
 
var http = require('http');
var fs = require('fs');
var port = 3042;

//var chess = fs.readFileSync('images/chess.jpg')::: example of storing data in RAM (caching) instead of reading the file everytime

function serveImage(filename, req, res){
	var body;
	fs.readFile("images/"+filename, function(err, body){//the function that catches errors also takes the body var->no 'var body=' is needed
		if(err){
		console.error(err);//error log instead of status log
		res.statusCode = 500;//indicates server error
		res.statusMessage = "whoops";
		res.end("Oh dear");
		return;
	}
	res.setHeader("Content-Type", "image/jpeg");
	res.end(body);
	});//asynchronous read(allows many reads): includes function to handls error
	
}

var server = http.createServer(function(req,res){
	
	switch(req.url){//switch statement to handle different url requests
	case "/chess":
		serveImage('chess.jpg',req,res);
		break;
	case "/fern":
		serveImage('fern.jpg',req,res);
		break;
	case "/bubble":
		serveImage('bubble.jpg',req,res);
		break;
	case "/mobile":
		serveImage('mobile.jpg',req,res);
		break;
	case "/ace":
		serveImage('ace.jpg',req,res);
		break;
	default:
		res.statusCode=404;
		res.statusMessage = "Not found";
		res.end();
	}
	
});



server.listen(port, function(){
	console.log("Listening on Port " + port);
});