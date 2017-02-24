'use strict';

const config     = require('./package.json').application
,     recursive  = require('recursivejs')
,     app        = require('./nodeJsStarter')
,     express    = require('express')
,     bodyParser = require('body-parser')
,     Sequelize  = require('sequelize')

var sequelize = new Sequelize(process.env.db, process.env.dbUsername, process.env.dbPasswrod, {
  host: process.env.dbHost,
  dialect: 'mysql'
  //, pool: {
  //   max: 5,
  //   min: 0,
  //   idle: 10000
  // }
});

app
    .use('express', express(), true) // core module
    .use((self) => { self.express.use(bodyParser.urlencoded()) })
    .use('sequelize', sequelize)
    .load(config.modules) // load modules
    .use((self) => { recursive.run(self.modules.routes, self); }) // load and run routes
    .listen(config.port); // listen http://dns:port