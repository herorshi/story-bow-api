const controllerLogin = require('./controller/login/')
const Module = require('./function_global')

function getRouter(app){
    app.get('/api',controllerLogin.test_api);
    app.post('/api/login',controllerLogin.login);
    app.get('/api/protected',Module.ensureToken,controllerLogin.protected);
    
}
module.exports = {
    getRouter
}