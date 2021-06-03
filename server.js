var express = require('express');
var app    = express();
let mysql = require('mysql');
var cors = require('cors');
var jwt = require('jsonwebtoken');
const { getRouter } = require('./router');
app.use(cors())
getRouter(app); //Router
var server = app.listen(4000,function(){
var host = server.address().address
var port = server.address().port
console.log('Application Run At http://%s:%s;',host,port);
});