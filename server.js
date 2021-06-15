var express = require('express');
var app    = express();
let mysql = require('mysql');
var cors = require('cors');
var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');
const session = require('express-session');
const filestore = require("session-file-store")(session)
var t1 = 0;

const corsConfig = {
    origin: function(origin, callback){
        return callback(null, true);
      },
      optionsSuccessStatus: 200,
      credentials: true
};

app.use(cors(corsConfig));


// app.use(session({
//     name: "session-id",
//     secret: "GFGEnter", // Secret key,
//     // saveUninitialized: false,
//     store: new filestore(),
//     saveUninitialized: false,
//     resave: false
// }))
// app.use(session({secret: "Shh, its a secret!"}));
// var cookieParser = require('cookie-parser')
const { getRouter } = require('./router');





app.use(bodyParser.json())
var cookieParser = require('cookie-parser')
app.use(cookieParser())

getRouter(app); //Router

app.use(cors());
app.get('/', function (req, res) {
    // Cookies that have not been signed
    console.log('Cookies: ', req.cookies)
    // Cookies that have been signed
    console.log('Signed Cookies: ', req.signedCookies)
})

var server = app.listen(4000,function(){
var host = server.address().address
var port = server.address().port
console.log('Application Run At http://%s:%s;',host,port);
});