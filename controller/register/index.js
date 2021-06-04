var express = require('express');
var app    = express();
let mysql = require('mysql');
var cors = require('cors');
var jwt = require('jsonwebtoken');
var db = require('../../connect_db');
app.use(cors())
var jwt = require('jsonwebtoken');


const Register = {
    async save_member(req,res){
        // current_timestamp()

        let { name,surname,username,password,email,birth_day,permission,tel } = req.body;
        let check = await db.con_db(`SELECT * FROM member WHERE username = '${username}'`); 
        console.log(check.length);
        if(check.length>=1){
            res.status(200).json({
               status: "400",
               meassage: "มี username อยู่ในระบบแล้ว ",
            })
            return
        }


        let data = await db.con_db(
            `
            INSERT INTO member (id_member, name, surname, username, password, email, birth_day, permission, tel, create_at, update_at) VALUES 
            (NULL, '${name}', '${surname}', '${username}', '${password}', '${email}', '${birth_day}', '${permission}', '${tel}', current_timestamp(), current_timestamp())
            `
        );
        let list_sql = await db.con_db(` SELECT * FROM member order by id_member desc LIMIT 0,1 `)
        // console.log(list_sql,'data');
        res.json({
            data:list_sql
        })
        // const user = { id:3 }
        // const token = jwt.sign({user},'my_secret_key');
        // res.json({
        //     token:token
        // })
    },
}
module.exports = Register
