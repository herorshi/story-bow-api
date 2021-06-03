var express = require('express');
var app    = express();
let mysql = require('mysql');
var cors = require('cors');
var jwt = require('jsonwebtoken');
app.use(cors())
let pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'story_bow'
});
let test 
let db = {
    async con_db(str){
         return await new Promise((resolve, reject)=>{
            pool.query(str,  (error, elements)=>{
                if(error){
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    }
}
module.exports = db