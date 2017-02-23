class Common {

    constructor(entity){
        this.entity = entity
    }

    /**
     * save [ save newentity]
     * @param  {entity} newEntity [entity object]
     * @param  {NodeJsStarter object} [App object to provide methods to the dao]
     * @return {Promise}
     */
    save(newEntity, app) { return new Promise((resolve, reject)=>{

        var cEntitys = app.monk.get(this.entity)
        ,   entity   = new app.modules.models.entities.Entity(
            newEntity.property
        )

        var checkedData = entity.checkData()
        if(true !== checkedData) return onError({ status : 4004 })

        this.insert(cEntitys, entity).then(onSuccess).catch(onError)
     
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
     * get [ Get entity byid]
     * @param  {String} id [entity id]
     * @param  {NodeJsStarter object} [App object to provide methods to the dao]
     * @return {Promise}
     */
    get(id, app) { return new Promise((resolve, reject)=>{
        var cEntitys = app.monk.get(this.entity)

        cEntitys.findOne(id).then(onSuccess).catch(onError)

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
     * update [description]
     * @param  {String} id [entity id]
     * @param  {Object} updateData [Object with entity fields and values]
     * @return {Promise}
     */
    update(id, updateData, app) { return new Promise((resolve, reject)=>{
        var cEntitys = app.monk.get(this.entity)

        cEntitys.findOneAndUpdate(id, {
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
     * delete [description]
     * @param  {String} id [entity id]
     * @param  {Object} updateData [Object with entity fields and values]
     * @return {Promise}
     */
    delete(id, app) { return new Promise((resolve, reject)=>{
        var cEntitys = app.monk.get(this.entity)

        cEntitys.findOneAndUpdate(id, {
            $set : {
                active : 0
            }
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
     * insert [description]
     * @param  {Object} cEntitys [entity collection]
     * @return {Promise}
     */
    insert(cEntitys, entity) {
        return cEntitys.insert(entity)
    }

    /**
     * exists [description]
     * @param  {[type]}  cEntitys [description]
     * @param  {[type]}  filter [description]
     * @return {undefined} [void function]
     */
    exists(cEntitys, filter, fields, next) {
        cEntitys.find(filter, fields).then(next)
    }

}

module.exports = Common;