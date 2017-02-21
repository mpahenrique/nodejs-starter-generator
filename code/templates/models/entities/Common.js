class Common {
    compare(type, key){
        let property = this[key]
        return 'undefined' !== typeof property && type === property.constructor.name
    }

    checkTypes(data, isNew) {
        let isValid = true
        ,   dataKeys = Object.keys(data)
        for(let i = 0, lgt = dataKeys.length; i < lgt; i++) {
            isValid = this.compare(data[dataKeys[i]], dataKeys[i])
            if(!isValid) break
        }
        return isValid
    }
}

module.exports = Common