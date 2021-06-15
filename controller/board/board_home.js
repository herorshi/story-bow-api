var express = require('express');
var app    = express();
let mysql = require('mysql');
var cors = require('cors');
var db = require('../../connect_db');
app.use(cors())
var jwt = require('jsonwebtoken');
const Board = {

    async get_all_project(req,res){

        let { id } = req.body;

        if(id) {
            let list_sql = await db.con_db(` SELECT * FROM project as pj LEFT JOIN member as mb ON pj.id_member = mb.id_member WHERE pj.id_member = '${id}' `)
            res.json({data:list_sql})
        }
        else {
            res.json({
                status:false,
                message:"Data Error"
            })
        }
    }
}
module.exports = Board

// https://www.youtube.com/embed/Q33KBiDriJY
