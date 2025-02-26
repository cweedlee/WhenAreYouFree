var http = require('http');
var url = require('url');
var qs = require('querystring');
var fs = require('fs');


var server = http.createServer(function(request, response) {
		const parsedUrl = url.parse(request.url);
		const resource = parsedUrl.pathname;

		console.log(resource);
		
		const responseServerError = (err) => {
			console.log("server err");
			response.writeHead(500, {'Content-Type': 'text/html'});
			response.end('500 internal server error :', error);
		}


		if (resource === '/hello') {
			fs.readFile('hello.html', 'utf-8', (error, data) => {
				try {
					if (error){
						response.writeHead(500, {'Content-Type': 'text/html'});
						response.end('500 internal server error :'+error);
						console.log("what???");
					}
					else  {
						response.writeHead(200, {'Content-Type': 'text/html'});
						response.end(data);
					}
				} catch (err) {
					responseServerError(err);
				}
			})
		} else {
				response.writeHead(404, {'Content-Type' : 'text/html'});
				response.end("404 page not found");

			};


});
process.on('uncaughtException', (err) => {
    console.error('예기치 않은 오류 발생:', err);
});

server.listen(8080, function () {
	console.log('server is listening...');
});



