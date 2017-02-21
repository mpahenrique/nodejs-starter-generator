/**
 * [end description]
 * @param  {[type]} res  [description]
 * @param  {[type]} data [description]
 * @param  {[type]} app  [description]
 * @return {[type]}      [description]
 */
function end(res, data, app){
    if(!data || !data.status) return;
    
    var response = {
        status : data.status
    }, isError = data.status >= 4001;
    
    isError && (response.errorMessage = app.modules.util.error(data.status));

    response[isError ? 'errorData' : 'data'] = data.data;
    
    res.set('Access-Control-Allow-Origin', '*');
    // res.set('Access-Control-Allow-Methods', 'GET, PUT, PATCH, POST, DELETE, OPTIONS');
    res.set('Content-Type', 'application/json');
    res.end(JSON.stringify(response));
}

module.exports = end;