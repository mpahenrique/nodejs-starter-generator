const Common = require('./Common')
class ${Uentity} extends Common {
    /**
     * [Class ${entity} constructor]
     * @param {String} property [Some class property]
     * @return {undefined} [void function]
     */
    constructor(property) {
        super()
        this.property = property
    }

    checkData() {
        return this.checkTypes({
            'property' : 'String' // Number, Array, CustomType, etc
        })
    }

    /**
     * Here you can code getters and setters functions
     */
}

module.exports = ${Uentity}