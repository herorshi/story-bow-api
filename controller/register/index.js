var express = require('express');
var app    = express();
let mysql = require('mysql');
var cors = require('cors');
// var jwt = require('jsonwebtoken');
var db = require('../../connect_db');
app.use(cors())
var jwt = require('jsonwebtoken');
const Register = {
    async save_member(req,res){
        let { email,email_cf,name,surname,password,password_cf,username } = req.body;
        let check = await db.con_db(`SELECT * FROM member WHERE username = '${username}'`); 
        if(check.length>=1){
            res.status(200).json({
               status: "400",
               meassage: "มี username อยู่ในระบบแล้ว ",
            })
            return
        }
        let data = await db.con_db(
            `
                INSERT INTO member (id_member, name, surname, username, password, email,  permission, create_at, update_at) VALUES 
                (NULL, '${name}', '${surname}', '${username}', '${password}', '${email}' , '1', current_timestamp(), current_timestamp())
            `
        );
        if(data==false){
            res.status(400).json({
               status: "400",
               message: "ข้อมูลไม่ถูกต้อง" ,
            })
        }
        let list_sql = await db.con_db(` SELECT * FROM member order by id_member desc LIMIT 0,1 `)
        res.json({
            data:list_sql
        })
    },
}
module.exports = Register

// https://www.youtube.com/embed/Q33KBiDriJY
