var express = require('express');
var app    = express();
let mysql = require('mysql');
var cors = require('cors');
var jwt = require('jsonwebtoken');
var db = require('../../connect_db');
app.use(cors())
var jwt = require('jsonwebtoken');
// var cookieParser = require('cookie-parser')

var blacklist = require('express-jwt-blacklist');

// app.use(cookieParser())


const login = {    
    async login(req,res){
        let { username,password } = req.body;
        console.log(username,password);
        let data = await db.con_db(`SELECT * FROM member WHERE username = '${username}' AND  password =   '${password}'  `);
        if(data==false){
            res.status(400).json({
               status: "400",
               message: "ข้อมูลไม่ถูกต้อง",
            })
        }
        if(data.length == 0){
            res.status(200).json({
               status: "400",
               list: "ไม่พบข้อมูล",
            })
            return
        }
        function makeid(length) {
            var result           = [];
            var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for ( var i = 0; i < length; i++ ) {
              result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
           }
           return result.join('');
        }
        let random = makeid(5) 
        let id = data[0]['id_member'];
        const user = { id:id }
        const token = await jwt.sign({user},random);
        res.cookie('token',token);
        res.cookie('selt',random);
        // req.session.token = token;
        // req.session.selt = random;  
        // console.log(req.session.selt ,'random');
        res.json({
            data:data,
            token:token
        })
    },
    async protected(req,res){

        // console.log(req.cookies.selt,'req.session.selt');
        jwt.verify(req.token,req.cookies.selt,function(err,data){
            if(err){
                res.json({
                    text:"Error",
                    data:data
                })
            }
            else {
                res.json({
                    status:true,
                    text:"this is protected",
                    data:data
                })
            }
        })

    },
    async save_member(req,res){
        // console.log(req.body,'body');
        res.json({
            data:req.body
        })

    },
    async test_api(req,res){
        res.json({
            text:'my api!'
        })
    }
}
module.exports = login