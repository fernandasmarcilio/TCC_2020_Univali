const knex = require('knex');
const configuration = require('../../knexfile');

const config = process.env.NODE_ENV

const db = knex(configuration[config])

module.exports = db;



