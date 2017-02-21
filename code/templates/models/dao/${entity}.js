/**
 * [save${entity} save new ${entity}]
 * @param  {${entity}} new${Uentity} [${entity} object]
 * @param  {NodeJsStarter object} [App object to provide methods to the dao]
 * @return {Promise}
 */
function save${Uentity}(new${Uentity}, app) { return new Promise((resolve, reject)=>{

    var c${entity}s = app
    .monk.get('${entity}s')
    ,   ${entity}   = new app.modules.models.entities.${Uentity}(
        new${Uentity}.property
    )

    var checkedData = ${entity}.checkData()
    if(true !== checkedData) return onError({ status : 4004 })

    insert${Uentity}(c${entity}s, ${entity}).then(onSuccess).catch(onError)
 
    function onError(data) {
        reject({ status : data.status || 4000 })
    }

    function onSuccess(data) {
        resolve({
            status : 200,
            data : { _id : data._id }
        })
    }
})}

/**
 * [get${entity} Get ${entity} by id]
 * @param  {String} id [${entity} id]
 * @param  {NodeJsStarter object} [App object to provide methods to the dao]
 * @return {Promise}
 */
function get${Uentity}(id, app) { return new Promise((resolve, reject)=>{
    var c${entity}s = app.monk.get('${entity}s')

    c${Uentity}s.findOne(id).then(onSuccess).catch(onError)

    function onError(data) {
        reject({ status : data.status || 4000 })
    }

    function onSuccess(data) {
        resolve({
            status : 200,
            data : data
        })
    }
})}

/**
 * [update${entity} description]
 * @param  {String} id [${entity} id]
 * @param  {Object} updateData [Object with ${entity} fields and values]
 * @return {Promise}
 */
function update${Uentity}(id, updateData, app) { return new Promise((resolve, reject)=>{
    var c${entity}s = app.monk.get('${entity}s')

    c${Uentity}s.findOneAndUpdate(id, {
        $set : updateData
    }).then(onSuccess).catch(onError)

    function onError(data) {
        reject({ status : data.status || 4000 })
    }

    function onSuccess(data) {
        resolve({
            status : 200,
            data :  { _id : data._id }
        })
    }
})}

/**
 * [insert${entity} description]
 * @param  {Object} c${entity}s [${entity} collection]
 * @return {Promise}
 */
function insert${Uentity}(c${entity}s, ${entity}) {
    return c${Uentity}s.insert(${entity})
}

/**
 * [hasUser description]
 * @param  {[type]}  c${entity}s [description]
 * @param  {[type]}  filter [description]
 * @return {undefined} [void function]
 */
function has${Uentity}(c${entity}s, filter, fields, next) {
    c${Uentity}s.find(filter, fields).then(next)
}

module.exports = {
    get${Uentity} : get${Uentity},
    save${Uentity} : save${Uentity},
    update${Uentity} : update${Uentity}
}