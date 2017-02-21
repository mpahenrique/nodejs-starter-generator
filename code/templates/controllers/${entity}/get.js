function get(req, res, app) {
    console.info('controllers :: ${entity} :: index > GET')

    var validation = app.modules.util.validator.idFormat(req.params.id)
    if(true !== validation) return end(validation)

    const model = app.modules.models.dao.${entity}
    /**
     *  model.doSomething.then(end).catch(end)
     */

    function end(response) {
        app.modules.util.end(res, response, app)
    }
}

module.exports = get