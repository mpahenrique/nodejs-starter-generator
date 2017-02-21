function post(req, res, app){
    console.info('controllers :: ${entity} :: index > POST');

    /**
     * Check mandatory keys from request body
     */
    var validation = app.modules.util.validator.keys([
        'name',
        'owner'
    ], req.body);
    if(true !== validation) return end(validation);

    const model = app.modules.models.dao.${entity}    
    /**
     *  model.doSomething.then(end).catch(end)
     */

    function end(response) {
        app.modules.util.end(res, response, app)
    }
}

module.exports = post;