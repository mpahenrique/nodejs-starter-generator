function keys(arrKeys, search, fn){
    var invalids = []
    for (let i = 0, lgt = arrKeys.length; i < lgt; i++) { 
        ( search[arrKeys[i]] == '' || !search[arrKeys[i]] ) && 
        invalids.push(arrKeys[i])
    }
    if(invalids.length){
        return {
            status : 4002,
            data : invalids
        }
    }

    return true;
}

function idFormat(id){
    id = Array.isArray(id) ? id : [id]
    var isValid = true

    for (let i = 0, lgt = id.length; i < lgt; i++) {
        isValid = new RegExp("^[0-9a-fA-F]{24}$").test(id[i])
        if(!isValid) break    
    }

    return isValid ? isValid : { status : 4003 }
}

module.exports = {
    keys : keys,
    idFormat : idFormat
}