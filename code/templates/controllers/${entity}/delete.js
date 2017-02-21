function deletE(req, res, app) {
    console.info('controllers :: ${entity} :: index > delete');

    /**
     * Check mandatory keys from request body
     */
    var validation = app.modules.util.validator.keys([
        'id'
    ], req.params)
    if(true !== validation) return end(validation)

    /**
     * Check id format when request has id in the properties
     */
    validation = app.modules.util.validator.idFormat(req.params.id)
    if(true !== validation) return end(validation)

    const model = app.modules.models.dao.${entity}
    /**
     *  model.doSomething.then(end).catch(end)
     */

    function end(response) {
        app.modules.util.end(res, response, app)
    }
}

module.exports = deletE;