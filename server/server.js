var http = require('http');

var server = http.createServer(function (req, res) {
  var fs = require('fs');
  var videopath = '/samplevideo/video.mp4'; //　いらんかも
  console.log('request ' + req.url + ' from client');
  if (req.url == '/favicon.ico') {
    fs.readFile('./favicon.ico', function (err, data) {
      // res.write(data);
      res.end(data);
    });
  } else if (req.url != '/server/samplevideo/video.mp4') {
    fs.readFile('../client/index.html', function (err, data) {
      // res.write(data);
      res.end(data);
    });
  } else {
    var stream = fs.createReadStream(__dirname + req.url);
    stream.on('error', function (err) {
      console.log('could not create read stream');
      console.log(err);
    });

    stream.on('open', function () {
      console.log('now loading');
      // res.writeHead(200, {'Content-Type': 'video/mp4'});
      stream.pipe(res);
    });
  }
});

server.listen(3000, 'localhost');
