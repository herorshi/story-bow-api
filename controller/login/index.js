var express = require('express');
var app    = express();
let mysql = require('mysql');
var cors = require('cors');
var jwt = require('jsonwebtoken');
var db = require('../../connect_db');
app.use(cors())

var jwt = require('jsonwebtoken');
const login = {
    async login(req,res){
        // let data = await db.con_db("SELECT * FROM member");
        // console.log(data,'data');
        const user = { id:3 }
        const token = jwt.sign({user},'my_secret_key');
        res.json({
            token:token
        })
    },
    async protected(req,res){
        jwt.verify(req.token,'my_secret_key',function(err,data){
            if(err){
                res.json({
                    text:"Error",
                    data:data
                })
            }
            else {
                res.json({
                    text:"this is protected",
                    data:data
                })
            }
        })
    },
    async test_api(req,res){
        res.json({
            text:'my api!'
        })
    }
}
module.exports = login