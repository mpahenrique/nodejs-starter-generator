var Common = require('./Common')
const common = new Common('${entity}')

function specificMethod() {
    // do something specific with ${Uentity} class
}

module.exports = {
    get    : common.get,
    save   : common.save,
    update : common.update,
    delete : common.delete,
    custom : specificMethod
}