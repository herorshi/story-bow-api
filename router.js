const controllerLogin = require('./controller/login/')
const controllerRegister = require('./controller/register')
const controllerProject  = require('./controller/project/project_home')
const controllerBoard = require('./controller/board/board_home')
const Module = require('./function_global')
var cors = require('cors');
function getRouter(app){
    //  setting-start
    var sess = 100;



    app.get('/api',controllerLogin.test_api);
    app.post('/api/login',controllerLogin.login);
    app.post('/api/protected',Module.ensureToken,controllerLogin.protected);
    app.post('/register',controllerRegister.save_member);
    app.post('/project/list',Module.ensureToken,controllerProject.get_project);
    app.post('/project/title',Module.ensureToken,controllerProject.set_title);
    app.post('/board/list',Module.ensureToken,controllerBoard.get_all_project);

    // app.post('/project/list',async function(req,res){
    //     await res.json({
    //         data:"data"
    //     })
    // });

    app.post("/send", (req, res) => {
        // console.log('SEND');
        res.cookie('t1',100);
        res.json({
            data:"json"
        });

    });

    app.post('/read',function(req,res){
        // console.log(req.session,'read');
        console.log(req.cookies.t1);
        res.json({
            data:"message"
        })
    });

}
module.exports = {
    getRouter
}