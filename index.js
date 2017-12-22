"use strict";

var CiscoSpark = require('node-spark');

var options = {
  token: 'ZjFmYmI5ZTQtN2VhNi00MzYzLWI5MGUtOTJlZTQwYWNjNzVmZjI1ZDBhMDgtODE0',
  swagger: 'https://raw.githubusercontent.com/CumberlandGroup/swagger-cisco-spark/master/cisco_spark_v1.json',
  delay: 600
};

var spark = new CiscoSpark(options);

spark.connect()
  .then(client => client.rooms.getRooms())
  .then(res => console.log(res))
  .catch(err => console.log(err.message));

var Webhook = require('node-spark/webhook');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var webhook = new Webhook();

// add events
webhook.on('request', function(hook) {
  console.log('%s.%s web hook received', hook.resource, hook.event)
});

var app = express();
app.use(bodyParser.json());

// add route for path that which is listening for web hooks
app.post('/spark', webhook.listen());

// start express server
var server = app.listen('3000', function () {
  console.log('Listening on port %s', '3000');
});
