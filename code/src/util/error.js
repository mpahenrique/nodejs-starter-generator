function error(err){
    var errors = {
        4001 : 'User already exists',
        4002 : 'Mandatory fields not set',
        4003 : 'Invalid id format',
        4004 : 'Invalid entity data types'
    }
    return errors[err] || 'Generic error';
}

module.exports = error;