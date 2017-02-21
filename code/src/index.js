'use strict';

const config     = require('./package.json').application
,     recursive  = require('recursivejs')
,     app        = require('./nodeJsStarter')
,     express    = require('express')
,     bodyParser = require('body-parser')
,     monk       = require('monk');

app
    .use('express', express(), true) // core module
    .use((self) => { self.express.use(bodyParser.urlencoded()) })
    .use('monk', monk(process.env.DB_URL))
    .load(config.modules) // load modules
    .use((self) => { recursive.run(self.modules.routes, self); }) // load and run routes
    .listen(config.port); // listen http://dns:port