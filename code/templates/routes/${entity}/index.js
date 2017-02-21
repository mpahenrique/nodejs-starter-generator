function index (app) {
    console.info('routes :: ${entity} :: index');

    const router     = require('express').Router()
    ,     coreModule = app[app.coreModule];
    
    /** Methods configuration with current framework **/
    coreModule.use('/${entity}', resolve(app.modules.controllers.${entity}.index, app));
    
    function resolve(fn, app){
        return fn(router, app);
    }
}

module.exports = index;