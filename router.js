const controllerLogin = require('./controller/login/')
const controllerRegister = require('./controller/register')
const Module = require('./function_global')

function getRouter(app){
    //  setting-start
        app.get('/api',controllerLogin.test_api);
        app.post('/api/login',controllerLogin.login);
        app.get('/api/protected',Module.ensureToken,controllerLogin.protected);
    //  setting-start

    // register
        app.post('/register',controllerRegister.save_member);
    // register
}
module.exports = {
    getRouter
}