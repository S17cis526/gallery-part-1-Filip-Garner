/**
 * server.js
 * This file defines the server for a
 * simple photo gallery web app.
 */
 
var http = require('http');
var fs = require('fs');
var port = 3042;

var stylesheet=fs.readFileSync('gallery.css');//temporary comment out to identify how to hold in RAM

imageNames=['/chess','/fern','/bubble','/mobile','/ace'];

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
	case "/gallery":
	var gHtml = imageNames.map(function(fileName){
	return ' <img src="'+fileName+'" alt="a fishing ace at work">'}).join('');
		var html = '<!doctype html>';
		html+='<head>';
		html+='	<title>DynamicPage</title>';
		html+='	<link href="gallery.css" rel="stylesheet" type="text/css"';
		html+='</head>';
		html+='<body>';
		html+='	<h1>Gallery</h1>';
		html+=gHtml;
		html+='	<h1>Hello.</h1> Time is ' + Date.now();
		html+='<body>';
		res.setHeader('Content-Type','text/html');
		res.end(html);
		break;
	case "/chess":
	case "/chess/":
	case "/chess.jpg":
	case "/chess.jpeg":
		serveImage('chess.jpg',req,res);
		break;
	case "/fern":
	case "/fern/":
	case "/fern.jpg":
	case "/fern.jpeg":
		serveImage('fern.jpg',req,res);
		break;
	case "/bubble":
	case "/bubble/":
	case "/bubble.jpg":
	case "/bubble.jpeg":
		serveImage('bubble.jpg',req,res);
		break;
	case "/mobile":
	case "/mobile/":
	case "/mobile.jpg":
	case "/mobile.jpeg":
		serveImage('mobile.jpg',req,res);
		break;
	case "/ace":
	case "/ace/":
	case "/ace.jpg":
	case "/ace.jpeg":
		serveImage('ace.jpg',req,res);
		break;
	case '/gallery.css':
		res.setHeader('Content-Type','text/css');
		res.end(stylesheet);
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