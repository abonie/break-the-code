var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(express.static('app'));
app.use(bodyParser.json());


var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('server is up! :)');

})

require('./server/rest/userRest')(app);
require('./server/rest/answerRest')(app);
require('./server/rest/questionRest')(app);