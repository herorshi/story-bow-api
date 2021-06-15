var express = require('express');
var app    = express();
let mysql = require('mysql');
var cors = require('cors');
var db = require('../../connect_db');
app.use(cors())
var jwt = require('jsonwebtoken');
const Project = {
    async set_title(req,res){
    
        let { title,status,id_member } = req.body;
        if(status == "-1"){
            let sql_inset_project = `
            INSERT INTO project (
                    id_project, name_project, title_coverage, genre, theme_name, lock_story_line_name, premise_name, id_member, create_at, update_at) 
            VALUES  (NULL, '${title}', NULL, NULL, NULL, NULL, NULL,  '${id_member}', current_timestamp(), current_timestamp());`
            let sql_query =  await  db.con_db(sql_inset_project);
            console.log(sql_query,'sql_query');
            console.log(sql_query.affectedRows,'sql_query.affectedRows');
            console.log(sql_query.insertId,'sql_query.insertId');
            if(sql_query.affectedRows >=1){
                res.json({
                    status:true,
                    id_project:sql_query.insertId
                })
                return
            }
            else {
                res.json({
                    status:false,
                    message:"Data Error"
                })
            }
        }
        else {
            let sql_update_project = ` UPDATE project set name_project = '${title}' WHERE id_project = '${status}' `
            let sql_query =  await  db.con_db(sql_update_project);
            console.log(sql_query);
            if(sql_query != false && sql_query.affectedRows  >=1){
                let list_sql = await db.con_db(` SELECT * FROM  project WHERE id_project = '${status}' `)
                res.json({
                    data:list_sql,
                    status:true
                })
            }
        }
    },
    async get_project(req,res){
        let { id } = req.body
        if(id == "-1"){
            res.json({
                status:false,
                message:"Data Error"
            })
        }
        if(id) {
            let list_sql = await db.con_db(` SELECT * FROM  project WHERE id_project = '${id}' `)
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
module.exports = Project

// https://www.youtube.com/embed/Q33KBiDriJY
